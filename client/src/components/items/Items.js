import React, {Fragment, useContext, useEffect} from "react";
import ItemsContext from "../../context/items/itemsContext";
import Loader from "../layouts/Loader";
import Item from "./Item";

const Items = () => {
    const itemsContext = useContext(ItemsContext);

    const { getItems, items, loading, filtered} = itemsContext;

    useEffect(() =>{
        getItems();
        // eslint-disable-next-line
    }, [])

    if (items !== null && items.length === 0 && !loading) {
        return <h4 className="text-center">Товаров нету...</h4>
    }

    return (
        <Fragment>
            {items !== null && !loading
                ? (filtered !== null
                    ?
                    filtered.length !== 0
                        ?
                        filtered.map(item => (
                            <Item key={item._id} item={item}/>
                        ))
                        : <h1 style={{margin: "auto", display: "block"}}>Совпадений нет...</h1>
                    :
                    items.map(item => (
                        <Item key={item._id} item={item}/>
                    )))
                : <Loader/>
            }
        </Fragment>
    );
};

export default Items;