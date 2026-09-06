import Link from "next/link";
import model from "@/lib/housing-model.json";

export const metadata = { title: "ML Prediction App — Current JR05 evidence" };

type Metrics = typeof model;
const metrics = model as Metrics;

export default function MlPredictionDemo() {
  const validation = metrics.validation_metrics;
  const finalTest = metrics.final_test_metrics;
  const split = metrics.split.row_counts;
  const sample = metrics.sample_predictions[0];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects/ml-prediction-app" className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber">
        ← Back to case study
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-paper">Current JR05 evaluation evidence</h1>
      <p className="mt-3 text-paper-dim leading-relaxed">
        This portfolio view presents the source repository&apos;s generated metrics rather than simulating the serving model.
        Candidate selection uses validation RMSE; the final test is untouched until after Random Forest is selected and refit.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-sm border border-ink-line bg-ink-raised p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">Train</p>
          <p className="mt-1 font-display text-3xl font-bold text-paper">{split.train.toLocaleString()}</p>
        </div>
        <div className="rounded-sm border border-ink-line bg-ink-raised p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">Validation</p>
          <p className="mt-1 font-display text-3xl font-bold text-paper">{split.validation.toLocaleString()}</p>
        </div>
        <div className="rounded-sm border border-ink-line bg-ink-raised p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">Final test</p>
          <p className="mt-1 font-display text-3xl font-bold text-paper">{split.test.toLocaleString()}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber">Validation selection</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <MetricCard title="Linear Regression" rmse={validation.linear_baseline.rmse} mae={validation.linear_baseline.mae} r2={validation.linear_baseline.r2} />
          <MetricCard title="Random Forest — selected" rmse={validation.random_forest.rmse} mae={validation.random_forest.mae} r2={validation.random_forest.r2} />
        </div>
      </section>

      <section className="mt-10 rounded-sm border border-verified-sage/40 bg-ink-raised p-6">
        <p className="tag tag-verified mb-3">Untouched final test · Random Forest</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-paper-dim">RMSE</p><p className="font-mono text-paper">{finalTest.rmse}</p></div>
          <div><p className="text-paper-dim">MAE</p><p className="font-mono text-paper">{finalTest.mae}</p></div>
          <div><p className="text-paper-dim">R²</p><p className="font-mono text-paper">{finalTest.r2}</p></div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-paper-dim">
          R² is variance explained on this historical held-out split, not 82.9% prediction accuracy or confidence.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-paper">Example held-out prediction</h2>
        <p className="mt-3 text-sm text-paper-dim">
          Generated source evidence: predicted {sample.predicted_value_100k} vs actual {sample.actual_value_100k} in $100,000 dataset units.
          The target is a 1990 median block-group value, not a current individual-property valuation.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-blocked-rose">Limitations</h2>
        <ul className="mt-3 space-y-2">
          {metrics.limitations.map((note) => (
            <li key={note} className="flex gap-3 text-sm leading-relaxed text-paper-dim">
              <span className="dot mt-2 text-blocked-rose" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function MetricCard({ title, rmse, mae, r2 }: { title: string; rmse: number; mae: number; r2: number }) {
  return (
    <div className="rounded-sm border border-ink-line bg-ink-raised p-5">
      <p className="font-display text-sm font-bold text-paper">{title}</p>
      <dl className="mt-3 space-y-1 text-sm text-paper-dim">
        <div className="flex justify-between"><dt>RMSE</dt><dd className="font-mono text-paper">{rmse}</dd></div>
        <div className="flex justify-between"><dt>MAE</dt><dd className="font-mono text-paper">{mae}</dd></div>
        <div className="flex justify-between"><dt>R²</dt><dd className="font-mono text-paper">{r2}</dd></div>
      </dl>
    </div>
  );
}
