import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, URL_SUFFIX } from '../../constants';
import './details.scss';


const Details = () => {
    const [character, setCharacter] = useState(null);
    const { charId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`${BASE_URL}/${charId}${URL_SUFFIX}`);
                setCharacter(response.data.results[0])
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    const formatSeries = (series) => {
       const re = /\(([^)]+\)?)\)(?!.*\([^)]+\))/ig;
       const results = re.exec(series.name);
       return Number(results[1].slice(0,4));
    }

    const sortSeries = (seriesA, seriesB) => {
            const a=  formatSeries(seriesA)
            const b=  formatSeries(seriesB)
            if(a < b) return 1;
            if(a > b) return -1;
            return 0;
    }

    return (
    <>
      {character &&
      <div className="detail">
        <div className={(character.series.available === 0 ? '-singleCard' : 'detail__card')}>
          <div className="detail__card-left">
            { character.name &&  <div className="detail__card-name"><span>{character.name}</span></div> }
            { character.description && <div className="-description">{ character.description !== ' ' && <h3>Character Description:</h3> } <p>{character.description}</p></div> }
            { character.thumbnail.path && <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt='character'/> }
          </div>
          { character.series.available !== 0 && (
            <div className="detail__card-right">
                <div className="detail__card-right -series">
                  <h2>Most recent {character.series.available} series of {character.name}</h2>
                  <ul>
                      {/* {console.log("SORTED REYIS", character.series?.items?.slice(0, 10).sort(sortSeries))} */}
                      {character.series?.items?.slice(0, 10).sort(sortSeries).map((item, index) => <li  key={index}>{item.name}</li>)}
                  </ul>
                </div>
            </div>
          )}
          </div>
        </div>}
    </>
    );
};


export default Details