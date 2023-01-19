const mongoose = require("mongoose");
const MSchema = mongoose.Schema;

const postSchema = new MSchema({
    comments : String,
    userId: String
});
module.exports = mongoose.model("Post", postSchema);