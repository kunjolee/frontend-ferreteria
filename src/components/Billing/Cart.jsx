import { useContext, useMemo } from 'react';
import { faFaceSadCry, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cartContext } from '../../context/';
import { Card } from 'react-bootstrap';

export const Cart = () => {
    const { cart, addToCart, removeFromCart, total } = useContext(cartContext);

    return (
        <>
            {cart?.articles.length > 0 ? (
                cart?.articles?.map((articulo) => (
                    <Card style={{ width: '100%' }} key={articulo?.idArticulo}>
                        <Card.Body style={{ position: 'relative' }}>
                            <Card.Title>{articulo.nombre}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>
                                Precio: {articulo.precio}
                            </Card.Subtitle>
                            <Card.Text style={{ margin: 0 }}>
                                Cantidad: {articulo.cantidad}
                            </Card.Text>
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    right: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                }}
                            >
                                <FontAwesomeIcon
                                    onClick={() => addToCart(articulo)}
                                    icon={faPlus}
                                />
                                <FontAwesomeIcon
                                    onClick={() => removeFromCart(articulo.idArticulo)}
                                    icon={faMinus}
                                />
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    cursor: 'pointer',
                                }}
                            >
                                <Card.Text className='mb-2 text-muted'>
                                    Subtotal: ${articulo.subtotal.toFixed(2)}
                                </Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <p style={{ margin: '0', fontSize: '20px' }}>No articles in cart</p>
                        <FontAwesomeIcon icon={faFaceSadCry} size='2x' />
                    </div>
                </>
            )}
            <Card.Subtitle style={{ marginTop: '1.5rem', marginLeft: '.5rem' }}>
                Total:${total.toFixed(2)}
            </Card.Subtitle>
        </>
    );
};
