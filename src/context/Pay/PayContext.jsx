import { createContext, useReducer } from 'react';
import { payReducer } from './payReducer';

export const payContext = createContext();
const initialState = {
    pays: [],
};

export const PayProvider = ({ children }) => {
    const [state, dispatch] = useReducer(payReducer, initialState);

    const createPay = (pay) => {
        dispatch({ type: 'create_pay', payload: pay });
    };

    const getPays = (pays) => {
        dispatch({ type: 'get_pays', payload: pays });
    };

    const updatePay = (pay) => {
        dispatch({ type: 'update_pay', payload: pay });
    };

    const deletePay = (idPay) => {
        dispatch({ type: 'delete_pay', payload: idPay });
    };
    return (
        <payContext.Provider value={{ createPay, getPays, updatePay, deletePay, pays: state.pays }}>
            {children}
        </payContext.Provider>
    );
};
