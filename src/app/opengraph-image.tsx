import { ImageResponse } from "next/og";

export const alt = "Meet Tala — Applied AI and Data Science Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1420",
          color: "#f3efe6",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span style={{ color: "#f2a93b", letterSpacing: 4 }}>MEET TALA</span>
          <span style={{ color: "#8fae6b" }}>5 REPOSITORIES READY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ maxWidth: 980, fontSize: 70, fontWeight: 700, lineHeight: 1.05 }}>
            Applied AI systems built around evidence, safety and honest limitations.
          </div>
          <div style={{ color: "#b9c0cf", fontSize: 28 }}>
            Machine learning · RAG · job intelligence · validated business analysis
          </div>
        </div>
        <div style={{ color: "#b9c0cf", fontSize: 22 }}>
          Code · tests · CI · security boundaries · recruiter-ready case studies
        </div>
      </div>
    ),
    size,
  );
}
