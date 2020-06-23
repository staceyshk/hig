import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx } from "emotion";
import Input from "@hig/input";
import IconButton from "@hig/icon-button";
import { CaretUp16, CaretDown16 } from "@hig/icons";

import customStylesheet from "./customStylesheet";

const variantTypes = ["line", "box"];

export default class NumericInput extends Component {
  static propTypes = {
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
     * Adds custom/overriding styles
     */
    stylesheet: PropTypes.func,
    /**
     * The visual variant of the numeric input
     */
    variant: PropTypes.oneOf(variantTypes),
    /**
     * Initial value of the number
     */
    value: PropTypes.number
  };

  static defaultProps = {
    variant: "line"
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  render() {
    const { variant, stylesheet, placeholder, ...otherProps } = this.props;
    const { className } = otherProps;
    const inputClassName =
      className &&
      className
        .split(" ")
        .reduce((acc, cur) => cx(acc, `${cur.trim()}-numericinput`), "");

    const numericInputStylesheet = (styles, props, themeData) => {
      const numericInputStyles = customStylesheet(styles, props, themeData);
      return stylesheet
        ? stylesheet(numericInputStyles, props, themeData)
        : numericInputStyles;
    };

    const increaseValue = () => {
      // If the value is not undefined
      if (this.state.value) {
        this.setState({ value: parseFloat(this.state.value) + 1 });
      } else {
        this.setState({ value: 1 });
      }
    }

    const decreaseValue = () => {
       // If the value is not undefined
      if (this.state.value) {
        this.setState({ value: parseFloat(this.state.value) - 1 });
      } else {
        this.setState({ value: -1 });
      }
    }

    return (
      <div>
        <IconButton
          className="up-arrow"
          icon={<CaretUp16 />}
          onClick={() => increaseValue()}
          title="Down"
        />
        <IconButton
          className="down-arrow"
          icon={<CaretDown16 />}
          onClick={() => decreaseValue()}
          title="Up"
        />
        <Input
          {...otherProps}
          className={inputClassName}
          placeholder={placeholder}
          stylesheet={numericInputStylesheet}
          tagName="input"
          type="number"
          variant={variant}
          value={this.state.value}
        />
      </div>
    );
  }
}
