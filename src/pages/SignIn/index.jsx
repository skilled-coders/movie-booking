import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/SignIn.scss";
import Eye from "../../assets/eye.svg"

function SignIn() {
    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // HANDLERS
    const handleLoginClick = (e) => {
        e.preventDefault();
        if (!isDisabled) {
            console.log("SUBMIT FORM");
            fetch("http://localhost:3000/users")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    let isLoggedIn = false;
                    for (let i = 0; i < data.length; i++) {
                        const user = data[i];
                        if (user.email === email && user.password === password) {
                            console.log("Login successful");
                            isLoggedIn = true
                            localStorage.setItem("token", "success");
                            break;
                        }
                    }

                    if (!isLoggedIn) {
                        console.log("Invalid credentials");
                        localStorage.setItem("token", "");
                    }
                });
        } else {
            console.log("INVALID FORM DETAILS")
        }
    }

    // USE EFFECTS
    useEffect(() => {
        if (email && password) {
            if (password.length >= 8) {
                setIsDisabled(false);
            }
        } else {
            setIsDisabled(true);
        }
    }, [email, password]);

    return (
        <>
            <div className="singInContainer">
                <div className="formContainer">
                    <h2>Login to your account</h2>
                    <div className="formWrapper">
                        <form action="" onSubmit={handleLoginClick}>
                            <div className="formElement">
                                <label htmlFor="email">Email</label>
                                <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="formElement">
                                <label htmlFor="password">Password</label>
                                <div className="inputWrapper">
                                    <input
                                        name="password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="eyeWrapper">
                                        <img className="" src={Eye} alt="" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                                    </div>
                                </div>
                            </div>
                            <div className="formElement">
                                <button
                                    className="loginButton"
                                    disabled={isDisabled}
                                >
                                    <span>Login Now</span>
                                </button>
                            </div>
                        </form>
                        <div className="noteWrapper">
                            <span>Don’t have an account ? <Link to="sign-in">Register Here</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
