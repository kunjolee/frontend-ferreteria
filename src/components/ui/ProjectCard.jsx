import Card from 'react-bootstrap/Card';

export const ProjectCard = ({ image, name, carnet }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant='top' src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{carnet}</Card.Text>
            </Card.Body>
        </Card>
    );
};
