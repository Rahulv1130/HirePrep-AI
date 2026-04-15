import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added in Blacklist"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24
    }
});

const blackListTokenModel = mongoose.model("blacklistTokens", blackListTokenSchema);

export default blackListTokenModel;