import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NoteForm from "./NoteForm";
import moment from "moment"; // import moment here

const NoteDetail = () => {

  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  
   // Fetch the note with the given id from the API when the component mounts
   useEffect(() => {
    axios.get(`http://localhost:8000/notes/${id}/`).then((response) => {
      setNote(response.data);
    });
  }, [id]);

  // Update the note in the API and local state when the form is submitted
  const handleUpdate = async (formData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/notes/${id}/`,
        formData
      );
      setNote(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  // If the user is editing the note, show the NoteForm component
  if (editing) {
    return <NoteForm note={note} handleSubmit={handleUpdate} />;
  }

  // If the note hasn't been fetched yet, show a loading message
  if (!note) {
    return <div>Loading...</div>;
  }

  // Otherwise, render the note details
  return (
    <div className="max-w-lg mx-auto my-8">
      <img
        className="h-64 w-full object-cover mb-4"
        src={note.cover_image}
        alt={note.title}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{note.title}</h1>
      <p className="text-gray-600 text-base mb-4">{note.body}</p>
      <p className="text-gray-500 text-sm">
        Last updated: {moment(note.updated).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setEditing(true)}
      >
        Edit Note
      </button>
    </div>
  );
}

export default NoteDetail