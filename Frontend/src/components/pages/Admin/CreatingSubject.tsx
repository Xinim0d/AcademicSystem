import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

export const CreatingSubject = () => {
    const navigate = useNavigate();
    const [subjectTitle, setSubjectTitle] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');

    const handleCreateSubject = async () => {
        try {
            await axios.post('http://localhost:5175/subjects', {
                title: subjectTitle,
                description: subjectDescription
            });
            navigate('/administrator');
        } catch (error) {
            console.error('Error creating subject', error);
        }
    };

    return (
        <div>
            <div><strong>Create New Subject</strong></div>
            <InputGroup className="mb-3">
                <InputGroup.Text>Subject Title</InputGroup.Text>
                <Form.Control
                    aria-label="Subject Title"
                    value={subjectTitle}
                    onChange={(e) => setSubjectTitle(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Subject Description</InputGroup.Text>
                <Form.Control
                    aria-label="Subject Description"
                    value={subjectDescription}
                    onChange={(e) => setSubjectDescription(e.target.value)}
                />
            </InputGroup>
            <Button className="w-100 mb-3" variant="outline-secondary" onClick={handleCreateSubject}>
                Create Subject
            </Button>
            <Button className="w-100" variant="outline-secondary" onClick={() => navigate('/administrator')}>
                Back
            </Button>
        </div>
    );
};