import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { generateLearningPlanTool } from '../tools/codementor-tool';
// import { scorers } from '../scorers/weather-scorer';

export const codeMentor = new Agent({
  name: 'code-mentor',
  description: 'An agent that generates learning roadmaps and project ideas for programming languages.',
  instructions: `You are an expert code mentor and programming language specialist.
  
  Your role is to:
  1. Briefly Analyze the learner's current skills and experience
  2. Generate relevant, realistic project ideas based on the learner's goals
  
  Be supportive, constructive, and specific in your guidance.
  
  `,
  
  model: 'google/gemini-2.0-flash',
tools: {
   generateLearningPlanTool
  },  
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});




