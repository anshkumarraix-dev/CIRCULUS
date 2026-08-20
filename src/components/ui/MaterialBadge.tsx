import React from 'react';

export type MaterialCategory = 'Copper' | 'Aluminium' | 'Steel' | 'Plastic' | 'Fly Ash' | 'copper' | 'aluminium' | 'steel' | 'plastic' | 'fly_ash';

const materialStyles = {
  Copper: "bg-[#A85D33]/15 text-[#A85D33] border-[#A85D33]/30",
  Aluminium: "bg-[#B8B2A6]/15 text-[#B8B2A6] border-[#B8B2A6]/30",
  Steel: "bg-[#5C6B73]/15 text-[#8BA1AD] border-[#5C6B73]/30",
  Plastic: "bg-[#4A7285]/15 text-[#80B6D1] border-[#4A7285]/30",
  "Fly Ash": "bg-[#8C857B]/15 text-[#C4BCB1] border-[#8C857B]/30",
  // fallback for lowercase internal ids
  copper: "bg-[#A85D33]/15 text-[#A85D33] border-[#A85D33]/30",
  aluminium: "bg-[#B8B2A6]/15 text-[#B8B2A6] border-[#B8B2A6]/30",
  steel: "bg-[#5C6B73]/15 text-[#8BA1AD] border-[#5C6B73]/30",
  plastic: "bg-[#4A7285]/15 text-[#80B6D1] border-[#4A7285]/30",
  fly_ash: "bg-[#8C857B]/15 text-[#C4BCB1] border-[#8C857B]/30",
};

const formatLabel = (cat: string) => {
  if (cat === 'fly_ash') return 'Fly Ash';
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};

export const MaterialBadge: React.FC<{ category: MaterialCategory | string, className?: string }> = ({ category, className = "" }) => {
  const style = materialStyles[category as keyof typeof materialStyles] || "bg-gray-500/15 text-gray-400 border-gray-500/30";
  const label = materialStyles[category as keyof typeof materialStyles] ? formatLabel(category) : category;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${style} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      <span className="text-[10px] font-bold tracking-widest uppercase">{label}</span>
    </div>
  );
};
