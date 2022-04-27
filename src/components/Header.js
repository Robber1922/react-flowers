function Header(props) {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width={45} height={45} src="./img/flower-logo.svg" alt="Flower logo"/>
                <div >
                    <h3 className="text-uppercase">Flower Store</h3>
                    <p className="opacity-5">самый лучший цветочный магазин</p>
                </div>
            </div>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="./img/cart.svg" alt="Cart"/>
                    <span>2300 руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <img width={18} height={18} src="./img/heart.svg" alt="Favorites"/>
                </li>
                <li className="cu-p">
                    <img width={18} height={18} src="./img/user.svg" alt="User"/>

                </li>
            </ul>
        </header>
    );
}

export default Header;