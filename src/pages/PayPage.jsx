import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { modalContext } from '../context/ModalContext';
import { AppLayout, ModalLayout } from '../layouts/';
import { SavePay, UpdatePay } from '../components/Pay/';
import { api } from '../api';
import { swalMessage } from '../helpers';

export const PayPage = () => {
    const { handleShow } = useContext(modalContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [PayToEdit, setPayToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listFormaPagos');
                setData(data.formaPago);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleClick = (currentpay) => {
        handleShow();
        setPayToEdit(currentpay);
    };

    const handleDeleted = async (e, idPago) => {
        if (confirm('Are you sure you want to delete this payment method')) {
            try {
                const { data } = await api.post('/deleteFormaPago', {
                    idPago,
                });
                const { response_description } = data;
                swalMessage({ text: response_description, title: 'Deleted!' });
            } catch (error) {
                console.log('Error deleting payment method', error);
                swalMessage('Something went wrong', 'Error!', 'error');
            }
        }
    };
    return (
        <AppLayout>
            <h2>payment method page</h2>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <Table striped bordered hover variant='dark' style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>idPago</th>
                            <th>Tipo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((el) => (
                            <tr key={el.idPago}>
                                <td>{el.idPago}</td>
                                <td>{el.tipo}</td>
                                <td>
                                    <Button variant='warning' onClick={() => handleClick(el)}>
                                        <FiEdit height={59} />
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={(e) => handleDeleted(e, el.idPago)}
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
                Add new payment method
            </Button>
            {!PayToEdit ? (
                <ModalLayout modalTitle='Save your newpayment method'>
                    <SavePay />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle={`Update payment method: ${PayToEdit.tipo}`}>
                    <UpdatePay formaPago={PayToEdit} />
                </ModalLayout>
            )}
        </AppLayout>
    );
};
