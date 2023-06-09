import React,{useState,useEffect} from 'react';
import uuid from 'react-uuid';
import axios from 'axios';

export default function Order({url, cart,removeFromCart,updateAmount,empty}) {
  const [inputs, ] = useState([]);
  const [inputIndex, setInputIndex] = useState(-1);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('')
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    for (let i = 0;i < cart.length;i++) {
      inputs[i] = React.createRef();
    }
  }, [cart.length,inputs])
  
  useEffect(()=> {
    if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
      inputs[inputIndex].current.focus();
    }
  },[cart,inputs,inputIndex]) 

  function order(e) {
    e.preventDefault();

    const json = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      address: address,
      zip: zip,
      city: city,
      cart: cart,
    });
    axios.post(url + 'order/save.php',json,{
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    })
    .then(() => {
      empty();
      setFinished(true);
    }).catch(error => {
      alert(error.response === undefined ? error : error.response.data.error);
    });
  }


  function changeAmount(e,product,index) {
    updateAmount(e.target.value,product);
    setInputIndex(index);
  }

  let sum = 0;

  if (finished === false) {
    return (
      <div>
        <h3 className="header">Items in cart</h3>
        <table className="table">
          <tbody>
            {cart.map((product,index) => {
              sum+=parseFloat(product.price) * parseInt(product.amount);
              return (
                <tr key={uuid()}>
                  <td>{product.name}</td>
                  <td>{product.price} €</td>
                  <td>
                    <input ref={inputs[index]} style={{width: '60px'}} value={product.amount} onChange={e => changeAmount(e,product,index)} />
                  </td>
                  <td><a href="/#" onClick={() => removeFromCart(product)}>Delete</a></td>
                </tr>
              )
              })}
            <tr key={uuid()}>
              <td></td>
              <td>{sum.toFixed(2)} €</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {cart.length > 0 && // Render order form, if there is something in cart.
          <>
            <h3 className="header">Client information</h3>
            <form onSubmit={order}>
              <div className="form-group">
                <label>First name:</label>
                <input className="form-control" onChange={e => setFirstname(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Last name:</label>
                <input className="form-control" onChange={e => setLastname(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input className="form-control" onChange={e => setAddress(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Postal code</label>
                <input className="form-control" onChange={e => setZip(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>City</label>
                <input className="form-control" onChange={e => setCity(e.target.value)}/>
              </div>
              <div className="buttons">
                <button className="btn btn-primary">Order</button>
              </div>
            </form>
            </>
          }
      </div>
    )
  } else {
    return (<h3>Thank you for your order</h3>);
  }
}
