import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "resume-jasper-kense.pdf");

  try {
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="jasper-kense-resume.pdf"',
      },
    });
  } catch {
    return new NextResponse("Resume PDF not found. Please generate the PDF first.", {
      status: 404,
    });
  }
}
