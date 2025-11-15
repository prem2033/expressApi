import bcrypt from "bcrypt";
import express from 'express';
import fs from "fs";

const FILE = "./passwordStore.json";
const router = express.Router();
const saltRounds = 10;

// Helper to read file safely
const readUsers = () => {
  if (!fs.existsSync(FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
};

// Helper to write file
const writeUsers = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

router.get('/encrypt', async (req, res) => {
  const { user, password } = req.header.param;
  const users = readUsers();

  const encrypt = await bcrypt.hash(password, saltRounds);
  users.push({ user, password: encrypt });

  writeUsers(users);
  return res.status(200).json(({ status: 200, data: { user, status: success } }));

});


router.get('/decrypt', async (req, res) => {
  const { user, password } = req.header.param;
  const users = readUsers();
  const foundUser = users.find((u) => u.user === user);

  if (!foundUser) {
    return res.status(404).json({ valid: false, message: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
  if (isPasswordCorrect) return res.status(200).json({ status: 200, status: 'valid', user });

  return res.status(500).json({ status: 'Invalid user' })
});

export default router;