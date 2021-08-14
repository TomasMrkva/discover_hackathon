import { Form } from "react-bootstrap";
import React from 'react'


export default function NewPostForm({title, setTitle, message, setMessage, image, setImage}) {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control value={message} onChange={(event) => setMessage(event.target.value)} as="textarea" rows={3} placeholder="Enter message" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control value={image} onChange={(event) => setImage(event.target.value)} type="url" placeholder="Enter image URL" />
            </Form.Group>
        </Form>
    )
}
