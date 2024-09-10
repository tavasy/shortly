import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);
export default Url;
