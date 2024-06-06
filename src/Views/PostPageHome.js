import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "../Components/Navigation";

export default function PostPageHome() {
    const [posts, setPosts] = useState([]);

    async function getAllPosts() {
        const query = await getDocs(collection(db, "leaveEntries"));
        const filteredPosts = query.docs.filter(doc => {
            const data = doc.data()
            const startDate = new Date(data.startDate)
            startDate.setHours(0, 0, 0, 0)
            const endDate = new Date(data.endDate)
            endDate.setHours(23, 59, 59, 99)
            console.log(data.reason)
            console.log(startDate)
            console.log(endDate)
            console.log(Date())
            if (Date() >= startDate && Date() <= endDate)
                console.log("yes")
            return (Date() >= startDate && Date() <= endDate)
        })
        // const posts = query.docs.map((doc) => {
        //     return { id: doc.id, ...doc.data() };
        // });
        setPosts(filteredPosts);
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    const PostsRow = () => {
        return posts.map((post, index) => <PostDetail key={index} post={post} />);
    };

    return (
        <>
            <Navigation />
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
                    <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
                    <p><strong>Reason:</strong> {reason}</p>
                    <p><strong>Request Timestamp:</strong> {new Date(timeStamp).toLocaleString()}</p>
                </div>
            </Link>
        </Col>
    );
}