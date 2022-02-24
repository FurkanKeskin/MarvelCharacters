import React from 'react';
import { NavLink } from 'react-router-dom';
import './characterCard.scss';

const CharacterCard = ({ data }) => {
    return (
        <div className="list-item">
                <img
                    src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                    alt='character'
                />
            <NavLink activeClassName="activeLink" to={`/character/${data.id}`}>
            <span>{data.name}</span>
            </NavLink>
        </div>
    );
};

export default CharacterCard