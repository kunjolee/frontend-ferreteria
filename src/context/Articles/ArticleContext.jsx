import { createContext, useReducer } from 'react';
import { articleReducer } from './articleReducer';

const initialState = {
    articles: [],
};

export const articleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(articleReducer, initialState);

    const createArticle = (article) => {
        dispatch({ type: 'create_article', payload: article });
    };

    const getArticles = (articles) => {
        dispatch({ type: 'get_articles', payload: articles });
    };

    const updateArticle = (article) => {
        dispatch({ type: 'update_article', payload: article });
    };

    const deleteArticle = (idArticle) => {
        dispatch({ type: 'delete_article', payload: idArticle });
    };

    return (
        <articleContext.Provider
            value={{
                articles: state?.articles,
                createArticle,
                getArticles,
                updateArticle,
                deleteArticle,
            }}
        >
            {children}
        </articleContext.Provider>
    );
};
