import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* CSS */
import './App.css';

/* Component Menu */
import Courseofroot from './pageroot/Courseofroot';
import Courseofalgebra from './pageroot/Courseofalgebra';
import Courseofpolation from './pageroot/Courseofpolation';
import Courseofregression from './pageroot/Courseofregression';

/* Component Course */
import Course from './pages/Course';

/* Component Root of Equations */
import Bisection from './course/Bisection';
import Falseposition from './course/Falseposition';
import Onepoint from './course/Onepoint';
import Newton from './course/Newton';
import Secant from './course/Secant';

/* Component Interpolation */
import Inpolation from './course2/Inpolation';
import Lagrange from './course2/Lagrange';

/* Component Linear Algebra */
import Crammer from './course3/Crammer';
import Gaussjordan from './course3/Gaussjordan';
import Gausselimination from './course3/Gausselimination';

/* Component Regression */
import Regression from './course4/Regression';

function App() {
    return (
        <>
            <Router>

                <Routes>
                    {/* Course */}
                    <Route path='/' element={<Course />} />

                    {/* Root of Equations */}
                    <Route path='/courseofroot' element={<Courseofroot />} />

                    <Route path='/courseofroot/bisection' element={<Bisection />} />
                    <Route path='/courseofroot/falseposition' element={<Falseposition />} />
                    <Route path='/courseofroot/Onepoint' element={<Onepoint />} />
                    <Route path='/courseofroot/Newton' element={<Newton />} />
                    <Route path='/courseofroot/Secant' element={<Secant />} />

                    {/* Linear Algebra */}
                    <Route path='/courseofalgebra' element={<Courseofalgebra />} />

                    <Route path='/Courseofalgebra/Crammer' element={<Crammer />} />
                    <Route path='/Courseofalgebra/Gausselimination' element={<Gausselimination />} />
                    <Route path='/Courseofalgebra/Gaussjordan' element={<Gaussjordan />} />

                    {/* Interpolation */}
                    <Route path='/courseofpolation' element={<Courseofpolation />} />

                    <Route path='/courseofpolation/Inpolation' element={<Inpolation />} />
                    <Route path='/courseofpolation/Lagrange' element={<Lagrange />} />

                    {/* Regression */}
                    <Route path='/courseofregression' element={<Courseofregression />} />

                    <Route path='/courseofregression/Regression' element={<Regression />} />
                </Routes>

            </Router>
        </>
    );
}

export default App;