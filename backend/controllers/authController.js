import prisma from "../constats/config.js";
import bcrypt from "bcrypt";

export const authLogin = async (req, res) => {
    if (req.session.userId) {
        res.status(500).send("You are logged in");
        return;
    }
    let user;
    const { email, password } = req.body;
    try {
        user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        //Check Pw
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            req.session.userId = user.id;
            res.status(200).send("Authed");
        } else {
            res.status(401).send("Wrong Creds");
        }
    } catch {
        if (!user) {
            res.status(401).send("Wrong Creds");
            return;
        }
    }
};

export const authRegister = async (req, res) => {
    const { email, password } = req.body;

    let emailCheck;
    try {
        emailCheck = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch {
        res.status(400).send([
            { instancePath: "Email Availability", message: "Error" },
        ]);
    }

    if (emailCheck)
        res.status(500).send([
            { instancePath: "Email", message: "Email Is Already Taken" },
        ]);
    else {
        const saltRounds = 10;
        let saltedPassword = await bcrypt.hash(password, saltRounds);
        let newUser;
    }

    try {
        newUser = await prisma.user.create({
            email: email,
            password: saltedPassword,
            firstName: "",
            lastName: "",
        });
    } catch {
        res.status(500).send([{ instancePath: "Err", message: "Err" }]);
        return;
    }

    try {
        await prisma.wallet.create({
            data: {
                userId: newUser?.id,
            },
        });
        res.status(200).send("ok");
    } catch {
        res.status(400).send("err");
        return;
    }
};

export const authLogout = async (req, res) => {
    if (req.session.userId) {
        req.session.destroy();
        res.clearCookie("sess").status(200).send("cleared cookie");
    } else {
        res.status(401).send("You are not logged in");
    }
};

export const authUser = async (req, res) => {
    if (req.session.userId) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.session.userId,
                },
            });
            if (!user) res.status(401).json("User Not Found");
            const data = {
                email: user.email,
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            res.status(200).json(data);
        } catch {
            res.status(500).json("Something went wrong {auth}");
        }
    } else {
        res.status(401).send("please login");
    }
};
