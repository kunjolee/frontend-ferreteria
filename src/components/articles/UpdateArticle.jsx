import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { articleContext, modalContext } from '../../context/';
import { swalMessage } from '../../helpers';

export const UpdateArticle = ({ article }) => {
    const { idArticulo, ...rest } = article;

    const { formState, onInputChange, onResetForm, nombre, stock, precio } = useForm({ ...rest });
    const [loading, setLoading] = useState(false);

    const { handleClose } = useContext(modalContext);
    const { updateArticle } = useContext(articleContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const article = {
                idArticulo,
                ...formState,
            };
            const { data } = await api.post('/updateArticle', { ...article });

            const { response_description, response } = data;

            if (response === 0) {
                throw new Error('Error');
            }

            updateArticle({ ...article });
            swalMessage({ text: response_description, title: 'Updated!' });

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
                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
