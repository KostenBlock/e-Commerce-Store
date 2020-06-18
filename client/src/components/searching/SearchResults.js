import React, {Fragment, useContext} from "react";
import ItemsContext from "../../context/items/itemsContext";
import Loader from "../layouts/Loader";
import '../../sass/seacrh.scss'
import {Link} from "react-router-dom";
import {capitalize} from "../../utils/someFunctions";

const SearchResults = () => {
    const itemsContext = useContext(ItemsContext);
    const { itemsBySearch, loading } = itemsContext;

    if (itemsBySearch !== null && itemsBySearch.length === 0 && !loading) {
        return <h4 className="text-center mt-5">По данному запросу ничего не найдено!</h4>
    }

    return (
        <Fragment>
            <div className="row">
            {itemsBySearch !== null && itemsBySearch.length !== 0 && !loading
                ? ( itemsBySearch.map(item =>
                        (<div className="col-md-4" key={item._id}>
                            <div className="card" style={{minHeight: "570px"}}>
                                <img style={{padding: "5px"}} src={item.img} className="card-img-top"
                                     alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{capitalize(item.name)}</h5>
                                        <p className="card-text">{item.description.substr(0, 100) + "..."}</p>
                                    </div>
                                    <Link to={"/product/" + item._id}>
                                        <button className="btn btn-sm btn-dark btn-block mb-1 p-1">
                                            Подробнее
                                        </button>
                                    </Link>
                            </div>
                        </div>))
                ) : <Loader/>
            }
            </div>
        </Fragment>
    )
};

export default SearchResults;