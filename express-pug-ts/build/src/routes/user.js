"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
exports.userRoute = (0, express_1.Router)();
// const app = express();
// View engine setup
// app.set("view engine", "pug");
// app.set("views", "./src/views");
let users = [
    { userId: "prem3p", name: "Prem", email: "prem@example.com" },
    { userId: "prem4p", name: "John Doe", email: "john@example.com" },
];
exports.userRoute.get("/users", (req, res, next) => {
    console.log("Get all users GET:/user/users");
    // res.status(200).json({data : users})
    res.render("userList", { users });
});
// userRoute.get("/:id", (req: Request, res: Response, next: NextFunction) => {
//   console.log("Get /user:id");
//   console.log(JSON.stringify(req));
//   res.send("Get call");
// });
exports.userRoute.get("/newuser", (req, res, next) => {
    console.log("redirctimg to post call from /new => POST:/user");
    res.render("addUser");
});
exports.userRoute.post("/", (req, res, next) => {
    console.log("Post /user");
    const { userId, name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }
    users.push({ userId, name, email });
    res.render("userList", { users });
});
exports.userRoute.put("/:id", (req, res, next) => {
    console.log("put /user:id");
    console.log(JSON.stringify(req));
    res.send("Post call");
});
exports.userRoute.delete("/:id", (req, res, next) => {
    console.log("Delete /user:id");
    console.log(JSON.stringify(req));
    res.send("Post call");
});
//# sourceMappingURL=user.js.map