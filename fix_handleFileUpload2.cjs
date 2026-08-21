const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

const handleFileUploadCode = `
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setInputMode("upload");
      };
      reader.readAsDataURL(file);
    }
  };
`;

code = code.replace(/  const handleClear = \(\) => \{/, handleFileUploadCode + "\n  const handleClear = () => {");
fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', code);
