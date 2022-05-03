import { useContext, useEffect, useState } from "react"
import React from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getallnotes, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getallnotes();
    }
    else {
      navigate("/login");
    }
  }, [])
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [active, setactive] = useState(false);
  const handleClose = () => {
    setactive(false);
  }
  const handleClick = (e) => {
    setactive(false);
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const updateNote = (currentNote) => {
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    setactive(true);
  }
  return (
    <>
      {active && < div id="editnote" className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note Box</h5>
          </div>
          <div className="modal-body">
            <div className="mb-1">
              <label htmlFor="title" className="form-label">Title</label>
              <input value={note.etitle} type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onchange} minLength={5} required />
            </div>
            <div className="mb-1">
              <label htmlFor="description" className="form-label">Description</label>
              <input value={note.edescription} type="text" className="form-control" id="edescription" name="edescription" onChange={onchange} minLength={5} required />
            </div>
            <div className="mb-1">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input value={note.etag} type="text" className="form-control" id="etag" name="etag" onChange={onchange} minLength={3} required />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={handleClose} type="button" className="btn btn-primary">Close</button>
            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Edit Note</button>
          </div>
        </div>
      </div>}
      <div className='row my-3'>
        <h3 >Your Notes</h3>
        <div className="container">
          {notes.length === 0 && "No Notes To Display."}
        </div>
        {
          notes.map((e, index) => {
            return <Noteitem showAlert={props.showAlert} key={index} handleClose={handleClose} updateNote={updateNote} note={e} />
          })
        }
      </div>
    </>
  )
}