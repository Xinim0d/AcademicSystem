import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/pages/Home.tsx";

import { ProfessorPage } from './components/pages/Professor/ProfessorPage.tsx';
import { AssignGrade } from './components/pages/Professor/AssignGrade.tsx';

import { StudentPage } from './components/pages/Student/StudentPage.tsx';

import { AdministratorPage } from './components/pages/Admin/AdministratorPage.tsx';
import { AddingUser } from './components/pages/Admin/AddingUser.tsx';
import { CreatingGroup } from './components/pages/Admin/CreatingGroup.tsx';
import { CreatingSubject } from './components/pages/Admin/CreatingSubject.tsx';
import { ViewAllStudents } from './components/pages/Admin/ViewAllStudents.tsx';
import { ViewAllProfessors } from './components/pages/Admin/ViewAllProfessors.tsx';
import { ViewAllGroups } from './components/pages/Admin/ViewAllGroups.tsx';
import { ViewAllSubjects } from './components/pages/Admin/ViewAllSubjects.tsx';
import {NotFound} from './components/pages/NotFound.tsx';


function App() {

  return (
   <Routes>
       <Route path ='/' element={<Home />} />
       <Route path='/professor/:professorId' element={<ProfessorPage />} />
       <Route path='/assign-grade' element={<AssignGrade />} />

       <Route path='/student/:studentId' element={<StudentPage />} />

       <Route path='/administrator' element={<AdministratorPage />} />
       <Route path='/adding-user' element={<AddingUser />} />
       <Route path='/creating-group' element={<CreatingGroup />} />
       <Route path='/creating-subject' element={<CreatingSubject />} />
       <Route path='/all-students' element={<ViewAllStudents />} />
       <Route path='/all-professors' element={<ViewAllProfessors />} />
       <Route path='/all-groups' element={<ViewAllGroups />} />
       <Route path='/all-subjects' element={<ViewAllSubjects />} />
       <Route path='*' element={<NotFound />} />
   </Routes>
  )
}

export default App
