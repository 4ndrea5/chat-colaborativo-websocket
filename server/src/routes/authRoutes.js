import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirige al front incluyendo el id del usuario
    res.redirect(`http://localhost:5174/dashboard`);
  }
);

router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ authenticated: false });
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout(() => res.send("Logged out"));
});

export default router;
