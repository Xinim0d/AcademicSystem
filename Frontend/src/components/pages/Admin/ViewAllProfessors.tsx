import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, InputGroup } from 'react-bootstrap';
import Select from 'react-select';

interface Professor {
    id: number;
    name: string;
    email: string;
}

interface Subject {
    value: number;
    label: string;
}

export const ViewAllProfessors = () => {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await axios.get('http://localhost:5175/professors');
                setProfessors(response.data);
            } catch (error) {
                console.error('Error fetching professors', error);
            }
        };
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5175/subjects');
                setSubjects(response.data.map((subject: any) => ({ value: subject.id, label: subject.title })));
            } catch (error) {
                console.error('Error fetching subjects', error);
            }
        }

        fetchProfessors();
        fetchSubjects();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5175/users/professors/${id}`);
            setProfessors(professors.filter(professor => professor.id !== id));
        } catch (error) {
            console.error('Error deleting professor', error);
        }
    };

    const handleAssignSubject = async () => {
        if (selectedProfessor && selectedSubjects.length > 0) {
            try {
                for (const subject of selectedSubjects) {
                    await axios.post('http://localhost:5175/users/assign-subject-to-professor', {
                        professorId: selectedProfessor.id,
                        subjectId: subject.value
                    });
                }
                alert('Subjects assigned successfully');
                // Update the professor's subjects
                setProfessors(professors.map(professor =>
                    professor.id === selectedProfessor.id
                        ? { ...professor, subjectIds: selectedSubjects.map(subject => subject.value) }
                        : professor
                ));
            } catch (error) {
                console.error('Error assigning subjects', error);
            }
        }
    };

    return (
        <div>
            <h1>All Professors</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {professors.map(professor => (
                    <tr key={professor.id}>
                        <td>{professor.id}</td>
                        <td>{professor.name}</td>
                        <td>{professor.email}</td>
                        <td>
                            <Button variant="primary" onClick={() => setSelectedProfessor(professor)}>Assign Subjects</Button>
                            <Button variant="danger" onClick={() => handleDelete(professor.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {selectedProfessor && (
                <div>
                    <h2>Assign Subjects to {selectedProfessor.name}</h2>
                    <InputGroup className="mb-3">
                        <Select
                            isMulti
                            options={subjects}
                            onChange={setSelectedSubjects}
                        />
                    </InputGroup>
                    <Button variant="success" onClick={handleAssignSubject}>Assign Subjects</Button>
                </div>
            )}
        </div>
    );
};