import Categories from "../components/Categories";
import Card from "../components/Card/Card";
import React from "react";
import AppContext from "../context";

function Home({
                  items,
                  searchValue,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart,
                  isLoading
                  }) {


    const renderItems = () => {
        const filteredItems = items.filter(item => item.description.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading
            ? [...Array(10)]
            : filteredItems)
                .map((item, index) => (
                    <Card
                        key={index}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        //added={isItemAdded(item && item.id)}
                        loading={isLoading}
                        {...item}
                    />
                ))

    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-30 justify-between">
                <Categories />
                <div className="search-block d-flex">
                    <img src="./img/search.svg" alt="Search" />
                    <input onChange={onChangeSearchInput} placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;