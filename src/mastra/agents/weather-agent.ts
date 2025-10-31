


// import { Agent } from '@mastra/core/agent';
// import { Memory } from '@mastra/memory';
// import { LibSQLStore } from '@mastra/libsql';
// import { weatherTool } from '../tools/weather-tool';
// import { scorers } from '../scorers/weather-scorer';

// export const weatherAgent = new Agent({
//   name: 'Weather Agent',
//   instructions: `
//     You are a helpful weather assistant that provides accurate weather information and helps plan activities based on the weather.
//     Always ask for a location if none is provided.
//     Use the weatherTool to fetch current weather data.
//   `,
//   model: 'google/gemini-2.0-flash',
//   tools: { weatherTool },
//   scorers: {
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


