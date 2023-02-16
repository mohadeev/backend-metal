import mongoose from "mongoose";

const connnection = {};
const conectUrl =
  "mongodb+srv://ivereest-admin:w48HCSC4jaQ7FKxx@cluster0.siybotx.mongodb.net/?retryWrites=true&w=majority";

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
