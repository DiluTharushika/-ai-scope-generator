import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea = body.idea;

    if (!idea) {
      return NextResponse.json(
        { error: "No idea provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not found in environment variables" },
        { status: 500 }
      );
    }

    // ✅ NEW PROFESSIONAL STRUCTURED PROMPT
    const prompt = `
You are a senior software architect.

Generate a professional, easy-to-read project scope document.

IMPORTANT FORMATTING RULES:
- Use emojis exactly as shown below.
- Use short paragraphs (2-3 lines max).
- Use bullet points.
- Do NOT use markdown symbols like ### or **.
- Keep it clean and visually structured.

Use this EXACT structure:

🚀 Project Title
(Name of the project)

📌 Project Overview
(Short clear paragraph explaining the goal)

✨ Key Features
- 🔹 Feature Name: Short explanation
- 🔹 Feature Name: Short explanation
- 🔹 Feature Name: Short explanation
(5–8 total features)

🛠 Recommended Tech Stack
- Frontend: 
- Backend: 
- Database: 
- Hosting: 

🗄 Database Design
- Table: Users
  - Fields: id, email, password, createdAt
- Table: (Other relevant tables)

🔌 APIs & Integrations
- API Name: Purpose
- API Name: Purpose

📅 Development Timeline
- Phase 1: Description
- Phase 2: Description
- Phase 3: Description

📈 Future Enhancements
- Enhancement 1
- Enhancement 2

Project Idea:
"${idea}"
`;

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
          max_tokens: 2000,
          temperature: 0.6,
        }),
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from Groq:", text);
      return NextResponse.json(
        { error: "Invalid response from AI service" },
        { status: 500 }
      );
    }

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      );
    }

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json(
        { error: "No response from AI" },
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