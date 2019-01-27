import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdTrendingUp, IoIosArrowRoundForward } from 'react-icons/io'

class App extends Component {
  render () {
    return (
      <div className="container container--home gradient">
        <div className="container__content">
          <div className="container-app__icon">
            <IoMdTrendingUp className="icon icon--white" />
          </div>
          <h1 className="container-app__title">Cotação de seguros</h1>
          <p className="container-app__text">Solução inovadora de líder de mercado</p>
          <Link to="/search" className="button button--primary">Iniciar <IoIosArrowRoundForward className="button__icon" /></Link>
        </div>
      </div>
    )
  }
}

export default App