import multer from "multer";
import { NextResponse } from "next/server";


const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "video/mp4" ||
        file.mimetype === "audio/mpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const imageUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "../../../../../public/uploads/image";
        fs.exists(dir, (exist) => {
            if (!exist) {
                return fs.mkdir(dir, (error) => cb(error, dir));
            }
            return cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        const pre = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, pre + "-" + file.originalname);
    },
});

const fileUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "../../../../../public/uploads/files"
        fs.exists(dir, (exist) => {
            if (!exist) {
                return fs.mkdir(dir, (error) => cb(error, dir));
            }
            return cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        const pre = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, pre + "-" + file.originalname);
    },
});

const uploadImages = multer({ storage: imageUpload, fileFilter });
const uploadFiles = multer({ storage: fileUpload, fileFilter });

export const config = {
    api: {
        bodyParser: false, // Disabling automatic parsing of the request body to allow multer to handle it
    },
};

export default async function POST(req, res) {
    console.log("aaaaaaaaa");
    if (req.method === "DELETE") {
        const filePath = req.query.path; // Assuming the file path is passed as a query parameter

        try {
            fs.unlinkSync(filePath); // Delete the file
            return NextResponse.json({ message: "Error deleting file", error: error.message }, { status: 201 });

        } catch (error) {
            return NextResponse.json({ message: "Error deleting file", error: error.message }, { status: 404 });
        }
    } else if (req.method === "POST") {
        // Handle file upload
        const uploadFilesMiddleware = uploadImages.single("image");

        try {
            uploadFilesMiddleware(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    return NextResponse.json({ message: "Error deleting file", error: "multer error" }, { status: 404 });

                } else if (err) {
                    return NextResponse.json({ message: "Error deleting file", error: err }, { status: 404 });

                } else {
                    const fileInfo = {
                        ...req.file,
                        originalname: req.file.originalname.replace(/\s+/g, "-"),
                        size: req.file.size,
                        path: req.file.path,
                        url: req.file.path.replace("public", ""),
                    };
                    return NextResponse.json({ message: "Error deleting file", data: fileInfo }, { status: 404 });

                }
            });
        } catch (error) {
            return NextResponse.json({ message: "Error deleting file", error: error.message }, { status: 404 });

        }
    } else {
        return NextResponse.json({ message: "Error deleting file", error: error.message }, { status: 404 });

    }
}