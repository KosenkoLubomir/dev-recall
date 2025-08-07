import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    const { folderName, pageName } = await req.json();

    if (!folderName || !pageName) {
        return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }

    const prompt = `
You are a technical assistant generating TipTap-compatible JSON for a developer knowledge base.

Context:
- Folder name: "${folderName}"
- Page title: "${pageName}"

Instructions:
- Output must be valid TipTap JSON (no Markdown, no prose, no markdown wrapping).
- Begin with: { "type": "doc", "content": [...] }
- Structure the content like an educational article:
  • Heading level 1 (H1) with the page title
  • A short introduction (paragraph)
  • 2–4 sections using heading level 2 (H2), including:
      - Concepts
      - Use Cases
      - Best Practices
      - Common Issues or Pitfalls
  • Each section should have:
      - Clear explanation (paragraph)
      - At least one relevant code example as a TipTap "codeBlock" node
  • Use bullet or ordered lists when listing items

Requirements:
- Include multiple "codeBlock" nodes with real examples for at least 2 sections
- Use TipTap node types only:
  - heading
  - paragraph
  - bulletList / orderedList
  - listItem
  - codeBlock (with valid "language" attribute like "js", "tsx", "bash", etc.)

Output:
- Return only valid TipTap JSON. No markdown, no explanatory text, no formatting wrappers.
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