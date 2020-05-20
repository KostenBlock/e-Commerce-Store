import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "../../sass/item.scss"
import CartContext from "../../context/cart/cartContext";

const Item = ({item}) => {

    const { addToCart} = useContext(CartContext);

    const addItemToCart = () => {
        addToCart(item);
    };

    return (
        <div className="col-sm-4 mb-4">
            <div className="card">
                <Link to={"/product/" + item._id} ><img src={item.urlImg} alt={item.name} className="card-img-top p-1"/></Link>
                <div className="card-body">
                    <p><strong>Категория</strong>:<Link to={`/category/${item.category_eng}`}>{item.category}</Link></p>
                    <h5 className="card-title ">{item.name}
                        <p className="float-right">{item.price} Р.</p>
                    </h5>
                    <button onClick={addItemToCart} className="btn btn-success btn-block">В корзину</button>
                </div>
            </div>
        </div>
    )
}

export default Item;