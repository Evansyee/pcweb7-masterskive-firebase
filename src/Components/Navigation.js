import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import logo from './EatSnake.png';

export default function Navigation() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Navbar variant="dark" bg="dark">
            <Container>
                <Navbar.Brand href="/">
                    <Image
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-mid"
                        alt="Logo"
                    />
                    {' '}
                    MasterSkive
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/add">Apply Leave</Nav.Link>
                    <Nav.Link href="/query">Query Leave</Nav.Link>
                    {user ? (
                        <>
                            <Nav.Item style={{ color: 'white', paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
                                {user.uid}
                            </Nav.Item>
                            <Nav.Link onClick={() => signOut(auth)}>Sign Out</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link href="/signin">Sign In</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}