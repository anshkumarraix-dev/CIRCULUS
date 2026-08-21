const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

// Remove import DEMO_PRESET_MATERIALS
code = code.replace(/import \{ DEMO_PRESET_MATERIALS \} from "\.\.\/\.\.\/lib\/demo-data";\n/, "");

// Replace InputMode
code = code.replace(/type InputMode = "presets" \| "camera" \| "upload";/, 'type InputMode = "camera" | "upload";');

// Replace states
code = code.replace(/const \[inputMode, setInputMode\] = useState<InputMode>\("presets"\);/, 'const [inputMode, setInputMode] = useState<InputMode>("upload");');
code = code.replace(/const \[selectedImage, setSelectedImage\] = useState<string \| null>\(DEMO_PRESET_MATERIALS\[0\]\.image\);/, 'const [selectedImage, setSelectedImage] = useState<string | null>(null);');
code = code.replace(/const \[selectedPresetName, setSelectedPresetName\] = useState<string>\(DEMO_PRESET_MATERIALS\[0\]\.name\);/, '');

// Replace `handleSelectPreset`
const handleSelectPresetRegex = /\/\/ Handle sample dataset selection[\s\S]*?const handleSelectPreset.*?\}[\s\S]*?\n  \};/g;
code = code.replace(handleSelectPresetRegex, "");

// Replace create passport imageUrl
code = code.replace(/imageUrl: selectedImage \|\| DEMO_PRESET_MATERIALS\[0\]\.image,/, 'imageUrl: selectedImage || "",');

// Replace `filteredPresets` logic
const filteredPresetsRegex = /\/\/ Filtered preset materials[\s\S]*?const filteredPresets = DEMO_PRESET_MATERIALS[\s\S]*?return true;\n  \}\);/g;
code = code.replace(filteredPresetsRegex, "");

// Remove the `Verified Dataset` button
const verifiedDatasetBtnRegex = /<button[\s\S]*?onClick=\{\(\) => setInputMode\("presets"\)\}[\s\S]*?<\/button>/;
code = code.replace(verifiedDatasetBtnRegex, "");

// Remove the `inputMode === "presets"` rendering block
// It starts with `{inputMode === "presets" && (` and ends with a corresponding `)}`
// Let's use string manipulation to find it
let idxStart = code.indexOf('{inputMode === "presets" && (');
if (idxStart !== -1) {
  let openBraces = 1;
  let i = idxStart + '{inputMode === "presets" && ('.length;
  for (; i < code.length; i++) {
    if (code[i] === '(') openBraces++;
    else if (code[i] === ')') {
      openBraces--;
      if (openBraces === 0) {
        break;
      }
    }
  }
  // Remove the block
  code = code.slice(0, idxStart) + code.slice(i + 1);
}

fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', code);
