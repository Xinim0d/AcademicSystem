import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';

interface Student {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    title: string;
}

export const AssignGrade = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
    const [grade, setGrade] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        const fetchStudentsAndSubjects = async () => {
            try {
                const studentsResponse = await axios.get('http://localhost:5175/students');
                setStudents(studentsResponse.data);
                const subjectsResponse = await axios.get('http://localhost:5175/subjects');
                setSubjects(subjectsResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchStudentsAndSubjects();
    }, []);

    const handleAssignGrade = async () => {
        if (selectedStudent && selectedSubject && grade && title) {
            try {
                await axios.post('http://localhost:5175/StudentSubjectGrades', {
                    title: title,
                    value: parseInt(grade),
                    studentId: selectedStudent,
                    subjectId: selectedSubject
                });
                alert('Grade assigned successfully');
            } catch (error) {
                console.error('Error assigning grade', error);
            }
        } else {
            alert('Please select a student, subject, and enter a grade and title');
        }
    };

    return (
        <div>
            <h1>Assign Grade</h1>
            <InputGroup className="mb-3">
                <DropdownButton
                    variant="outline-secondary"
                    title={selectedStudent ? students.find(student => student.id === selectedStudent)?.name : "Select Student"}
                    id="input-group-dropdown-student"
                    onSelect={(eventKey) => setSelectedStudent(Number(eventKey))}
                >
                    {students.map(student => (
                        <Dropdown.Item key={student.id} eventKey={student.id.toString()}>{student.name}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </InputGroup>
            <InputGroup className="mb-3">
                <DropdownButton
                    variant="outline-secondary"
                    title={selectedSubject ? subjects.find(subject => subject.id === selectedSubject)?.title : "Select Subject"}
                    id="input-group-dropdown-subject"
                    onSelect={(eventKey) => setSelectedSubject(Number(eventKey))}
                >
                    {subjects.map(subject => (
                        <Dropdown.Item key={subject.id} eventKey={subject.id.toString()}>{subject.title}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Title</InputGroup.Text>
                <Form.Control aria-label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Grade</InputGroup.Text>
                <Form.Control aria-label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
            </InputGroup>
            <Button variant="outline-secondary" onClick={handleAssignGrade}>Assign Grade</Button>
        </div>
    );
};