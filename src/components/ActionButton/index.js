import React, { Component } from 'react';
import PropTypes from "prop-types";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

class InputField extends Component {
    static propTypes = {
        btntype: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    };
    static defaultProps = {
        btntype: '',
        onClick: undefined,
    };
    render() {
        const {
            btntype,
            onClick,
        } = this.props;

        return (
            <>
                {btntype === 'edit' &&
                    <FaEdit
                        size={20}
                        color="#ffc107"
                        className="mx-2"
                        onClick={onClick}
                        style={{ cursor: 'pointer' }}
                    />
                }
                {btntype === 'delete' &&
                    <FaRegTrashAlt
                        size={17}
                        color="##dc3545"
                        className="mx-2"
                        onClick={onClick}
                        style={{ cursor: 'pointer' }}
                    />
                }
            </>
            // (<FaTrash className="mx-1 bg-danger" onClick={onClick} />)
        );
    }
}

export default InputField