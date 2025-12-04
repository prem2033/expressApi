import express, {
  NextFunction,
  Router,
  type Request,
  type Response,
} from "express";
import { User } from "../types/user";

export const userRoute = Router();

// const app = express();

// View engine setup
// app.set("view engine", "pug");
// app.set("views", "./src/views");

let users: User[] = [
  { userId: "prem3p", name: "Prem", email: "prem@example.com" },
  { userId: "prem4p", name: "John Doe", email: "john@example.com" },
];

userRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
  console.log("Get all users GET:/user/users");
  // res.status(200).json({data : users})
  res.render("userList", { users });
});

// userRoute.get("/:id", (req: Request, res: Response, next: NextFunction) => {
//   console.log("Get /user:id");
//   console.log(JSON.stringify(req));
//   res.send("Get call");
// });


userRoute.get("/newuser", (req: Request, res: Response, next: NextFunction) => {
  console.log("redirctimg to post call from /new => POST:/user")
  res.render("addUser");
});

userRoute.post("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Post /user");
  const { userId, name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }
  users.push({ userId, name, email });
  res.render("userList", { users });
});

userRoute.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  console.log("put /user:id");
  console.log(JSON.stringify(req));
  res.send("Post call");
});

userRoute.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  console.log("Delete /user:id");
  console.log(JSON.stringify(req));
  res.send("Post call");
});
