import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

interface Subject {
    id: number;
    title: string;
    description: string;
}

export const StudentPage = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const { studentId } = useParams<{ studentId: string }>();
    console.log('Retrieved studentId from URL params:', studentId); // Log the retrieved studentId

    useEffect(() => {
        const fetchAssignedSubjects = async () => {
            try {
                if (!studentId) {
                    console.error('No student ID found in URL params');
                    return;
                }

                const response = await axios.get(`http://localhost:5175/users/student/${studentId}/subjects`);
                console.log('Fetched subjects:', response.data);
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching assigned subjects', error);
            }
        };

        fetchAssignedSubjects();
    }, [studentId]);

    return (
        <div>
            <strong>Welcome, Student!</strong>
            <h2>Your Assigned Subjects</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {subjects.length > 0 ? (
                    subjects.map(subject => (
                        <tr key={subject.id}>
                            <td>{subject.id}</td>
                            <td>{subject.title}</td>
                            <td>{subject.description}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No subjects assigned</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
};