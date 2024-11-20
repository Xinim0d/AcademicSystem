import { InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const AdministratorPage = () => {
    return (
        <div>
            <div><strong>Welcome, Administrator!</strong></div>
            <InputGroup className="mb-3 mt-3 d-flex justify-content-center">
                <Link to="/adding-user">
                    <Button variant="outline-secondary" id="button-addon1">
                        Add new user
                    </Button>
                </Link>
            </InputGroup>
            <InputGroup className="mb-3 mt-3 d-flex justify-content-center">
                <Link to="/creating-group">
                    <Button variant="outline-secondary" id="button-addon2">
                        Create new group
                    </Button>
                </Link>
            </InputGroup>
            <InputGroup className="mb-3 mt-3 d-flex justify-content-center">
                <Link to="/creating-subject">
                    <Button variant="outline-secondary" id="button-addon3">
                        Create new subject
                    </Button>
                </Link>
            </InputGroup>
            <InputGroup className="mb-3 mt-5 d-flex justify-content-center">
                <Link to="/all-students">
                    <Button variant="outline-secondary" id="button-addon4">
                        View all students
                    </Button>
                </Link>
            </InputGroup>
            <InputGroup className="mb-3 mt-3 d-flex justify-content-center">
                <Link to="/all-professors">
                    <Button variant="outline-secondary" id="button-addon5">
                        View all professors
                    </Button>
                </Link>
            </InputGroup>
            <InputGroup className="mb-3 mt-3 d-flex justify-content-center">
                <Link to="/all-groups">
                    <Button variant="outline-secondary" id="button-addon6">
                        View all groups
                    </Button>
                </Link>
            </InputGroup>
            <InputGroup className="mb-3 mt-3 d-flex justify-content-center">
                <Link to="/all-subjects">
                    <Button variant="outline-secondary" id="button-addon7">
                        View all subjects
                    </Button>
                </Link>
            </InputGroup>
        </div>
    );
};