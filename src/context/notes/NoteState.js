import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setnotes] = useState([]);
    const getallnotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json();
        setnotes(json);
    };
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        getallnotes();
    };

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            }
        });
        getallnotes();
    };

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        getallnotes();
    };
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;