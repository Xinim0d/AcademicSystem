import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

export const CreatingGroup = () => {
    const navigate = useNavigate();
    const [groupTitle, setGroupTitle] = useState('');
    const [groupYear, setGroupYear] = useState('');

    const handleCreateGroup = async () => {
        try {
            await axios.post('http://localhost:5175/groups', {
                title: groupTitle,
                year: groupYear
            });
            navigate('/administrator');
        } catch (error) {
            console.error('Error creating group', error);
        }
    };

    return (
        <div>
            <div><strong>Create New Group</strong></div>
            <InputGroup className="mb-3">
                <InputGroup.Text>Group Title</InputGroup.Text>
                <Form.Control
                    aria-label="Group Name"
                    value={groupTitle}
                    onChange={(e) => setGroupTitle(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Group Year</InputGroup.Text>
                <Form.Control
                    aria-label="Group Year"
                    value={groupYear}
                    onChange={(e) => setGroupYear(e.target.value)}
                />
            </InputGroup>
            <Button className="w-100 mb-3" variant="outline-secondary" onClick={handleCreateGroup}>
                Create Group
            </Button>
            <Button className="w-100" variant="outline-secondary" onClick={() => navigate('/administrator')}>
                Back
            </Button>
        </div>
    );
};