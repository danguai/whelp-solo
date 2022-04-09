import React from "react";
import { Link } from "react-router-dom";
// import ProfileButton from "../ProfileButton";

import './Footer.css';

const Footer = ({ isLoaded, sessionUser }) => {

    return (
        <div>
            <div>
                <nav className="footer__bar">
                    <div className="built__with__container" >Built with:
                        <a href='https://reactjs.org/' target="_blank" className='built__with__logos__text'>
                            <img className='built__with__logos' src={require('../../images/logos/React.png')} /> React
                        </a>
                        <a href='https://redux.js.org/' target="_blank" className='built__with__logos__text'>
                            <img className='built__with__logos' src={require('../../images/logos/Redux.png')} /> Redux
                        </a>
                        <a href='https://www.javascript.com/' target="_blank" className='built__with__logos__text'>
                            <img className='built__with__logos' src={require('../../images/logos/javascript.png')} /> Javascript
                        </a>
                        <a href='https://nodejs.org/en/' target="_blank" className='built__with__logos__text'>
                            <img className='built__with__logos' src={require('../../images/logos/NodeJS.png')} />
                        </a>
                        <a href='https://www.postgresql.org/' target="_blank" className='built__with__logos__text'>
                            <img className='built__with__logos' src={require('../../images/logos/PostgresSQL.png')} /> PostgresSQL
                        </a>
                    </div>
                    <div className="built__with__container" >Built by:
                        <a href='https://github.com/danguai' target="_blank" className='built__with__logos'>
                            <img className='built__with__logos' src={require('../../images/logos/github.png')} />
                        </a>
                        <a href='https://www.linkedin.com/in/blancodaniel/' target="_blank" className='built__with__logos'>
                            <img className='built__with__logos' src={require('../../images/logos/linkedin.png')} />
                        </a>
                        <a href='https://www.instagram.com/danguai/' target="_blank" className='built__with__logos'>
                            <img className='built__with__logos' src={require('../../images/logos/instagram.png')} />
                        </a>
                        <a href='https://d-blanco.com/' target="_blank" className='built__with__logos'>
                            d-blanco.com
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    )
};

export default Footer;
