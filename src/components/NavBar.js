import React from 'react';
import { Navbar, Nav, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { useSelector, useDispatch } from 'react-redux';
import ACTION_TYPES from '../common/action-types';

export default function NavBar() {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.startDate);
  const finishDate = useSelector((state) => state.finishDate);
  //   const finishDate = useSelector((state) => state.finishDate);
  //   const finishDate = useSelector((state) => state.finishDate);
  //   const finishDate = useSelector((state) => state.finishDate);
  //   const finishDate = useSelector((state) => state.finishDate);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Navbar.Brand>Your investments</Navbar.Brand>
      <Nav className="mr-auto" variant="pills">
        <Nav.Item style={{ color: 'white' }}>
          Start date:
          <DatePicker
            onChange={(date) => dispatch({ type: ACTION_TYPES.CHANGE_START_DATE, value: date })}
            value={startDate}
          />
        </Nav.Item>
        <Nav.Item style={{ color: 'white' }}>
          Finish date:
          <DatePicker
            onChange={(date) => dispatch({ type: ACTION_TYPES.CHANGE_FINISH_DATE, value: date })}
            value={finishDate}
          />
        </Nav.Item>
      </Nav>
      <Form inline>
        <Col>
          <Row>
            <Form.Check
              column="sm"
              type="checkbox"
              variant="light"
              label="Contributions"
              style={{ color: 'white' }}
              defaultChecked
              onClick={() => dispatch({ type: ACTION_TYPES.SHOW_CONTRIBUTIONS })}
            />
            <Form.Check
              column="sm"
              type="checkbox"
              variant="light"
              label="Daily Return"
              style={{ color: 'white' }}
              defaultChecked
              onClick={() => dispatch({ type: ACTION_TYPES.SHOW_DAILY_RETURN })}
            />
          </Row>
        </Col>
        <Col>
          <Row>
            <Form.Check
              column="sm"
              type="checkbox"
              variant="light"
              label="Portfolio Index"
              style={{ color: 'white' }}
              defaultChecked
              onClick={() => dispatch({ type: ACTION_TYPES.SHOW_PF_INDEX })}
            />
          </Row>
          <Row>
            <Form.Check
              column="sm"
              type="checkbox"
              variant="light"
              label="Portfolio Value"
              style={{ color: 'white' }}
              defaultChecked
              onClick={() => dispatch({ type: ACTION_TYPES.SHOW_PF_VALUE })}
            />
          </Row>
        </Col>
      </Form>
    </Navbar>
  );
}
