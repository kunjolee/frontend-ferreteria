import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { modalContext } from '../../context/ModalContext';

const initialForm = {
    nombre: '',
    stock: '',
    precio: '',
};

export const UpdateArticle = ({ idArticulo = 0 }) => {
    const { formState, onInputChange, onResetForm, nombre, stock, precio } = useForm(initialForm);
    const [loading, setLoading] = useState(false);
    const [textResponse, setTextResponse] = useState('');

    const { handleClose } = useContext(modalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/updateArticle', {
                idArticulo,
                ...formState,
            });
            const { response_description } = data;

            setTextResponse(response_description);
            onResetForm();
            handleClose();
        } catch (error) {
            console.log('Error updating Article');
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
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type='name' name='stock' onChange={onInputChange} value={stock} />
                    <Form.Text className='text-muted'>Insert your new stock</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type='name'
                        name='precio'
                        onChange={onInputChange}
                        value={precio}
                    />
                    <Form.Text className='text-muted'>Insert your new price</Form.Text>
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
