// import { createTool } from '@mastra/core/tools';
// import { z } from 'zod';

// /**
//  * Analyze a CV to extract key insights
//  */
// export const analyzeCVTool = createTool({
//   id: 'analyze-cv',
//   description: 'Analyze CV content and extract key information',
//   inputSchema: z.object({
//     cvText: z.string().describe('The full text content of the CV'),
//     targetRole: z.string().optional().describe('The role the candidate is interviewing for'),
//   }),
//   outputSchema: z.object({
//     summary: z.string(),
//     cvText: z.string(),
//     targetRole: z.string(),
//   }),
//   execute: async ({ context }) => {
//     const { cvText, targetRole } = context;

//     // You can later expand this with Gemini/OpenAI prompt logic
//     return {
//       summary: 'CV analyzed successfully',
//       cvText,
//       targetRole: targetRole || 'General',
//     };
//   },
// });

// /**
//  * Generate interview questions based on CV analysis
//  */
// export const generateQuestionsTool = createTool({
//   id: 'generate-questions',
//   description: 'Generate interview questions based on CV content',
//   inputSchema: z.object({
//     cvSummary: z.string().describe('Summary of the CV content'),
//     questionCount: z.number().default(5).describe('Number of questions to generate'),
//   }),
//   outputSchema: z.object({
//     message: z.string(),
//     cvSummary: z.string(),
//   }),
//   execute: async ({ context }) => {
//     const { cvSummary, questionCount } = context;

//     return {
//       message: `Generating ${questionCount} questions based on CV`,
//       cvSummary,
//     };
//   },
// });


// export const craftAnswerTool = createTool({
//   id: 'craft-answer',
//   description: 'Craft a strong interview answer using the STAR (Situation, Task, Action, Result) or structured method',
//   inputSchema: z.object({
//     question: z.string().describe('The interview question to answer'),
//     cvContext: z.string().describe('Relevant background or CV information'),
//     useSTAR: z.boolean().default(true).describe('Whether to use the STAR method'),
//   }),
//   outputSchema: z.object({
//     success: z.boolean(),
//     message: z.string(),
//     data: z.object({
//       framework: z.string(),
//       keyPoints: z.array(z.string()),
//       avoid: z.array(z.string()),
//       sampleAnswer: z.string(),
//     }),
//   }),
//   execute: async ({ context }) => {
//     const { question, cvContext, useSTAR } = context;
//     const method = useSTAR ? 'STAR (Situation, Task, Action, Result)' : 'structured';

//     // For now we return static data — later the agent prompt will handle the LLM logic
//     return {
//       success: true,
//       message: `Answer crafted using the ${method} method`,
//       data: {
//         framework: `Answer crafted using ${method}`,
//         keyPoints: [
//           'Highlight achievements',
//           'Be specific',
//           'Show measurable results',
//         ],
//         avoid: ['Being vague', 'Rambling', 'Overusing buzzwords'],
//         sampleAnswer: `Example: In my previous role, I faced [Situation], was responsible for [Task], took [Action], and achieved [Result].`,
//       },
//     };
//   },
// });