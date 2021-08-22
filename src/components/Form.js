// import { Form } from "react-bootstrap";
// import React,{useState} from 'react'


// export default function NewPostForm({title, setTitle, message, setMessage, image, setImage, fileInput}) {

//     const [localImage, setLocalImage] = useState(false)

//     return (
//         <Form>
//             <Form.Group className="mb-3">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Enter title" />
//             </Form.Group>

//             <Form.Group className="mb-3">
//                 <Form.Label>Message</Form.Label>
//                 <Form.Control value={message} onChange={(event) => setMessage(event.target.value)} as="textarea" rows={3} placeholder="Enter message" />
//             </Form.Group>

//             <Form.Check 
//                 style={{marginTop: 10, marginBottom: 10}} 
//                 type="switch" 
//                 id="custom-switch" 
//                 label="Upload image from your device" 
//                 checked={localImage} 
//                 onChange={(event) => setLocalImage(event.target.checked)}
//             />
//             {
//                 localImage
//                 ? <Form.Group controlId="formFile" className="mb-3">
//                         <Form.Label>Default file input example</Form.Label>
//                   <Form.Control type="file" ref={fileInput}/>
//                 </Form.Group>
//                 : <Form.Group className="mb-3">
//                     <Form.Label>Image URL</Form.Label>
//                   <Form.Control value={image} onChange={(event) => setImage(event.target.value)} type="url" placeholder="Enter image URL" />
//                 </Form.Group>
//             }
            
//         </Form>
//     )
// }
