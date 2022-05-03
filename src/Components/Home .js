
import React from 'react'
import Addnote from "./Addnote";

export default function Home(props) {
  return (
    <div className='container my-3'>
      <Addnote showAlert={props.showAlert} />
    </div>
  )
}