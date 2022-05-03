import Info from "./Info";
import React from "react";
import AppContext from "../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = []}) {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);

    const onClickOrder = async () => {
        try {
            const {data} = await axios.post('https://626291e0005a66e1e3a9c7a3.mockapi.io/orders', {items: cartItems,});
            //await axios.put('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart', []);
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);


            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart' + item.id);
                await delay(1000);
            }

        } catch (error) {
            //alert('Ошибка при создании заказа');
        }
    };

    return(
        <div  className="overlay">
        <div className="drawer">
            <h2 className="d-flex justify-between mb-20 ">
                Корзина
                <img onClick={onClose} className="removeBtn ml-25 cu-p" src="./img/btn-remove.svg" alt="Remove"/>
            </h2>

            {items.length > 0 ? (
                <div className="d-flex flex-column flex">
                    <div className="items">
                        {items.map((obj) => (
                            <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                <div >
                                    <img width={100} className="cartItemImage mr-15" src={obj.imageUrl} alt="CartItem"/>
                                </div>

                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img
                                    onClick={() => onRemove(obj.id)}
                                    className="removeBtn ml-25"
                                    src="./img/btn-remove.svg"
                                    alt="Remove"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="cartTotalBlock">
                        <ul>
                            <li className="d-flex">
                                <span>Итого:</span>
                                <div>

                                </div>
                                <b>4600 руб.</b>
                            </li>
                            <li className="d-flex">
                                <span>Доставка:</span>
                                <div>

                                </div>
                                <b>300 руб.</b>
                            </li>
                            <button onClick={onClickOrder} className="greenButton">
                                Оформить заказ <img src="./img/arrow.svg" alt="Arrow"/>
                            </button>
                        </ul>
                    </div>
                </div>
            ) : (
                <Info
                    title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} передан в доставку!` : "Добавьте хотя бы один товар"}
                    image= {isOrderComplete ?  "./img/complete-order.jpg" : "./img/empty-cart.jpg"}
                />

            )}

        </div>
        </div>
    );
}

export default Drawer;