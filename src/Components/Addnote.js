import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';

export default function Addnote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added Successfully.", "success")
    };
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <div className='container'>
            <h3>Add Notes</h3>
            <form>
                <div className="mb-1">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-1">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-1">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary my-1" onClick={handleClick}>Add Note</button>
            </form>
            <Notes showAlert={props.showAlert}/>
            </div>
    )
}
