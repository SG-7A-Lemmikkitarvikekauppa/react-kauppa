import React from 'react'

 function Tuotelista({tuotelista}) {

 console.log({tuotelista});

  return (
    <div className="product-item">
      <img src= {tuotelista.kuva} alt="tuotteen kuva" />
      <h3> {tuotelista.nimi}  </h3>
      <p> {tuotelista.kuvaus} </p>
      <p className='hintap'> {tuotelista.hinta},00 €</p>
      <button className='nappi'>Lisää ostoskoriin</button>
    </div>
  )
}

export default Tuotelista;