# Contributing to Circulus Enterprise

Thank you for your interest in contributing to the **Circulus Secure Enterprise Portal**! We welcome contributions from developers, supply chain experts, and sustainability advocates.

## Development Workflow

1. **Fork & Clone**: Fork the repository and clone it to your local machine.
2. **Install Dependencies**: Run `npm install`.
3. **Environment**: Copy `.env.example` to `.env` and configure your API keys (e.g., `GEMINI_API_KEY`).
4. **Branching**: Create a feature branch (`git checkout -b feature/amazing-feature`).
5. **Commit**: Write clear, descriptive commit messages.
6. **Push & PR**: Push your branch and open a Pull Request against the `main` branch.

## Code Style & Standards
- **TypeScript**: We enforce strict typing. All new features must include appropriate interfaces in `src/types.ts`.
- **UI/UX**: We use Tailwind CSS. Maintain the industrial, high-contrast dark theme (e.g., `#12181F` backgrounds, `copper` accents) or the enterprise light theme as appropriate.
- **AI Integration**: All LLM interactions must flow through the backend (`server.ts`) to ensure API key security and error sanitization. Never expose `GEMINI_API_KEY` to the client.

## Reporting Bugs
Please use the GitHub Issues tab to report bugs. Include your OS, browser, and steps to reproduce.

## License
By contributing, you agree that your contributions will be licensed under the MIT License.
