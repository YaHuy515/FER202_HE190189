import React, { useState } from 'react';

const EventHandlingDemo = () => {
    const [count, setCount] = useState(0);

    const handleButtonClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Event Handling Demo</h1>
            <p>Count: {count}</p>
            <button onClick={handleButtonClick}>Increase Count</button>
        </div>
    );
};

export default EventHandlingDemo;
