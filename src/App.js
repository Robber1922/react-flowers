import Card from './components/Card/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Categories from "./components/Categories";
import {Route, Router, Routes} from 'react-router-dom';
import React from "react";
import axios from 'axios';



function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/items').then(res => {
            setItems(res.data);
        });
        axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart').then(res => {
            setCartItems(res.data);
        });

    }, []);

    const onAddToCart = (obj) => {
        //console.log(obj);
        axios.post('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
    };

    const onRemoveItem = (id) => {
        //console.log(id);
        axios.delete(`https://626291e0005a66e1e3a9c7a3.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        //setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    };

    const onAddToFavorite = (obj) => {
        axios.post('https://626291e0005a66e1e3a9c7a3.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, obj]);
    }

    const onChangeSearchInput = (event) => {
        //console.log(event.target.value);
        setSearchValue(event.target.value);
    };

  return (

    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)}  />


        <Routes>
            <Route path="/test">
                test
            </Route>
        </Routes>

        <div className="content p-40">
            <div className="d-flex align-center mb-30 justify-between">
                <Categories />
                <div className="search-block d-flex">
                    <img src="./img/search.svg" alt="Search" />
                    <input onChange={onChangeSearchInput} placeholder="Поиск..." />
                </div>
            </div>

           <div className="d-flex flex-wrap">

               {items
                   .filter(item => item.description.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
                   <Card
                       key={item.title}
                       title={item.title}
                       description={item.description}
                       price={item.price}
                       imageUrl={item.imageUrl}
                       onFavorite={(obj) => onAddToFavorite(item)}
                       onPlus={(obj) => onAddToCart(item)}
                   />
               ))}
           </div>
        </div>
    </div>
  );
}

export default App;