import mongoose, { mongo } from "mongoose";
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please input the Email "]
    },
    password: {
        type: String,
        required: [true, "Please input the password "]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const Users = mongoose.models.users || mongoose.model("users", userSchema)
export default Users;