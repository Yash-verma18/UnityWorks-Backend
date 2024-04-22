import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../config";

dotenv.config();

let mongo_url = config.mongo_url;

const connect = () => {
  try {
    console.log(mongo_url);
    mongoose.connect(mongo_url);

    console.log("Connected to mongodb");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
};

export default {
  connect,
};
