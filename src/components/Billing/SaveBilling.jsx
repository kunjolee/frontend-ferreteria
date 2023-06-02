import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../api';
import { Cart } from './Cart';
import { cartContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { swalMessage } from '../../helpers';

const initialForm = {
    nombre: '',
    nit: '',
    idPago: 0,
    fecha: '',
    idEmpleado: 0,
};

export const SaveBilling = () => {
    const { formState, onInputChange, nombre, nit, idPago, fecha, idEmpleado, setFormState } =
        useForm(initialForm);
    const { cart, total, emptyCart } = useContext(cartContext);

    const [loading, setLoading] = useState(false);
    const [formasPago, setFormasPago] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [steps, setSteps] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/listFormaPagos');
                const { formaPago } = data;
                setFormState((currentState) => ({ ...currentState, idPago: formaPago[0].idPago }));
                setFormasPago(formaPago);
            } catch (error) {
                console.log('Error getting formaPago', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/listEmpleados');
                const { empleados } = data;
                setFormState((currentState) => ({
                    ...currentState,
                    idEmpleado: empleados[0].idEmpleado,
                }));

                setEmpleados(empleados);
            } catch (error) {
                console.log('Error getting formaPago', error);
            }
        };
        fetchData();
    }, []);

    const nextStep = () => {
        setSteps((currentState) => {
            return currentState === 0 ? 1 : 0;
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to buy these items?')) {
            setLoading(true);
            try {
                const saveFacturaData = {
                    ...formState,
                    total,
                };

                const res = await api.post('/saveFactura', saveFacturaData);
                const { idFactura } = res.data;

                for (const article of cart.articles) {
                    const { idArticulo, cantidad, subtotal } = article;
                    const saveFacturaDetalleData = {
                        idFactura,
                        idArticulo,
                        cantidad,
                        subtotal,
                    };

                    await api.post('/saveFacturaDetalle', saveFacturaDetalleData);
                }
                swalMessage({ text: 'Purchase made correctly', title: 'Saved!' });
                emptyCart();
                navigate('/shopping');
            } catch (error) {
                console.log('Error al guardar factura', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {steps === 0 ? (
                    <>
                        <Form.Group className='mb-3'>
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                type='text'
                                name='nombre'
                                onChange={onInputChange}
                                value={nombre}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>NIT</Form.Label>
                            <Form.Control
                                type='text'
                                name='nit'
                                onChange={onInputChange}
                                value={nit}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                name='fecha'
                                onChange={onInputChange}
                                value={fecha}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Método de pago</Form.Label>
                            <Form.Select onChange={onInputChange} name='idPago' value={idPago}>
                                {formasPago.map((el) => (
                                    <option key={el.idPago} value={el.idPago}>
                                        {el.tipo}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Empleado</Form.Label>
                            <Form.Select
                                onChange={onInputChange}
                                name='idEmpleado'
                                value={idEmpleado}
                            >
                                {empleados.map((el) => (
                                    <option key={el.idEmpleado} value={el.idEmpleado}>
                                        {el.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {loading && <p>Loading...</p>}
                        <Button variant='primary' type='button' onClick={nextStep}>
                            Next
                        </Button>
                    </>
                ) : (
                    <div style={{ height: '75vh', overflowY: 'auto' }}>
                        <Cart />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant='primary'
                                type='button'
                                onClick={nextStep}
                                style={{ margin: '1.5rem 0 0' }}
                            >
                                Back
                            </Button>
                            <Button
                                variant='success'
                                type='submit'
                                style={{ margin: '1.5rem 0 0' }}
                                disabled={!cart.articles.length}
                            >
                                Confirm your purchase
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
};
