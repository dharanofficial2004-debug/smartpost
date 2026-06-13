import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

type Provider = 'openai' | 'gemini';

function getProvider(): Provider {
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.GEMINI_API_KEY) return 'gemini';
  throw new Error(
    'No AI provider configured. Please add OPENAI_API_KEY or GEMINI_API_KEY to your .env.local'
  );
}

/**
 * Send a prompt to the configured AI provider and get a text response.
 * The system prompt instructs the model to return JSON only.
 */
export async function generateJSON(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const provider = getProvider();

  if (provider === 'openai') {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    });
    return response.choices[0]?.message?.content ?? '{}';
  }

  // Gemini fallback
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.4,
    },
  });
  const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
  return result.response.text();
}
