import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd';

/* CSS */
import './Course.css'

function Course() {

    return (

        <div className='course'>
            <header>
                <Link to="/" > <img className='bt_home2' src='/home.png' alt='home'/> </Link>
                <h2 className='course-header'> Numerical Method </h2> 
            </header>

            <div className='row-course'>               

                <div className='bg-rooteq'>
                    <div className='rooteq-course-div'>
                        <h2 style={{padding:'2.5rem'}}> ROOT OF EQUATIONS </h2>
                    
                        <p style={{padding:'1rem'}}></p> 
                        
                        <Link to="./courseofroot"> <Button type="primary" className='bt_root_of_equation'> Root Of Equation </Button> </Link>
                    </div>
                </div>

                <div className='bg-linear'>
                    <div className='rooteq-course-div'>
                        <h2 style={{padding:'2.5rem'}}> LINEAR ALGEBRA </h2>
                    
                        <p style={{padding:'1rem'}}></p>

                        <Link to="./courseofalgebra"> <Button type="primary" className='bt_root_of_equation'> Linear Algebra </Button> </Link>
                    </div>
                </div>

                <div className='bg-polation'>
                    <div className='rooteq-course-div'>
                        <h2 style={{padding:'2.5rem'}}> INTERPOLATION </h2>
                    
                        <p style={{padding:'1rem'}}></p>

                        <Link to="./courseofpolation"> <Button type="primary" className='bt_root_of_equation'> INTERPOLATION </Button> </Link>
                    </div>
                </div>

                <div className='bg-linearRegression'>
                    <div className='rooteq-course-div'>
                        <h2 style={{padding:'2.5rem'}}> REGRESSION </h2>
                    
                        <p style={{padding:'1rem'}}></p>

                        <Link to="./courseofregression"> <Button type="primary" className='bt_root_of_equation'> REGRESSION </Button> </Link>
                    </div>
                </div>
         
            </div>
        </div>
    )
}

export default Course