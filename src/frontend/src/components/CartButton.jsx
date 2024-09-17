import { useContext } from "react";

function CartButton() {
    const { login } = useContext(AuthContext);

    return (
        <button onClick={login}></button>
    )
}
export default CartButton;