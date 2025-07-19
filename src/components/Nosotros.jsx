import React from 'react';
import { Helmet } from 'react-helmet';

function Nosotros() {
    
    return (
      <section className= "nosotros">
        <Helmet>
        <title>Marruca | Nosotros</title>
        <meta name="description" content="Explora nuestra variedad de productos." />
        </Helmet>
        <h2 className='titulo'>Nosotros</h2>
        <p>Creemos que la belleza verdadera nace de la confianza en lo que usas. Por eso, cada uno de nuestros productos está formulado con ingredientes naturales, libres de químicos dañinos y testeo en animales.</p>
        <p>Nuestra misión es simple: crear cosméticos que nutran tu piel mientras respetan el planeta. Desde nuestros laboratorios hasta tu tocador, cada paso refleja nuestro compromiso con la transparencia, la sostenibilidad y la eficacia.</p>
        <h4>Porque tu piel merece solo lo mejor de la naturaleza.</h4>
      </section>
    );
  }
  
export default Nosotros;