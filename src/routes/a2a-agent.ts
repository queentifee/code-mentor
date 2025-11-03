// import { registerApiRoute } from '@mastra/core/server';
// import { randomUUID } from 'crypto';

// export const a2aAgentRoute = registerApiRoute('/a2a/agent/:agentId', {
//   method: 'POST',
//   handler: async (c) => {
//     try {
//       const mastra = c.get('mastra');
//       const agentId = c.req.param('agentId');

//       // Parse JSON-RPC 2.0 request
//       const body = await c.req.json();
//       const { jsonrpc, id: requestId, method, params } = body;

//       // Validate JSON-RPC 2.0 format
//       if (jsonrpc !== '2.0' || !requestId) {
//         return c.json({
//           jsonrpc: '2.0',
//           id: requestId || null,
//           error: {
//             code: -32600,
//             message: 'Invalid Request: jsonrpc must be "2.0" and id is required'
//           }
//         }, 400);
//       }

//       const agent = mastra.getAgent(agentId);
//       if (!agent) {
//         return c.json({
//           jsonrpc: '2.0',
//           id: requestId,
//           error: {
//             code: -32602,
//             message: `Agent '${agentId}' not found`
//           }
//         }, 404);
//       }

//       // Extract messages from params
//       const { message, messages, contextId, taskId, metadata } = params || {};

//       let messagesList = [];
//       if (message) {
//         messagesList = [message];
//       } else if (messages && Array.isArray(messages)) {
//         messagesList = messages;
//       }

//       // Convert A2A messages to Mastra format
//       const mastraMessages = messagesList.map((msg) => ({
//         role: msg.role,
//         content: msg.parts?.map((part: any) => {
//           if (part.kind === 'text') return part.text;
//           if (part.kind === 'data') return JSON.stringify(part.data);
//           return '';
//         }).join('\n') || ''
//       }));

//       // Execute agent
//       const response = await agent.generate(mastraMessages);
//       const agentText = response.text || '';

//       // Build artifacts array
//       const artifacts = [
//         {
//           artifactId: randomUUID(),
//           name: `${agentId}Response`,
//           parts: [{ kind: 'text', text: agentText }]
//         }
//       ];

//       // Add tool results as artifacts
//       if (Array.isArray(response?.toolResults) && response.toolResults.length > 0) {
//   artifacts.push({
//     artifactId: randomUUID(),
//     name: 'ToolResults',
//     parts: response.toolResults.map((result: any) => ({
//       kind: 'text',
//       text: JSON.stringify(result, null, 2)
//     }))
//   });
// }


//       // Build conversation history
//       const history = [
//         ...messagesList.map((msg) => ({
//           kind: 'message',
//           role: msg.role,
//           parts: msg.parts,
//           messageId: msg.messageId || randomUUID(),
//           taskId: msg.taskId || taskId || randomUUID(),
//         })),
//         {
//           kind: 'message',
//           role: 'agent',
//           parts: [{ kind: 'text', text: agentText }],
//           messageId: randomUUID(),
//           taskId: taskId || randomUUID(),
//         }
//       ];

//       // Return A2A-compliant response
//       return c.json({
//         jsonrpc: '2.0',
//         id: requestId,
//         result: {
//           id: taskId || randomUUID(),
//           contextId: contextId || randomUUID(),
//           status: {
//             state: 'completed',
//             timestamp: new Date().toISOString(),
//             message: {
//               messageId: randomUUID(),
//               role: 'agent',
//               parts: [{ kind: 'text', text: agentText }],
//               kind: 'message'
//             }
//           },
//           artifacts,
//           history,
//           kind: 'task'
//         }
//       });

//     } catch (error: any) {
//       return c.json({
//         jsonrpc: '2.0',
//         id: null,
//         error: {
//           code: -32603,
//           message: 'Internal error',
//           data: { details: error.message }
//         }
//       }, 500);
//     }
//   }
// });


import { registerApiRoute } from '@mastra/core/server';
import { randomUUID } from 'crypto';

