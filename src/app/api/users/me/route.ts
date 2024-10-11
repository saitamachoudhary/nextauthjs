import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import { getDatafromToken } from "@/helpers/getdatafromToken";


export async function POST(request: NextRequest) {
    try {
        const userID = await getDatafromToken(request);
        const user = await User.findOne({ _id: userID }).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}