const fs = require('fs');
let code = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf8');

if (!code.includes('motion/react')) {
  code = code.replace(
    /import React, \{ useState, useEffect \} from "react";/,
    'import React, { useState, useEffect, useRef } from "react";\nimport { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";'
  );
  
  code = code.replace(
    /const \[qrCodeUrl, setQrCodeUrl\] = useState<string>\(""\);/,
    `const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  `
  );
  
  code = code.replace(
    /return \(\n\s*<div className="space-y-6 animate-fadeIn">/,
    'return (\n    <motion.div className="space-y-6 animate-fadeIn" ref={containerRef} onMouseMove={handleMouseMove} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>'
  );
  code = code.replace(
    /<\/div>\n\s*\);/,
    '</motion.div>\n  );'
  );
  
  // Wrap the image aspect-square container
  code = code.replace(
    /<div className="aspect-square w-full rounded-2xl overflow-hidden border border-white\/10 relative bg-panel shadow-xs">/g,
    '<div className="aspect-square w-full rounded-2xl overflow-hidden border border-white/10 relative bg-panel shadow-xs">\n              <motion.div style={{ x: parallaxX, y: parallaxY, scale: 1.05 }} className="w-full h-full">'
  );
  // Wait, if I add opening I need to add closing.
  // We can do it by replacing the img tag inside it.
  code = code.replace(
    /<img\s*src=\{passport\.imageUrl\}\s*alt="Material Batch"\s*className="w-full h-full object-cover"\s*\/>/g,
    '<img src={passport.imageUrl} alt="Material Batch" className="w-full h-full object-cover" />\n              </motion.div>'
  );
}

fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', code);
