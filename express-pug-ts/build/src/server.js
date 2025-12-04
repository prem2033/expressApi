"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const method_override_1 = __importDefault(require("method-override"));
const app = (0, express_1.default)();
// View engine setup
app.set("view engine", "pug");
app.set("views", "./src/views");
// Middleware
app.use(express_1.default.urlencoded({ extended: true })); // for form data
app.use(express_1.default.json());
app.use((0, method_override_1.default)("_method")); // for PUT/DELETE from forms
app.get("/", (req, res) => {
    res.render("index", { title: "Hello", message: "Using Pug with TypeScript!" });
});
app.use("/user", user_1.userRoute);
app.listen(3000, () => {
    console.log(__dirname);
    console.log("Server running at http://localhost:3000");
});
//# sourceMappingURL=server.js.map