import CarDetails from "@/modals/carDetails";
import { connect } from "@/dbConfig/dbConfig";
import Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server"
import multer from "multer";
// database run
connect()


const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.array("file");

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}



export async function POST(req) {

    const files = await req.formData()
    // const a = await runMiddleware(files, res, myUploadMiddleware);
    // const res = await myUploadMiddleware(files)
    // console.log("aaaaaaaaaaa", files.get("file"));
    for (const file of files.get("file")) {

        console.log("file in try is : ", file);
        // const b64 = Buffer.from(file.buffer).toString("base64");
        // let dataURI = "data:" + file.mimetype + ";base64," + b64;
        // const response = await cloudinary.uploader.upload(dataURI, {
        //     folder: "dropzone-images",
        // });
    }


    try {
        const body = await req.json()
        // console.log("hitttttttttttted", body);
        const { carModal, phone, price, city } = body;
        // let _id = new ObjectId('65de7277460ff6bb445cc43f')
        const data = await CarDetails(
            {
                carModal: carModal,
                phone: phone,
                price: price,
                city: city,
            })
        // .save()

        // console.log(data?._id);
        if (data) {
            return NextResponse.json({ success: true, data: data }, { status: 201 })
        }
        return NextResponse.json({ success: false, error: "Car details couldn't save to DB" }, { status: 500 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}