import { connectDB } from "@/dbcongig/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail} from "@/helpers/mailer";


connectDB();

export async function POST(request:NextRequest){
    try {
        const reqbody=await request.json();
        //validation code 
        console.log(reqbody);
        const{username,email,password}=reqbody;
        const user=await User.findOne({email});
        if(user){
            return NextResponse.json({error:'user already exists'},{status:200});
        }

       const salt= await bcryptjs.genSalt(10);
       const hashedpassword=await bcryptjs.hash(password,salt);
       
       const newUser=new User({
        username,
        email,
        password:hashedpassword
       })
       
       const savedUser=await newUser.save();

       console.log(savedUser);

       //send email for verification
       await sendEmail({email,emailType:'VERIFY',userID:savedUser._id});

       return NextResponse.json({
        message:'user registered successfully',
        success:true,
        savedUser
       })
       
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}