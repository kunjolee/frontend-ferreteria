import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AppLayout } from '../layouts/AppLayout';
import { api } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const BillingHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate('/');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/listFactura');
                const { facturas } = data;
                setData(facturas);
            } catch (error) {
                console.log('error getting factura', error);
            }
        };
        fetchData();
    }, []);

    const goToDetails = (idFactura) => {
        navigate(`/billing-details?idFactura=${idFactura}`);
    };

    return (
        <AppLayout>
            <h2>Billing history</h2>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <Table striped bordered hover variant='light' style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>idFactura</th>
                            <th>Nombre del Cliente</th>
                            <th>Nit</th>
                            <th>Empleado</th>
                            <th>Forma de Pago</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((el) => (
                            <tr key={el.idFactura}>
                                <td>{el.idFactura}</td>
                                <td>{el.nombre}</td>
                                <td>{el.nit}</td>
                                <td>{el.empleado}</td>
                                <td>{el.formaPago}</td>
                                <td>{el.fecha}</td>
                                <td>${el.total}</td>
                                <td>
                                    <Button
                                        variant='info'
                                        onClick={() => goToDetails(el.idFactura)}
                                    >
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </AppLayout>
    );
};
