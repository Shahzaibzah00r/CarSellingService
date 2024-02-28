import CarDetails from "@/modals/carDetails";
import { connect } from "@/dbConfig/dbConfig";
import Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server"
// database run
connect()

// have to compare cokkies token but time 🙄
export async function POST(req, res) {
    try {
        const body = await req.json()
        const { carModal, phone, price, city } = body;
        const data = await CarDetails(
            {
                carModal: carModal,
                phone: phone,
                price: price,
                city: city,
            }).save()

        if (data) {
            return NextResponse.json({ success: true, data: "Successfuly Submitted" }, { status: 201 })
        }
        return NextResponse.json({ success: false, error: "Car details couldn't save to DB" }, { status: 500 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}