const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

// Remove import
code = code.replace(/import \{ DEMO_PRESET_MATERIALS \} from "\.\.\/\.\.\/lib\/demo-data";\n/, "");

// Replace InputMode
code = code.replace(/type InputMode = "presets" \| "camera" \| "upload";/, 'type InputMode = "camera" | "upload";');

// Fix states
code = code.replace(/const \[inputMode, setInputMode\] = useState<InputMode>\("presets"\);/, 'const [inputMode, setInputMode] = useState<InputMode>("upload");');
code = code.replace(/const \[selectedImage, setSelectedImage\] = useState<string \| null>\(DEMO_PRESET_MATERIALS\[0\].image\);/, 'const [selectedImage, setSelectedImage] = useState<string | null>(null);');
code = code.replace(/const \[selectedPresetName, setSelectedPresetName\] = useState<string>\(DEMO_PRESET_MATERIALS\[0\].name\);/, 'const [selectedPresetName, setSelectedPresetName] = useState<string>("");');

// In create passport:
code = code.replace(/imageUrl: selectedImage \|\| DEMO_PRESET_MATERIALS\[0\]\.image,/, 'imageUrl: selectedImage || "",');

// In startAnalysis:
// wait, does startAnalysis use DEMO_PRESET_MATERIALS?
