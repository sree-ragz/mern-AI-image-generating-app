import mongoose from "mongoose";
const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(
      "mongodb+srv://sreerag:sreemongo@cluster0.yy9tlkc.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB conected succesfully"))
    .catch((err) => console.log(err));
};
export default connectDB;
