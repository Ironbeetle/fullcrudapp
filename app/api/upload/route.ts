import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    if(!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
   
    const path = join('/', 'tmp', '/','pics', '/', file.name);
    await writeFile(path, buffer)
    console.log(`open ${path} to view the uploaded file`);

    return NextResponse.json({ success: true }, { status: 200 });
   
}