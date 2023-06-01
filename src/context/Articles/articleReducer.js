export const articleReducer = (state, action) => {
    switch (action.type) {
        case 'create_article':
            return { ...state, articles: [...state.articles, action.payload] };

        case 'update_article':
            const newArticles = state.articles.map((el) => {
                if (el.idArticulo === action.payload.idArticulo) return action.payload;
                return el;
            });

            return { ...state, articles: newArticles };
        case 'delete_article':
            const filteredArticles = state.articles.filter(
                (el) => el.idArticulo !== action.payload
            );
            return { ...state, articles: filteredArticles };
        case 'get_articles':
            return {
                ...state,
                articles: action.payload,
            };
        default:
            return state;
    }
};
