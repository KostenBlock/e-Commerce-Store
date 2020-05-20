import React, {Fragment} from "react";
import spinner from './glow.gif'

const Loader = () => (
    <Fragment>
        <img
            src={spinner}
            style={{width: "200px", margin: "auto", display: "block", marginTop: "30%"}}
            alt="Loading..."
        />
    </Fragment>
);

export default Loader;