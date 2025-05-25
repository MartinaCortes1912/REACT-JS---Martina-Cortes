import imagen from "../assets/inicio.jpg";

function Inicio() {  
    return (  
        <main style={{ padding: "20px", display:"flex", justifyContent:"center", minHeight: "80vh" }}>  
            <img src={imagen}></img>
        </main>  
    );  
}  
export default Inicio;  