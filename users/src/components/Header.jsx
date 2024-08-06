import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Context from './Context';
function Header() {
    const { setSearch } = useContext(Context)
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link}>Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                        <Nav.Link as={Link} to={'/favorite'}>Favorite</Nav.Link>
                        <input type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)} />
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header