import { createTool } from '@mastra/core';
import { z } from 'zod';

export const generateLearningPlanTool = createTool({
  id: 'generate-learning-plan',
  description: 'Generate a learning roadmap and sample projects for a programming language',
  inputSchema: z.object({
    language: z.string().describe('Programming language to learn (e.g., Python, JavaScript, Go)'),
    experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner')
      .describe('Current experience level of the learner'),
  }),
  outputSchema: z.object({
    summary: z.string(),
    roadmap: z.array(z.string()),
    sampleProjects: z.array(z.string()),
  }),
  execute: async ({ context }) => {
    const { language, experienceLevel } = context;

    return {
      summary: `Generated ${language} learning roadmap for a ${experienceLevel} learner.`,
      roadmap: [], 
      sampleProjects: [], 
    };
  },
});
