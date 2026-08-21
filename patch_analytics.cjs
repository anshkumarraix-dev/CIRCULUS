const fs = require('fs');
let code = fs.readFileSync('src/components/analytics/ImpactAnalyticsDashboard.tsx', 'utf8');

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
  
  // Apply staggered reveal to the KPI grid
  code = code.replace(
    /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">/,
    '<motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">'
  );
  // Close motion.div for grid
  // We can just find the closing div of this grid. The grid has 4 items. Let's assume it closes before the next big section.
}

fs.writeFileSync('src/components/analytics/ImpactAnalyticsDashboard.tsx', code);
