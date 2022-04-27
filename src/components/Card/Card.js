import React from "react";
import styles from './Card.module.scss';

function Card({ title, description, imageUrl, price, onFavorite, onPlus}) {
    const [isAdded, setIsAdded] = React.useState();
    const [isFavorite, setIsFavorite] = React.useState();

    const onClickPlus = () => {
        onPlus(title, description, imageUrl, price);
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onFavorite(title, description, imageUrl, price);
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={styles.card}>

            <img width={235}  src={imageUrl} alt="Flowers" />
            <h5>{title}</h5>
            <h6>Состав: {description}</h6>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <div className={styles.favorite} onClick={onClickFavorite}>
                    <img src={isFavorite ? "./img/liked.svg" : "./img/unliked.svg"} alt="Unliked"/>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"} alt="Plus" />
            </div>
        </div>
    );
}

export default Card;