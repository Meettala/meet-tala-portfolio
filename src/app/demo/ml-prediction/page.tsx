"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import model from "@/lib/housing-model.json";

const coefs = model.linear_model_raw_coefficients as Record<string, number>;
const intercept = model.linear_model_intercept as number;
const rf = model.models.random_forest as { rmse: number; mae: number; r2: number };
const linear = model.models.linear_baseline as { rmse: number; mae: number; r2: number };
const limitations = model.limitations as string[];

type Sliders = {
  MedInc: number;
  HouseAge: number;
  AveRooms: number;
  AveBedrms: number;
  Population: number;
  AveOccup: number;
  Latitude: number;
  Longitude: number;
};

const DEFAULTS: Sliders = {
  MedInc: 5.0,
  HouseAge: 20,
  AveRooms: 6.0,
  AveBedrms: 1.0,
  Population: 1500,
  AveOccup: 3.0,
  Latitude: 34.0,
  Longitude: -118.0,
};

const FIELDS: { key: keyof Sliders; label: string; min: number; max: number; step: number }[] = [
  { key: "MedInc", label: "Median income (tens of thousands $)", min: 0.5, max: 15, step: 0.1 },
  { key: "HouseAge", label: "Median house age (years)", min: 1, max: 52, step: 1 },
  { key: "AveRooms", label: "Average rooms per household", min: 1, max: 15, step: 0.1 },
  { key: "AveBedrms", label: "Average bedrooms per household", min: 0.5, max: 5, step: 0.1 },
  { key: "Population", label: "Block group population", min: 3, max: 10000, step: 10 },
  { key: "AveOccup", label: "Average household occupancy", min: 0.5, max: 10, step: 0.1 },
  { key: "Latitude", label: "Latitude", min: 32.5, max: 42, step: 0.1 },
  { key: "Longitude", label: "Longitude", min: -124.5, max: -114, step: 0.1 },
];

export default function MlPredictionDemo() {
  const [values, setValues] = useState<Sliders>(DEFAULTS);

  const prediction = useMemo(() => {
    let total = intercept;
    for (const key of Object.keys(coefs)) {
      total += coefs[key] * values[key as keyof Sliders];
    }
    return total;
  }, [values]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects/ml-prediction-app"
        className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber"
      >
        ← Back to case study
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-paper">
        Try the linear model, live
      </h1>
      <p className="mt-3 text-paper-dim leading-relaxed">
        This slider demo runs the interpretable Linear Regression entirely
        in your browser — no server call. The <strong className="text-paper">reported accuracy</strong>{" "}
        below is from the stronger Random Forest model, which lives in the
        Python service in the repo, not in this simplified client-side
        version. Both numbers are shown so nothing here overstates what the
        live demo itself is doing.
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="tag tag-verified mb-2">Random Forest (repo, reported accuracy)</p>
          <dl className="space-y-1 text-sm text-paper-dim">
            <div className="flex justify-between"><dt>R²</dt><dd className="text-paper">{rf.r2}</dd></div>
            <div className="flex justify-between"><dt>RMSE</dt><dd className="text-paper">{rf.rmse}</dd></div>
            <div className="flex justify-between"><dt>MAE</dt><dd className="text-paper">{rf.mae}</dd></div>
          </dl>
        </div>
        <div>
          <p className="tag tag-progress mb-2">Linear model (this live demo)</p>
          <dl className="space-y-1 text-sm text-paper-dim">
            <div className="flex justify-between"><dt>R²</dt><dd className="text-paper">{linear.r2}</dd></div>
            <div className="flex justify-between"><dt>RMSE</dt><dd className="text-paper">{linear.rmse}</dd></div>
            <div className="flex justify-between"><dt>MAE</dt><dd className="text-paper">{linear.mae}</dd></div>
          </dl>
        </div>
      </div>

      <div className="mt-10 rounded-sm border border-ink-line bg-ink-raised p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">
          Predicted median house value
        </p>
        <p className="mt-1 font-display text-4xl font-bold text-signal-amber">
          ${Math.max(0, prediction * 100_000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <div className="flex justify-between text-sm">
              <label className="text-paper-dim">{f.label}</label>
              <span className="font-mono text-xs text-paper">{values[f.key]}</span>
            </div>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[f.key]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [f.key]: parseFloat(e.target.value) }))
              }
              className="mt-1 w-full accent-[#f2a93b]"
            />
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-blocked-rose">
          Limitations
        </h2>
        <ul className="mt-3 space-y-2">
          {limitations.map((note, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-paper-dim">
              <span className="dot mt-2 text-blocked-rose" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
