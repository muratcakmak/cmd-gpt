// Import the necessary libraries
const fs = require('fs');
const prompts = require('prompts');
const clipboard = require("copy-paste");

const { Configuration, OpenAIApi } = require("openai");
const api_key_file_path = './openai_api_key.txt';

const api_key = fs.readFileSync(api_key_file_path, 'utf8').trim();

const configuration = new Configuration({
  apiKey: api_key
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

async function promptApiKey() {
  const input = await prompts({
    type: 'text',
    name: 'api_key',
    message: 'Please enter your OpenAI API key:',
  });

  fs.writeFileSync(api_key_file_path, input.api_key);
  return input.api_key;
}

async function main() {
  const action = process.argv[2];

  if (!fs.existsSync(api_key_file_path)) {
    console.log('It looks like this is your first time running the program. Please enter your OpenAI API key.');
    const api_key = await promptApiKey();
  } else {
    const api_key = fs.readFileSync(api_key_file_path, 'utf8').trim();
  }

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
    console.log('Invalid action. Please use either "generate" or "explain" as a command-line argument.');
    return;
  }
  if (action === 'generate') {
    clipboard.copy(result, () => {
      console.log(`"${result}" was copied to the clipboard.`);
    });
  }
  console.log(result);
}

main();
