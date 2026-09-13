import React from "react";

export function TradeoffMatrix() {
  const dimensions = [
    {
      dimension: "Primary North Star",
      speedModel: "Average Delivery Time (Mean < 12m)",
      bufferModel: "P95 SLA Adherence Rate (> 96%)",
      note: "Mean hides tail failures; P95 forces optimization of worst-case experiences.",
    },
    {
      dimension: "ETA Consumer Presentation",
      speedModel: "Static point estimate ('11 mins')",
      bufferModel: "Dynamic confidence interval ('16–20 mins')",
      note: "Buffers absorb minor operational friction without breaking the user mental model.",
    },
    {
      dimension: "Dark Store Density (Capex)",
      speedModel: "High (1 store per 1.5km radius)",
      bufferModel: "Moderate (1 store per 2.8km radius)",
      note: "Predictable model allows wider store coverage with lower real estate burn.",
    },
    {
      dimension: "Rider Batching Efficiency",
      speedModel: "Single-drop priority (1.1 orders/trip)",
      bufferModel: "Algorithmic multi-order batching (1.8–2.2 orders/trip)",
      note: "Buffer window enables cluster bundling, lowering per-order delivery cost.",
    },
    {
      dimension: "Rider Safety & Attrition",
      speedModel: "Severe pressure, traffic signal jumping",
      bufferModel: "Controlled pacing, zero speed penalties",
      note: "Decouples delivery guarantees from rider compensation penalization.",
    },
    {
      dimension: "Customer LTV & Repeat Rate",
      /* Dropped the -18% / +23% figures: a queuing model cannot yield a
         retention number, so these had nothing behind them even as estimates. */
      speedModel: "High churn on delayed tail orders",
      bufferModel: "Stronger trust cohort retention",
      note: "Users forgive an 18-minute delivery; they abandon apps that fail 10-minute promises.",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl space-y-6">
      <div className="pb-6 border-b border-white/20">
        <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
          Strategic Evaluation
        </span>
        <h3 className="text-2xl sm:text-4xl font-editorial text-white font-normal mt-1">
          Product & Business Trade-off Matrix
        </h3>
        <p className="text-sm text-white/85 mt-1 max-w-2xl font-sans">
          Comparing the unit economics, operational viability, and customer psychology of
          the Aggressive Speed vs. Predictability Buffer frameworks.
        </p>
        {/* The page header carries this caveat, but a reader landing mid-page
            sees only the table. Figures like "1.1 orders/trip" or "-18%" read
            as Swiggy operational data unless it is said here too. */}
        <p className="text-[11px] font-mono text-white/70 mt-3 max-w-2xl leading-relaxed">
          Every figure in this table is output from a simple model built for this piece. None of
          it is Swiggy operational data, and none of it is a measured result.
        </p>
      </div>

      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-white/20 text-white/80 font-mono uppercase tracking-wider text-[11px]">
              <th className="py-4 pr-4 font-bold">Strategic Dimension</th>
              <th className="py-4 px-4 font-bold text-rose-200">
                Speed-First Model (10–12m)
              </th>
              <th className="py-4 px-4 font-bold text-white">
                Predictability-First Model (16–20m)
              </th>
              <th className="py-4 pl-4 font-bold text-white/80 hidden lg:table-cell">
                Product Rationale
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/15">
            {dimensions.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/10 transition-colors">
                <td className="py-4 pr-4 font-bold text-white font-editorial text-sm">
                  {row.dimension}
                </td>
                <td className="py-4 px-4 text-white/85">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-300 mt-1.5 shrink-0" />
                    <span>{row.speedModel}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                    <span className="font-bold">{row.bufferModel}</span>
                  </div>
                </td>
                <td className="py-4 pl-4 text-white/80 text-xs hidden lg:table-cell leading-relaxed">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
