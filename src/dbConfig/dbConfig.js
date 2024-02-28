import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL)
            .then(res => console.log("Successfully connected..."))
            .catch(err => console.log("Some error in .then catch: ", err?.message))

    } catch (error) {
        console.log("Some error occured: ", error?.message)
    }
} 