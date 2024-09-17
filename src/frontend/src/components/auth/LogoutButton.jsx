import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function LogoutButton(){
    const { logout } = useContext(AuthContext);

    return(
        <button onClick={logout}>Log out</button>
    )
}
export default LogoutButton;