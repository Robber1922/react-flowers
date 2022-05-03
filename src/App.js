import Card from './components/Card/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Categories from "./components/Categories";
import {Route, Router, Routes} from 'react-router-dom';
import React from "react";
import axios from 'axios';
import Home from './pages/Home'
import Favorites from "./pages/Favorites";
import AppContext from "./context";


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        async function fetchData() {

            const cartResponse = await axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/favorites');
            const itemsResponse = await axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/items');
/*
            const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart'),
                axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/favorites'),
                axios.get('https://626291e0005a66e1e3a9c7a3.mockapi.io/items'),
            ]);*/
            setIsLoading(false);

            setCartItems(cartResponse.data);
            setItems(itemsResponse.data);
            setFavorites(favoritesResponse.data);
        }

        fetchData();

    }, []);

    const onAddToCart = (obj) => {
        console.log(obj);
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart', obj);
            setCartItems((prev) => [...prev, obj]);
        }

           /* axios.post('https://626291e0005a66e1e3a9c7a3.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
.
        */
    };

    const onRemoveItem = (id) => {
        //console.log(id);
        axios.delete(`https://626291e0005a66e1e3a9c7a3.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
        //setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    };

    const onAddToFavorite = async(obj) => {
       /*if (favorites.find((favObj) => favObj.id === obj.id)) {
            axios.delete(`https://626291e0005a66e1e3a9c7a3.mockapi.io/favorite/${obj.id}`);
        } else {
            const { data } = await axios.post('https://626291e0005a66e1e3a9c7a3.mockapi.io/favorites', obj);
            setFavorites((prev) => [...prev, data]);
        }*/
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                await axios.delete(`https://626291e0005a66e1e3a9c7a3.mockapi.io/favorite/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post(
                    'https://626291e0005a66e1e3a9c7a3.mockapi.io/favorites',
                    obj,
                );
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
            console.error(error);
        }
    }

    const onChangeSearchInput = (event) => {
        //console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
      return cartItems.some((obj) => Number(obj.id) === Number(id));
    }

  return (

      <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>

    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)}  />

        <Routes>
            <Route path="/" exact element={
                <Home
                    items={items}
                    cartItems={cartItems}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}
                    onChangeSearchInput={onChangeSearchInput}
                    isLoading={isLoading}
                />
            }>
            </Route>
            <Route path="/favorites" exact element={
                <Favorites/>
            }>
            </Route>


        </Routes>

    </div>
      </AppContext.Provider>


  );
}

export default App;