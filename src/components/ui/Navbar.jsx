import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CustomNavbar = () => {
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Ferreteria
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <NavDropdown title='Sections' id='basic-nav-dropdown'>
                            <NavDropdown.Item as={Link} to='/articles'>
                                Articulos
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/users'>
                                Usuarios
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/Client'>
                                Clientes
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/payment-method'>
                                Payment Method
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/shopping'>
                                Shopping
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/billing-history'>
                                Billing History
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
