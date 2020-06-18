import React, {Fragment, useContext, useEffect, useState} from "react";
import ItemsContext from "../../context/items/itemsContext";
import Loader from "../layouts/Loader";
import Item from "./Item";
import Pagination from "./Pagination";

const Items = () => {
    const itemsContext = useContext(ItemsContext);

    let { getItems, items, loading } = itemsContext;

    useEffect(() => {
        getItems();
        // eslint-disable-next-line
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    if (items === null) { return <Loader/>}

    if (items.length === 0 && !loading) {
        return <h4 className="text-center">Товаров нету...</h4>
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <div className="row">
            {!loading
                ? (currentItems.map(item => (
                        <Item key={item._id} item={item}/>
                    )))
                : <Loader/>
            }
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={items.length}
                paginate={paginate}
            />
        </Fragment>
    );
};

export default Items;