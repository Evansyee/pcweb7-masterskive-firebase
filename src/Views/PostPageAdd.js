import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, Alert } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

export default function PostPageAdd() {
  const [user, loading] = useAuthState(auth);
  const [userID, setUserID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function addPost() {
    if (new Date(endDate) < new Date(startDate)) {
      setError("End date must be the same or later than the start date.");
      return;
    }
    await addDoc(collection(db, "leaveEntries"), {
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
    if (!user) return navigate("/login");
  }, [navigate, user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">MasterSkive</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Leave Request</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Leave Request</h1>
        <Form>
          {error && <Alert variant="danger">{error}</Alert>}
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

          <Button variant="primary" onClick={addPost}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}