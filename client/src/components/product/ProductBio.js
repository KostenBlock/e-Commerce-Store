import React, {Fragment, useContext, useEffect} from "react";
import ItemsContext from "../../context/items/itemsContext";
import CartContext from "../../context/cart/cartContext";
import Loader from "../layouts/Loader";

const ProductBio = () => {
    const itemsContext = useContext(ItemsContext);
    const cartContext = useContext(CartContext);

    const { product, loading } = itemsContext;

    const { addToCart} = cartContext;

    const addItemToCart = () => {
        addToCart(product);
    };

    useEffect(() => {
    }, []);

    if (product !== null && product.length === 0 && !loading) {
        return <div>Nothing...</div>
    }

    return (
        <Fragment>
            {product !== null && !loading
                ? (<div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-7">
                            <h3>{product.name}</h3>
                            <img className="img-fluid" src={product.urlImg} alt={product.name} style={{border:"1px solid grey", borderRadius:"5px"}}/>
                        </div>
                        <div className="col-md-5">
                            <h3 className="my-auto">Описание товара</h3>
                            {product.description}
                            <div className="mt-3">
                                <div>
                                    <h5><strong>Цена товара:</strong> {product.price} Руб.
                                        <button className="btn btn-success float-right" onClick={addItemToCart} >В корзину</button>
                                    </h5>
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