import React, { Component } from 'react';
import PropTypes from "prop-types";

class InputField extends Component {
    static propTypes = {
        btnText: PropTypes.string,
        btntype: PropTypes.string,
        onClick: PropTypes.func,
    };
    static defaultProps = {
        btnText: '',
        btntype: '',
        onClick: undefined,
    };
    render() {
        const {
            btnText,
            btntype,
            onClick,
        } = this.props;
        return (
            <button type={btntype} onClick={onClick} className="btn btn-primary">{btnText}</button>
        );
    }
}

export default InputField