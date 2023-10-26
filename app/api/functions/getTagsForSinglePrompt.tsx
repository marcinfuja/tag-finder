import { defaultSystemRole } from '@/app/prompts/systemRole';
import { gptConfiguration } from './utils';

const OPENAI_KEY = process.env.OPENAI_KEY;
const messages = [...defaultSystemRole];
let message = '';

export default async function getTagsForSinglePrompt(userPrompt: string) {
  const prompt = userPrompt;

  messages.push({ role: 'user', content: prompt });

  const data = {
    ...gptConfiguration,
    messages,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  messages.push(json.choices[0].message);
  message = json.choices[0].message.content;
  let responseTags = JSON.parse(message);

  return responseTags;
}
