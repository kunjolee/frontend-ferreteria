import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { modalContext, payContext } from '../../context/';
import { swalMessage } from '../../helpers';

export const UpdatePay = ({ formaPago }) => {
    const { idPago, ...rest } = formaPago;
    const { formState, onInputChange, onResetForm, tipo } = useForm({ ...rest });
    const [loading, setLoading] = useState(false);
    const { handleClose } = useContext(modalContext);
    const { updatePay } = useContext(payContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const pay = {
                idPago,
                ...formState,
            };
            const { data } = await api.post('/updateFormaPago', pay);

            const { response_description, response } = data;
            if (response === 0) {
                throw new Error('Error');
            }
            updatePay(pay);
            swalMessage({ text: response_description, title: 'Updated!' });
            onResetForm();
            handleClose();
        } catch (error) {
            console.log('Error updating Pay', error);
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
                    <Form.Text className='text-muted'>payment type</Form.Text>
                </Form.Group>

                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
