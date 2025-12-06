import express, { type Request, type Response } from "express";
import { userRoute } from "./routes/user";
import methodOverride from "method-override";
import path from "path";

const app = express();

// View engine setup
app.set("view engine", "pug");
app.set("views", "./src/views");



// Middleware
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());
app.use(methodOverride("_method")); // for PUT/DELETE from forms

app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Hello", message: "Using Pug with TypeScript!" });
});

app.use("/user", userRoute);


app.listen(3000, () => {
  console.log(__dirname)
  console.log("Server running at http://localhost:3000");
});
