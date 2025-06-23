import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request:NextRequest) {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
        return NextResponse.json({error: "파일이 없습니다."}, {status:400})
    }

    const blob = await put(file.name, file, {
        access:"public"
    })

    return NextResponse.json({url: blob.url})
}