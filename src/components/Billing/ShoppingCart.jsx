import { useContext } from 'react';
import { faCartShopping, faFaceSadCry, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Card } from 'react-bootstrap';
import { cartContext } from '../../context/';
import { useNavigate } from 'react-router-dom';
import { Cart } from './Cart';

export const ShoppingCart = () => {
    const { cart, handleClick, show, emptyCart } = useContext(cartContext);
    const navigate = useNavigate();
    const goToCheckout = () => {
        handleClick();
        navigate('/purchase');
    };
    return (
        <>
            <FontAwesomeIcon
                style={{
                    position: 'fixed',
                    bottom: '0',
                    right: '0',
                    padding: '2rem',
                    cursor: 'pointer',
                }}
                size='2x'
                icon={faCartShopping}
                onClick={handleClick}
            />
            {show && (
                <Card
                    style={{
                        width: '40%',
                        height: '90vh',
                        position: 'fixed',
                        right: '0',
                        top: '0',
                        padding: '2rem',
                        overflowY: 'auto',
                        zIndex: 200,
                    }}
                >
                    <h2>Articles</h2>
                    <Cart />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            disabled={!cart.articles.length}
                            variant='danger'
                            style={{
                                width: '40%',
                                margin: '0 auto',
                                marginTop: '2rem',
                                cursor: 'pointer',
                            }}
                            onClick={emptyCart}
                        >
                            Empty Card
                        </Button>
                        <Button
                            disabled={!cart.articles.length}
                            variant='info'
                            style={{
                                width: '40%',
                                margin: '0 auto',
                                marginTop: '2rem',
                                cursor: 'pointer',
                            }}
                            onClick={goToCheckout}
                        >
                            Checkout
                        </Button>
                    </div>
                </Card>
            )}
        </>
    );
};
