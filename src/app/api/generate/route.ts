import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { idea } = await req.json();

  const prompt = `
    Generate a software project scope document for this idea: ${idea}
    
    Include:
    - Project Overview
    - Key Features (list 5-8 features)
    - Recommended Tech Stack
    - Database Design
    - API Requirements
    - Development Timeline
    - Development Phases
    
    Format the response clearly with headers.
  `;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();
  const result = data.choices[0].message.content;

  return NextResponse.json({ result });
}