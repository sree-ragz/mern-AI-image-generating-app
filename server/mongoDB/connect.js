import mongoose from "mongoose";
const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("DB conected succesfully"))
    .catch((err) => console.log(err));
};
export default connectDB;
