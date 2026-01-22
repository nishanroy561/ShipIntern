import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemInstruction = `
      You are an AI assistant for a job search engine.
      Convert the user's natural language query into a JSON object with these fields:
      - query: The main job role or keyword (e.g., "Software Engineer Intern").
      - location: The location if specified (default to "India").
      - datePosted: One of "all", "today", "3days", "week", "month".
      
      Examples:
      Input: "I want a react internship in bangalore posted this week"
      Output: { "query": "React Intern", "location": "Bangalore", "datePosted": "week" }

      Input: "High paying remote design jobs"
      Output: { "query": "Product Design Intern", "location": "Remote", "datePosted": "month" }
      
      Return ONLY valid JSON. Do not include markdown formatting.
    `;

        const result = await model.generateContent(`${systemInstruction}\nInput: "${prompt}"`);
        const responseText = result.response.text();

        // Clean up markdown if Gemini adds it
        const jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const params = JSON.parse(jsonString);

        return NextResponse.json(params);
    } catch (error) {
        console.error("AI Search Error:", error);
        return NextResponse.json({ error: "Failed to process AI search" }, { status: 500 });
    }
}
