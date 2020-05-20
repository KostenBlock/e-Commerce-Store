import React, {useContext} from "react";
import {Link} from "react-router-dom";
import CartContext from "../../context/cart/cartContext";

const CartNavbar = () => {
    const cartContext = useContext(CartContext);

    const { productsInCart, totalQty } = cartContext;

    return(
        <Link className="NoDecor" to="/cart"><h3><i className="fas fa-shopping-cart" />{productsInCart === null ? 0 : (totalQty ? totalQty : 0) } </h3></Link>
    )

};

export default CartNavbar;