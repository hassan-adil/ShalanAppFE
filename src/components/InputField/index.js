import React, { Component } from 'react';
import PropTypes from "prop-types";

class InputField extends Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
        id: PropTypes.string,
        ariaDescribedby: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
        errorMessage: PropTypes.string,
    };
    static defaultProps = {
        label: '',
        value: '',
        id: '',
        ariaDescribedby: '',
        placeholder: '',
        type: '',
        onChange: undefined,
        errorMessage: '',
    };
    render() {
        const {
            label,
            value,
            id,
            ariaDescribedby,
            placeholder,
            type,
            onChange,
            errorMessage,
        } = this.props;
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input type={type} onChange={onChange} value={value} className="form-control" id={id} aria-describedby={ariaDescribedby} placeholder={placeholder} />
                <small id={ariaDescribedby} className="form-text text-danger">{errorMessage}</small>
            </div>
        );
    }
}

export default InputField