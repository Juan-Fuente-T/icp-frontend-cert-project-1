import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function LoginButton() {
    const { login } = useContext(AuthContext);

    return (
        <button className="p-1 mr-4 bg-stone-300 text-stone-800 rounded-md hover:scale-105" onClick={login}>Log in</button>
    )
}
export default LoginButton;