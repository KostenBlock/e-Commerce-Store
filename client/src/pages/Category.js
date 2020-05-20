import React, {Fragment, useContext, useEffect} from "react";
import ItemsContext from "../context/items/itemsContext";
import ItemsByCategory from "../components/itemsByCategory/ItemsByCategory";

const Category = props => {
    const { getItemsByCategory } = useContext(ItemsContext);
    useEffect(() => {
        getItemsByCategory(props.match.params.name);
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <ItemsByCategory/>
        </Fragment>
    )
};

export default Category;