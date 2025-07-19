import React from 'react';
import { Link } from 'react-router-dom';

function Header() {  
    return (  
        <header style={{ }}>  
            <Link to="/" aria-label="Inicio">Marruca</Link>  
        </header>  
    );  
}

export default Header;