import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    const { folderName, pageName } = await req.json();

    if (!folderName || !pageName) {
        return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const prompt = `
You are a technical assistant that generates TipTap-compatible JSON content for a developer knowledge base.

Topic:
- Folder: "${folderName}"
- Page: "${pageName}"

Output:
- A valid TipTap JSON document only (no markdown, no prose outside the JSON)
- Structure:
  • H1: page title
  • Paragraph: short intro
  • H2 sections (2–4): concepts, use cases, best practices, common issues
  • Bullet or ordered lists if helpful
  • Code blocks with syntax-highlighted examples

Notes:
- Use TipTap node types only (e.g., heading, paragraph, bulletList, listItem, codeBlock)
- Include real explanations, not just titles
- Use multiple examples when useful

Respond with only the JSON. Do not wrap in markdown or add comments.
`;

    //console.log("AI generation prompt:", prompt);

    const chat = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // or ' gpt-4o'
        messages: [
            { role: 'system', content: 'Respond with a valid JSON object for TipTap editor.' },
            { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
    });

    console.log("AI generation response:", chat);

    const json = JSON.parse(chat.choices[0].message.content || '{}');

    return NextResponse.json({ content: json });
}