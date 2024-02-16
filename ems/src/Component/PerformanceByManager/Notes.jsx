// import React, { useState } from 'react';

// import './Notes.css';
 
// const Notes = () => {

//   const [notes, setNotes] = useState([]);

//   const [currentNote, setCurrentNote] = useState('');

//   const [isEditing, setIsEditing] = useState(false);

//   const [editedNoteIndex, setEditedNoteIndex] = useState(null);

//   const [showDeleteMessage, setShowDeleteMessage] = useState(false);
 
//   const addNote = async () => {

//     try {

//       if (currentNote.trim() !== '') {


        
//         const response = await fetch(`http://localhost:8080/addInternalNote/3/${currentNote}`, {

//           method: "POST",

//           headers: {

//             "Content-Type": "application/json",

//           },

//         });
 
//         if (response.ok) {

//           setNotes([...notes, currentNote]);

//           setCurrentNote('');

//         } else {

//           console.error("Server responded with an error:", response.statusText);

//         }

//       }

//     } catch (error) {

//       console.error("Error during fetch:", error);

//     }

//   };
 
//   const toggleEditNote = (index) => {

//     if (isEditing) {

//       updateNote();

//     } else {

//       setIsEditing(true);

//       setEditedNoteIndex(index);

//       setCurrentNote(notes[index]);

//     }

//   };
 
//   const updateNote = () => {

//     if (currentNote.trim() !== '') {

//       const updatedNotes = [...notes];

//       updatedNotes[editedNoteIndex] = currentNote;

//       setNotes(updatedNotes);

//       setIsEditing(false);

//       setCurrentNote('');

//       setEditedNoteIndex(null);

//     }

//   };
 
//   const deleteNote = async () => {
//     try {

//     if (currentNote.trim() !== '') {

//       const response = await fetch(`http://localhost:8080/addInternalNote/3/18`, {

//         method: "DELETE",

//         headers: {

//           "Content-Type": "application/json",

//         },

//       });

//       if (response.ok) {

//         setNotes([...notes, currentNote]);

//         setCurrentNote('');

//       } else {

//         console.error("Server responded with an error:", response.statusText);

//       }

//     }

//   } catch (error) {

//     console.error("Error during fetch:", error);

//   }
// };
  
 
//   return (

//     <div className="notes-container">

//       <h1>NOTES</h1>

//       <div className="input-container">

//         <textarea

//           className="notefield"

//           rows="4"

//           value={currentNote}

//           onChange={(e) => setCurrentNote(e.target.value)}

//           placeholder="Enter your note"

//         ></textarea>

//         {!isEditing && (

//           <button className="notesButton add-button" onClick={addNote}>

//             Add Notes

//           </button>

//         )}

//       </div>

//       <ul>

//         {notes.map((note, index) => (

//           <li key={index}>

//             {isEditing && editedNoteIndex === index ? (

//               <input

//                 className="notefield"

//                 value={currentNote}

//                 onChange={(e) => setCurrentNote(e.target.value)}

//                 placeholder="Edit your note"

//               />

//             ) : (

//               <span>{note}</span>

//             )}

//             <div>

//               {!isEditing && (

//                 <button className="notesButton" onClick={() => toggleEditNote(index)}>

//                   Edit

//                 </button>

//               )}

//             </div>

//             {isEditing && editedNoteIndex === index && (

//               <button className="notesButton" onClick={updateNote}>

//                 Save

//               </button>

//             )}

//             <button className="notesButton" onClick={() => deleteNote(index)}>

//               Delete

//             </button>

//           </li>

//         ))}

//       </ul>

//       {showDeleteMessage && <p>Notes deleted</p>}

//     </div>

//   );
                 

            
 
// export default Notes;


import React, { useState } from 'react';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedNoteIndex, setEditedNoteIndex] = useState(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const addNote = async () => {
    try {
      if (currentNote.trim() !== '') {
        
        const response = await fetch(`http://localhost:8080/addInternalNote/3/${currentNote}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setNotes([...notes, currentNote]);
          setCurrentNote('');
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const toggleEditNote = (index) => {
    if (isEditing) {
      updateNote();
    } else {
      setIsEditing(true);
      setEditedNoteIndex(index);
      setCurrentNote(notes[index]);
    }
  };

  const updateNote = async () => {
    try {
      if (currentNote.trim() !== '') {
        
        const response = await fetch(`http://localhost:8080/editNote/3/43/${currentNote}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setNotes([...notes, currentNote]);
          setCurrentNote('');
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }



    if (currentNote.trim() !== '') {
      const updatedNotes = [...notes];
      updatedNotes[editedNoteIndex] = currentNote;
      setNotes(updatedNotes);
      setIsEditing(false);
      setCurrentNote('');
      setEditedNoteIndex(null);
    }
  };

  const deleteNote = async (index) => {
    try {
      if (currentNote.trim() !== '') {
        const response = await fetch(`http://localhost:8080/deleteNote/3/${currentNote}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setNotes([...notes, currentNote]);
          setCurrentNote('');
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
    const updatedNotes = [...notes];

    updatedNotes.splice(index, 1);

    setNotes(updatedNotes);
 
    setShowDeleteMessage(true);

    setTimeout(() => {

      setShowDeleteMessage(false);

    }, 4000);



  };

  return (
    <div className="notes-container">
      <h1>NOTES</h1>

      
      <div className="input-container">

<textarea

  className="notefield"

  rows="4"

  value={currentNote}

  onChange={(e) => setCurrentNote(e.target.value)}

  placeholder="Enter your note"

></textarea>

{!isEditing && (

  <button className="notesButton add-button" onClick={addNote}>

    Add Notes

  </button>

)}

</div>

<ul>

{notes.map((note, index) => (

  <li key={index}>

    {isEditing && editedNoteIndex === index ? (

      <input

        className="notefield"

        value={currentNote}

        onChange={(e) => setCurrentNote(e.target.value)}

        placeholder="Edit your note"

      />

    ) : (

      <span>{note}</span>

    )}

    <div>

      {!isEditing && (

        <button className="notesButton" onClick={() => toggleEditNote(index)}>

          Edit

        </button>

      )}

    </div>

    {isEditing && editedNoteIndex === index && (

      <button className="notesButton" onClick={updateNote}>

        Save

      </button>

    )}

    <button className="notesButton" onClick={() => deleteNote(index)}>

      Delete

    </button>

  </li>

))}

</ul>

{showDeleteMessage && <p>Notes deleted</p>}

    

    </div>
  );
};

export default Notes;




