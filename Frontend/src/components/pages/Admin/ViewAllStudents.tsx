import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, InputGroup } from 'react-bootstrap';
import Select from 'react-select';

interface Student {
    id: number;
    name: string;
    email: string;
    groupId: number;
    subjectIds?: number[];
}

interface Subject {
    value: number;
    label: string;
}

export const ViewAllStudents = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [groups, setGroups] = useState<{ [key: number]: string }>({});
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5175/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students', error);
            }
        };

        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5175/subjects');
                setSubjects(response.data.map((subject: any) => ({ value: subject.id, label: subject.title })));
            } catch (error) {
                console.error('Error fetching subjects', error);
            }
        };

        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:5175/groups');
                const groupsData = response.data.reduce((acc: { [key: number]: string }, group: any) => {
                    acc[group.id] = group.title;
                    return acc;
                }, {});
                setGroups(groupsData);
            } catch (error) {
                console.error('Error fetching groups', error);
            }
        };

        fetchGroups();
        fetchStudents();
        fetchSubjects();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5175/users/students/${id}`);
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error('Error deleting student', error);
        }
    };

    const handleAssignSubject = async () => {
        if (selectedStudent && selectedSubjects.length > 0) {
            try {
                for (const subject of selectedSubjects) {
                    await axios.post('http://localhost:5175/assign-subject-to-student', {
                        studentId: selectedStudent.id,
                        subjectId: subject.value
                    });
                }
                alert('Subjects assigned successfully');
                const response = await axios.get(`http://localhost:5175/students/${selectedStudent.id}`);
                setStudents(students.map(student => student.id === selectedStudent.id ? response.data : student));
            } catch (error) {
                console.error('Error assigning subjects', error);
            }
        }
    };

    return (
        <div>
            <h1>All Students</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Group</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{groups[student.groupId] || 'No Group'}</td>
                        <td>
                            <Button variant="primary" onClick={() => setSelectedStudent(student)}>Assign Subjects</Button>
                            <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {selectedStudent && (
                <div>
                    <h2>Assign Subjects to {selectedStudent.name}</h2>
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