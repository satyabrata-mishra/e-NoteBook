import React from 'react'

export default function Alert(props) {
    return (
        <div style={{ height: '52px', paddingTop: "10vh" }}>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                {props.alert.msg}
            </div>}
        </div>
    )
}
