import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { modalContext, payContext } from '../../context/';
import { swalMessage } from '../../helpers';

const initialForm = {
    tipo: '',
};

export const SavePay = () => {
    const { formState, onInputChange, onResetForm, tipo } = useForm(initialForm);
    const [loading, setLoading] = useState(false);
    const { handleClose } = useContext(modalContext);
    const { createPay } = useContext(payContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/saveFormaPago', formState); //agregar ruta API
            const { response_description, response, idPago } = data;
            if (response === 0) {
                throw new Error('Error!');
            }
            createPay({ idPago, ...formState });
            swalMessage({ text: response_description, title: 'Saved!' });
            onResetForm();
            handleClose();
        } catch (error) {
            console.log('error saving payment method', error);
            swalMessage('Something went wrong', 'Error!', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Tipo Pago</Form.Label>
                    <Form.Control type='tipo' name='tipo' onChange={onInputChange} value={tipo} />
                    <Form.Text className='text-muted'>Payment type</Form.Text>
                </Form.Group>

                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
