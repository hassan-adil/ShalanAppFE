import React, { Component } from 'react';
import PropTypes from "prop-types";

const ROUTES = [
    { label: 'User', pathname: '/' },
    { label: 'Employment', pathname: '/employment' },
    { label: 'Employee Report', pathname: '/employee-report' },
    { label: 'Hierarchical Employee Report', pathname: '/hierarchical-employee-report' },
]

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: '',
        };
    }
    static propTypes = {
        createBtnText: PropTypes.string,
        createBtnOnClick: PropTypes.func,
    };
    static defaultProps = {
        createBtnText: '',
        createBtnOnClick: undefined,
    };

    componentDidMount() {
        const { location: { pathname } } = this.props
        this.setState({ pathname });
    }

    handleNavigation = (route) => {
        this.props.history.push(route);
    }

    handleLogOut = () => {
        sessionStorage.setItem("user", '{}');
        this.handleNavigation('/login')
    }

    render() {
        const { createBtnText, createBtnOnClick } = this.props;
        const { pathname } = this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand">CURD</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">{
                        ROUTES.map((val, ind) => (
                            <li
                                key={ind}
                                className={val.pathname === pathname ? 'nav-item active' : 'nav-item'}
                                onClick={() => this.handleNavigation(val.pathname)}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="nav-link">{val.label}</span>
                            </li>
                        ))
                    }</ul>
                    <span className="navbar-text mr-3" style={{ cursor: 'pointer' }} onClick={createBtnOnClick}>{createBtnText}</span>
                    <span className="navbar-text" style={{ cursor: 'pointer' }} onClick={() => this.handleLogOut()}>Log Out</span>
                </div>
            </nav>
        );
    }
}

export default Navbar