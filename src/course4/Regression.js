import { useState } from "react"
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom'
import { Button, Container, Form } from "react-bootstrap";

/* CSS */
import './Regression.css'
import * as math from 'mathjs'

import axios from "axios";

const Regression = () => {

    const getstartdata = () => {
        axios.get("http://localhost:3005/regession")
            .then(res => {
                const data = res.data

                console.log(data)

                setSize_array(res.data.sizearr)
                setSize_matrix(res.data.sizemat)

                setX(res.data.x)

                console.log("X: " + res.data.x + "Y" + res.data.y)
            }
            )
    }

    const [arrayA, setArrayA] = useState([[]])
    const [arrayB, setArrayB] = useState([])
    const [arrayA1d, setArrayA1d] = useState([])

    const [show_total, setShow_total] = useState([])

    const [size_array, setSize_array] = useState("")
    const [size_matrix, setSize_matrix] = useState("")

    const [inverse_matrix, setInverse_matrix] = useState([[]])
    const [count, setCount] = useState([])

    const [X, setX] = useState([])
    const [Y, setY] = useState([])

    const [fx, setFx] = useState([])

    const calregression = (size_array, size_matrix, X, Y, inverse_matrix) => {
        var a = Array.from(Array(size_matrix), () => Array(size_matrix).fill(0));
        var b = Array(size_matrix).fill(0);
        var iteration = 0

        a[0][0] = size_array
        for (let i = 1; i < size_matrix; i++) {
            for (let j = 0; j < size_array; j++) {
                a[0][i] += math.pow(X[j], i);
            }
        }

        var pow = 1
        var coun = 1

        for (let i = 1; i < size_matrix; i++) {
            for (let j = 0; j < size_matrix; j++) {
                for (let k = 0; k < size_array; k++) {
                    pow = coun + j
                    a[i][j] += math.pow(X[k], pow);
                }
            }
            coun++
        }

        for (let i = 0; i < size_matrix; i++) {
            for (let j = 0; j < size_array; j++) {
                b[i] += (math.pow(X[j], i)) * Y[j];
            }
        }

        console.log(a)
        console.log(b)

        setArrayA(a)
        setArrayB(b)

        var temp

        for (let k = 0; k < size_matrix; k++) {
            for (let j = 0; j < size_matrix; j++) {
                temp = a[k][j]
                arrayA1d.push(temp)
                console.log(temp)
                count.push(iteration)
                iteration++
            }
        }

        console.log(arrayA1d)

        var invarr = math.inv(a)

        console.log(invarr)

        var temp2 = 0
        var x = []

        for (let i = 0; i < size_matrix; i++) {
            for (let j = 0; j < size_matrix; j++) {
                temp2 += invarr[i][j] * b[j]
            }
            x[i] = temp2
            temp2 = 0
        }
        setShow_total(x)

        inverse_matrix = [[]]

        for (let i = 0; i < size_matrix; i++) {
            inverse_matrix[i] = [];
            for (let k = 0; k < size_matrix; k++) {
                inverse_matrix[i][k] = invarr[i][k]
            }
        }

        setInverse_matrix(inverse_matrix)

        var func

        for (let j = 0; j < size_array; j++) {
            func = x[0] + (x[1] * X[j])
            fx.push(func)
            console.log(func)
        }
    }

    const state = {
        labels: X,
        datasets: [
            {
                label: 'A',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 2,
                data: arrayA1d
            },
            {
                label: 'B',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'green',
                borderWidth: 2,
                data: arrayB
            },
            {
                label: 'AINV',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'blue',
                borderWidth: 2,
                data: inverse_matrix
            },
            {
                label: 'A0',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'orange',
                borderWidth: 2,
                data: show_total
            },
            {
                label: 'Y',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'purple',
                borderWidth: 2,
                data: Y
            },
            {
                label: 'FX',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'pink',
                borderWidth: 2,
                data: fx
            }
        ]
    }

    const handleChangeX = (rowIndex, event) => {
        X[rowIndex] = Number(event.target.value);
    }

    const handleChangeY = (rowIndex, event) => {
        Y[rowIndex] = Number(event.target.value);
    }

    const updateInputM = (event) => {
        setSize_matrix(Number(event.target.value))
    }

    const handleAdd = (event) => {
        var arrx = []
        var arry = []

        for (var i = 0; i < 1; i++) {
            for (var k = 0; k < Number(event.target.value); k++) {
                arrx[k] = 0;
                arry[k] = 0;
            }
        }

        console.log(arrx);
        console.log(arry);

        setX(arrx)
        setY(arry)
        setSize_array(Number(event.target.value))
    }

    const ClearData = (event) => {
        setArrayA([[]])
        setArrayB([])
        setArrayA1d([])
        setCount([])
        setInverse_matrix([[]])
        setShow_total([])
        setFx([])

        event.preventDefault()
    }

    return (

        <Container>

            <Form>
                <header>
                    <Link to="/" ><img className='bt_home2' src='/home.png' alt='home' /></Link>
                    <h2 className='course-header'> Regression </h2>
                </header>

                <p style={{ padding: '0.5rem' }}></p>

                <Form.Group className='rooteq-course-div'>
                    <Form.Label style={{ padding: '1rem' }}> Input Size </Form.Label>
                    <input type="number" value={size_array} placeholder=' Size X Y' id="size_array" onChange={handleAdd} style={{ height: "30px", width: "10%", margin: "0 auto" }} className="form-control"></input>

                    <Form.Label style={{ padding: '1rem' }}> Input M </Form.Label>
                    <input type="number" value={size_matrix} placeholder=' Size Matrix ' id="size_matrix" onChange={updateInputM} style={{ height: "30px", width: "10%", margin: "0 auto" }} className="form-control"></input>

                    <Button type="primary" className='bt_inputvalue' onClick={ClearData}> Clear </Button>
                </Form.Group>

                <Button type="primary" className='bt_calculate' onClick={getstartdata}> API </Button>

                <Button type="primary" disabled={size_array < size_matrix} className='bt_calculate' onClick={() => calregression(size_array, size_matrix, X, Y, inverse_matrix)}> Calculate </Button>
            </Form>

            <Container>
                <div className='table-column'>
                    <table>
                        <thead>
                            <tr>
                                <th> X </th>
                            </tr>
                        </thead>
                        <tbody>
                            {X.map((row, rowIndex) => (
                                <tr>
                                    <td>
                                        <input id={row} value={X[rowIndex]} onChange={event => handleChangeX(rowIndex, event)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <tr>
                                <th> Y </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Y.map((row, rowIndex) => (
                                <tr >
                                    <td>
                                        <input id={row} value={Y[rowIndex]} onChange={event => handleChangeY(rowIndex, event)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <>
                        <p> A </p>
                        <table>
                            <tbody>
                                {arrayA.map((row) => (
                                    <tr>
                                        {row.map((column) => (
                                            <td> {column} </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>

                    <>
                        <p> B </p>
                        <table  >
                            <tbody >
                                {arrayB.map((row) => (
                                    <tr>
                                        <td> {row} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>

                    <>
                        <p> A Inverse </p>
                        <table>
                            <tbody>
                                {inverse_matrix.map((row) => (
                                    <tr>
                                        {row.map((column) => (
                                            <td> {column.toFixed(7)} </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>

                    <>
                        <p> X </p>
                        <table>
                            <tbody>
                                {show_total.map((row) => (
                                    <tr>
                                        <td> {row.toFixed(7)} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>

                    <p> f(x) = a0 + a1*XI </p>
                    <p> f(x) = {show_total[0]} + {show_total[1]} *XI </p>
                </div>
            </Container>

            <Container className='rooteq-course-div'> <Line data={state} /> </Container>

        </Container>
    )
}

export default Regression