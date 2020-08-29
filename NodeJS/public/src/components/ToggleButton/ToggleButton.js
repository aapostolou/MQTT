import React from 'react'

import "./ToggleButton.css"

const ToggleButton = ({ onClick }) =>
  <label class="switch" >
    <input type="checkbox" onClick={onClick} />
    <div class="container">
      <span class="slider"></span>
    </div>
  </label>


export default ToggleButton
