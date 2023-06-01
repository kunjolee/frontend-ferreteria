import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { modalContext } from '../context/ModalContext';
import { AppLayout, ModalLayout } from '../layouts/';
import { SaveUser, UpdateUser } from '../components/users/';
import { swalMessage } from '../helpers';

import { api } from '../api';

export const UserPage = () => {
    const { handleShow } = useContext(modalContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listUsers');
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

    const handleDeleted = async (e, idUsuario) => {
        if (confirm('Are you sure you want to delete it?')) {
            try {
                const { data } = await api.post('/deleteUser', {
                    idUsuario,
                });
                const { response_description, response } = data;

                if (response === 0) {
                    throw new Error('Error!');
                }
                swalMessage({ text: response_description, title: 'Deleted!' });
            } catch (error) {
                swalMessage({ text: 'Something went wrong', title: 'Error!', icon: 'error' });
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
                            <tr key={el.idUsuario}>
                                <td>{el.idUsuario}</td>
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
                                        onClick={(e) => handleDeleted(e, el?.idUsuario)}
                                    >
                                        <MdDeleteOutline />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Button variant='primary' onClick={() => handleClick()}>
                Add new user
            </Button>
            {!userToEdit ? (
                <ModalLayout modalTitle='Save your new User!!'>
                    <SaveUser />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle={`Update User: ${userToEdit.correo}`}>
                    <UpdateUser usuario={userToEdit} />
                </ModalLayout>
            )}
        </AppLayout>
    );
};
