import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function LogoutButton(){
    const { logout } = useContext(AuthContext);

    return(
        <button className="p-1 mr-4 bg-stone-300 text-stone-800 rounded-md hover:scale-105" onClick={logout}>Log out</button>
    )
}
export default LogoutButton;