import React, {Fragment, useContext, useEffect} from "react";
import PanelItems from "../components/adminPanel/PanelItems";
import AdminContext from "../context/admin/adminContext";

const AdminPanel = () => {
    const { getAllUsers } = useContext(AdminContext);

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <PanelItems/>
        </Fragment>
    )
};

export default AdminPanel;