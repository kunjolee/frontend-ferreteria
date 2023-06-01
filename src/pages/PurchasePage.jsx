import { useContext, useEffect } from 'react';
import { AppLayout, ModalLayout } from '../layouts';
import { SaveBilling } from '../components/Billing/SaveBilling';
import { modalContext } from '../context';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const PurchasePage = () => {
    const { handleShow } = useContext(modalContext);
    const navigate = useNavigate();

    useEffect(() => {
        handleShow(true);
    }, []);

    return (
        <AppLayout>
            <Button
                variant='success'
                style={{
                    fontSize: '40px',
                    position: 'absolute',
                    left: '50%',
                    bottom: ' 50%',
                    transform: 'translateX(-50%)',
                }}
                onClick={() => navigate('/shopping')}
            >
                Go back
            </Button>
            <ModalLayout modalTitle="Let's do your purchase!">
                <SaveBilling />
            </ModalLayout>
        </AppLayout>
    );
};
