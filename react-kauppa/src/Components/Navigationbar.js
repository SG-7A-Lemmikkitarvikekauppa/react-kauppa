import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams,} from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import KissatHoito from '../Pages/kissatHoito';
import searchPhrase from '../Pages/tuotteet';
import Kaikkituotteet from '../Pages/kaikkituotteet'




export default function NavigationBar(){
  const [tuoteryhmat, setTuoteryhmat] = useState([]);
  const URL = 'http://localhost/Verkko-kauppaphp/php-kauppa/'

  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  

  useEffect(() => {
    console.log(URL);


    axios
      .get(URL + 'products/gettuoteryhmat.php')
      .then((response) => {
        const json = response.data;
        setTuoteryhmat(json);
        
      })
      .catch((error) => {
        alert(error.response?.data?.error || error);
      });
  }, [URL]);

  function executeSearch(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      navigate('/search/' + search);
    } }

  return (
    <div id="etusivu">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Purrfect Pets
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">


            <li className="nav-item">
                  <Link to="/etusivu" className="nav-link">Etusivu</Link>
                </li>


              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdown01"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 Kissat
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdown01"
                >
                  {tuoteryhmat.map((tuote) => (
                    <li key={tuote.tuoteid} kategoria={tuote}>
                      <Link
                        className="dropdown-item"
                        to={'/tuotteet/' + tuote.tuoteid}
                      >
                       <p> {tuote.nimi} </p>

                      </Link>
                    </li>
                  ))}
                </ul>
              </li>


              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdown01"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 Koirat
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdown01"
                >
                  {tuoteryhmat.map((tuote) => (
                    <li key={tuote.tuoteid} kategoria={tuote}>
                      <Link
                        className="dropdown-item"
                        to={'/tuotteetkoirat/' + tuote.tuoteid}
                      >
                       <p> {tuote.nimi} </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
              <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      Tarjoukset
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to='/Tarjouksetkaikki'> Kaikki tarjoukset </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/Tarjouksetkissat'>  Kissoille </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/Tarjouksetkoirat'>  Koirille</Dropdown.Item>
                        <Dropdown.Item as={Link} to='/Tarjouksetjasen'>  Jäsenille </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/Poistonurkka'>  Poistonurkka </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>




                <li className="nav-item">
                  <Link className='nav-link' to="/ostoskori" >Ostoskori</Link>
                </li>

                </ul>
          <form className="form-inline my-2 my-lg-0">
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              onKeyPress={(e) => executeSearch(e)} 
              className="form-control mr-sm-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search" />
          </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
