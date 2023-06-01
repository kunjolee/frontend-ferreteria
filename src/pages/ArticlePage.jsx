import { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, MdDeleteOutline } from 'react-icons/all';

import { articleContext, modalContext } from '../context';
import { AppLayout, ModalLayout } from '../layouts/';
import { SaveArticle, UpdateArticle } from '../components/articles/';
import { api } from '../api';
import { swalMessage } from '../helpers';

export const ArticlePage = () => {
    const { handleShow } = useContext(modalContext);
    const { articles, getArticles, deleteArticle } = useContext(articleContext);
    const [loading, setLoading] = useState(false);
    const [articleToEdit, setArticleToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/listArticles');
                getArticles(data?.articles);
            } catch (error) {
                console.log('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleClick = (currentArticle) => {
        handleShow();
        setArticleToEdit(currentArticle);
    };

    const handleDeleted = async (e, idArticulo) => {
        if (confirm('Are you sure you want to delete this article?')) {
            try {
                const { data } = await api.post('/deleteArticle', {
                    idArticulo,
                });
                const { response_description, response } = data;

                if (response === 0) {
                    throw new Error('Error!');
                }
                deleteArticle(idArticulo);
                swalMessage({ text: response_description, title: 'Deleted!' });
            } catch (error) {
                console.log('Error deleting article', error);
                swalMessage({ text: 'Something went wrong', title: 'Error!', icon: 'error' });
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
                        {articles?.map((el) => (
                            <tr key={el.idArticulo}>
                                <td>{el.idArticulo}</td>
                                <td>{el.nombre}</td>
                                <td>{el.stock}</td>
                                <td>{el.precio}</td>
                                <td>
                                    <Button variant='warning' onClick={() => handleClick(el)}>
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

            <Button variant='primary' onClick={() => handleClick()}>
                Add new article
            </Button>
            {!articleToEdit ? (
                <ModalLayout modalTitle='Save your new article!'>
                    <SaveArticle />
                </ModalLayout>
            ) : (
                <ModalLayout modalTitle={`Update article: ${articleToEdit.nombre}`}>
                    <UpdateArticle article={articleToEdit} />
                </ModalLayout>
            )}
        </AppLayout>
    );
};
