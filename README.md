# cmd-gpt

cmd-gpt is a command-line tool that leverages OpenAI's GPT-3.5-turbo model to generate and explain bash commands for macOS.

## Features

- Generate bash commands based on freeform text input
- Explain given bash commands in simple terms

## Installation

1. Install Node.js and npm (https://nodejs.org/)
2. Install the cmd-gpt package globally:

```bash
npm install -g cmd-gpt
```

## Usage

There are two primary actions: generate and explain.

### Generate

To generate a bash command based on freeform text input:

```
cmd-gpt generate
```

Follow the prompts and enter your freeform text. The generated command will be displayed and automatically copied to your clipboard.

### Explain

To explain a given bash command:


```
cmd-gpt explain
```

Follow the prompts and enter the bash command you want explained. The explanation will be displayed in the console.

## License

This project is licensed under the MIT License. See the (LICENSE)[] file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests to improve the project.

1. Fork the project
2. Create your feature branch (git checkout -b feature/MyNewFeature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature/MyNewFeature)
5. Create a new Pull Request


## Acknowledgements

OpenAI for providing the GPT-3.5-turbo API



After writing the README, create a `LICENSE` file in your project directory and add the MIT License text:

```plaintext
MIT License

Copyright (c) 2023 Oguzhan Cakmak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```














