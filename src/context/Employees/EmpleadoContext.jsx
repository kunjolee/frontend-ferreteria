import { createContext, useReducer } from 'react';
import { empleadoReducer } from './empleadoReducer';

export const empleadoContext = createContext();
const initialState = {
    empleados: [],
};

export const EmpleadoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(empleadoReducer, initialState);

    const createEmpleado = (empleado) => {
        dispatch({ type: 'create_empleado', payload: empleado });
    };

    const getEmpleados = (empleados) => {
        dispatch({ type: 'get_empleados', payload: empleados });
    };

    const updateEmpleado = (empleado) => {
        dispatch({ type: 'update_empleado', payload: empleado });
    };

    const deleteEmpleado = (idEmpleado) => {
        dispatch({ type: 'delete_empleado', payload: idEmpleado });
    };
    return (
        <empleadoContext.Provider
            value={{
                createEmpleado,
                getEmpleados,
                updateEmpleado,
                deleteEmpleado,
                empleados: state.empleados,
            }}
        >
            {children}
        </empleadoContext.Provider>
    );
};
