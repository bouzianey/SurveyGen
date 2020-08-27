import React, { useState } from "react";
import PropTypes from 'prop-types';



const OptionComponent = ({ i, option}) => {

    return (

        <tr key={i}>
            <td>
            <h5 htmlFor='{optionID}'>{option.content}</h5>
            </td>
            <td>
            <input type="radio" id="1" name={i} value="1"/>
            </td>
            <td>
            <input type="radio" id="2" name={i} value="2"/>
            </td>
            <td>
            <input type="radio" id="3" name={i} value="3"/>
            </td>
            <td>
            <input type="radio" id="4" name={i} value="4"/>
            </td>
            <td>
            <input type="radio" id="5" name={i} value="5"/>
            </td>
        </tr>

  );
};

OptionComponent.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.object,
};

export default OptionComponent;