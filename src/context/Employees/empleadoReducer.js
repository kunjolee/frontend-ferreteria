export const empleadoReducer = (state, action) => {
    switch (action.type) {
        case 'get_empleados':
            return { ...state, empleados: [...action.payload] };
        case 'create_empleado':
            return { ...state, empleados: [...state.empleados, action.payload] };
        case 'update_empleado':
            const newEmpleados = state.empleados.map((el) => {
                if (el.idEmpleado === action.payload.idEmpleado) return action.payload;
                return el;
            });
            return { ...state, empleados: newEmpleados };

        case 'delete_empleado':
            const filteredEmpleados = state.empleados.filter(
                (el) => el.idEmpleado !== action.payload
            );
            return { ...state, empleados: filteredEmpleados };
        default:
            return state;
    }
};
