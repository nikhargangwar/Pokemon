import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Details.css'
import { useParams } from 'react-router';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

function Details() {

  const { Id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);


  useEffect(() => {


    axios.get(`https://pokeapi.co/api/v2/pokemon/${Id}`)
      .then(res => {
        setPokemonDetails(res.data);

     

      }).catch(error => console.log(error));
  
  }, []);

  return (
    <div className="Details">
      <div className="container1">
        <div className="text">
          {pokemonDetails ? pokemonDetails.abilities[1].ability.name : null}
        
        </div>
        <div className="img">
          {pokemonDetails ? <img src={pokemonDetails.sprites.front_shiny} /> : null}
        </div>

      </div>


      <div className="container2">
        <Container className="conatiner_details">
         
          <Row className="row1">
            <Col xs={12} md={12} lg={6}>
            <strong>Height:</strong>
            {pokemonDetails ? "    " + pokemonDetails.height : null}
            </Col>
            <Col xs={12} md={12} lg={6}>
            <strong> Ability:</strong>
             {pokemonDetails ? "    " + pokemonDetails.abilities[0].ability.name : null}
            </Col>
          </Row>

          <Row className="row1">
            <Col xs={12} md={12} lg={6}>
            <strong> Weight:</strong>
            {pokemonDetails ? "    " + pokemonDetails.weight : null}
            </Col>
            <Col xs={12} md={12} lg={6}>
            <strong>Experience: </strong>
            {pokemonDetails ? "    " + pokemonDetails.base_experience : null} Years
            </Col>
          </Row>

     

          <Row>
            <Col lg={7}>
            <div className="stats">
           {pokemonDetails ? pokemonDetails.stats.map(stat=>(
             <div>
               <strong>{ stat.stat.name} </strong>
               <ProgressBar now={stat.base_stat}/>
               </div>)) :null}
            </div>
            </Col>
          </Row>
        </Container>

      
      </div>


    </div>
  )
}

export default Details
