import React, { Component } from 'react'
import Button from '../components/Button';
import { findCnpjCompany } from '../service/search-cnpj';
import { IoMdTrendingUp, IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cnpj: '',
      status: '',
      statusClass: ''
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.maskCnpj = this.maskCnpj.bind(this)
    this.removeMask = this.removeMask.bind(this)
  }

  changeHandler(event) {
    let cnpjMask = this.maskCnpj(event.target.value)
    event.target.value = cnpjMask
    this.setState({ cnpj: cnpjMask })
  }

  maskCnpj(string) {
    let newString = string.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
    return newString
  }

  removeMask(string) {
    let newString = string.replace(/(\.|\/|-)/g, '')
    return newString
  }

  submitHandler(event) {
    event.preventDefault()
    let cnpjCompany = this.removeMask(this.state.cnpj)
    this.setState({ cnpj: cnpjCompany })

    findCnpjCompany(cnpjCompany).then((res) => {
      if (res.status === 200) {
        this.setState({
          statusClass: 'container-search__search-status--success',
          status: res.status
        })
        console.log('this.state', this.state)
      } else if (res.status === 404) {
        this.setState({
          statusClass: 'container-search__search-status--fail',
          status: res.status
        })
      }
    })
  }

  render() {
    let status = this.props.status
    let classStatus = this.props.statusClass
    let iconStatus = (status === 200) ? <IoIosCheckmarkCircle /> : <IoIosCloseCircle />

    return (
      <div className="container container-search">
        <form
          action="#"
          className="container-search__search-form"
          onSubmit={this.submitHandler}
        >
          <div className="container-search__header gradient-horizontal">
            <IoMdTrendingUp className="icon container-search__header-icon" />
            <div className="container-search__header-content">
              <h2 className="container-search__header-title">Nova cotação</h2>
              <span className="container-search__header-identification">#0980</span>
            </div>
            <img
              src="/assets/perfil.jpg"
              alt="Perfil"
              className="container-search__photo"
            />
          </div>

          <div className="container-search__body">
            <div className="container-search__body-title">
              <div className="container-search__body-title-icon">1</div>
              <div className="container-search__body-title-text">Buscar por CNPJ ou empresa</div>
            </div>

            <div className="container-search__search-box">
              <label
                htmlFor="input-cnpj"
                className="container-search__search-label-cnpj"
              >CNPJ / Empresa</label>
              <div className="container-search__search-input-group">
                <input
                  id="input-cnpj"
                  className="container-search__search-input-cnpj"
                  type="text"
                  onChange={this.changeHandler}
                />
                <div className={ 'container-search__search-status ' + classStatus }>{iconStatus}</div>
              </div>
            </div>
          </div>

          <div className="container-search__button-container">
            <Button
              type="submit"
              cssClassName="button--secondary"
              label="OK"
              onClick={this.requestApi}
            ></Button>
          </div>
        </form>
      </div>
    )
  }
}

export default Search