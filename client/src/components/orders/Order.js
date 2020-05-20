import React, {Fragment} from "react";

const Order = ({order}) => {
    return (
        <Fragment>
            <div className="card table-responsive mb-5">
                <table className="table table-hover shopping-cart-wrap">
                    <thead>
                        <tr>
                            <th scope="col">Товар</th>
                            <th scope="col" width="200">Количество</th>
                            <th scope="col" width="200">Цена</th>
                        </tr>
                    </thead>
                    {order.cart.productsInCart.map(pic=> (
                    <tbody key={pic._id}>
                        <tr>
                            <td>
                                <figure className="media">
                                    <div className="img-wrap"><img
                                        src={pic.urlImg} alt={pic.name}
                                        className="img-thumbnail img-sm"/></div>
                                    <figcaption className="media-body">
                                        <h6 className="title">{pic.name} </h6>
                                    </figcaption>
                                </figure>
                            </td>
                            <td>
                                {pic.qty}
                            </td>
                            <td>
                                <div className="price-wrap">
                                    <var className="price">{pic.price} Руб.</var>
                                    <small className="text-muted">({pic.price} каждый)</small>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                    <tfoot>
                    <tr>
                        <th scope="col"><b>Общая стоимость заказа:</b> {order.cart.totalPrice} Рублей</th>
                        <th/>
                        <th/>
                    </tr>
                    <tr>
                        <th scope="col"><b>Дата заказа:</b> {order.date}</th>
                        <th/>
                        <th/>
                    </tr>
                        <tr>
                            <th scope="col"><b>Номер заказа:</b> {order._id}</th>
                            <th/>
                            <th/>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </Fragment>
    )
};

export default Order;