import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { modalContext, clientContext } from '../../context/';
import { swalMessage } from '../../helpers';

const initialForm = {
    nombre: '',
    apellido: '',
    dpi: '',
};

export const SaveClient = () => {
    const { formState, onInputChange, onResetForm, nombre, apellido, dpi } = useForm(initialForm);
    const [loading, setLoading] = useState(false);
    const { handleClose } = useContext(modalContext);
    const { createClient } = useContext(clientContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/saveClients', formState);
            const { response_description, response, idCliente } = data;
            if (response === 0) {
                throw new Error('Error!');
            }

            const newClient = {
                idCliente,
                ...formState,
            };
            createClient(newClient);
            swalMessage({ text: response_description, title: 'Saved!' });

            onResetForm();
            handleClose();
        } catch (error) {
            console.log('Error saving client', error);
            swalMessage('Something went wrong', 'Error!', 'error');
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
                    <Form.Text className='text-muted'>Insert your name</Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>apellido</Form.Label>
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
                    <Form.Control type='name' name='dpi' onChange={onInputChange} value={dpi} />
                    <Form.Text className='text-muted'>Insert your DPI</Form.Text>
                </Form.Group>

                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
