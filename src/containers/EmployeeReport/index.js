// import { connect } from "react-redux";
import React, { Component } from "react";
import moment from 'moment';

import { DotsLoader, Navbar } from "../../components";
import { ErrorHelper } from "../../helpers";
import { getResource } from "../../config/simpleApiCalls";
import { REPORT_ALL_EMPLOYEES_API } from "../../config/WebServices";

export default class EmployeeReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            reportAllEmployees: null,
        };
    }

    async componentDidMount() {
        const user = await JSON.parse(sessionStorage.getItem('user'));
        getResource(REPORT_ALL_EMPLOYEES_API, user?.token)
            .then(success => {
                this.setState({ reportAllEmployees: success })
            }).catch(error => {
                ErrorHelper.handleErrors(error, true);
            })
    }

    handleNavigation = (route) => {
        this.props.history.push(route);
    };

    renderLoader = () => {
        const { isloading } = this.state;
        return <DotsLoader isloading={isloading} />;
    };

    render() {
        const { reportAllEmployees } = this.state;
        console.log(reportAllEmployees, "reportAllEmployees")
        return (
            <div className="container-fluid bg-light">
                {this.renderLoader()}
                <div className="container min-vh-100">
                    <div className="row">
                        <div className="col-12 px-3 pt-3">
                            <Navbar {...this.props} />
                        </div>
                        <div className="col-12 p-3">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Country</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Create Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>USA</td>
                                            <td>Digital Marketing Manager</td>
                                            <td>Title</td>
                                            <td>{moment(new Date()).format('MMMM Do YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>UK</td>
                                            <td>Product Manager</td>
                                            <td>Title</td>
                                            <td>{moment(new Date()).format('MMMM Do YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>UAE</td>
                                            <td>React Native Developer</td>
                                            <td>Title</td>
                                            <td>{moment(new Date()).format('MMMM Do YYYY')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => ({});

// const action = {};

// export default connect(mapStateToProps, action)(EmployeeReport);
