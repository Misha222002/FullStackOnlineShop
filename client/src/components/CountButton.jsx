import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const CountButton = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <div>{count}</div>
            {/* <Button onClick={}>+</Button> */}
        </div>
    );
}

export default CountButton;
