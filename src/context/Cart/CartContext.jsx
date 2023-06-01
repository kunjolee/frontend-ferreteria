import { createContext, useMemo, useReducer, useState } from 'react';
import { cartReducer } from './cartReducer';

export const cartContext = createContext();
const initialState = {
    articles: [],
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow((currentValue) => !currentValue);
    const onlyShow = () => setShow(true);

    const total = useMemo(
        () => cart.articles.reduce((acc, article) => acc + article.subtotal, 0),
        [cart]
    );

    const addToCart = (article) => {
        dispatch({ type: 'add_to_cart', payload: article });
    };
    const removeFromCart = (idArticulo) => {
        dispatch({ type: 'remove_from_cart', payload: idArticulo });
    };

    const emptyCart = () => {
        dispatch({ type: 'empty_cart' });
    };
    return (
        <cartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                show,
                handleClick,
                onlyShow,
                total,
                emptyCart,
            }}
        >
            {children}
        </cartContext.Provider>
    );
};
