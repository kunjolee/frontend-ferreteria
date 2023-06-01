export const userReducer = (state, action) => {
    switch (action.type) {
        case 'get_users':
            return { ...state, users: [...action.payload] };
        case 'create_user':
            return { ...state, users: [...state.users, action.payload] };
        case 'update_user':
            const newUsers = state.users.map((el) => {
                if (el.idUsuario === action.payload.idUsuario) return action.payload;
                return el;
            });
            return { ...state, users: newUsers };

        case 'delete_user':
            const filteredUsers = state.users.filter((el) => el.idUsuario !== action.payload);
            return { ...state, users: filteredUsers };
        default:
            return state;
    }
};
