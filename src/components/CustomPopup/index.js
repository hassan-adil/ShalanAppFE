import React, { Component } from 'react';
import PropTypes from "prop-types";

class CustomPopup extends Component {
    static propTypes = {
        showPopup: PropTypes.bool,
        toClose: PropTypes.func,
    };
    static defaultProps = {
        showPopup: false,
        toClose: undefined,
    };
    render() {
        const { showPopup, children, toClose } = this.props;
        return (
            <div style={{ display: showPopup ? 'block' : 'none' }}>
                <div style={{
                    display: 'flex',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1200,
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    overflowY: 'scroll',
                }}>
                    <div className="col-12">
                        <div className="my-5 flex-row d-flex justify-content-center align-items-center">
                            <div className="col-md-5 bg-white p-4 rounded shadow-lg">
                                <div className="text-right">
                                    <span className="h3" style={{ cursor: 'pointer' }} onClick={toClose}>&times;</span>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default CustomPopup