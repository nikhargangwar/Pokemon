import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Display.css';
import PokemonCard from './PokemonCard';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Form } from 'react-bootstrap';

function Display() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then(res => {
        setPokemons(res.data.results);

      }).catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const pokemon = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    Promise.all(promises).then(pokemonArr => {
      return pokemonArr.map(value =>
        value
          .json()
          .then(({ name, sprites: { front_default: sprite } }) =>
            pokemon.push({ name, sprite })
          )
      );
    });
    setOptions(pokemon);

  }, []);



  const handleChange = (e) => {
    setSearch(e.target.value);

  }


  const filteredPokemon = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )
  const updatePokeMon = (poke) => {
    setSearch(poke);
    setDisplay(false);
  };


  return (
    <div className="Display">

      <div className="search_area">
        <h1 className="text">
          Find Your Pokemon
        </h1>
        <form>
          <div>
            <input type="text"
              placeholder="Search You Pokemon"
              className="pokemon_input"
              value={search}
              onChange={handleChange}
              onClick={() => setDisplay(!display)}
            />
            {display && (
              <div className="autoContainer">
                {options
                  .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
                  .map((value, i) => {
                    return (
                      <div
                        onClick={() => updatePokeMon(value.name)}
                        className="option"
                        key={i}
                        tabIndex="0"
                      >
                        <span>{value.name}</span>
                        <img src={value.sprite} alt="pokemon" />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>



          <div className="filter">
            <Form.Select onChange={(e) => { setFilter(e.target.value) }}>
              <option value="" >Filter</option>

              <option value="grass">Grass</option>
              <option value="poison">Poison</option>
              <option value="fire">Fire</option>
              <option value="flying">Flying</option>
              <option value="water">Water</option>


            </Form.Select>

          </div>


        </form>
      </div>




      <div className="display_area">
        <div className="display_pokemons">
          {filteredPokemon.map(pokemon => (
            <div className="latests_container_Box">

              <PokemonCard pokemon={pokemon} filter={filter} />
            </div>
          ))
          }
        </div>
      </div>


    </div>

  );
}

export default Display
