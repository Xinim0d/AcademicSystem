import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import GroupModel from "../../../type/GroupModel.tsx";

export const AddingUser = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [groupId, setGroupId] = useState<string | null>(null);
    const [group, setGroup] = useState<string | null>(null);

    const [groups, setGroups] = useState<GroupModel[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5175/groups')
            .then(response => {
                setGroups(response.data);
            });
    }, []);

    const handleAddUser = async () => {
        try {
            if (role.toLowerCase() === 'student') {
                await axios.post('http://localhost:5175/users', {
                    email: email,
                    role: role,
                    groupId: groupId
                });
                navigate('/administrator');
            } else if (role.toLowerCase() === 'professor') {
                await axios.post('http://localhost:5175/users', {
                    email: email,
                    role: role
                });
                navigate('/administrator');
            }
        } catch (error) {
            console.error('Error adding user', error);
        }
    };

    return (
        <div>
            <div><strong>Adding User</strong></div>
            <InputGroup className="mb-3">
                <InputGroup.Text>Email</InputGroup.Text>
                <Form.Control aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
            <InputGroup className="mb-3">
                <DropdownButton
                    variant="outline-secondary"
                    title={role || "Role"}
                    id="input-group-dropdown-1"
                    onSelect={(eventKey) => setRole(eventKey || '')}
                >
                    <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
                    <Dropdown.Item eventKey="Professor">Professor</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
            {role === 'Student' &&
                <>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={group || "Group"}
                            id="input-group-dropdown-2"
                            onSelect={(eventKey) => {
                                const selectedGroup = groups.find(group => group.id.toString() === eventKey);
                                setGroupId(eventKey || null);
                                setGroup(selectedGroup ? selectedGroup.title : null);
                            }}
                        >
                            {groups.map((group: GroupModel) => (
                                <Dropdown.Item key={group.id} eventKey={group.id.toString()}>{group.title}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </InputGroup>
                    {group && <div>Selected Group: {group}</div>}
                </>
            }
            <Button className="w-100 mb-3" variant="outline-secondary" onClick={handleAddUser}>
                Add user
            </Button>
            <Button className="w-100" variant="outline-secondary" onClick={() => navigate('/administrator')}>
                Back
            </Button>
        </div>
    );
};