import { useState } from "react";
import { evaluate } from 'mathjs';
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import { Button, Container, Form } from "react-bootstrap";

import 'chart.js/auto'

const Secant = () => {

    const print = () => {
        console.log(data)

        setValueIter(data.map((x) => x.iteration));
        setValueXl(data.map((x) => x.Xl));
        setValueX1(data.map((x) => x.X1));
        setValueXr(data.map((x) => x.Xr));

        return (
            <Container>
                <table>
                    <thead>
                        <tr>
                            <th width="10%"> Iteration </th>
                            <th width="30%"> X0 </th>
                            <th width="30%"> X1 </th>
                            <th width="30%"> X-NEW </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td> {element.iteration} </td>
                                    <td> {element.Xl} </td>
                                    <td> {element.Xr} </td>
                                    <td> {element.X1} </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Container>
        );
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalFalseposition = (xl, xr) => {
        var x1, fXl, fXr, ea, scope;
        var iter = 0;
        var MAX = 50;
        var obj = {};
        const e = 0.00001;

        do {
            scope = {
                x: xr,
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x: xl,
            }
            fXl = evaluate(Equation, scope)

            x1 = xr - ((fXr * (xr - xl)) / (fXr - fXl));

            iter++;

            ea = error(xl, x1);
            obj = {
                iteration: iter,
                Xl: xl,
                X1: x1,
                Xr: xr
            }
            data.push(obj)

            xl = xr;
            xr = x1;

        }
        while (ea > e && iter < MAX)
        setX(x1)
    }

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const state = {
        labels: valueIter,
        datasets: [
            {
                label: 'X0',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 2,
                data: valueXl
            },
            {
                label: 'Xnew',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'green',
                borderWidth: 2,
                data: valueX1
            },
            {
                label: 'X1',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'blue',
                borderWidth: 2,
                data: valueXr
            }
        ]
    }

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^6)-20")
    const [X, setX] = useState(0)
    const [XL, setXL] = useState(0)
    const [XR, setXR] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) => {
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) => {
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = (event) => {
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)

        CalFalseposition(xlnum, xrnum);
        setHtml(print());

        event.preventDefault()
    }

    return (
        <Container>
            <Form>
                <header>
                    <Link to="/" ><img className='bt_home2' src='/home.png' alt='home' /></Link>
                    <h2 className='course-header'> Secant Method </h2>
                </header>

                <p style={{ padding: '0.5rem' }}></p>

                <Form.Group className='rooteq-course-div'>
                    <Form.Label style={{ padding: '1rem' }}> Input f(x) </Form.Label>
                    <input type="text" id="Equation" value={Equation} onChange={inputEquation} style={{ height: "30px", width: "10%", margin: "0 auto" }} className="form-control"></input>

                    <Form.Label style={{ padding: '1rem' }}> Input X0 </Form.Label>
                    <input type="number" id="XL" onChange={inputXL} style={{ height: "30px", width: "10%", margin: "0 auto" }} className="form-control"></input>

                    <Form.Label style={{ padding: '1rem' }}> Input X1 </Form.Label>
                    <input type="number" id="XR" onChange={inputXR} style={{ height: "30px", width: "10%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>

                <Button type="primary" className='bt_calculate' onClick={calculateRoot}> Calculate </Button>
            </Form>

            <br /> <h2 className='rooteq-course-div'> Answer = {X.toPrecision(7)} </h2>

            <Container className='rooteq-course-div'>
                <Line data={state} /> {html}
            </Container>
        </Container>
    )
}

export default Secant