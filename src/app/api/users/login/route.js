import mongoose from "mongoose";
import Users from "../../../../modals/user";
import Jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
// database run
connect()


export async function POST(req, res) {
    try {
        const body = await req.json()
        const { email, password } = body;

        const data = await Users.findOne({ email: email, password: password })

        console.log(data);
        if (data) {

            // jwt token payload
            const tokenData = {
                _id: data?._id,
                email: data?.email
            }
            const token = await Jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })

            const response = NextResponse.json({ success: true, data: data }, { status: 201 })
            response.cookies.set("token", token, { httpOnly: true })
            return response
        }
        return NextResponse.json({ success: false, error: "Email is not exist in DB" }, { status: 500 })
        // const res = await new Users({ email: email, password: password }).save()

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}