import React, {Fragment, useContext, useEffect, useState} from "react";
import Alerts from "../layouts/Alerts";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import OrdersContext from "../../context/orders/ordersContext";
import CartContext from "../../context/cart/cartContext";
let valid = require('card-validator');

const Checkout = ({history}) => {
    const authContext = useContext(AuthContext);
    const ordersContext = useContext(OrdersContext);
    const cartContext= useContext(CartContext);
    const alertContext = useContext(AlertContext);

    const { user } = authContext;
    const { productsInCart, totalPrice, totalQty, clearCart } = cartContext;
    const { checkout } = ordersContext;
    const { setAlert } = alertContext;


    useEffect(() => {
        if (user !== null) {
            setData({
                name: user.name,
                surname: user.surname,
                country: user.country,
                city: user.city,
                address: user.address,
                zipcode: user.zipcode,
                cardName: '',
                cardNumber: '',
                expMonth: '',
                expYear: '',
                cvCode: ''
            });
        } else {
            setData({
                name: '',
                surname: '',
                country: '',
                city: '',
                address: '',
                zipcode: '',
                cardName: '',
                cardNumber: '',
                expMonth: '',
                expYear: '',
                cvCode: ''
            });
        }
    }, [user]);

    const [nextPrev, setNextPrev] = useState({
        status: null
    });

    const [data, setData] = useState({
        name: '',
        surname: '',
        country: '',
        city: '',
        address: '',
        zipcode: '',
        cardName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvCode: ''
    });

    const [agree, setAgree] = useState({
        agreed: null
    });

    const { status } = nextPrev;
    const { agreed } = agree;
    const { name, surname, country, city, address, zipcode, cardName, cardNumber, expMonth, expYear, cvCode } = data;

    const onToggle = event => {
        event.preventDefault();
        if (name === '' || surname === '' || country === '' || city === '' || zipcode === '' || address === '') {
            setAlert("Заполните все поля для доставки", "warning");
        }
        else{
            setNextPrev({
                status: !status
            });
        }
    };

    const onChange = event => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const onCheck = () => {
        setAgree({
            agreed: !agreed
        });
    };

    let numberValidation = valid.number(cardNumber);
    let expDateValidation = valid.expirationDate(`${expMonth}/${expYear}`);
    let cvvValidation = valid.cvv(cvCode, 3)

    const payout = event => {
        event.preventDefault();
        if (cardNumber === '' || cardName === '' || expMonth === '' || expYear === '' || cvCode === '') {
            setAlert("Заполните все поля для оплаты заказа", "warning");
        } else if (!numberValidation.isValid) {
            setAlert("Данная карта невалидна", "danger");
        }else if (!expDateValidation.isValid) {
            setAlert("Карта просрочена или вы ввели не верную дадут", "danger");
        }else if (!cvvValidation.isValid) {
            setAlert("Введите 3 цифры кода на обороте вашей карты", "danger");
        }else if (!agreed) {
            setAlert("Согласитесь с условиями оферты", "warning");
        } else {
            let info = {
                cart: {
                    productsInCart,
                    totalPrice: totalPrice + 300,
                    totalQty
                },
                deliveryDetails: {
                    name,
                    surname,
                    country,
                    city,
                    zipcode,
                    address
                }
            };
            checkout(info);
            clearCart();
            setAlert("Заказ оплачен", "success");
            info = null;
            history.push('/orders');
        }
    };

    if(productsInCart.length === 0) {
        history.push("/");
    }

    return (
        <Fragment>
            {status
                ? (<form className="text-center border border-light p-1 mt-5" style={{borderRadius: 5}}>
                    <p className="h4 mb-4">Введите данные для оплаты</p>
                    <Alerts/>
                    <input type="text"
                           className="form-control"
                           placeholder="Имя держателя карты"
                           name="cardName"
                           value={cardName}
                           onChange={onChange}
                    />
                    <small className="form-text text-muted mb-4"/>

                    <input type="number"
                           className="form-control"
                           placeholder="Номер карты"
                           name="cardNumber"
                           value={cardNumber}
                           onChange={onChange}

                    />
                    <small className="form-text text-muted mb-4"/>

                    <div className="form-row mb-2">
                        <div className="col">
                            <input type="number"
                                   className="form-control"
                                   placeholder="Месяц"
                                   name="expMonth"
                                   value={expMonth}
                                   onChange={onChange}
                            />
                        </div>
                        <b>/</b>
                        <div className="col">
                            <input type="number"
                                   className="form-control"
                                   placeholder="Год"
                                   name="expYear"
                                   value={expYear}
                                   onChange={onChange}
                            />
                        </div>
                        <div className="col">
                            <input type="number"
                                   className="form-control"
                                   placeholder="CVV"
                                   name="cvCode"
                                   value={cvCode}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="form-check text-left">
                        <input type="checkbox"
                               className="form-check-input"
                               name="checkbox"
                               onClick={onCheck}
                        />
                        <b>Я, согласен с условиями оферты</b>
                    </div>
                    <button onClick={onToggle} className="btn btn-info my-2 rounded-pill btn-block waves-effect waves-light"
                            type="submit">Назад
                    </button>
                    <button onClick={payout} className="btn btn-dark rounded-pill py-2 btn-block"
                            type="submit">Оплатить
                    </button>
                </form>)
                : (<form className="text-center border border-light p-1 mt-5" style={{borderRadius: 5}}>
                    <p className="h4 mb-4">Данные для доставки</p>
                    <Alerts/>
                    <input type="text"
                           className="form-control"
                           value={name}
                           onChange={onChange}
                           placeholder="Имя"
                           name="name"
                    />
                    <small className="form-text text-muted mb-4"/>

                    <input type="text"
                           className="form-control"
                           value={surname}
                           onChange={onChange}
                           placeholder="Фамилия"
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
                            <input type="text"
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
                           value={address}
                           onChange={onChange}
                           placeholder="Адрес"
                           name="address"
                    />

                    <button onClick={onToggle} className="btn btn-info my-3 rounded-pill btn-block waves-effect waves-light"
                            type="submit">Далее
                    </button>
                </form>)
            }
        </Fragment>
    )
}

export default Checkout;