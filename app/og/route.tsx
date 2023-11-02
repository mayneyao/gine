import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "My default title";
  const desc =
    searchParams.get("desc")?.slice(0, 100) || "https://gine.me";
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "white",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        ></div>
        <div
          style={{
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "black",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 40,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "black",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {desc}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
