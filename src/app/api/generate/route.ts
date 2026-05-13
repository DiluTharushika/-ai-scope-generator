import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea = body.idea;

    if (!idea) {
      return NextResponse.json({ error: "No idea provided" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not found in .env.local" },
        { status: 500 }
      );
    }

    const prompt = `Generate a software project scope document for this idea: "${idea}"
    
Please include:
1. Project Overview
2. Key Features (5-8 features)
3. Recommended Tech Stack
4. Database Design
5. API Requirements
6. Development Timeline
7. Development Phases

Format with clear headings and bullet points.`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2048,
          temperature: 0.7,
        }),
      }
    );

    console.log("Groq Status:", response.status);

    const text = await response.text();
    console.log("Groq Response:", text.substring(0, 200));

    const data = JSON.parse(text);

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json(
        { error: "No response from Groq" },
        { status: 500 }
      );
    }

    const result = data.choices[0].message.content;
    return NextResponse.json({ result });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}