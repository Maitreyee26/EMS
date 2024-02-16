const timestamp="2024-02-01 17:21:30.25103"
const extractTimeAmPm = (timestamp) => {
    const dateObject = new Date(timestamp);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours % 12}:${minutes < 10 ? '0' : ''}${minutes}${hours >= 12 ? 'pm' : 'am'}`;
    return formattedTime;
  }; 
  console.log(extractTimeAmPm(timestamp))