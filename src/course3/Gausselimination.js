import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import * as math from 'mathjs'

const GaussElimination = () => {
    const [val, setVal] = useState([[]])
    const [show_total, setShow_total] = useState([])
    const [size_array, setSize_array] = useState("")
    const [show_martix_web, setShow_martix_web] = useState([])
    const [check, setCheck] = useState([])

    const invertCalcFunction = (size_array, val, show_web) => {
        var a = [[]]
        var b = []
        var k = 0, i = 0, j = 0

        for (i = 0; i < size_array; i++) {
            a[i] = [];
            for (k = 0; k < size_array; k++) {
                a[i][k] = val[i][k]
            }
        }

        var invarr = math.inv(a)

        console.log(invarr)

        for (i = 0; i < size_array; i++) {
            b[i] = [];
            for (k = size_array; k < size_array + 1; k++) {
                b[i][k] = val[i][k]
            }
        }

        var temp = 0
        var x = []

        for (i = 0; i < size_array; i++) {
            for (j = 0; j < size_array; j++) {
                temp += invarr[i][j] * b[j][size_array]
            }
            x[i] = temp
        }

        setShow_total(x)
        show_web = [[]]

        for (i = 0; i < size_array; i++) {
            show_web[i] = [];
            for (k = 0; k < size_array; k++) {
                show_web[i][k] = invarr[i][k]
            }
        }

        setShow_martix_web(show_web)

        console.log(b)
        console.log(invarr)

        var temp2 = 0
        var x2 = []

        console.log(x)

        for (i = 0; i < size_array; i++) {
            for (j = 0; j < size_array; j++) {
                temp2 += a[i][j] * x[j]
            }
            x2[i] = temp2
            temp2 = 0
        }

        console.log(x2)

        setCheck(x2)
    }

    const handleChange = (rowIndex, columnIndex, event) => {
        val[rowIndex][columnIndex] = Number(event.target.value);
    }

    const handleAdd = (event) => {
        var array = [[]]
        for (var i = 0; i < Number(event.target.value); i++) {
            array[i] = [];
            for (var k = 0; k < Number(event.target.value) + 1; k++) {
                array[i][k] = 0;
            }
        }
        console.log(array);

        setVal(array)
        setSize_array(Number(event.target.value))
    }

    return (

        <Container>

            <Form>
                <p style={{ padding: '0.5rem' }}></p>

                <Form.Group className='rooteq-course-div'>
                    <Form.Label style={{ padding: '1rem' }}> Input X </Form.Label>
                    <input type="number" onChange={handleAdd} style={{ height: "30px", width: "10%", margin: "0 auto" }} className="form-control"></input>

                    <Button type="primary" className='bt_calculate' onClick={() => invertCalcFunction(size_array, val, show_martix_web)}> New Calculate </Button>
                </Form.Group>

                <h2 className='rooteq-course-div'>{show_total.map((total, i) => (<label id={i}> &emsp; X {i + 1} = {total} &emsp; </label>))} </h2>

                <p> &emsp; A Invert is {show_martix_web.map((element, i) => (<label id={i}> &emsp; Row {i + 1} = {element} &emsp; </label>))} </p>
                <p> {check.map((total, i) => (<label id={i}>&emsp;B{i + 1} = {total} &emsp; </label>))} </p>
            </Form>

            <Container>
                <table>
                    <tbody>
                        {val.map((row, rowIndex) => (
                            <tr>
                                {row.map((column, columnIndex) => (
                                    <td>
                                        <input id={column} onChange={e => handleChange(rowIndex, columnIndex, e)} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>

        </Container>
    )
}

export default GaussElimination