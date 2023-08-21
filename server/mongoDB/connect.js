import mongoose from "mongoose";
const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("DB conected succesfully"))
    .catch((err) => alert(err));
};
export default connectDB;
