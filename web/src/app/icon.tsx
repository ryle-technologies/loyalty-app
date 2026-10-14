import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon provisorio: el sello. Se reemplaza cuando exista identidad (OQ-S13). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#3b2a20",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f2cf84" strokeWidth="2.4">
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.3 12.2 2.6 2.6 4.8-5.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
