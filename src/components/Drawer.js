function Drawer({onClose, onRemove, items = []}) {
    return(
        <div  className="overlay">
        <div className="drawer">
            <h2 className="d-flex justify-between mb-20 ">
                Корзина {' '}
                <img onClick={onClose} className="removeBtn ml-25 cu-p" src="./img/btn-remove.svg" alt="Remove"/>
            </h2>

            {items.length > 0 ? (
                <div>
                    <div className="items">
                        {items.map((obj) => (
                            <div className="cartItem d-flex align-center mb-20">
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
                            <button className="greenButton">
                                Оформить заказ <img src="./img/arrow.svg" alt="Arrow"/>
                            </button>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                    <img className="mb-20" width={120} height={120} src="./img/empty-cart.jpg" alt="Empty cart" />
                    <h2>Корзина пустая</h2>
                    <p className="opacity-6">Добавьте хотя бы один товар</p>
                    <button onClick={onClose} className="greenButton">
                        <img src="./img/arrow.svg" alt="Arrow"/>
                        Вернуться назад
                    </button>
                </div>
            )}

        </div>
        </div>
    );
}

export default Drawer;