import React from 'react'

 function Koiralelu({tuotelista}) {

 console.log({tuotelista});

  return (
    <div className="product-item">
      <img  />
      <h3> {tuotelista.nimi}  </h3>
      <p> {tuotelista.kuvaus} </p>
      <p> {tuotelista.hinta}juu00 €</p>
      <button>Lisää ostoskoriin</button>
    </div>
  )
}

export default Koiralelu