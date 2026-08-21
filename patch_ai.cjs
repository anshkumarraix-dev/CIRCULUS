const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// 1. realtime-detect
const realtimeDetectPromptRegex = /CRITICAL INSTRUCTIONS:\n(.*?)(?=Return strictly JSON matching this schema:)/s;
const newRealtimeDetectInstructions = `CRITICAL INSTRUCTIONS:
1. NEVER default or assume metal scrap unless metallic visual features are clearly visible.
2. If you see a plastic bottle or bag, classify as "plastic".
3. If you see a cardboard box or paper, classify as "paper_cardboard".
4. If you see an electronic circuit board or wire cable, classify as "ewaste".
5. If you see a glass bottle or glassware, classify as "glass".
6. If you see a wooden object or pallet, classify as "wood".
7. If you see clothing or fabric, classify as "textile".
8. If the image is blurry, blank, dark, or shows a person/face/wall, set confidence < 40 and isRecognized to false.
9. Provide honest confidence score (0-100). If confidence < 45, isRecognized MUST be false and detectedObject should be "Unable to confidently identify material".
10. DO NOT GUESS OR HALLUCINATE. Do not make up non-real answers. If you cannot clearly identify the material, you must set isRecognized to false.
`;
code = code.replace(realtimeDetectPromptRegex, newRealtimeDetectInstructions);

const realtimeDetectModelsRegex = /const modelsToTry = \["gemini-3\.1-flash-lite", "gemini-flash-latest"\];/;
code = code.replace(realtimeDetectModelsRegex, 'const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];');

// 2. analyze
const analyzePromptRegex = /Do NOT default to metal scrap if the image contains other materials(.*?)(?=Context hints:)/s;
const newAnalyzePromptInstructions = `Do NOT default to metal scrap if the image contains other materials like plastic, cardboard, paper, electronics/e-waste, glass, wood, rubber, textiles, or organic matter.
If the image shows a non-industrial object (e.g. human face/hand, room background, animal), return low confidence (<40) and state "Unable to confidently verify industrial material" in warnings.
ABSOLUTELY NO GUESSING OR HALLUCINATING. Base your analysis purely on the real visual evidence in the image. Do not invent non-real prices or carbon impacts. If you are uncertain about a value, output a realistic range and note it as an estimate.
`;
code = code.replace(analyzePromptRegex, newAnalyzePromptInstructions);

const analyzeModelsRegex = /const modelsToTry = \["gemini-3\.1-flash-lite", "gemini-3\.1-pro-preview"\];/;
code = code.replace(analyzeModelsRegex, 'const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-pro-preview"];');

// 3. search-grounding
const searchPromptRegex = /Summarize the findings into clear, structured facts for an industrial recycler or procurement manager\./;
const newSearchPrompt = `Summarize the findings into clear, structured facts for an industrial recycler or procurement manager.
NEVER GUESS. NEVER INVENT OR HALLUCINATE PRICES OR DATA. Use the Google Search tool to find REAL, current data. If real data cannot be found, state "Real data unavailable" or default to 0 for numerical fields.`;
code = code.replace(searchPromptRegex, newSearchPrompt);

const searchModelsRegex = /const searchModels = \["gemini-3\.1-flash-lite", "gemini-flash-latest"\];/;
code = code.replace(searchModelsRegex, 'const searchModels = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];');

// 4. copilot
const copilotPromptRegex = /Guidelines:\n(.*?)(?=5\. At the very end of your response, on a new line, suggest 2 or 3 short follow-up questions formatted as:)/s;
const newCopilotPrompt = `Guidelines:
1. Explain recycling concepts clearly using simple, professional words that even a 10th-grade student or busy factory supervisor can understand easily.
2. Answer queries related to the real-time location or distance between the buyer and supplier using Google Maps grounding.
3. NEVER GUESS OR HALLUCINATE. For factual questions, you MUST use the Google Search and Google Maps tools to find real, factual answers. If the information is not real or cannot be found, state "I do not have real data for this."
4. Structure your response with clean bullet points and bold highlights.
5. Keep the answer concise.
`;
code = code.replace(copilotPromptRegex, newCopilotPrompt);

const copilotToolsRegex = /tools: \[\{ googleMaps: \{\} \}\]/;
code = code.replace(copilotToolsRegex, 'tools: [{ googleMaps: {} }, { googleSearch: {} }]');

fs.writeFileSync('server.ts', code);
