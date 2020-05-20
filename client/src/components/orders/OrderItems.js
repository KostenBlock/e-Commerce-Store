import React, {Fragment, useContext, useEffect} from "react";
import Order from "./Order";
import Loader from "../layouts/Loader";
import OrdersContext from "../../context/orders/ordersContext";
import Alerts from "../layouts/Alerts";

const OrderItems = () => {
    const ordersContext = useContext(OrdersContext);

    const { loading, orders, getOrders } = ordersContext;

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, []);

    if (orders !== null && orders.length === 0 && !loading) {
        return <h4 className="text-center">Пока что вы ничего не купили...</h4>
    }

    return (
        <Fragment>
            <Alerts/>
            {orders !== null && !loading
                ? (<div>
                    <h3 className="text-center">История ваших покупок:</h3>
                    <div className="container">
                        {orders.map(order => (<Order key={order._id} order={order}/>))}
                    </div>
                </div>)
                : <Loader/>}
        </Fragment>
    )
};

export default OrderItems;