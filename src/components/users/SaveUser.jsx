import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';

import { api } from '../../api';
import { modalContext, userContext } from '../../context/';
import { swalMessage } from '../../helpers';

const initialForm = {
    correo: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
};

export const SaveUser = () => {
    const { formState, onInputChange, onResetForm, correo, telefono, direccion, fechaNacimiento } =
        useForm(initialForm);

    const [loading, setLoading] = useState(false);
    const { handleClose } = useContext(modalContext);
    const { createUser } = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/saveUser', formState);
            const { response_description, response, idUsuario } = data;

            if (response === 0) {
                throw new Error('Error!');
            }
            swalMessage({ text: response_description, title: 'Saved!' });
            createUser({ idUsuario, ...formState });
            onResetForm();
            handleClose();
        } catch (error) {
            swalMessage('Something went wrong', 'Error!', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type='email'
                        name='correo'
                        onChange={onInputChange}
                        value={correo}
                    />
                    <Form.Text className='text-muted'>Insert your email</Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type='name'
                        name='telefono'
                        onChange={onInputChange}
                        value={telefono}
                    />
                    <Form.Text className='text-muted'>Insert your phone number</Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type='name'
                        name='direccion'
                        onChange={onInputChange}
                        value={direccion}
                    />
                    <Form.Text className='text-muted'>Insert your direction</Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control
                        type='name'
                        name='fechaNacimiento'
                        onChange={onInputChange}
                        value={fechaNacimiento}
                    />
                    <Form.Text className='text-muted'>Insert your birth date</Form.Text>
                </Form.Group>

                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
