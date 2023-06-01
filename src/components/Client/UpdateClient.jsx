import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { clientContext, modalContext } from '../../context/';
import { swalMessage } from '../../helpers';

export const UpdateClient = ({ cliente }) => {
    const { idCliente, ...rest } = cliente;
    const { formState, onInputChange, onResetForm, nombre, apellido, dpi } = useForm({ ...rest });
    const [loading, setLoading] = useState(false);

    const { handleClose } = useContext(modalContext);
    const { updateClient } = useContext(clientContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const client = {
                idCliente,
                ...formState,
            };
            const { data } = await api.post('/updateClients', client);
            const { response_description } = data;
            updateClient(client);
            swalMessage({ text: response_description, title: 'Updated!' });

            onResetForm();
            handleClose();
        } catch (error) {
            console.log('Error updating Client', error);
            swalMessage({ titltext: 'Something went wrong', title: 'Error!', icon: 'error' });
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
                    <Form.Label>dpi</Form.Label>
                    <Form.Control type='name' name='dpi' onChange={onInputChange} value={dpi} />
                    <Form.Text className='text-muted'>Insert your new dpi</Form.Text>
                </Form.Group>
                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
