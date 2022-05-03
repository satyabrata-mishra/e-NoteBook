import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
export default function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <div className='col-md-3'>
            <button type="button" style={{ marginBottom: "4vh" }} className="btn btn-secondary position-relative">
                <h4>{note.title}</h4>
                <p style={{ textAlign: "left" }}>{note.description} </p>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {note.tag}
                </span>
                <i style={{ cursor: "pointer" }} className="fa fa-trash mx-3" onClick={() => { deleteNote(note._id); showAlert("Note Deleted Successfully.", "success"); props.handleClose(); }}></i>
                <i className="fas fa-edit" onClick={() => { updateNote(note)}}></i>
            </button>
        </div>
    )
}
