import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import { Link } from 'react-router-dom';

function PokemonCard({ pokemon, filter }) {

    const [details, setDetails] = useState(null);

    useEffect(() => {
        axios.get(pokemon.url)
            .then(res => {
                setDetails(res.data);

            }).catch(error => console.log(error));
    }, [details]);

    let cssClass = "card1";

    if (details) {
        details.types.forEach((e) => {
            if (e.type.name === filter || filter=="") {
                cssClass = "Card";
            }
        })
    }


    return (
        <div>

            {details ? <Link to={`/${details.id}`} >

                <div className={cssClass}>
                    <Card ClassName="inner_card" elevation={5} sx={{ Width: 250, m: 2, height: 300 , background:"none",border:"1px solid #fff",borderRadius:5,boxShadow:10}}>
                        <CardMedia
                            component="img"
                            height="250"
                            width="250"
                            image={details.sprites.front_shiny}
                            alt="green iguana"
                        />
                      <div className="pokemon_name">{pokemon.name}
                          </div>  

                    </Card>

              
                </div>
            </Link> : null}

        </div>

    )
}

export default PokemonCard
