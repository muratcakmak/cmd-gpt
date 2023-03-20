// Import the necessary libraries
const fs = require('fs');
const prompts = require('prompts');
const clipboard = require("copy-paste");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generatorPayload = {
  model: "gpt-3.5-turbo",
  messages:[{"role": "assistant", "content": `I want you to act like a bash command generator for macos. I will provide you freeform text and you will generate bash commands out of it
  * Then output the code in a single code block
  * No other explanations
  * Don't use \`\`\`bash and \`\`\` to wrap the code
  * Only code`}]
};

const explanorPayload = {
  model: "gpt-3.5-turbo",
  messages:[{"role": "assistant", "content": `I want you to explain the given bash command in simple terms.`}]
};

async function generateBashCommand(prompt) {
  try {
    const payload = {
      "role": "user",
      "content": prompt
    }

    generatorPayload.messages.push(payload);

    const completion = await openai.createChatCompletion(generatorPayload);
    const generatedCommand = completion.data.choices[0].message.content;
    return generatedCommand;
  } catch (error) {
    console.error(error);
  }
}

async function explainBashCommand(prompt) {
  try {
    const payload = {
      "role": "user",
      "content": prompt
    }

    explanorPayload.messages.push(payload);

    const completion = await openai.createChatCompletion(explanorPayload);
    const explanation = completion.data.choices[0].message.content;
    return explanation;
  } catch (error) {
    console.error(error);
  }
}

class CustomError extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
  }
}

async function main() {
  try {
    const action = process.argv[2];

    const input = await prompts({
      type: 'text',
      name: 'text',
      message: 'Enter the freeform text or command:\n',
    });

    let result;

    if (action === 'generate') {
      result = await generateBashCommand(input.text);
    } else if (action === 'explain') {
      result = await explainBashCommand(input.text);
    } else {
      throw new CustomError('Invalid action. Please use either "generate" or "explain" as a command-line argument.', 'InvalidActionError');
    }

    if (action === 'generate') {
      clipboard.copy(result, () => {
        console.log(`"${result}" was copied to the clipboard.`);
      });
    }

    console.log(result);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

main();
