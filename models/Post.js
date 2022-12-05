import mongoose from "mongoose";


const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        text: {
            type: String,
        },
        tags: {
            type: Array,
            default: []
        },
        viewsCount: {
            type: Array,
            default: []
        },
        commentsCount: {
            type: Number,
            default: 0,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        imageUrl: String,
        changedAt: Date,
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Post', PostSchema)