import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

// Middleware to auto-update likesCount based on the length of the likes array
postSchema.pre('save', function (next) {
    this.likesCount = this.likes.length;
    next();
});

export default mongoose.model("Post", postSchema);
