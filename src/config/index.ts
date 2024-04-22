import dotenv from "dotenv";

dotenv.config();

const config: any = {
  local: {
    mongo_url: `mongodb+srv://vermayash1881:${process.env.MONGO_PASSWORD}@cluster0.tx4pmwu.mongodb.net/?retryWrites=true&w=majority`,
    frontend_url: "http://localhost:8080",
  },
};

export default config[process.env.ENV as string];