export const a2aAgentRoute = registerApiRoute('/a2a/agent/:agentId', {
  method: 'POST',
  handler: async (c) => {
    try {
      const mastra = c.get('mastra');
      const agentId = c.req.param('agentId');
      
      // Parse request body
      const body = await c.req.json();
      
      // Log for debugging
      console.log('📥 A2A Request:', JSON.stringify(body, null, 2));
      
      const { jsonrpc, id: requestId, method, params } = body;
      
      // RELAXED VALIDATION - only require jsonrpc
      if (!jsonrpc || jsonrpc !== '2.0') {
        return c.json({
          jsonrpc: '2.0',
          id: requestId || null,
          error: {
            code: -32600,
            message: 'Invalid Request: jsonrpc version must be "2.0"'
          }
        }, 400);
      }
      
      // Get agent
      const agent = mastra.getAgent(agentId);
      if (!agent) {
        return c.json({
          jsonrpc: '2.0',
          id: requestId || null,
          error: {
            code: -32602,
            message: `Agent '${agentId}' not found`
          }
        }, 404);
      }
      
      // Extract messages - handle MULTIPLE formats
      let messagesList = [];
      
      if (params) {
        // Format 1: params.message (single message)
        if (params.message) {
          messagesList = [params.message];
        }
        // Format 2: params.messages (array)
        else if (params.messages && Array.isArray(params.messages)) {
          messagesList = params.messages;
        }
        // Format 3: params.task.content (task format)
        else if (params.task && params.task.content) {
          messagesList = [{
            role: 'user',
            parts: [{ kind: 'text', text: params.task.content }]
          }];
        }
        // Format 4: Direct content/text
        else if (params.content || params.text) {
          const text = params.content || params.text;
          messagesList = [{
            role: 'user',
            parts: [{ kind: 'text', text }]
          }];
        }
      }
      
      // If still no messages, return error
      if (messagesList.length === 0) {
        return c.json({
          jsonrpc: '2.0',
          id: requestId || null,
          error: {
            code: -32602,
            message: 'Invalid params: no message content found'
          }
        }, 400);
      }
      
      // Convert A2A messages to Mastra format
      const mastraMessages = messagesList.map((msg: { role?: string; parts?: any[]; content?: string; text?: string }) => {
        let content = '';
        
        // Handle message with parts array
        if (msg.parts && Array.isArray(msg.parts)) {
          content = msg.parts.map((part: { kind: string; text?: string; data?: any }) => {
            if (part.kind === 'text') return part.text || '';
            if (part.kind === 'data') {
              // Extract text from data parts
              if (Array.isArray(part.data)) {
                return part.data
                  .map(item => item.text || '')
                  .filter(t => t.length > 0)
                  .join('\n');
              }
              return JSON.stringify(part.data);
            }
            return '';
          }).filter(t => t.length > 0).join('\n');
        }
        // Handle message with direct content
        else if (msg.content) {
          content = msg.content;
        }
        // Handle message with direct text
        else if (msg.text) {
          content = msg.text;
        }
        
        return {
          role: msg.role || 'user',
          content: content.trim()
        };
      });
      
      console.log('🤖 Sending to agent:', mastraMessages);
      
      // Execute agent
      const response = await agent.generate(mastraMessages);
      const agentText = response.text || '';
      
      console.log('✅ Agent response:', agentText.substring(0, 100) + '...');
      
      // Extract context IDs from params
      const taskId = params?.taskId || params?.task?.id || randomUUID();
      const contextId = params?.contextId || randomUUID();
      
      // Build response artifacts
      const artifacts = [
        {
          artifactId: randomUUID(),
          name: `${agentId}Response`,
          parts: [{ kind: 'text', text: agentText }]
        }
      ];
      
      // Build conversation history
      const history = [
        ...messagesList.map((msg: { role?: string; parts?: any[]; content?: string; text?: string; messageId?: string; taskId?: string }) => ({
          kind: 'message',
          role: msg.role || 'user',
          parts: msg.parts || [{ kind: 'text', text: msg.content || msg.text || '' }],
          messageId: msg.messageId || randomUUID(),
          taskId: msg.taskId || taskId,
        })),
        {
          kind: 'message',
          role: 'agent',
          parts: [{ kind: 'text', text: agentText }],
          messageId: randomUUID(),
          taskId: taskId,
        }
      ];
      
      // Return A2A-compliant response
      const responseObj = {
        jsonrpc: '2.0',
        id: requestId || randomUUID(),
        result: {
          id: taskId,
          contextId: contextId,
          status: {
            state: 'completed',
            timestamp: new Date().toISOString(),
            message: {
              messageId: randomUUID(),
              role: 'agent',
              parts: [{ kind: 'text', text: agentText }],
              kind: 'message'
            }
          },
          artifacts,
          history,
          kind: 'task'
        }
      };
      
      console.log('📤 A2A Response:', JSON.stringify(responseObj, null, 2));
      
      return c.json(responseObj);
      
    } catch (error: any) {
      console.error('❌ A2A Handler Error:', error);
      return c.json({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32603,
          message: 'Internal error',
          data: { 
            details: error.message,
            stack: error.stack 
          }
        }
      }, 500);
    }
  }
});