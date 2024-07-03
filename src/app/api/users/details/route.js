import CarDetails from "@/modals/carDetails"; // Adjust the path if necessary
import { connect } from "@/dbConfig/dbConfig";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import fs from 'fs/promises';
import uploader from "@/helpers/uploader";

// Connect to the database
connect();


export async function POST(req) {
    try {
        const formData = await req.formData();
        const carModal = formData.get("carModal");
        const phone = formData.get("phone");
        const price = formData.get("price");
        const city = formData.get("city");

        if (!carModal || !phone || !price || !city)
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 401 });

        const imageUrls = [];
        for (let entry of formData.entries()) {
            if (entry[0].startsWith("file")) {
                const file = entry[1];

                const byteData = await file.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const path = `./src/uploads/${file.name}`;
                await fs.writeFile(path, buffer);
                const uploadResult = await uploader(path) //this will upload images to cloudnary then will send  results
                const secure_url = uploadResult.secure_url;
                if (!secure_url)
                    return NextResponse.json({ msg: "Couldn't upload image to cloud" }, { status: 400 });

                imageUrls.push(secure_url);
                await fs.unlink(path); //to removes store images from local
            }
        }

        const token = req.cookies.get("token").value || ""; // Adjust the token retrieval based on your setup
        if (!token) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
        }
        const carData = new CarDetails({
            carModal: carModal,
            phone: phone,
            price: price,
            city: city,
            pictures: imageUrls.map(url => ({ url })),
        });
        const data = await carData.save();

        if (data) {
            return NextResponse.json({ success: true, data: "Successfully Submitted", data }, { status: 201 });
        } else {
            return NextResponse.json({ success: false, error: "Car details couldn't save to DB" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error saving car details:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
