import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { empleadoContext, modalContext } from '../context';
import { AppLayout, ModalLayout } from '../layouts/';
import { SaveEmpleado, UpdateEmpleado } from '../components/Empleados/';
import { api } from '../api';
import { swalMessage } from '../helpers';

export const EmployePage = () => {
    const { handleShow } = useContext(modalContext);
    const { empleados, getEmpleados, deleteEmpleado } = useContext(empleadoContext);
    const [loading, setLoading] = useState(false);
    const [empleadoToEdit, setEmpleadoToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listEmpleados');
                getEmpleados(data?.empleados);
            } catch (error) {
                console.log('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleClick = (currentempleado) => {
        handleShow();
        setEmpleadoToEdit(currentempleado);
    };

    const handleDeleted = async (e, idEmpleado) => {
        if (confirm('Are you sure you want to delete this empleado?')) {
            try {
                const { data } = await api.post('/deleteEmpleado', {
                    idEmpleado,
                });
                const { response_description, response } = data;

                if (response === 0) {
                    throw new Error('Error!');
                }
                deleteEmpleado(idEmpleado);
                swalMessage({ text: response_description, title: 'Deleted!' });
            } catch (error) {
                console.log('Error deleting empleado', error);
                swalMessage({ text: 'Something went wrong', title: 'Error!', icon: 'error' });
            }
        }
    };

    return (
        <AppLayout>
            <h2>Employees page</h2>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <Table striped bordered hover variant='dark' style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>idEmpleado</th>
                            <th>Nombre</th>
                            <th>apellido</th>
                            <th>User email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados?.map((el) => (
                            <tr key={el.idEmpleado}>
                                <td>{el.idEmpleado}</td>
                                <td>{el.nombre}</td>
                                <td>{el.apellido}</td>
                                <td>{el.correo}</td>
                                <td>
                                    <Button variant='warning' onClick={() => handleClick(el)}>
                                        <FiEdit height={59} />
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={(e) => handleDeleted(e, el.idEmpleado)}
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
                Add new empleado
            </Button>
            {!empleadoToEdit ? (
                <ModalLayout modalTitle='Save your new empleado!'>
                    <SaveEmpleado />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle={`Update empleado: ${empleadoToEdit.nombre}`}>
                    <UpdateEmpleado empleado={empleadoToEdit} />
                </ModalLayout>
            )}
        </AppLayout>
    );
};
