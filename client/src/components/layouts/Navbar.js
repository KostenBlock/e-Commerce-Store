import React, {Fragment, useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import { createBrowserHistory } from "history";
import CartContext from "../../context/cart/cartContext";
import CartNavbar from "../cart/CartNavbar";
import AuthContext from "../../context/auth/authContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import OrdersContext from "../../context/orders/ordersContext";

const Navbar = ({ icon, title}) => {
    const { getItemsFromCart } = useContext(CartContext);
    const { clearOrders } = useContext(OrdersContext);
    const authContext = useContext(AuthContext);

    const [value, setValue] = useState({
       search :''
    });

    const { loadUser, isAuthenticated, user, logout } = authContext;

    const customHistory = createBrowserHistory();

    useEffect(() => {
        getItemsFromCart();
        loadUser();
        // eslint-disable-next-line
    }, []);

    const onLogout = () => {
        logout();
        clearOrders();
    };

    const onKeyPress = event => {
        if (event.key === 'Enter') customHistory.push(`/search/query=${value.search.toLowerCase()}`);
    };

    const onChange = event => {
        setValue({
            search: event.target.value
        });
    };

    const adminLinks = (
        <Fragment>
            <NavDropdown.Item href="/adminpanel">Админ-панель</NavDropdown.Item>
            <NavDropdown.Item href="/additem">Добавить товар</NavDropdown.Item>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <NavDropdown.Item href="/profile">Профиль</NavDropdown.Item>
            <NavDropdown.Item href="/orders">Мои заказы</NavDropdown.Item>
            <NavDropdown.Item href="/settings">Настройки</NavDropdown.Item>
            {user && user.role === "admin" && adminLinks}
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login" onClick={onLogout}>Выйти</NavDropdown.Item>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <NavDropdown.Item href="/login">Войти</NavDropdown.Item>
            <NavDropdown.Item href="/register">Регистрация</NavDropdown.Item>
        </Fragment>
    );

    return (
        <nav className="navbar navbar-light" style={{backgroundColor: "rgba(47,36,47,0.38)"}}>
            <NavLink to="/" className="navbar-brand"><i className={icon}/> {title}</NavLink>
            <form className="form-inline pull-xs-right">
                <input style={{height:"35px", borderRadius: "5px"}} value={value.search} onChange={onChange} onKeyPress={onKeyPress} placeholder="Поиск..."/>
                <CartNavbar/>
                <NavDropdown title={<i className="fas fa-user" style={{fontSize: "24px"}}/>} id="basic-nav-dropdown">
                    {isAuthenticated ? authLinks : guestLinks}
                </NavDropdown>
            </form>
        </nav>
    )
};

export default Navbar;

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: 'Store',
    icon: 'fas fa-church'
};