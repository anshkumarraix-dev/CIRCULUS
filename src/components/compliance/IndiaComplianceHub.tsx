import React, { useState } from "react";
import { 
  FileCheck2, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  Leaf, 
  Truck,
  Building2,
  BookOpen
} from "lucide-react";

export const IndiaComplianceHub: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    gst_rcm: true,
    spcb_cto: true,
    eway_bill: true,
  });

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const complianceFrameworks = [
    {
      id: "epr",
      title: "Plastic Recycling Law (EPR Rules)",
      authority: "Central Pollution Control Board (CPCB)",
      badge: "Plastic Recycling",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
      desc: "Companies that make plastic bottles and packets are legally required to collect and recycle them back into useful goods. Our Digital ID cards prove exact recycling percentages.",
      rules: [
        "Rigid bottles and buckets: Minimum 30% recycled material required by law.",
        "Plastic bags and packets: 100% must be safely collected and recycled.",
        "Anti-Cheat Certificates: Each scrap lot gets a digital serial number.",
      ],
    },
    {
      id: "cd_rules",
      title: "Crushed Concrete & Highway Road Rules",
      authority: "Ministry of Housing & Road Highways",
      badge: "Roads & Concrete",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18625d8?auto=format&fit=crop&w=800&q=80",
      desc: "Highway builders and city contractors must use at least 20% recycled crushed gravel from demolished buildings when building new roads, keeping gravel quarries safe.",
      rules: [
        "Tested safe gravel for highway road beds and non-load walls.",
        "Zero dump fee incentives when factories deliver clean crushed concrete.",
        "Truck GPS records proving material was delivered to highway projects.",
      ],
    },
    {
      id: "fly_ash",
      title: "100% Power Plant Ash Recycling Law",
      authority: "Ministry of Environment, Forest & Climate Change",
      badge: "Power Plant Ash",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
      desc: "Coal power plants in India cannot dump grey ash into ponds or rivers. They must supply it to cement and red-brick factories within a 300 km radius.",
      rules: [
        "Tested high-strength pozzolanic ash for waterproof cement.",
        "Free transport help for red-brick makers within 100 km.",
        "Stops harmful grey ash dust storms near village farming areas.",
      ],
    },
    {
      id: "ccts",
      title: "Indian Green Carbon Credits (CCTS)",
      authority: "Bureau of Energy Efficiency (BEE)",
      badge: "Clean Air Credits",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
      desc: "Indian factories that recycle scrap instead of digging new mines earn certified government green credits that can be sold for extra business income.",
      rules: [
        "Calculates exact coal smoke and furnace oil saved.",
        "Verified against standard government clean energy baselines.",
        "1-click export of green audit reports for factory certificates.",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner with Rich Visual Backdrop */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 border border-slate-700 bg-gradient-to-r from-emerald-900/90 via-teal-900/80 to-slate-900/90 text-white shadow-md">
        <img
          src="https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1600&q=80"
          alt="Clean Energy & Compliance"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-900/200/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            <Scale className="w-4 h-4 text-emerald-400" />
            Indian Environmental Laws Made Simple
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Government Rules & Recycling Laws in India
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            Understanding India's environmental regulations doesn't need to be confusing. Here are the 4 main government rules that require factories to recycle scrap cleanly.
          </p>
        </div>
      </div>

      {/* 4 Environmental Law Cards with Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceFrameworks.map((fw) => (
          <div
            key={fw.id}
            className="bg-[#12181F] rounded-3xl border border-slate-700 overflow-hidden shadow-xs hover:border-emerald-400 hover:shadow-lg transition duration-300 flex flex-col justify-between"
          >
            {/* Card Visual Header */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-800">
              <img
                src={fw.image}
                alt={fw.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3">
                <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-[#12181F]/95 backdrop-blur-md text-emerald-400 border border-slate-700 shadow-sm">
                  {fw.badge}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] text-emerald-300 font-bold">{fw.authority}</p>
                <h3 className="text-base font-extrabold text-white leading-tight">{fw.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{fw.desc}</p>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-extrabold text-white uppercase tracking-wider">What the law says:</p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {fw.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-emerald-900/20/50 p-2.5 rounded-2xl border border-emerald-100 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Factory Legal Checklist */}
      <div className="bg-[#12181F] p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Factory Scrap Safety & Legal Checklist
        </h3>
        <p className="text-xs text-slate-500">
          Click each box to make sure your factory complies with state pollution and tax rules:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => toggleCheck("gst_rcm")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3 shadow-xs ${
              checkedItems.gst_rcm
                ? "bg-emerald-900/20 border-emerald-300 text-white"
                : "bg-slate-800 border-slate-700 text-slate-500"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${checkedItems.gst_rcm ? "text-emerald-600" : "text-slate-400"}`} />
            <div>
              <p className="font-extrabold text-xs text-white">Proper GST Invoice (RCM)</p>
              <p className="text-xs text-slate-400 mt-1">
                GST rules applied properly when buying scrap from local collectors.
              </p>
            </div>
          </button>

          <button
            onClick={() => toggleCheck("spcb_cto")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3 shadow-xs ${
              checkedItems.spcb_cto
                ? "bg-emerald-900/20 border-emerald-300 text-white"
                : "bg-slate-800 border-slate-700 text-slate-500"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${checkedItems.spcb_cto ? "text-emerald-600" : "text-slate-400"}`} />
            <div>
              <p className="font-extrabold text-xs text-white">Pollution Board License (CTO)</p>
              <p className="text-xs text-slate-400 mt-1">
                Active state government permission to melt and recycle materials safely.
              </p>
            </div>
          </button>

          <button
            onClick={() => toggleCheck("eway_bill")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3 shadow-xs ${
              checkedItems.eway_bill
                ? "bg-emerald-900/20 border-emerald-300 text-white"
                : "bg-slate-800 border-slate-700 text-slate-500"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${checkedItems.eway_bill ? "text-emerald-600" : "text-slate-400"}`} />
            <div>
              <p className="font-extrabold text-xs text-white">Truck e-Way Bill with QR Tag</p>
              <p className="text-xs text-slate-400 mt-1">
                Digital QR code attached to truck transport paper for police and tax checkpoints.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
