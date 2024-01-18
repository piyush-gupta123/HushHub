import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
// import cookieParser from "cookie-parser";
import secretRouter from "./routes/secretRoute.js";
mongoose.set("strictQuery", true);


const app = Express();
app.use(cors());
// app.use(async (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://hush-hub.vercel.app");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
dotenv.config();
// app.use(cookieParser())
app.get("/",()=>{
  console.log('server is running');
})
app.use(Express.json());
app.use("/user", userRouter);
app.use("/secret", secretRouter);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => `Server Is running at ${PORT}`)
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong!!";
  return res.status(status).json({
    status: false,
    status,
    message,
  });
});
