import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { modalContext } from '../context/ModalContext';
import { AppLayout, ModalLayout } from '../layouts/';
import { SaveClient, UpdateClient } from '../components/Client/';
import { api } from '../api';

export const ClientsPage = () => {
    const { handleShow } = useContext(modalContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [textResponse, setTextResponse] = useState('');
    const [ClientToEdit, setClientToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listClients');
                setData(data.clients);
            } catch (error) {
                console.log('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleClick = (currentClient) => {
        handleShow();
        setClientToEdit(currentClient);
    };

    const handleDeleted = async (e, idCliente) => {
        if (confirm('Are you sure you want to delete this article?')) {
            try {
                const { data } = await api.post('/deleteClients', {
                    idCliente,
                });
                const { response_description } = data;
                setTextResponse(response_description);
            } catch (error) {
                console.log('Error deleting article');
            }
        }
    };

    return (
        <AppLayout>
            <h2>Clients page</h2>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <Table striped bordered hover variant='dark' style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>idCliente</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DPI</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((el) => (
                            <tr key={el.idCliente}>
                                <td>{el.idClinte}</td>
                                <td>{el.Nombre}</td>
                                <td>{el.Apellido}</td>
                                <td>{el.DPI}</td>
                                <td>
                                    <Button variant='warning' onClick={() => handleClick(el)}>
                                        <FiEdit height={59} />
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={(e) => handleDeleted(e, el.idCliente)}
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
                Add new Client
            </Button>
            {!ClientToEdit ? (
                <ModalLayout modalTitle='Save your new Client!'>
                    <SaveClient />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle={`Update Client: ${ClientToEdit.nombre}`}>
                    <UpdateClient idArticulo={ClientToEdit.idArticulo} />
                </ModalLayout>
            )}
        </AppLayout>
    );
};
