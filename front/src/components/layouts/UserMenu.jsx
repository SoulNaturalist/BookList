import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

export default function UserMenu(props) {
  return (
    <Tab.Container defaultActiveKey="first">
      <Row style={{"position":"relative", "top":"100px", width:"40%"}}>
        <Col sm={1} xs={6} md={4}>
          <Nav variant="pills" className="flex-column" >
            <Nav.Item>
              <Nav.Link eventKey="first">{props.first_title}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">{props.second_title}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">{props.first_content}</Tab.Pane>
            <Tab.Pane eventKey="second">{props.second_content}</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
