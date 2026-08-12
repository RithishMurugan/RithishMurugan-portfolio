import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data/site";

export const runtime = "edge";
export const alt = `${SITE.name} — ${SITE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0a0e14 0%, #0c1017 42%, #161c26 100%)",
          fontFamily: '"Inter Tight", "Inter", ui-sans-serif, system-ui, sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(108,99,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -40,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,99,255,0.24) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#6c63ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            RM
          </div>
        </div>

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#f4f1ea",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#98a1ae",
              marginBottom: 28,
              maxWidth: 820,
              lineHeight: 1.3,
            }}
          >
            {SITE.title}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["Applied AI", "Distributed Systems", "React · FastAPI", "AWS · Kubernetes"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(108,99,255,0.35)",
                  background: "rgba(108,99,255,0.1)",
                  color: "#d9d7ff",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 48, position: "relative" }}>
          {[
            { value: "400K+", label: "Records at scale" },
            { value: "50K+", label: "Monthly interactions" },
            { value: "99.99%", label: "Uptime" },
          ].map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#f4f1ea" }}>{m.value}</span>
              <span style={{ fontSize: 14, color: "#98a1ae", marginTop: 4 }}>{m.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", alignSelf: "flex-end", color: "#98a1ae", fontSize: 16 }}>
            rithishmurugan-portfolio.online
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
