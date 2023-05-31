import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { modalContext } from '../context/ModalContext';
import { AppLayout, ModalLayout } from '../layouts/';
import { SavePay, UpdatePay } from '../components/Pay/';
import { api } from '../api';

export const PayPage = () => {
    const { handleShow } = useContext(modalContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [textResponse, setTextResponse] = useState('');
    const [PayToEdit, setPayToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listFormaPagos');
                setData(data.pay);
            } catch (error) {
                console.log('Error fetching data');
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

    const handleDeleted = async (e, IdPago) => {
        if (confirm('Are you sure you want to delete this payment method')) {
            try {
                const { data } = await api.post('/deleteFormaPago', {
                    IdPago,
                });
                const { response_description } = data;
                setTextResponse(response_description);
            } catch (error) {
                console.log('Error deleting payment method');
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
                            <tr key={el.IdPago}>
                                <td>{el.Tipo}</td>
                                <td>
                                    <Button variant='warning' onClick={() => handleClick(el)}>
                                        <FiEdit height={59} />
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={(e) => handleDeleted(e, el.IdPago)}
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
            {!PayToEdit ? (
                <ModalLayout modalTitle='Save your newpayment method'>
                    <SavePay />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle={`Update payment method: ${PayToEdit.Tipo}`}>
                    <UpdatePay IdPago={PayToEdit.IdPago} />
                </ModalLayout>
            )}
        </AppLayout>
    );
};