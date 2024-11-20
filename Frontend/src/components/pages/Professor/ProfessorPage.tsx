import {Button, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";


export const ProfessorPage = () => {
    return(
        <div>
            <div><strong>Welcome, Professor!</strong></div>
            <InputGroup className="mb-3 mt-3 d-flex justify-content-center">
                <Link to="/assign-grade">
                    <Button variant="outline-secondary" id="button-addon1">
                        Assign grade
                    </Button>
                </Link>
            </InputGroup>
        </div>
            )
            }