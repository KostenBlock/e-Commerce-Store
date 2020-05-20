import React, {Fragment} from "react";
import CartItems from "../components/cart/CartItems";

const Cart = props => {
    return (
        <Fragment>
            <CartItems history={props.history}/>
        </Fragment>
    )
};

export default Cart;