import { createContext, useState } from 'react';

export const modalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <modalContext.Provider value={{ handleClose, handleShow, show }}>
            {children}
        </modalContext.Provider>
    );
};
