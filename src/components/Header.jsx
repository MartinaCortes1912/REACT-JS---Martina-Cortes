import React from 'react';
import { Link } from 'react-router-dom';

function Header() {  
    return (  
        <header style={{ padding: "1%", textAlign: "center", color: "white" }}>  
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Marruca</Link>  
        </header>  
    );  
}

export default Header;