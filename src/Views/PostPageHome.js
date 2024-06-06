import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function PostPageHome() {
    const [posts, setPosts] = useState([]);

    async function getAllPosts() {
        const query = await getDocs(collection(db, "leaveEntries"));
        const posts = query.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setPosts(posts);
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    const PostsRow = () => {
        return posts.map((post, index) => <PostDetail key={index} post={post} />);
    };

    return (
        <>
            <Navbar variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="/">MasterSkive</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/add">New Post</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <PostsRow />
                </Row>
            </Container>
        </>
    );
}

function PostDetail({ post }) {
    const { endDate, reason, startDate, timeStamp, userID } = post;
    return (
        <Col style={{ marginBottom: "2rem" }}>
            <Link to={`post/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
                <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "5px" }}>
                    <h5>User: {userID}</h5>
                    <p><strong>Start Date:</strong> {new Date(startDate).toLocaleString()}</p>
                    <p><strong>End Date:</strong> {new Date(endDate).toLocaleString()}</p>
                    <p><strong>Reason:</strong> {reason}</p>
                    <p><strong>Request Timestamp:</strong> {new Date(timeStamp).toLocaleString()}</p>
                </div>
            </Link>
        </Col>
    );
}