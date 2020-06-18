import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "../../sass/item.scss"
import CartContext from "../../context/cart/cartContext";
import {capitalize, flb} from "../../utils/someFunctions";

const Item = ({item}) => {

    const { addToCart} = useContext(CartContext);

    const addItemToCart = () => {
        addToCart(item);
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <Link to={"/product/" + item._id} ><img src={item.img} alt={item.name} className="card-img-top p-1"/></Link>
                <div className="card-body">
                    <p><strong>Категория</strong>:<Link to={`/category/${item.category_eng}`}> {flb(item.category)}</Link></p>
                    <h5 className="card-title ">{capitalize(item.name)}
                        <p className="float-right">{item.price} Р.</p>
                    </h5>
                    <button onClick={addItemToCart} className="btn btn-success btn-block">В корзину</button>
                </div>
            </div>
        </div>
    )
};

export default Item;