import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { modalContext } from '../context/ModalContext';
import { AppLayout, ModalLayout } from '../layouts/';
import { SaveArticle, UpdateArticle } from '../components/articles/';
import { api } from '../api';

export const ArticlePage = () => {
    const { handleShow } = useContext(modalContext);
    const [saveUpdate, setSaveUpdate] = useState(true); // true -> save
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listArticles');
                setData(data.articles);
            } catch (error) {
                console.log('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    console.log(data);

    const handleClick = (flag = true) => {
        setSaveUpdate(flag);
        handleShow(true);
    };

    const handleDeleted = () => {
        if (confirm('Are you sure you want to delete this article?')) {
            console.log('deleted');
        }
    };

    return (
        <AppLayout>
            <h2>Articles page</h2>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <Table striped bordered hover variant='dark' style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>idArticulo</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((el) => (
                            <tr key={el.idArticulo}>
                                <td>{el.idArticulo}</td>
                                <td>{el.nombre}</td>
                                <td>{el.stock}</td>
                                <td>{el.precio}</td>
                                <td>
                                    <Button variant='warning' onClick={() => handleClick(false)}>
                                        <FiEdit height={59} />
                                    </Button>
                                    &nbsp;
                                    <Button variant='danger' onClick={handleDeleted}>
                                        <MdDeleteOutline />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Button variant='primary' onClick={() => handleClick()}>
                Add new article
            </Button>

            {saveUpdate ? (
                <ModalLayout modalTitle='Save your new article!'>
                    <SaveArticle />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle='Edit your article'>
                    <UpdateArticle />
                </ModalLayout>
            )}
        </AppLayout>
    );
};
