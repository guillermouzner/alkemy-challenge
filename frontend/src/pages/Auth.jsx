import styles from "../styles/authComponents/Auth.module.scss";

import { useState } from "react";
import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";

const Auth = () => {
    //LOGIN
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    //REGISTER
    const [regEmail, setRegEmail] = useState("");
    const [regPw, setRegPw] = useState("");
    return (
        <MainContainer>
            {/* LOGIN */}
            <form action="submit" onSubmit={(e) => e.preventDefault()}>
                <div className={styles.container}>
                    <Title>Login</Title>
                    <span>Email:</span>
                    <input
                        type="email"
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <span>Password:</span>
                    <input
                        type="password"
                        onChange={(e) => setPw(e.target.value)}
                        value={pw}
                        autoComplete="password"
                    />

                    {/* LOGIN BTN */}
                    <button>Login Now</button>
                </div>
            </form>
            {/* REGISTER NOW */}
            <form
                action="submit"
                onSubmit={(e) => e.preventDefault()}
                className={styles.registerForm}
            >
                <div className={styles.container}>
                    <Title>Register</Title>
                    <span>Email:</span>
                    <input
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setRegEmail(e.target.value)}
                        value={regEmail}
                    />
                    <span>Password:</span>
                    <input
                        type="password"
                        onChange={(e) => setRegPw(e.target.value)}
                        value={regPw}
                        autoComplete="new-password"
                    />

                    {/* REGISTER BTN */}
                    <button>Register Now</button>
                </div>
            </form>
        </MainContainer>
    );
};

export default Auth;
