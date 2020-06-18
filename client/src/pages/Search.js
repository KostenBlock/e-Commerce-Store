import React, {useContext, useEffect} from "react";
import ItemsContext from "../context/items/itemsContext";
import SearchResults from "../components/searching/SearchResults";

const Search = props => {
    const { search } = useContext(ItemsContext);
    let str = props.match.params.query.split('query=')[1];
    useEffect(() => {
        search(str);
        // eslint-disable-next-line
    } ,[]);
    return (
        <div className="mt-5">
            <h4 className="text-center">Результаты поиска по запросу <b>{str}</b>:</h4>
            <SearchResults/>
        </div>
    )
};

export default Search;