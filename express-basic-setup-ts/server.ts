import express, { type Request, type Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express 🚀");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
