import React, {Fragment, useContext, useEffect} from "react";
import ItemsContext from "../context/items/itemsContext";
import ProductBio from "../components/product/ProductBio";

const Product = props => {
    const itemsContext = useContext(ItemsContext);

    const { getProduct } = itemsContext;

    useEffect(() => {
        getProduct(props.match.params.id);
        // eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <ProductBio id={props.match.params.id}/>
        </Fragment>
    )
};
export default Product;