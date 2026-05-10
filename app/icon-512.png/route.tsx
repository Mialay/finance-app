import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#102033",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#22c55e",
            borderRadius: 102,
            color: "white",
            display: "flex",
            fontSize: 256,
            fontWeight: 800,
            height: 352,
            justifyContent: "center",
            lineHeight: 1,
            width: 352,
          }}
        >
          €
        </div>
      </div>
    ),
    size,
  );
}
