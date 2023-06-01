export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add_to_cart':
            // encontrar el articulo que se va agregar al carrito
            const article_to_add = state?.articles?.find(
                (el) => el.idArticulo === action.payload.idArticulo
            );

            const articles = article_to_add
                ? // si ese articulo existe en el carrito, entonces vas a verificar que la cantidad a agregar no sea mayor o igual que el stock, si no lo es, entonces vas a sumar la cantidad + 1
                  state?.articles.map((el) => {
                      if (el.idArticulo === article_to_add.idArticulo) {
                          return article_to_add?.cantidad >= el.stock
                              ? {
                                    ...article_to_add,
                                }
                              : {
                                    ...article_to_add,
                                    cantidad: (article_to_add.cantidad += 1),
                                    subtotal: article_to_add.cantidad * article_to_add.precio,
                                };
                      }
                      return el;
                  })
                : //   si ese articulo no existe, solo lo vas agregar con la cantidad de 1
                  [
                      ...state.articles,
                      {
                          ...action.payload,
                          cantidad: 1,
                          subtotal: 1 * action.payload.precio,
                      },
                  ];

            return {
                ...state,
                articles,
            };

        case 'remove_from_cart':
            const article_to_remove = state?.articles?.find(
                (el) => el.idArticulo === action.payload
            );

            return article_to_remove.cantidad <= 1
                ? {
                      ...state,
                      articles: state?.articles.filter((el) => el.idArticulo !== action.payload),
                  }
                : {
                      ...state,
                      articles: state?.articles.map((el) => {
                          if (el.idArticulo === action.payload) {
                              return {
                                  ...el,
                                  cantidad: (el.cantidad -= 1),
                                  subtotal: el.cantidad * el.precio,
                              };
                          }
                          return el;
                      }),
                  };
        case 'empty_cart':
            return { ...state, articles: [] };
        default:
            return state;
    }
};
