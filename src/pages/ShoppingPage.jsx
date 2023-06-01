import { useContext, useEffect, useState } from 'react';
import { Button, Card, CardGroup } from 'react-bootstrap';
import { AppLayout } from '../layouts';
import { api } from '../api';
import { cartContext } from '../context';

export const ShoppingPage = () => {
    const [articles, setArticles] = useState([]);
    const { addToCart, onlyShow, show, cart } = useContext(cartContext);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await api.get('/listArticles');
            setArticles(data.articles);
        };

        fetchData();
    }, []);
    const handleAddToCart = (article) => {
        addToCart(article);
        show || onlyShow();
    };
    return (
        <AppLayout>
            <h2>Buy an Item!</h2>
            <CardGroup
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
                    gap: '1rem',
                }}
            >
                {articles?.map((article) => (
                    <Card
                        style={{ width: '18rem' }}
                        key={article.idArticulo}
                        bg='dark'
                        text='light'
                    >
                        <Card.Body>
                            <Card.Title>{article.nombre}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>
                                Precio: {article.precio}
                            </Card.Subtitle>
                            <Card.Text>Stock: {article.stock}</Card.Text>
                            <Button onClick={() => handleAddToCart(article)}>Add to cart</Button>
                        </Card.Body>
                    </Card>
                ))}
            </CardGroup>
        </AppLayout>
    );
};
