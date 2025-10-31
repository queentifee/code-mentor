// import { Agent } from '@mastra/core/agent';
// import { Memory } from '@mastra/memory';
// import { LibSQLStore } from '@mastra/libsql';
// import { analyzeCVTool, generateQuestionsTool, craftAnswerTool } from '../tools/interview-tool';
// import { scorers } from '../scorers/weather-scorer';

// export const interviewBuddy= new Agent({
//   name: 'Interview Buddy',
//   description: 'Helps users prepare for interviews by analyzing CVs, generating questions, and crafting strong answers.',
//   instructions: `You are an expert career coach and interview preparation specialist. 
  
//   Your role is to:
//   1. Briefly Analyze CV/resume content
//   2. Generate relevant, realistic interview questions based on the candidate's experience
//   3. Identify potential weak spots or gaps that interviewers might probe
//   4. Help craft strong, compelling answers using the STAR method (Situation, Task, Action, Result)
//   5. Provide constructive feedback on answer quality
  
//   When analyzing a CV:
//   - Generate 3-5 targeted interview questions
//   - Craft strong answers to each question using the STAR method
  
//   When identifying weak spots:
//   - Highlight unexplained career gaps
//   - Point out vague or generic descriptions
//   - Note missing quantifiable achievements
//   - Identify skill mismatches for target roles
  
//   Be supportive, constructive, and specific in your guidance.
  
//   `,
  
//   model: 'google/gemini-2.0-flash',
// tools: {
//     analyzeCV: analyzeCVTool,
//     generateQuestions: generateQuestionsTool,
//     craftAnswer: craftAnswerTool,
//   },  scorers: {
//     toolCallAppropriateness: {
//       scorer: scorers.toolCallAppropriatenessScorer,
//       sampling: { type: 'ratio', rate: 1 },
//     },
//     completeness: {
//       scorer: scorers.completenessScorer,
//       sampling: { type: 'ratio', rate: 1 },
//     },
//     translation: {
//       scorer: scorers.translationScorer,
//       sampling: { type: 'ratio', rate: 1 },
//     },
//   },
//   memory: new Memory({
//     storage: new LibSQLStore({
//       url: 'file:../mastra.db', // path is relative to the .mastra/output directory
//     }),
//   }),
// });




