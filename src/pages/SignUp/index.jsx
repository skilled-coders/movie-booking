import { Link } from "react-router-dom";
import "./styles/SignUp.scss";
import Logo from "../../assets/logo.png";
import Eye from "../../assets/eye.svg"
import { useEffect, useState } from "react";

function SignUp() {
    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatching, setIsPasswordMatching] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    // HANDLERS
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsPasswordMatching(e.target.value === confirmPassword);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsPasswordMatching(password === e.target.value);
    }

    const handleCreateAccountSubmit = (e) => {
        e.preventDefault();
        if (!isDisabled) {
            console.log("SUBMIT FORM");
            fetch("http://localhost:3000/users", {
                headers: {
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        } else {
            console.log("INVALID FORM DETAILS")
        }
    }

    // USE EFFECTS
    useEffect(() => {
        if (email && password && confirmPassword && password === confirmPassword) {
            if (password.length >= 8) {
                setIsDisabled(false);
            }
        } else {
            setIsDisabled(true);
        }
    }, [email, password, confirmPassword]);

    return (
        <>
            <div className="signUpContainer">
                <div className="leftSection">
                    <div className="logoWrapper">
                        <img src={Logo} alt="" />
                    </div>
                    <h1>Welcome.<br />
                        Begin your cinematic adventure now with our ticketing platform!</h1>
                </div>
                <div className="rightSection">
                    <div className="formContainer">
                        <h2>Create an account</h2>
                        <div className="formWrapper">
                            <form action="" onSubmit={handleCreateAccountSubmit}>
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
                                            onChange={handlePasswordChange}
                                        />
                                        <div className="eyeWrapper">
                                            <img className="" src={Eye} alt="" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                                        </div>
                                    </div>
                                    <div className="inputWrapper">
                                        <input
                                            name="confirmPassword"
                                            type={isConfirmPasswordVisible ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                        <div className="eyeWrapper">
                                            <img className="" src={Eye} alt="" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} />
                                        </div>
                                    </div>
                                    {confirmPassword && !isPasswordMatching && <span>ERROR: Password does not match</span>}
                                </div>
                                <div className="formElement">
                                    <button
                                        className="createAccountButton"
                                        disabled={isDisabled}
                                    >
                                        <span>Create Account</span>
                                    </button>
                                </div>
                            </form>
                            <div className="noteWrapper">
                                <span>Already have an account ? <Link to="sign-in">Log In</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
