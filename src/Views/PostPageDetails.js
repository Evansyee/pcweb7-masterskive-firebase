import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Navigation from "../Components/Navigation";

export default function PostPageDetails() {
  const [userID, setUserID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deletePost(id) {
    await deleteDoc(doc(db, "leaveEntries", id));
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "leaveEntries", id));
    const post = postDocument.data();
    setUserID(post.userID);
    setStartDate(post.startDate);
    setEndDate(post.endDate);
    setReason(post.reason);
  }

  async function updatePost(id) {
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date must be the same or later than the start date.");
      return;
    }

    await updateDoc(doc(db, "leaveEntries", id), {
      userID,
      startDate,
      endDate,
      reason,
      timeStamp: new Date().toISOString(),
    });

    navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={userID}
                      onChange={(e) => setUserID(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      style={{ width: '150px' }}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      style={{ width: '150px' }}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="reason">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Reason for leave"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={() => updatePost(id)}>
                    Save Changes
                  </Button>
                </Form>
                <Card.Link
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer", color: "red", marginTop: "10px" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}