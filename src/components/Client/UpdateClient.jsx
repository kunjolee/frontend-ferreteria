import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { modalContext } from '../../context/ModalContext';

const initialForm = {
    nombre: '',
    apellido: '',
    DPI: '',
};

export const UpdateClient = ({ idCliente = 0 }) => {
    const { formState, onInputChange, onResetForm, nombre, apellido, DPI } = useForm(initialForm);
    const [loading, setLoading] = useState(false);
    const [textResponse, setTextResponse] = useState('');

    const { handleClose } = useContext(modalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/updateClients', {
                idCliente,
                ...formState,
            });
            const { response_description } = data;

            setTextResponse(response_description);
            onResetForm();
            handleClose();
        } catch (error) {
            console.log('Error updating Client');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type='name'
                        name='nombre'
                        onChange={onInputChange}
                        value={nombre}
                    />
                    <Form.Text className='text-muted'>Insert your new name</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>apelllido</Form.Label>
                    <Form.Control
                        type='name'
                        name='apellido'
                        onChange={onInputChange}
                        value={apellido}
                    />
                    <Form.Text className='text-muted'>Insert your Last Name</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>DPI</Form.Label>
                    <Form.Control type='name' name='DPI' onChange={onInputChange} value={DPI} />
                    <Form.Text className='text-muted'>Insert your new DPI</Form.Text>
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
