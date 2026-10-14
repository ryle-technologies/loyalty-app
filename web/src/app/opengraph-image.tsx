import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { hero, offer } from "@/content/landing";

export const alt = `${site.brand} · ${hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para previsualizaciones (WhatsApp, Instagram, redes). */
export default function OpenGraphImage() {
  const dots = Array.from({ length: 10 });
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
          background: "linear-gradient(135deg, #f8f4ea 0%, #f3e4c3 100%)",
          color: "#2b1f18",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#3b2a20",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f2cf84" strokeWidth="2.4">
              <circle cx="12" cy="12" r="8.5" />
              <path d="m8.3 12.2 2.6 2.6 4.8-5.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "sans-serif" }}>{site.brand}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 78, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
            {hero.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "sans-serif",
              fontSize: 30,
              color: "#4a3a2f",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              {dots.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: i < 7 ? "#3b2a20" : "transparent",
                    border: "2.5px solid #3b2a20",
                  }}
                />
              ))}
            </div>
            <span>{offer.main}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
