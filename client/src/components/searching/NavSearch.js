import React from "react";

const NavSearch = () => {

    return (
        <div className="instant-results">
            <ul className="list-unstyled result-bucket">
                <li className="result-entry" data-suggestion="Target 1" data-position="1" datatype="type"
                    data-analytics-type="merchant">
                    <a href="#" className="result-link">
                        <div className="media">
                            <div className="media-left">
                                <img src="http://mellon.co.tz/wp-content/uploads/2016/05/noimage.gif" alt={2}
                                     className="media-object"/>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">Heading 1</h4>
                                <p>0 offers available</p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
};

export default NavSearch;

