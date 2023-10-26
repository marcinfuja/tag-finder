const OPENAI_KEY = (process.env.NEXT_PUBLIC_OPENAI_KEY =
  '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');

const { Configuration, OpenAIApi } = require('openai');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); // parse JSON requests
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const body = req.body.json();
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify(data),
  });
  res.json(await response.json());
});

app.post('/api/general', async (req, res) => {
  const body = req.body;

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: body.prompt }],
  });
  res.json(completion.data.choices[0].message.content);
});

app.post('/api/recipe', async (req, res) => {
  const body = req.body;
  const ingredients = body.ingredients;

  const prompt = `
    Create a recipe with a list of ingredients defined in the markup.
    <ingredients>
      ${JSON.stringify(ingredients)}
    </ingredients>
    You can include typical ingredients found in the kitchen, such as salt, pepper, condiments.

    If the list of ingredients is empty or you can't find ingredients inside, just answer with "false" without any other character.
  
    If you have found a recipe, send the output in JSON format as the following sample in ***

    ***
    ${JSON.stringify(recipeSample)}
    ***
    `;

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: 'You are a cooking expert that creates recipes.',
      },
      { role: 'user', content: prompt },
    ],
  });
  res.json(completion.data.choices[0].message.content);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
