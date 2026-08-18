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
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-2">
            <Scale className="w-4 h-4 text-blue-600" />
            Indian Environmental Laws Made Simple
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Government Rules & Recycling Laws in India
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Understanding India's environmental regulations doesn't need to be confusing. Here are the 4 main government rules that require factories to recycle scrap cleanly.
          </p>
        </div>
      </div>

      {/* 4 Environmental Law Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceFrameworks.map((fw) => (
          <div
            key={fw.id}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xs hover:border-blue-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-150">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                  {fw.badge}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{fw.authority}</span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mt-3">{fw.title}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{fw.desc}</p>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">What the law says:</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  {fw.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Factory Legal Checklist */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
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
                ? "bg-emerald-50 border-emerald-300 text-slate-900"
                : "bg-slate-50 border-slate-200 text-slate-500"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${checkedItems.gst_rcm ? "text-emerald-600" : "text-slate-400"}`} />
            <div>
              <p className="font-extrabold text-xs text-slate-900">Proper GST Invoice (RCM)</p>
              <p className="text-xs text-slate-600 mt-1">
                GST rules applied properly when buying scrap from local collectors.
              </p>
            </div>
          </button>

          <button
            onClick={() => toggleCheck("spcb_cto")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3 shadow-xs ${
              checkedItems.spcb_cto
                ? "bg-emerald-50 border-emerald-300 text-slate-900"
                : "bg-slate-50 border-slate-200 text-slate-500"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${checkedItems.spcb_cto ? "text-emerald-600" : "text-slate-400"}`} />
            <div>
              <p className="font-extrabold text-xs text-slate-900">Pollution Board License (CTO)</p>
              <p className="text-xs text-slate-600 mt-1">
                Active state government permission to melt and recycle materials safely.
              </p>
            </div>
          </button>

          <button
            onClick={() => toggleCheck("eway_bill")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3 shadow-xs ${
              checkedItems.eway_bill
                ? "bg-emerald-50 border-emerald-300 text-slate-900"
                : "bg-slate-50 border-slate-200 text-slate-500"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${checkedItems.eway_bill ? "text-emerald-600" : "text-slate-400"}`} />
            <div>
              <p className="font-extrabold text-xs text-slate-900">Truck e-Way Bill with QR Tag</p>
              <p className="text-xs text-slate-600 mt-1">
                Digital QR code attached to truck transport paper for police and tax checkpoints.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
