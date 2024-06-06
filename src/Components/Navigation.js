import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

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
                <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/add">New Post</Nav.Link>
                    {user ? (
                        <Nav.Link onClick={() => signOut(auth)}>Sign Out</Nav.Link>
                    ) : (
                        <Nav.Link href="/signin">Sign In</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}