"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
exports.userRoute = (0, express_1.Router)();
let users = [
    { userId: "prem3p", name: "Prem", email: "prem@example.com" },
    { userId: "prem4p", name: "John Doe", email: "john@example.com" },
];
exports.userRoute.get("/users", (req, res, next) => {
    console.log("Get all users GET:/user/users");
    // res.status(200).json({data : users})
    return res.render("userList", { users });
});
exports.userRoute.get("/newuser", (req, res, next) => {
    console.log("redirctimg to post call from /new => POST:/user");
    return res.render("addUser");
});
exports.userRoute.post("/", (req, res, next) => {
    console.log("Post /user");
    const { userId, name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }
    users.push({ userId, name, email });
    return res.render("userList", { users });
});
exports.userRoute.put("/:id", (req, res, next) => {
    console.log("put /user:id");
    console.log(JSON.stringify(req));
    return res.send("Post call");
});
exports.userRoute.get("/deleteUser", (req, res, next) => {
    console.log("redirctimg to delete call from GET/deleteUser => DELETE:/user");
    return res.render("deleteUser");
});
exports.userRoute.delete("/", (req, res, next) => {
    const { userId } = req.body;
    console.log(`DELETE :/user ${userId}`);
    const index = users.findIndex((user) => user.userId === userId);
    if (index === -1) {
        return res.render("deleteEmpty");
    }
    users = users.filter((user) => user.userId !== userId);
    return res.render("deleteSuccess");
});
//# sourceMappingURL=user.js.map