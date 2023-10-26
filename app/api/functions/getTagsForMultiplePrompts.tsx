import { defaultSystemRole } from '@/app/prompts/systemRole';
import systemValidationPrompts from '@/app/prompts/systemValidationPrompts';
import { gptConfiguration } from './utils';

const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY;

export default async function getTagsForMultiplePrompts() {
  const validationPrompts = [...systemValidationPrompts];
  const result = [] as any;

  await Promise.all(
    validationPrompts.map(async (prompt) => {
      const messages = [...defaultSystemRole];
      messages.push({ role: 'user', content: prompt.content });
      const data = {
        ...gptConfiguration,
        messages,
      };

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );

      const json = await response.json();
      const formattedResponse = JSON.parse(json.choices[0].message.content);
      console.log('prompt', prompt);
      result.push({ data: formattedResponse, promptData: prompt.content });
    })
  );
  const newResults = result.map((item: any, i: number) => {
    return {
      key: Math.floor(Math.random() * 1000000),
      data: item.data,
      promptData: item.promptData,
    };
  });

  return newResults;
}
