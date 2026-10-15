import mongoose, { Document, Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    accessLevel: {
        type: String,
        enum: ["admin", "readonly"],
        default: "readonly",
    },
}, {
    timestamps: true,
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user-model.js.map