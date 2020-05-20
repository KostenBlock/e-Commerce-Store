import React, {Fragment, useContext} from "react";
import ItemsContext from "../../context/items/itemsContext";
import Loader from "../layouts/Loader";
import ItemBC from "./ItemBC";

const ItemsByCategory = () => {
    const itemsContext = useContext(ItemsContext);

    const { itemsByCategory, loading} = itemsContext;

    if (itemsByCategory !== null && itemsByCategory.length === 0 && !loading) {
        return <h4 className="text-center mt-5">Товаров по данной категории нет...</h4>
    }

    return (
        <Fragment>
            <div className="mt-5">
                {itemsByCategory !== null && itemsByCategory.length !== 0 && !loading && <h4 className="text-center"><b>Категория:</b> {itemsByCategory[0].category}</h4>}
                <div className="row">
                    {itemsByCategory !== null && !loading
                        ? itemsByCategory.map(item => (
                            <ItemBC key={item._id} item={item}/>
                        ))
                        : <Loader/>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default ItemsByCategory;