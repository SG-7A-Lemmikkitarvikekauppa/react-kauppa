import React from 'react'


 function Tuotekortti({tuotelista}) {

 console.log({tuotelista});

  return (
    <div className="product-item">
      <img  />
      <h3> {tuotelista.nimi}  </h3>
      <p> {tuotelista.kuvaus} </p>
      <p className='hintap'> {tuotelista.hinta},00 €</p>
      <button>Lisää ostoskoriin</button>
    </div>
  )
}

export default Tuotekortti;