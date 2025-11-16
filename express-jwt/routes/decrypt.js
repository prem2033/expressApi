import bcrypt from "bcrypt";
import express from 'express';
import fs from "fs";

//req.params => get URI parameters
//req.query => get URL query parameters
//req.body => get POST body parameters

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

router.get('/encrypt', (req, res) => {
  console.log('/encrypt called');
  const { user, password } = req.query;
  const users = readUsers();

  const encrypt = bcrypt.hash(password, saltRounds);
  users.push({ user, password: encrypt });

  writeUsers(users);
  return res.status(200).json(({ status: 200, data: { user, status: 'success' } }));

});


router.get('/decrypt', (req, res) => {
  console.log('/decrypt called');
  const { user, password } = req.query;
  const users = readUsers();
  const foundUser = users.find((u) => u.user === user);

  if (!foundUser) {
    return res.status(404).json({ valid: false, message: "User not found" });
  }
  const isPasswordCorrect = bcrypt.compare(password, foundUser.password);
  if (isPasswordCorrect) return res.status(200).json({ status: 200, status: 'Valid user', user });

  return res.status(500).json({ status: 'Invalid user' })
});

export default router;