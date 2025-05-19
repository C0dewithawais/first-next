import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", BlogSchema);

export default Blogs;