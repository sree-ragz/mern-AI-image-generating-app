import mongoose from "mongoose";
const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/aiDB")
    .then(() => console.log("DB conected succesfully"))
    .catch((err) => console.log(err));
};
export default connectDB;
