# Code Mentor – AI Learning Assistant

**Code Mentor** is an AI-powered agent built with [Mastra](https://mastra.ai) that helps users learn programming efficiently.  
It generates personalized **learning roadmaps** and **project ideas** based on a learner’s chosen programming language and experience level.

---

##  What It Does
Code Mentor helps developers at all levels plan their learning journey by:
- **Creating Personalized Learning Roadmaps** - Get a structured 6-8 phase learning path tailored to your experience level (beginner, intermediate, or advanced)
- **Suggesting Practical Projects** - Receive 4-6 hands-on project ideas that reinforce concepts and build your portfolio
- **Providing Learning Resources** - Get recommendations for documentation, tools, best practices, and common pitfalls to avoid
- **Conversational Guidance** - Ask questions about any programming language and get clear, actionable advice

### Supported Languages
Python, JavaScript, TypeScript, Go, Rust, Java, C++, C#, Ruby, PHP, Swift, Kotlin, Dart, R, Scala, Elixir, and more!

##  Key Features

- **Context-Aware** - Remembers your conversation history and adapts responses accordingly
- **Experience-Tailored** - Roadmaps adjust complexity based on your skill level
- **Friendly & Encouraging** - Conversational tone that makes learning feel achievable
- **Integrated with Telex** - Works seamlessly as an AI co-worker in your Telex workspace

## 🏗️ Built With

- **[Mastra](https://mastra.ai)** - AI agent framework
- **Gemini 2.0 Flash** - Google's latest language model
- **A2A Protocol** - Agent-to-Agent communication standard
- **Telex.im** - Team collaboration platform
- **TypeScript**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Mastra CLI installed: `npm install -g mastra`
- Google API key for Gemini (get one at [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone and Install**
```bash
npm create mastra@latest -y
cd your-project-name
npm install
```

2. **Set Up Environment Variables**
```bash
# Create .env file
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here" > .env
```

3. **Create the Agent**

Create `src/agents/code-mentor.ts` with your agent configuration (see the agent code in your project).

4. **Register Routes**

Create `src/routes/a2a-agent.ts` with the A2A route handler.

5. **Configure Mastra**

Update `src/mastra/index.ts` to include your agent and routes.


### Running Locally

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Your agent will be available at `http://localhost:4111`

### Testing Locally

Try these commands in the Mastra playground (accessible at `http://localhost:4111`):

```
"Hi, I'm Code Mentor!"

"I want to learn Python as a beginner"

"What projects should I build to learn JavaScript?"

"Create a roadmap for learning Go"
```

##  Deployment

### Deploy to Mastra Cloud

1. **Login to Mastra**
```bash
mastra auth login
```

2. **Deploy**
```bash
mastra deploy
```

3. **Get Your A2A Endpoint**

After deployment, you'll receive a URL like:
```
https://your-project.mastra.cloud/a2a/agent/codeMentor
```

Save this URL - you'll need it for Telex integration!

## 🔗 Telex Integration

### Step 1: Create Workflow JSON

Create a `telex-workflow.json` file:

```json
{
  "active": true,
  "category": "education",
  "description": "An AI agent that provides learning roadmaps and project ideas for programming languages",
  "name": "Code Mentor",
  "nodes": [
    {
      "id": "code_mentor_agent",
      "name": "Code Mentor Agent",
      "type": "a2a/mastra-a2a-node",
      "url": "YOUR_MASTRA_CLOUD_URL/a2a/agent/codeMentor"
    }
  ]
}
```

Replace `YOUR_MASTRA_CLOUD_URL` with your actual deployment URL.

### Step 2: Import to Telex

1. Go to your Telex workspace
2. Navigate to **AI Co-Workers** 
3. Click **Add New**
4. Upload your `telex-workflow.json` file
5. Save and activate!

### Step 3: Start Using

In any Telex channel:
```
@Code Mentor I want to learn Python

Hey Code Mentor, what projects should I build as a JavaScript beginner?
```

## 📖 Example Interactions

### Learning a New Language
```
User: I want to learn Python as a beginner

Code Mentor: Great choice! Python is perfect for beginners. Here's your personalized learning path:

🗺️ Your Python Learning Roadmap (Beginner)

Phase 1: Foundations (Weeks 1-2)
- Variables, data types, and basic operators
- String manipulation and user input
...

🛠️ Projects to Build

1. Calculator App
   Build a command-line calculator...
...
```

### Getting Project Ideas
```
User: What projects should I build to learn JavaScript?

Code Mentor: Here are some great JavaScript projects for you:

🛠️ Beginner Projects
1. Interactive Quiz App
2. Digital Clock
3. To-Do List
...
```

## 🎯 What Code Mentor Does NOT Do

To keep the agent focused and simple:

- ❌ Debug code or fix errors
- ❌ Review full programs  
- ❌ Write code for you
- ❌ Answer unrelated questions

For debugging help, the agent will politely redirect you to Stack Overflow or coding forums.
