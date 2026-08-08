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
          background: "linear-gradient(145deg, #070b12 0%, #0d1522 45%, #111827 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Network grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -40,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: 80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Top badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
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
          <span
            style={{
              color: "#60a5fa",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Intelligent Systems · Production Engineering
          </span>
        </div>

        {/* Main content */}
        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#94a3b8",
              marginBottom: 32,
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            {SITE.title}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Applied AI", "Distributed Systems", "React · FastAPI", "AWS · Kubernetes"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(96,165,250,0.3)",
                  background: "rgba(37,99,235,0.12)",
                  color: "#bfdbfe",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom metrics */}
        <div style={{ display: "flex", gap: 48, position: "relative" }}>
          {[
            { value: "400K+", label: "Records at scale" },
            { value: "50K+", label: "Monthly interactions" },
            { value: "99.99%", label: "Uptime" },
          ].map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#fafafa" }}>{m.value}</span>
              <span style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{m.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", alignSelf: "flex-end", color: "#475569", fontSize: 16 }}>
            rithishmurugan-portfolio.online
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
