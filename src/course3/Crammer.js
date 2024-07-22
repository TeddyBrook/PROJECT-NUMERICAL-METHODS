import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Container, Form } from "react-bootstrap";

/* CSS */
import './Crammer.css'

const Crammer = () => {

    const [val, setVal] = useState([[]])
    const [show_total, setShow_total] = useState([])
    const [size_array, setSize_array] = useState("")
    const [show_martix_web, setShow_martix_web] = useState([])

    const CarmersCalcFunction = (size_array, val, show_web) => {
        console.log(val)

        var a = [[]]
        var k = 0, i = 0, j = 0

        for (i = 0; i < size_array; i++) {
            a[i] = [];
            for (k = 0; k < size_array + 1; k++) {
                a[i][k] = val[i][k]
            }
        }

        var x = []

        for (k = 0; k < size_array; k++) {
            for (i = k + 1; i < size_array; i++) {
                var temp = a[i][k] / a[k][k]
                for (j = k + 1; j <= size_array; j++) {
                    a[i][j] = a[i][j] - temp * a[k][j]
                }
            }
        }

        for (i = size_array - 1; i >= 0; i--) {
            x[i] = a[i][size_array]
            for (j = i + 1; j < size_array; j++) {
                x[i] = x[i] - a[i][j] * x[j]
            }
            x[i] = x[i] / a[i][i]
        }

        for (i = 0; i < size_array; i++) {
            console.log(x[i])
        }

        setShow_total(x)
        show_web = [[]]

        for (i = 0; i < size_array; i++) {
            show_web[i] = [];
            for (k = 0; k < size_array + 1; k++) {
                if (k < size_array - 1) {
                    show_web[i][k] = val[i][k] * x[k]
                }
                else if (k < size_array) {
                    show_web[i][k] = val[i][k] * x[k]
                }
                else if (k === size_array) {
                    show_web[i][k] = val[i][k]
                }
            }
        }
        console.log(show_web)
        setShow_martix_web(show_web)
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
                <header>
                    <Link to="/" ><img className='bt_home2' src='/home.png' alt='home' /></Link>
                    <h2 className='course-header'> Crammer Method </h2>
                </header>

                <p style={{ padding: '0.5rem' }}></p>

                <Form.Group className='rooteq-course-div'>
                    <Form.Label style={{ padding: '1rem' }}> Input X </Form.Label>
                    <input type="number" placeholder='N*N' onChange={handleAdd} style={{ height: "30px", width: "10%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>

                <Button type="primary" className='bt_calculate' onClick={() => CarmersCalcFunction(size_array, val, show_martix_web)}> Calculate </Button>

                <h2 className='rooteq-course-div'>{show_total.map((total, i) => (<label id={i}>&emsp;X{i + 1} = {total} &emsp; </label>))} </h2>
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

export default Crammer