import React, {Fragment, useContext} from "react";
import PanelItem from "./PanelItem";
import AdminContext from "../../context/admin/adminContext";
import Loader from "../layouts/Loader";
import Alerts from "../layouts/Alerts";

const Panel = () => {
    const adminContext = useContext(AdminContext);
    const { users, loading} = adminContext;

    if (users !== null && users.length === 0 && !loading) {
        return <h4 className="text-center mt-5">Пользователей нет...</h4>
    }

    return (
        <Fragment>
        {users !==null && !loading
            ? (<div className="table-responsive mt-5">
                <Alerts/>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Фамилия</th>
                        <th scope="col">Email</th>
                        <th className="text-center" scope="col">Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, i) => (
                        <PanelItem key={user._id} user={user} i={i}/>
                    ))}
                    </tbody>
                </table>
                </div>)
            : <Loader/>
        }
        </Fragment>
    )
}

export default Panel;