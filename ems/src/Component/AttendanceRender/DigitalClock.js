import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Format the time to HH:mm:ss
  const formattedTime = time.toLocaleTimeString();

  return (
    <>
      <p className='clock'>{formattedTime}</p>
    </>
  );
};

export default DigitalClock;
