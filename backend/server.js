import express from "express";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//Routes
import authRouter from "./routes/authRoutes.js";

//Prisma Client
import prisma from "./constats/config.js";

const app = express();
const port = process.env.SERVER_PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//SERVER CLIENT FOLDER IE REACT BUILD
app.use(express.static(path.join(__dirname, "clientBuild")));

//CORS
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5000"],
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
        credentials: true,
    })
);

//SESSIONS
app.use(
    expressSession({
        name: "sess",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false,
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
    console.log(`SERVER STARTED: http://localhost:${port}`);
});
