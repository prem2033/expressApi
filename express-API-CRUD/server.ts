import express from "express";
import dotenv from "dotenv";
import { apiRateLimit } from "./middleware/rateLimiter";
import { authenticateToken } from "./middleware/auth";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { connectDB } from "./mongo";
// import { apiRateLimit } from "./middleware/rateLimiter";
// import { errorHandler, notFound } from "./middleware/errorHandler";
// import { authenticateToken } from "./middleware/auth";

const app = express(); // create exprss server

dotenv.config(); // Load env variables

app.use(apiRateLimit); // to lmit number of request
// app.use(authenticateToken); // Aunthicate user

app.get("/", (req, res) => {
  res.json({ status: "ping successfull" });
  // res.send('ping success');
});

app.use(notFound); // to sue not found
app.use(errorHandler); // to handle any error
app.listen(process.env.PORT || 4000, () => {
  (async () => {
    await connectDB();
  })();
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
