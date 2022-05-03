import React from "react";
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from "../../context";


function Card({
                  id,
                  title,
                  description,
                  imageUrl,
                  price,
                  onFavorite,
                  onPlus,
                  favorited = false,
                  added = false,
                  loading = false,
              }) {

    const {isItemAdded} = React.useContext(AppContext);
    //const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    //console.log(title, isItemAdded(id))

    const onClickPlus = () => {
        onPlus({id, title, description, imageUrl, price});
        //setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onFavorite({id, title, description, imageUrl, price});
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={styles.card}>
            {
                loading ?  (<ContentLoader
                    speed={2}
                    width={285}
                    height={360}
                    viewBox="0 0 285 360"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="235" height="235" />
                    <rect x="0" y="243" rx="5" ry="5" width="235" height="15" />
                    <rect x="0" y="263" rx="5" ry="5" width="235" height="30" />
                    <rect x="0" y="307" rx="5" ry="5" width="130" height="32" />
                    <rect x="164" y="307" rx="5" ry="5" width="32" height="32" />
                    <rect x="204" y="307" rx="5" ry="5" width="32" height="32" />
                </ContentLoader>)
                    :
                    (
                        <>
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
                            <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "./img/btn-checked.svg" : "./img/btn-plus.svg"} alt="Plus" />
                        </div>
                        </>
                    )

            }

        </div>
    );
}

export default Card;