export const payReducer = (state, action) => {
    switch (action.type) {
        case 'get_pays':
            return { ...state, pays: [...action.payload] };
        case 'create_pay':
            return { ...state, pays: [...state.pays, action.payload] };
        case 'update_pay':
            const newPays = state.pays.map((el) => {
                if (el.idPago === action.payload.idPago) return action.payload;
                return el;
            });
            return { ...state, pays: newPays };

        case 'delete_pay':
            const filteredPays = state.pays.filter((el) => el.idPago !== action.payload);
            return { ...state, pays: filteredPays };
        default:
            return state;
    }
};
