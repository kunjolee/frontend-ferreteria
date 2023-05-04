import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { modalContext } from '../context/ModalContext';
import { AppLayout, ModalLayout } from '../layouts/';
import { SaveUser, UpdateUser } from '../components/users/'



import { api } from '../api';

export const UserPage = () => {

    const { handleShow } = useContext(modalContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [textResponse, setTextResponse] = useState('');
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listUsers');
                console.log({ data })
                setData(data.users);
            } catch (error) {
                console.log('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleClick = (currentUser) => {
        handleShow();
        setUserToEdit(currentUser);
    };

    const handleDeleted = async (e, idUser) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const { data } = await api.post('/deleteUser', {
                    idUser,
                });
                const { response_description } = data;
                setTextResponse(response_description);
            } catch (error) {
                console.log('Error deleting user');
            }
        }
    };

    return (
        <AppLayout>
            <h2>User page</h2>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <Table striped bordered hover variant='dark' style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>idUsuario</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Fecha Nacimiento</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((el) => (
                            <tr key={el.idUser}>
                                <td>{el.idUser}</td>
                                <td>{el.correo}</td>
                                <td>{el.telefono}</td>
                                <td>{el.direccion}</td>
                                <td>{el.fechaNacimiento}</td>
                                <td>
                                    <Button variant='warning' onClick={() => handleClick(el)}>
                                        <FiEdit height={59} />
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={(e) => handleDeleted(e, el.idUser)}
                                    >
                                        <MdDeleteOutline />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {textResponse && <p style={{ fontSize: '32px' }}>{textResponse}</p>}

            <Button variant='primary' onClick={() => handleClick()}>
                Add new user
            </Button>
            {!userToEdit ? (
                <ModalLayout modalTitle='Save your new article!'>
                    <SaveUser />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle={`Update article: ${userToEdit.correo}`}>
                    <UpdateUser idArticulo={userToEdit.idUser} />
                </ModalLayout>
            )}
        </AppLayout>
    );
};
