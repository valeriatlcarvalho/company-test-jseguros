import React, { Component } from "react";
import { IoIosArrowRoundForward } from 'react-icons/io'

class Button extends Component {
  constructor(props) {
    super(props)

    this.state = {
      label: 'Button',
      cssClassName: ''
    }
  }

  render() {
    const { label, cssClassName } = this.props

    return (
      <button className={'button ' + cssClassName}>
        <span>{label}</span>
        <IoIosArrowRoundForward className="button__icon" />
      </button>
    )
  }
}

export default Button