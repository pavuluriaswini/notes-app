import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const addNote = () => {
    if (input.trim()) {
      if (isEditing) {
        const updatedNotes = notes.map((note, index) =>
          index === currentNoteIndex ? { text: input, date: new Date().toLocaleDateString() } : note
        );
        setNotes(updatedNotes);
        setIsEditing(false);
        setCurrentNoteIndex(null);
      } else {
        setNotes([...notes, { text: input, date: new Date().toLocaleDateString() }]);
      }
      setInput('');
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index) => {
    setInput(notes[index].text);
    setIsEditing(true);
    setCurrentNoteIndex(index);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app">
      <h1>Notes</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="note-input">
        <textarea
          placeholder="Type to add a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addNote}>{isEditing ? 'Update' : 'Save'}</button>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <span>{note.text}</span>
            <small>{note.date}</small>
            <div>
              <button onClick={() => editNote(index)}>Edit</button>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;




