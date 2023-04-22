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
    const [textResponse, setTextResponse] = useState('');
    const [id, setId] = useState(0);

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

    const handleClick = (flag = true, id = 0) => {
        setSaveUpdate(flag);
        handleShow(true);
        setId(id);
    };

    const handleDeleted = async (e, idArticulo) => {
        if (confirm('Are you sure you want to delete this article?')) {
            try {
                const { data } = await api.post('/deleteArticle', {
                    idArticulo,
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
                                    <Button
                                        variant='warning'
                                        onClick={() => handleClick(false, el.idArticulo)}
                                    >
                                        <FiEdit height={59} />
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={(e) => handleDeleted(e, el.idArticulo)}
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
