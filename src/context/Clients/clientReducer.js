export const clientReducer = (state, action) => {
    switch (action.type) {
        case 'create_client':
            console.log('hmmm que viene en el payload', action.payload);
            return { ...state, clients: [...state.clients, action.payload] };
        case 'get_clients':
            return { ...state, clients: [...action.payload] };
        case 'update_client':
            const newClients = state.clients.map((el) => {
                if (el.idCliente === action.payload.idCliente) return action.payload;
                return el;
            });
            return { ...state, clients: newClients };

        case 'delete_client':
            const filteredClients = state.clients.filter((el) => el.idCliente !== action.payload);
            return { ...state, clients: filteredClients };
        default:
            return state;
    }
};
