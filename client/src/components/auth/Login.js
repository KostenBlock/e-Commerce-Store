import React, {Fragment, useContext, useEffect, useState} from "react";
import Loader from "../layouts/Loader";
import AuthContext from "../../context/auth/authContext";
import '../../sass/auth.scss';
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layouts/Alerts";
import {NavLink} from "react-router-dom";

const Login = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { isAuthenticated, login, loading, error, clearErrors} = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if (error === "Неверный email или пароль") {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;

    let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    const onChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();

        if(email === "" || password === "") {
            setAlert("Заполните все поля", 'danger');
            clearErrors();
        } else if (emailValid === null) {
            setAlert("Введите корректный Email-адрес", "danger");
            clearErrors();
        } else {
            login({
                email: email.toLowerCase(),
                password
            });
        }
    };

    return(
        <Fragment>
            {!loading
                ? <div className="form-container">
                    <h1 className="text-center">Авторизация</h1>
                    <Alerts/>
                    <form onSubmit={onSubmit}>
                        <label>
                            <p className="label-txt">Введите Email-адрес</p>
                            <input className="input" type="email" name="email" value={email} onChange={onChange}/>
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
                        <p>У вас нету аккаунта? <NavLink to="/register" className="btn-link">Зарегистрироваться</NavLink></p>
                        <button className="btn btn-primary btn-block" type="submit">Войти</button>
                    </form>
                </div>
                : <Loader />}
        </Fragment>
    )
}

export default Login;