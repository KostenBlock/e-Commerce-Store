import React, {Fragment, useContext, useEffect, useState} from "react";
import AuthContext from "../../context/auth/authContext";
import Loader from "../layouts/Loader";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layouts/Alerts";

const Settings = () => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { user, changeBIO, loading, clearErrors } = authContext;
    const { setAlert } = alertContext;


    useEffect(() => {
        if (user !== null) {
            setData({
                name: user.name,
                surname: user.surname,
                country: user.country,
                city: user.city,
                zipcode: user.zipcode,
                address: user.address
            });
        } else {
            setData({
                name: '',
                surname: '',
                country: '',
                city: '',
                zipcode: '',
                address: ''
            });
        }
    }, [user]);

    const [data, setData] = useState({
        name: '',
        surname: '',
        country: '',
        city: '',
        zipcode: '',
        address: ''
    });

    const { name, surname, country, city, zipcode, address } = data;

    const onChange = event => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const onSave = event => {
        event.preventDefault();
        if (name === '' || surname === '' || country === '' || city === '' || zipcode === '' ||  address === '') {
            setAlert("Заполните все поля", "danger");
            clearErrors();
        } else {
            changeBIO(data);
            setAlert("Изменения сохранены", "success");
            clearErrors();
        }
    };

    return (
        <Fragment>
            {user !== null && !loading
                ? <form className="text-center border border-light p-1 mt-5" onSubmit={onSave}>
                    <p className="h4 mb-4">Смена пользовательских данных</p>
                    <Alerts/>
                    <input type="text"
                           className="form-control"
                           placeholder="Имя"
                           value={name}
                           onChange={onChange}
                           name="name"
                    />
                    <small className="form-text text-muted mb-4"/>

                    <input type="text"
                           className="form-control"
                           placeholder="Фамилия"
                           value={surname}
                           onChange={onChange}
                           name="surname"
                    />
                    <small className="form-text text-muted mb-4"/>

                    <div className="form-row mb-4">
                        <div className="col">
                            <input type="text"
                                   className="form-control"
                                   value={country}
                                   onChange={onChange}
                                   name="country"
                                   placeholder="Страна"
                            />
                        </div>
                        <div className="col">
                            <input type="text"
                                   className="form-control"
                                   value={city}
                                   onChange={onChange}
                                   name="city"
                                   placeholder="Город"
                            />
                        </div>
                        <div className="col">
                            <input type="number"
                                   className="form-control"
                                   value={zipcode}
                                   onChange={onChange}
                                   name="zipcode"
                                   placeholder="Почтовый индекс"
                            />
                        </div>
                    </div>

                    <input type="text"
                           className="form-control"
                           placeholder="Адрес"
                           value={address}
                           onChange={onChange}
                           name="address"
                    />
                    <small className="form-text text-muted mb-4"/>

                    <button className="btn btn-info btn-block waves-effect waves-light"
                            type="submit">Сохранить
                    </button>
                </form>
                : <Loader/>}
        </Fragment>
    )
};

export default Settings;