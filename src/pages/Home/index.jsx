import { useState } from "react";

function Home() {
    const [isLoggedIn,] = useState(localStorage.getItem("token"));
    return (
        <>
            {
                isLoggedIn ? <h1>Welcome</h1> : <h1>Please login</h1>
            }
        </>
    )
};

export default Home;
