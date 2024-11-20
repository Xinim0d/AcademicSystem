import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

interface Group {
    id: number;
    title: string;
    year: string;
}

export const ViewAllGroups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:5175/groups');
                setGroups(response.data);
            } catch (error) {
                setError('Error fetching groups');
                console.error('Error fetching groups', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5175/groups/${id}`);
            setGroups(groups.filter(group => group.id !== id));
        } catch (error) {
            console.error('Error deleting group', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>All Groups</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {groups.map(group => (
                    <tr key={group.id}>
                        <td>{group.id}</td>
                        <td>{group.title}</td>
                        <td>{group.year}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(group.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};