import { NextResponse } from "next/server";
import { c0 } from "./c0";
import { c1 } from "./c1";
import { c2 } from "./c2";
import { c3 } from "./c3";
import { c4 } from "./c4";
import { c5 } from "./c5";
import { c6 } from "./c6";

const B64 = c0 + c1 + c2 + c3 + c4 + c5 + c6;

export async function GET() {
  const bin = Buffer.from(B64, "base64");
  return new NextResponse(bin, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60",
    },
  });
}
