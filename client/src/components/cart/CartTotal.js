import React from "react";

const CartTotal = ({totalPrice, totalQty}) => {

    return(
        <ul className="list-unstyled mb-4">
            <li className="d-flex justify-content-between py-3 border-bottom"><strong
                className="text-muted">Стоимость заказа</strong><strong>{totalPrice} Руб.</strong></li>
            <li className="d-flex justify-content-between py-3 border-bottom"><strong
                className="text-muted">Доставка</strong><strong>300 Руб.</strong>
            </li>
            <li className="d-flex justify-content-between py-3 border-bottom"><strong
                className="text-muted">Общее количество товаров</strong>
                <h5 className="font-weight-bold">{totalQty} шт.</h5>
            </li>
            <li className="d-flex justify-content-between py-3 border-bottom"><strong
                className="text-muted">Общая стоимость</strong>
                <h5 className="font-weight-bold">{totalPrice + 300} Руб.</h5>
            </li>
        </ul>
    )
};

export default CartTotal;