import React, { useEffect, useState } from "react";
import { Button, Container, Form, Alert, Row, Col } from "react-bootstrap";
import { getDocs, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Navigation from "../Components/Navigation";

export default function QueryPage() {
  const [user, loading] = useAuthState(auth);
  const [queryDate, setQueryDate] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function queryPost() {
    if (!queryDate) {
      setError("Please select a date.");
      return;
    }

    const querySnapshot = await getDocs(collection(db, "leaveEntries"));

    const filteredPosts = querySnapshot.docs.filter(doc => {
      const data = doc.data();
      const startDate = new Date(data.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(data.endDate);
      endDate.setHours(23, 59, 59, 999);
      const currentDate = new Date(queryDate);
      return currentDate >= startDate && currentDate <= endDate;
    }).map(doc => ({ id: doc.id, ...doc.data() }));

    setResults(filteredPosts);

    if (filteredPosts.length === 0) {
      setError("No leave requests found for the selected date.");
    } else {
      setError("");
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [navigate, user, loading]);

  const ResultsRow = () => {
    return results.map((result, index) => (
      <ResultDetail key={index} result={result} />
    ));
  };

  return (
    <>
      <Navigation />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Query Leave Requests</h1>
        <Form>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="queryDate">
            <Form.Label>Queried Date</Form.Label>
            <Form.Control
              type="date"
              value={queryDate}
              style={{ width: '150px' }}
              onChange={(e) => setQueryDate(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={queryPost}>
            Query
          </Button>
        </Form>
        <Row style={{ marginTop: "2rem" }}>
          <ResultsRow />
        </Row>
      </Container>
    </>
  );
}

function ResultDetail({ result }) {
  const { endDate, reason, startDate, timeStamp, userID } = result;
  return (
    <Col style={{ marginBottom: "2rem" }}>
      <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "5px" }}>
        <h5>User: {userID}</h5>
        <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
        <p><strong>Reason:</strong> {reason}</p>
        <p><strong>Request Timestamp:</strong> {new Date(timeStamp).toLocaleString()}</p>
      </div>
    </Col>
  );
}