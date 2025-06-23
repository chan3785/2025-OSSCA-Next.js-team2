import { signUpWithEmail } from "@/lib/backend/auth-actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const formData = await request.formData();
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const profileImage = formData.get("profileImage") as string
    
    try {
        signUpWithEmail({email, password, name, profileImage})
        
        return NextResponse.json({success:true, message: "회원가입 성공!"}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({success:false, message: (error as Error).message }, { status: 400 })
    }
}