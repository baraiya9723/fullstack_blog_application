const mongoose = require("mongoose");
const dotenv = require("dotenv");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  slug: { type: String, unique: true },
});

blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = `${this.title.toLowerCase().replace(/ /g, "-")}-${this.category
      .toLowerCase()
      .replace(/ /g, "-")}`;
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
