import { Container, Spinner } from 'react-bootstrap'

export default function Loading() {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <Spinner animation="border" role="status"/>
      </Container>
    )
  } 