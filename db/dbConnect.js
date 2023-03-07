import mongoose from "mongoose";

const connnection = {};
const conectUrl =
  "mongodb+srv://metal-system:YikNZA7htiZcR21C@cluster0.xugooz4.mongodb.net/?retryWrites=true&w=majority";

const dbConnect = async () => {
  console.log("db connetced");
  if (connnection.isConnected) {
    return;
  }
  const db = await mongoose.connect(conectUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  //

  connnection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
