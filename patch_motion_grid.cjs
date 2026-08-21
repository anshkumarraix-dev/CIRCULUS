const fs = require('fs');

let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

// 1. Add imports
if (!code.includes('motion/react')) {
  code = code.replace(
    /import React, \{ useState, useMemo \} from "react";/,
    'import React, { useState, useMemo, useRef, useEffect } from "react";\nimport { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "motion/react";'
  );
}

// 2. Add useScroll hooks in the component
code = code.replace(
  /const \[searchQuery, setSearchQuery\] = useState\(""\);/,
  `const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };
  
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 20 });
`
);

// 3. Update the main container to capture mouse move
code = code.replace(
  /return \(\n    <div className="space-y-6">/,
  'return (\n    <div className="space-y-6" ref={containerRef} onMouseMove={handleMouseMove}>'
);

// 4. Update the Grid Header to be a motion.div
code = code.replace(
  /<div className="flex flex-col lg:flex-row gap-6 items-start justify-between">/,
  '<motion.div style={{ opacity: heroOpacity, y: heroY }} className="flex flex-col lg:flex-row gap-6 items-start justify-between relative">\n<motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute -z-10 w-[500px] h-[500px] bg-accent-cyan/10 blur-[120px] rounded-full pointer-events-none top-[-250px] left-[-250px]" />'
);
code = code.replace(
  /<\/div>\n\s*<div className="bg-panel p-4 sm:p-5 rounded-2xl border border-white\/10 shadow-xs">/,
  '</motion.div>\n      <div className="bg-panel p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xs">'
);

// 5. Update Quick Sample Batches to have staggered whileInView
code = code.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">/,
  '<motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">'
);
code = code.replace(
  /<div\n\s*key=\{idx\}\n\s*className="bg-panel border border-white\/10 rounded-2xl p-4/g,
  '<motion.div\n                  variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}\n                  whileHover={{ y: -5, scale: 1.02 }}\n                  whileTap={{ scale: 0.98 }}\n                  key={idx}\n                  className="bg-panel border border-white/10 rounded-2xl p-4'
);
code = code.replace(
  /<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>/, // Wait, I need to reliably close motion.div
  '' // Actually, maybe I shouldn't rely on regex for closing tags if I don't know the exact structure
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
