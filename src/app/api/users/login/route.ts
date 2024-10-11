import { connectDB } from "@/dbcongig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email, password } = reqbody;
        console.log(reqbody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 })
        }

        console.log('User exist');

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: 'check your password' }, { status: 400 })
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

      const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!, { expiresIn: '1d' }) ;
      
     const response= NextResponse.json({
        message:"Log in success",
        success:true
       })

       response.cookies.set("token",token,{
        httpOnly:true
       })

       return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 200 })
    }
}