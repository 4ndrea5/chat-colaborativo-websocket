import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import passport from "./config/passport.js";

const app = express();

app.use(
  cors({ origin: "http://localhost:5174", credentials: true })
);

app.use(express.json());
app.use(
  session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app;
