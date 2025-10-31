# Code Mentor – AI Learning Assistant

**Code Mentor** is an AI-powered agent built with [Mastra](https://mastra.ai) that helps users learn programming efficiently.  
It generates personalized **learning roadmaps** and **project ideas** based on a learner’s chosen programming language and experience level.

---

##  Features
- Generates step-by-step learning roadmaps for any programming language  
- Suggests practical project ideas  
- Adapts to beginner, intermediate, or advanced learners  
- Runs on **Google Gemini 2.0 Flash** via Mastra Cloud  
- Uses persistent memory with **LibSQL** for context retention

---

##  Tech Stack
- **Mastra Core** – Agent framework  
- **Gemini 2.0 Flash** – AI model  
- **LibSQL + Memory** – Persistent agent memory  
- **Zod** – Schema validation  
- **TypeScript**

---

##  Example Tool
```ts
export const generateLearningPlanTool = createTool({
  id: 'generate-learning-plan',
  description: 'Generate a learning roadmap and sample projects for a programming language',
  inputSchema: z.object({
    language: z.string(),
    experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
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
🧪 Testing Locally
Run the dev server:

npx mastra dev
Test with Postman:


POST http://localhost:8000/agents/codeMentor

{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "generate",
  "params": {
    "message": {
      "role": "user",
      "parts": [
        { "kind": "text", "text": "Generate a learning roadmap for JavaScript." },
        {
          "kind": "data",
          "data": {
            "language": "JavaScript",
            "experienceLevel": "beginner"
          }
        }
      ]
    }
  }
}