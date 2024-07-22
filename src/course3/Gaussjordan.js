import { useState } from "react"

/* CSS */
import './Crammer.css'

const Gaussjordan = () => {

    const [x, setX] = useState(0);
    const [fx, setFx] = useState(0);
    const [sum, setSum] = useState(0);

    const onxChange = (e) => {
        setX(Number(e.target.value));
    }

    const onfxChange = (e) => {
        setFx(Number(e.target.value));
    }

    const Calculate = () => {
        var temp = 0
        temp = x + fx
        setSum(temp)
    }

    return (
        <div>
            <label className="name-jordan"> X: </label>
            <input className="input-jordan" type="text" value={x} onChange={onxChange} />

            <label> f(x): </label>
            <input type="text" value={fx} onChange={onfxChange} />

            <button className="sub-jordan" onClick={Calculate}> Submit </button>

            <label className="name-jordan"> Result : {sum} </label>
        </div>
    )
}

export default Gaussjordan