import React, {useContext} from "react";
import AdminContext from "../../context/admin/adminContext";
import AlertContext from "../../context/alert/alertContext";
import {flb} from "../../utils/someFunctions";

const PanelItem = ({user, i}) => {
    const { setAlert } = useContext(AlertContext);
    const { deleteUser } = useContext(AdminContext);
    const onDelete = () => {
        deleteUser(user._id);
        setAlert(`Пользователь с Email-адресом ${user.email} был удален`, 'success');
    }
    return (
        <tr>
            <th scope="row">{i+1}</th>
            <td>{flb(user.name)}</td>
            <td>{flb(user.surname)}</td>
            <td>{user.email}</td>
            <td className="text-center"><i className="fa fa-times" onClick={onDelete} style={{color: "red", cursor: "pointer"}} aria-hidden="true"/></td>
        </tr>
    )
}

export default PanelItem;