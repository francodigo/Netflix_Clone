import React, { useState } from 'react';
import '../assets/styles/components/Navbar.scss';
import logo from '../assets/static/netflix-logo.png';
import requests from '../requests';
import axios from '../axios';

/* For Searching Resulsts Responsive*/
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const Navbar = () => {
  {
    /* Menu Responsive Buttons*/
  }
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  {
    /*Togglers and Class Conditionals for Menus Responsive*/
  }
  const activeBurger = burgerMenu ? 'active-mobile' : '';
  const toggleMenuBurger = () => {
    burgerMenu ? setBurgerMenu(false) : setBurgerMenu(true);
  };

  const activeSearch = searchMenu ? 'active-mobile' : '';
  const toggleSearchMenu = () => {
    searchMenu ? setSearchMenu(false) : setSearchMenu(true);
  };

  const activeUser = userMenu ? 'active-mobile' : '';
  const toggleUserMenu = () => {
    userMenu ? setUserMenu(false) : setUserMenu(true);
  };

  {
    /* Search Responsive Query State*/
  }
  const [query, setQuery] = useState('');
  const [results, setSearchResults] = useState([]);

  function handleChange(e) {
    const input = document.getElementById('input');
    setQuery(input.value);
    if (input.value !== '') {
      axios.get(`${requests.search}&query=${query}`).then((response) => {
        console.log(response.data.results);
        setSearchResults(response.data.results);
      });
    }
  }

  return (
    <>
      <nav className='navbar container'>
        {/*<!-- Left Side -->*/}
        <div className='navbar__items--left'>
          <button className='navbar__burger-btn' id='burger-btn' onClick={toggleMenuBurger} type='button'>
            {!burgerMenu && <box-icon name='menu' color='#aaa' />}
            {burgerMenu && <box-icon name='x-circle' type='solid' color='#fff' />}
          </button>
          {/*<!-- Logo -->*/}
          <figure>
            <img className='navbar__logo' src={logo} alt='Netflix Logo' />
          </figure>
          {/*<!-- Shown when is not mobile -->*/}
          <ul className='navbar__list'>
            <li className='navbar__item'>Inicio</li>
            <li className='navbar__item'>Series</li>
            <li className='navbar__item'>Películas</li>
            <li className='navbar__item'>Novedades Populares</li>
            <li className='navbar__item'>Mi Lista</li>
          </ul>
          {/*<!-- End of Left Side --> */}
        </div>

        {/* <!-- Right Side --> */}
        <div className='navbar__items--right'>
          <button className='navbar__search-btn' id='search-btn' type='button' onClick={toggleSearchMenu}>
            <box-icon name='search' color='#aaa' />
          </button>
          {/* <!-- Show when is not mobile -->
            <!-- <SearchDropdown/> -->
            <!-- Niños -->
            <!-- Icono Regalo -->
            <!-- Icono Noticaciones -->
            <!-- End of Show when not mobile -->
          */}
          <button className='navbar__user-btn' id='user-btn' onClick={toggleUserMenu} type='button'>
            {!userMenu && <box-icon name='user' color='#aaa' />}
            {userMenu && <box-icon name='user' type='solid' color='#fff' />}
          </button>
          {/*<!-- End of Right Side -->*/}
        </div>
      </nav>

      {/*<!-- Mobile Containers -->*/}
      <div className={`mobile__menu mobile-burger container ${activeBurger}`} id='menu-burger'>
        Movies Menu
      </div>
      <div className={`mobile__menu mobile-user container ${activeUser}`} id='menu-user'>
        User Menu
      </div>
      <div className={`mobile__search container ${activeSearch}`} id='search-mobile'>
        <div className='search__content'>
          <button id='search-arrow-left' type='button' onClick={toggleSearchMenu}>
            <box-icon name='arrow-back' size='sm' color='#fff' />
          </button>
          <div className='search__form'>
            <input
              className='search__input'
              type='text'
              id='input'
              placeholder='Buscar en Netflix'
              onInput={handleChange}
            />
            <div className='search__icon'>
              <box-icon name='search' size='sm' color='#fff' />
            </div>

            <div className='search__cross'>
              <box-icon name='x-circle' type='solid' color='#e50914' />
            </div>
          </div>
        </div>
        <div className='search__results'>
          <ul className='search__results-list'>
            {!query && <li>Ingrese el nombre de una película o serie</li>}
            {results.map((movie) => (
              <li className='search__results-element '>
                <img
                  className='results-img'
                  src={`${IMAGE_BASE_URL}${movie.poster_path || movie.profile_path || movie.profile_path}`}
                  alt={movie.name}
                />
                <h6 className='results-title'>{movie.title || movie.name}</h6>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;