const fs = require('fs');
let code = fs.readFileSync('src/components/impact/ImpactAnalyticsDashboard.tsx', 'utf8');

if (!code.includes('motion/react')) {
  code = code.replace(
    /import React, \{ useState \} from "react";/,
    'import React, { useState, useRef } from "react";\nimport { motion, useScroll, useTransform } from "motion/react";'
  );

  code = code.replace(
    /const \[timeframe, setTimeframe\] = useState<string>\("12M"\);/,
    `const [timeframe, setTimeframe] = useState<string>("12M");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
`
  );

  code = code.replace(
    /return \(\n\s*<div className="space-y-6 animate-fadeIn">/,
    'return (\n    <div className="space-y-6 animate-fadeIn relative overflow-hidden" ref={containerRef}>\n      <motion.div style={{ y: bgY }} className="absolute -z-10 w-[800px] h-[800px] bg-accent-cyan/5 blur-[150px] rounded-full pointer-events-none top-[-200px] right-[-200px]" />'
  );
  
  // Wrap the entire file in standard formatting.
}

fs.writeFileSync('src/components/impact/ImpactAnalyticsDashboard.tsx', code);
