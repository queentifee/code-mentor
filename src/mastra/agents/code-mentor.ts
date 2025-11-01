import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { generateLearningPlanTool } from '../tools/codementor-tool';
// import { scorers } from '../scorers/weather-scorer';

// export const codeMentor = new Agent({
//   name: 'code-mentor',
//   description: 'An agent that generates learning roadmaps and project ideas for programming languages.',
//   instructions: `You are an expert code mentor and programming language specialist.
  
//   Your role is to:
//   1. Briefly Analyze the learner's current skills and experience
//   2. Generate relevant, realistic project ideas based on the learner's goals
  
//   Be supportive, constructive, and specific in your guidance.
  
//   `,
  
//   model: 'google/gemini-2.0-flash',
// tools: {
//    generateLearningPlanTool
//   },  
//   memory: new Memory({
//     storage: new LibSQLStore({
//       url: 'file:../mastra.db', // path is relative to the .mastra/output directory
//     }),
//   }),
// });

export const codeMentor = new Agent({
  name: 'code-mentor',
  description: 'An agent that generates learning roadmaps and project ideas for programming languages.',
  instructions: `You are an expert code mentor and programming language specialist.

  You receive two types of input:
  1. The user's current request (already parsed and cleaned)
  2. Previous conversation history (for context)
  
  Use the conversation history to:
  - Remember what the user has asked before
  - Build on previous responses
  - Avoid repeating information
  - Provide personalized follow-ups

  When users ask for learning roadmaps or programming guidance:
  
  1. Ask clarifying questions if needed (language, experience level)
  2. Generate a comprehensive learning roadmap with 6-8 clear steps
  3. Suggest 4-6 practical projects tailored to their level
  4. Provide tips, resources, and encouragement
  
  When generating learning roadmaps:
  - Check if the user mentioned their experience level before
  - Reference any languages or goals they mentioned earlier
  - Tailor complexity based on their previous questions 
  
  Always format responses with:
  - Clear headers ( Learning Roadmap,  Sample Projects,  Tips)
  - Numbered lists for roadmaps
  - Bullet points for projects with descriptions
  - Conversational, encouraging tone
  
  You have deep expertise in: Python, JavaScript, TypeScript, Go, Rust, Java, C++, Ruby, PHP, Swift, Kotlin, and more.
  
  Be specific, practical, and supportive in all guidance.`,
  
  model: 'google/gemini-2.0-flash',
  // No tools needed!
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});



