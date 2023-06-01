import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { modalContext } from '../../context/ModalContext';

const initialForm = {
    tipo: '',
};

export const UpdatePay = ({ idPago = 0 }) => {
    const { formState, onInputChange, onResetForm, tipo } = useForm(initialForm);
    const [loading, setLoading] = useState(false);
    const [textResponse, setTextResponse] = useState('');
    const { handleClose } = useContext(modalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/updateFormaPago', {
                idPago,
                ...formState,
            });

            const { response_description } = data;

            setTextResponse(response_description);
            // onResetForm();
            // handleClose();
        } catch (error) {
            console.log('Error updating Pay');
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

                {textResponse && <p>{textResponse}</p>}
                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
