import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import Input from "@hig/input";
import IconButton from "@hig/icon-button";
import { CaretUp16, CaretDown16 } from "@hig/icons";

import customStylesheet from "./customStylesheet";

const variantTypes = ["line", "box"];

export default class NumericInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * Class name for the component
     */
    onBlur: PropTypes.func,
    /**
     * Called after user changes the value of the field
     */
    onChange: PropTypes.func,
    /**
     * Called when user puts focus onto the field
     */
    onFocus: PropTypes.func,
    /**
     * Called as user changes the value of the field
     */
    onInput: PropTypes.func,
    /**
     * How much you want the arrows to move up or down
     */
    placeholder: PropTypes.string,
    /**
     * Initial text to display in the input
     */
    step: PropTypes.string,
    /**
     * Adds custom/overriding styles
     */
    stylesheet: PropTypes.func,
    /**
     * Starting value for the input
     */
    value: PropTypes.string,
    /**
     * The visual variant of the numeric input
     */
    variant: PropTypes.oneOf(variantTypes)
  };

  static defaultProps = {
    step: "1",
    variant: "line"
  };

  render() {
    const { variant, stylesheet, placeholder, ...otherProps } = this.props;
    const { className } = otherProps;

    const numericInputStylesheet = (styles, props, themeData) => {
      const numericInputStyles = customStylesheet(styles, props, themeData);
      return stylesheet
        ? stylesheet(numericInputStyles, props, themeData)
        : numericInputStyles;
    };

    const increaseValue = e => {
      // We need to find the nearest number input incase there are many on the page
      // This element is two above
      const sibling = e.target.nextSibling.nextSibling;
      const numberInput = sibling.querySelector(".numeric-input__input");
      numberInput.stepUp();
    };

    const decreaseValue = e => {
      // This element is one above
      const sibling = e.target.nextSibling;
      const numberInput = sibling.querySelector(".numeric-input__input");
      numberInput.stepDown();
    };

    return (
      <div className={className}>
        <IconButton
          {...otherProps}
          icon={<CaretUp16 />}
          onClick={e => increaseValue(e)}
          stylesheet={numericInputStylesheet}
          title="Up"
        />
        <IconButton
          {...otherProps}
          icon={<CaretDown16 />}
          onClick={e => decreaseValue(e)}
          stylesheet={numericInputStylesheet}
          title="Down"
        />
        <Input
          {...otherProps}
          className="numeric-input"
          placeholder={this.props.placeholder}
          step={this.props.step}
          stylesheet={numericInputStylesheet}
          tagName="input"
          type="number"
          variant={variant}
          value={this.props.value}
        />
      </div>
    );
  }
}
