import { createContext, useReducer } from 'react';
import { clientReducer } from './clientReducer';

const initialState = {
    clients: [],
};

export const clientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [state, dispatch] = useReducer(clientReducer, initialState);

    const createClient = (client) => {
        dispatch({ type: 'create_client', payload: client });
    };

    const getClients = (clients) => {
        dispatch({ type: 'get_clients', payload: clients });
    };

    const updateClient = (client) => {
        dispatch({ type: 'update_client', payload: client });
    };

    const deleteClient = (idClient) => {
        dispatch({ type: 'delete_client', payload: idClient });
    };

    return (
        <clientContext.Provider
            value={{
                clients: state?.clients,
                createClient,
                getClients,
                updateClient,
                deleteClient,
            }}
        >
            {children}
        </clientContext.Provider>
    );
};
