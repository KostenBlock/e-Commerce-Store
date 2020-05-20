import React, {useContext} from "react";
import CartContext from "../../context/cart/cartContext";

const CartItem = ({item}) => {
    const cartContext = useContext(CartContext);
    const {deleteItemFromCart, increaseByOne, decreaseByOne} = cartContext;
    const onDelete = () => {
        deleteItemFromCart(item);
    };

    const addOne = () => {
        increaseByOne(item);
    };

    const subOne = () => {
        decreaseByOne(item);
    };

    return (
        <tr>
            <th scope="row">
                <div className="p-2">
                    <img
                        src={item.urlImg}
                        alt={item.name} width="70" className="img-fluid rounded shadow-sm"/>
                    <div className="ml-3 d-inline-block align-middle">
                        <h5 className="mb-0"><a href="#!" className="text-dark d-inline-block">{item.name}</a>
                        </h5>
                        <span className="text-muted font-weight-normal font-italic">Категория: {item.category}</span>
                    </div>
                </div>
            </th>
            <td className="align-middle"><strong>{item.price} Руб.</strong></td>
            <td className="align-middle"><strong> &emsp;{item.qty} <button onClick={subOne} className="small btn-sm btn-danger">-</button> <button onClick={addOne} className="small btn-sm btn-success">+</button></strong></td>
            <td className="align-middle">&emsp;&emsp;<i onClick={onDelete}
                                                        className="fa fa-trash text-dark" style={{cursor: "pointer"}}/>
            </td>
        </tr>
    )
};

export default CartItem;