import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppLayout } from '../../layouts';
import { api } from '../../api';
import { Table } from 'react-bootstrap';

export const BillingDetails = () => {
    let { search } = useLocation();
    let query = new URLSearchParams(search);
    const [facturaDetails, setFacturaDetails] = useState([]);
    const [facturaGeneral, setFacturaGeneral] = useState({});
    const [loadingDetalle, setLoadingDetalle] = useState(false);
    const [loadingGeneral, setLoadingGeneral] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingDetalle(true);
            try {
                const { data } = await api.get(
                    `/listFacturaDetails?idFactura=${query.get('idFactura')}`
                );

                const { factura } = data;
                setFacturaDetails(factura);
            } catch (error) {
                console.log('Error getting facturaDetails', error);
            } finally {
                setLoadingDetalle(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingGeneral(true);
            try {
                const { data } = await api.get(
                    `/listFacturaById?idFactura=${query.get('idFactura')}`
                );

                const { factura } = data;
                setFacturaGeneral(factura[0]);
            } catch (error) {
                console.log('Error getting facturaDetails', error);
            } finally {
                setLoadingGeneral(false);
            }
        };

        fetchData();
    }, []);

    console.log(facturaGeneral);
    if (loadingGeneral) return <p>Loading...</p>;
    if (loadingDetalle) return <p>Loading...</p>;
    return (
        <AppLayout>
            <header>
                <h2 style={{ fontSize: '50px' }}>Factura </h2>
                <p style={{ margin: '0' }}>Ferreteria</p>
                <p style={{ margin: '0' }}>Antigua Carretera a Amatitlan, Villa Nueva 01064</p>
            </header>
            <section
                style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between' }}
            >
                <article>
                    <h4>Informacion</h4>
                    <p>Nombre: {facturaGeneral.nombre}</p>
                    <p>NIT: {facturaGeneral.nit}</p>
                </article>
                <article>
                    <h4>General</h4>
                    <p>Fecha: {facturaGeneral.fecha}</p>
                    <p>Metodo de pago: {facturaGeneral.formaPago}</p>
                </article>
                <article>
                    <h4>Detalles</h4>
                    <p>Empleado: {facturaGeneral.empleado}</p>
                    <p>Num pedido: #{facturaGeneral.idFactura}</p>
                </article>
            </section>
            <h3 style={{ margin: '2rem 0' }}>Total: ${facturaGeneral.total}</h3>
            <Table striped bordered hover variant='light' style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {facturaDetails?.map((el, i) => (
                        <tr key={i}>
                            <td>{el.articulo}</td>
                            <td>${el.articuloPrecio}</td>
                            <td>{el.cantidad}</td>
                            <td>${el.subTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </AppLayout>
    );
};
