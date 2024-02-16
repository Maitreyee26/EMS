// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const LocationForAttendance = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             try {
//               const { latitude, longitude } = position.coords;

//               // Get the location name using the Nominatim API
//               const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`;

//               const response = await axios.get(apiUrl);
//               const address = response.data.display_name;
//               setLocation(address);
//             } catch (error) {
//               setError(`Error getting location: ${error.message}`);
//             }
//           },
//           (error) => {
//             setError(`Error getting location: ${error.message}`);
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by your browser');
//       }
//     };

//     getLocation();
//   }, []);

//   return (
//     <div>
//       {location ? (
//         <p>Location: {location}</p>
//       ) : (
//         <p>{error || 'Fetching location...'}</p>
//       )}
//     </div>
//   );
// };

// export default LocationForAttendance;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationForAttendance = ({ onLocationChange }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;

              // Get the location name using the Nominatim API
              const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`;

              const response = await axios.get(apiUrl);
              const address = response.data.display_name;
              setLocation(address);

              // Notify the parent component about the location
              onLocationChange(address);
            } catch (error) {
              setError(`Error getting location: ${error.message}`);
            }
          },
          (error) => {
            setError(`Error getting location: ${error.message}`);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
      }
    };

    getLocation();
  }, [onLocationChange]);

  return (
    <div>
      {location ? (
        <p>Location: {location}</p>
      ) : (
        <p>{error || 'Fetching location...'}</p>
      )}
    </div>
  );};
 

export default LocationForAttendance;


