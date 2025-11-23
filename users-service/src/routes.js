import express from "express";
import { User } from "./models/user.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// POST create user
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET user by id
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// PUT update user
router.put("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// DELETE user
router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
});

export default router;
