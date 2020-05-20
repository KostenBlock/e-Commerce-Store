import React, {Fragment, useContext} from "react";
import CartContext from "../../context/cart/cartContext";
import Prescription from "./Prescription";
import CartTotal from "./CartTotal";
import CartItem from "./CartItem";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layouts/Alerts";
import AuthContext from "../../context/auth/authContext";

const CartItems = ({history}) => {
    const cartContext = useContext(CartContext);
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { productsInCart, totalPrice, totalQty, error, clearCart, clearErrors } = cartContext;
    const { setAlert } = alertContext;
    const { isAuthenticated } = authContext;

    if (error !== null) {
        setAlert(error, "danger");
        clearErrors();
    }

    const goToCheckout = () => {
        if (!isAuthenticated) {
            history.push('/login');
            setAlert("Необходимо авторизоваться перед оплатой", "danger");
            clearErrors();
            return;
        }
        history.push('/checkout');
    };

    return (
        <Fragment>
            {productsInCart !== null && productsInCart.length !== 0
                ? (
                    <Fragment>
                        <div className="pb-5 mt-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 p-1 bg-white rounded shadow-sm mb-5">
                                        <Alerts/>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <Prescription/>
                                                <tbody>
                                                {
                                                    productsInCart.map(item => (<CartItem key={item._id} item={item}/>))
                                                }
                                                </tbody>
                                            </table>
                                            <button onClick={clearCart} className="btn btn-danger btn-block">Очистить корзину</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-auto align-items-center">
                            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Сумма заказа</div>
                            <div className="p-1">
                                <p className="font-italic mb-4">Доставка и дополнительные расходы рассчитываются на основе значения, которые вы ввели.</p>
                                <CartTotal totalPrice={totalPrice} totalQty={totalQty}/>
                                <button onClick={goToCheckout} className="btn btn-dark rounded-pill py-2 btn-block">Перейти к оплате</button>
                            </div>
                        </div>
                    </Fragment>

                )
                : (
                    <div className="container mt-5"><h5 className="text-center">Увы, ваша корзина пуста!</h5></div>
                )
            }
        </Fragment>
    )
};

export default CartItems;