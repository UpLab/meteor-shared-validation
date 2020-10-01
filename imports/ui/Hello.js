import React, { useState } from 'react';

export default function Hello() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <button onClick={increment} type="button">
        Click Me
      </button>
      <p>You&apos;ve pressed the button {counter} times.</p>
    </div>
  );
}
