import React from "react"; // Import React
import "../styles/Note.css" // Import CSS styles for the note

// Define the Note component
function Note({ note, onDelete }) {
    // Format the creation date of the note
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    // Render the note component
    return (
        <div className="note-container">
            <p className="note-title">{note.title}</p> {/* Display the note title */}
            <p className="note-content">{note.content}</p> {/* Display the note content */}
            <p className="note-date">{formattedDate}</p>  {/* Display the formatted creation date */}
            <button className="delete-button" onClick={() => onDelete(note.id)}> {/* Call the onDelete function with the note id */}
                Delete {/* Button label */}
            </button> 
        </div>
    );
}

export default Note // Export the Note component