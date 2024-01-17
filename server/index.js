import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import secretRouter from "./routes/secretRoute.js";
mongoose.set("strictQuery", true);

const app = Express();
dotenv.config();
app.use(cookieParser())
app.use(cors({
  origin: ["https://deploy-mern-1whq.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true,
}));
// app.use(express.urlencoded({extended:true}))
app.use(Express.json());
app.use("/user", userRouter);
app.use("/secret", secretRouter);
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL)
.then(()=>`Server Is running at ${PORT}`)
.then(()=>app.listen(PORT))
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