import { createContext, useReducer } from 'react';
import { userReducer } from './userReducer';

export const userContext = createContext();
const initialState = {
    users: [],
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const createUser = (user) => {
        dispatch({ type: 'create_user', payload: user });
    };

    const getUsers = (users) => {
        dispatch({ type: 'get_users', payload: users });
    };

    const updateUser = (user) => {
        dispatch({ type: 'update_user', payload: user });
    };

    const deleteUser = (idUser) => {
        dispatch({ type: 'delete_user', payload: idUser });
    };
    return (
        <userContext.Provider
            value={{ createUser, getUsers, updateUser, deleteUser, users: state.users }}
        >
            {children}
        </userContext.Provider>
    );
};
