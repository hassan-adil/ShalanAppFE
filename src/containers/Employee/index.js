// import { connect } from "react-redux";
import React, { Component } from "react";
import moment from 'moment';

import { DotsLoader, Navbar, ActionButton } from "../../components";
import { getResource } from "../../config/simpleApiCalls";
import { EMPLOYMENT_API } from "../../config/WebServices";

export default class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            employments: []
        };
    }

    async componentDidMount() {
        const userData = await JSON.parse(sessionStorage.getItem("user"));

        if (userData && userData.token) {
            getResource(EMPLOYMENT_API, userData.token)
                .then(res => {
                    this.setState({ employments: res.data });
                })
                .catch(err => {
                    console.log(err, '')
                })
        }
    }

    handleNavigation = (route) => {
        this.props.history.push(route);
    };

    renderLoader = () => {
        const { isloading } = this.state;
        return <DotsLoader isloading={isloading} />;
    };

    render() {
        return (
            <div className="container-fluid bg-light">
                {this.renderLoader()}
                <div className="container min-vh-100">
                    <div className="row">
                        <div className="col-12 px-3 pt-3">
                            <Navbar
                                {...this.props}
                                createBtnOnClick={() => { }}
                                createBtnText={'Create Employment'}
                            />
                        </div>
                        <div className="col-12 p-3">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Employee Name</th>
                                            <th scope="col">Contract Start</th>
                                            <th scope="col">Contract End</th>
                                            <th scope="col">Accomodation</th>
                                            <th scope="col">Transport</th>
                                            <th scope="col">Other Expense</th>
                                            <th scope="col">Total Salary</th>
                                            <th scope="col">Create Date</th>
                                            <th scope="col">Take Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.employments.map((employment, index) => {
                                                return(
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{employment.employeeName}</td>
                                                        <td>{moment(employment.contractStart).format('MMMM Do YYYY')}</td>
                                                        <td>{moment(employment.contractEnd).format('MMMM Do YYYY')}</td>
                                                        <td>{employment.accomodition}</td>
                                                        <td>{employment.transport}</td>
                                                        <td>{employment.otherExpense}</td>
                                                        <td>{employment.totalSalary}</td>
                                                        <td>{moment(employment.crtDate).format('MMMM Do YYYY')}</td>
                                                        <td><ActionButton btntype={"edit"} /><ActionButton btntype={"delete"} /></td>
                                                    </tr>
                                                );
                                            })
                                        }
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

// export default connect(mapStateToProps, action)(Employee);
