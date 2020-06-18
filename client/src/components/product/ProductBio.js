import React, { Fragment, useContext } from "react";
import ItemsContext from "../../context/items/itemsContext";
import CartContext from "../../context/cart/cartContext";
import Loader from "../layouts/Loader";
import {capitalize} from "../../utils/someFunctions";

const ProductBio = () => {
    const itemsContext = useContext(ItemsContext);
    const cartContext = useContext(CartContext);

    const { product, loading } = itemsContext;

    const { addToCart} = cartContext;

    const addItemToCart = () => {
        addToCart(product);
    };

    if (product !== null && product.length === 0 && !loading) {
        return <div>Nothing...</div>
    }

    return (
        <Fragment>
            {product !== null && !loading
                ? (<div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-7">
                            <h3>{capitalize(product.name)}</h3>
                            <img className="img-fluid" src={product.img} alt={product.name} style={{border:"1px solid grey", borderRadius:"5px"}}/>
                        </div>
                        <div className="col-md-5">
                            <h3 className="my-auto">Описание товара</h3>
                            {product.description}
                            <div className="mt-3">
                                <div>
                                    <h5>
                                        <strong>
                                            Цена товара:
                                        </strong>
                                        {product.price} Руб.
                                    </h5>
                                    <button className="btn btn-success btn-block float-right" onClick={addItemToCart} >В корзину</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                : <Loader/>
            }
        </Fragment>
    )
};

export default ProductBio;