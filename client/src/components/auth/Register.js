import React, {Fragment, useContext, useEffect, useState} from "react";
import './auth.scss';
import AuthContext from "../../context/auth/authContext";
import Loader from "../layouts/Loader";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layouts/Alerts";
import {NavLink} from "react-router-dom";

const Register = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { register, error, isAuthenticated, loading, clearErrors} = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }
        if (error === "Пользователь с таким Email-адресом уже существует") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    if (error) {
        console.log(error)
    }

    const [user, setUser] = useState({
        name: '',
        surname: '',
        country: '',
        city: '',
        address: '',
        zipcode: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, surname, country, city, zipcode, address, email, password, password2} = user;

    let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    const onChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault();

        if (name === ''|| surname === '' || email === '' || country === '' || city === '' || zipcode === '' ||  address === '' || password === '' || password2 === '') {
            setAlert("Заполните все поля", "danger");
            clearErrors();
        } else if (emailValid === null) {
            setAlert("Введите корректный Email-адрес", "danger");
            clearErrors();
        } else if (password !== password2) {
            setAlert("Пароли не совпадают", "danger");
            clearErrors();
        } else {
            register({
                name: name,
                surname: surname,
                country: country,
                city: city,
                zipcode: zipcode,
                address: address,
                email: email,
                password: password
            });
        }
    };

    return (
        <Fragment>
            {!loading
                ? <div className="form-container">
                    <Alerts/>
                    <h1 className="text-center">Форма регистрации</h1>
                    <form onSubmit={onSubmit}>
                        <label>
                            <p className="label-txt">Введите имя</p>
                            <input className="input" type="text" name="name" value={name} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Введите фамилию</p>
                            <input className="input" type="text" name="surname" value={surname} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Введите страну</p>
                            <input className="input" type="text" name="country" value={country} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Введите город</p>
                            <input className="input" type="text" name="city" value={city} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Введите почтовый индекс</p>
                            <input className="input" type="number" name="zipcode" value={zipcode} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Введите адрес</p>
                            <input className="input" type="text" name="address" value={address} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Введите Email-адрес</p>
                            <input className="input" type="email" name="email" value={email} required onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Введите свой пароль</p>
                            <input className="input" type="password" name="password" value={password} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <label>
                            <p className="label-txt">Повторите пароль</p>
                            <input className="input" type="password" name="password2" value={password2} onChange={onChange}/>
                            <div className="line-box">
                                <div className="line"/>
                            </div>
                        </label>
                        <p>У вас уже есть аккаунт? <NavLink to="/login" className="btn-link">Войти</NavLink></p>
                        <button className="btn btn-primary btn-block" type="submit">Регистрация</button>
                    </form>
                </div>
                : <Loader />}
        </Fragment>
    )

}

export default Register;