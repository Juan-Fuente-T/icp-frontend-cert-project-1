import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function LoginButton() {
    const { login } = useContext(AuthContext);

    return (
        <button onClick={login}>Log in</button>
    )
}
export default LoginButton;