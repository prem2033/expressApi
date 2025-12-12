import express from "express";
import dotenv from "dotenv";
import { apiRateLimit } from "./middleware/rateLimiter";
import { authenticateToken } from "./middleware/auth";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { connectDB } from "./mongo";
import { userRouter } from "./routes/user";
// import { apiRateLimit } from "./middleware/rateLimiter";
// import { errorHandler, notFound } from "./middleware/errorHandler";
// import { authenticateToken } from "./middleware/auth";

const app = express(); // create exprss server

dotenv.config(); // Load env variables
app.use(express.json());
app.use(apiRateLimit); // to lmit number of request
// app.use(authenticateToken); // Aunthicate user

app.get("/", (req, res) => {
  res.json({ status: "ping successfull" });
  // res.send('ping success');
});

app.use("/user", userRouter);

app.use(notFound); // to sue not found
app.use(errorHandler); // to handle any error
async function startServer() {
  try {
    await connectDB(); // ⬅️ If this fails → server will NOT start

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", (error as Error).message);
    process.exit(1); // Stop application completely
  }
}

startServer();
