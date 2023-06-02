import { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { api } from '../../api';
import { modalContext, empleadoContext } from '../../context/';
import { swalMessage } from '../../helpers';

const initialForm = {
    nombre: '',
    apellido: '',
    idUsuario: '',
};

export const SaveEmpleado = () => {
    const { formState, onInputChange, onResetForm, nombre, apellido, idUsuario, setFormState } =
        useForm(initialForm);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const { handleClose } = useContext(modalContext);
    const { createEmpleado } = useContext(empleadoContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get('/listUsers');
                const { users } = data;
                setUsers(users);
                setFormState((currentState) => ({
                    ...currentState,
                    idUsuario: users[0].idUsuario,
                }));
            } catch (error) {
                console.log('error fetching User', error);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/saveEmpleado', formState);
            const { response_description, response, idEmpleado } = data;
            if (response === 0) {
                throw new Error('Error!');
            }
            const { correo } = users?.find((el) => el.idUsuario === parseInt(formState.idUsuario));
            const newEmpleado = {
                idEmpleado,
                ...formState,
                correo,
                idUsuario: parseInt(formState?.idUsuario),
            };
            createEmpleado(newEmpleado);
            swalMessage({ text: response_description, title: 'Saved!' });

            onResetForm();
            handleClose();
        } catch (error) {
            console.log('Error saving Empleado', error);
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

                <Form.Group className='mb-3'>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Select onChange={onInputChange} name='idUsuario' value={idUsuario}>
                        {users.map((el) => (
                            <option key={el.idUsuario} value={el.idUsuario}>
                                {el.correo}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {loading && <p>Loading...</p>}
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
};
