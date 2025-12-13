import express, {
  NextFunction,
  Router,
  type Request,
  type Response,
} from "express";
import { User } from "../types/user";

export const userRoute = Router();

let users: User[] = [
  { userId: "prem3p", name: "Prem", email: "prem@example.com" },
  { userId: "prem4p", name: "John Doe", email: "john@example.com" },
];

userRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
  console.log("Get all users GET:/user/users");
  // res.status(200).json({data : users})
  return res.render("userList", { users });
});

userRoute.get("/newuser", (req: Request, res: Response, next: NextFunction) => {
  console.log("redirctimg to post call from /new => POST:/user");
  return res.render("addUser");
});

userRoute.post("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Post /user");
  const { userId, name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }
  users.push({ userId, name, email });
  return res.status(201).render("userList", { users });
});

userRoute.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  console.log("put /user:id");
  console.log(JSON.stringify(req));
  return res.send("Post call");
});

userRoute.get(
  "/deleteUser",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      "redirctimg to delete call from GET/deleteUser => DELETE:/user"
    );
    return res.render("deleteUser");
  }
);

userRoute.delete("/", (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  console.log(`DELETE :/user ${userId}`);
  const index = users.findIndex((user) => user.userId === userId);
  if (index === -1) {
    return res.render("deleteEmpty");
  }
  users = users.filter((user) => user.userId !== userId);
  return res.render("deleteSuccess");
});
