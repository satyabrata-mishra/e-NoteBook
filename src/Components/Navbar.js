import { React } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export default function Navbar(props) {
    let navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        props.showAlert("Successfully Logged Out.", "success")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">INotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {localStorage.getItem("token") &&
                            <p style={{color:"white"}} className="font-weight-bold mx-3 my-2">{`Hi, ${localStorage.getItem("name")}`}</p>}
                        {localStorage.getItem("token") ?
                            <button onClick={handleLogout} className='btn btn-primary'>Logout</button> :
                            <form className="d-flex">
                                <Link className="btn btn-primary mx-2" to='/signup' role="button">Signup</Link>
                            </form>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
