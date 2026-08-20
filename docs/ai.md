# AI Integration Architecture

## Overview
CIRCULUS uses Google Gemini AI to bring intelligent material analysis and natural language compliance assistance to the industrial recycling sector.

## Models Used
- **Google Gemini 2.5 Flash / Pro (Multimodal)**: Utilized for high-speed, cost-effective multimodal analysis (image + text) and text generation.

## AI Pipeline Flow
1. **Input Stage:** The user uploads a photo of industrial scrap via the React frontend.
2. **Transmission:** The image is sent to the Node.js/Express backend (`server.ts`) via an API request (`/api/materials/analyze`).
3. **AI Processing:** The server securely attaches the `GEMINI_API_KEY`, wraps the image with domain-specific industrial prompts, and calls the Google GenAI SDK.
4. **Extraction:** Gemini returns a structured JSON payload detailing the material classification, estimated purity, contaminants, and safety instructions.
5. **Output Stage:** The backend sanitizes the response, generates a SHA-256 hash, and passes the validated data back to the client to mint a Material Passport.

## Security & Privacy
All AI operations are restricted to the server environment. The client-side application **never** possesses or transmits the AI API key. Furthermore, the backend employs a sanitization middleware to guarantee that no raw tokens or keys ever leak into server response logs.

## Fallback Mechanisms
In scenarios where the AI endpoint is unreachable (e.g., offline mode or exhausted quota), CIRCULUS gracefully degrades by utilizing local deterministic fallback engines (`src/lib/valuation-engine.ts`, `src/lib/carbon-engine.ts`) to provide estimated assessments based on predefined industrial benchmarks.
