import React, { Component } from 'react';
import PropTypes from "prop-types";

class SelectField extends Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
        id: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        errorMessage: PropTypes.string,
        optionList: PropTypes.array
    };
    static defaultProps = {
        label: '',
        value: '',
        id: '',
        placeholder: '',
        onChange: undefined,
        errorMessage: '',
        optionList: [],
    };
    render() {
        const {
            label,
            value,
            id,
            placeholder,
            onChange,
            errorMessage,
            optionList,
        } = this.props;
        return (
            <div class="form-group">
                <label htmlFor={id}>{label}</label>
                <select onChange={onChange} value={value} className="form-control" id={id} >
                    <option value='0'>{placeholder}</option>
                    {optionList.map(val => (<option key={val.name} value={val.id}>{val.name}</option>))}
                </select>
                <small className="form-text text-danger">{errorMessage}</small>
            </div>
        );
    }
}

export default SelectField