import mongoose from "mongoose";

const detailSchema = mongoose.Schema({
    carModal: {
        type: String,
        required: [true, "Please input the Car details with modal "]
    },
    price: {
        type: Number,
        required: [true, "Please input the Car price "]
    },
    phone: {
        type: Number,
        required: [true, "Please input the Car price "]
    },
    city: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    pictures: [
        {
            url: { type: String },
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
},
    { timestamps: true })

const CarDetails = mongoose.models.cardetails || mongoose.model("cardetails", detailSchema)
export default CarDetails;