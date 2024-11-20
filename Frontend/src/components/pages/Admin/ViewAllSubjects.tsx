import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

interface Subject {
    id: number;
    title: string;
}

export const ViewAllSubjects = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5175/subjects');
                setSubjects(response.data);
            } catch (error) {
                setError('Error fetching subjects');
                console.error('Error fetching subjects', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5175/subjects/${id}`);
            setSubjects(subjects.filter(subject => subject.id !== id));
        } catch (error) {
            console.error('Error deleting subject', error);
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
            <h1>All Subjects</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {subjects.map(subject => (
                    <tr key={subject.id}>
                        <td>{subject.id}</td>
                        <td>{subject.title}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(subject.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};