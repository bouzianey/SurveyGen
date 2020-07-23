import React, { useState } from "react";
import PropTypes from 'prop-types';



const OptionComponent = ({ i, option}) => {

    return (
    <div key={i}>

        <label htmlFor='{optionID}'>{option.content}</label>
        <input type="radio" id="1" name={i} value="1"/>
        <input type="radio" id="2" name={i} value="2"/>
        <input type="radio" id="3" name={i} value="3"/>
        <input type="radio" id="4" name={i} value="4"/>
        <input type="radio" id="5" name={i} value="5"/>

    </div>
  );
};

OptionComponent.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.object,
};

export default OptionComponent;