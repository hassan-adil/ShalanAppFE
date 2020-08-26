// import { connect } from "react-redux";
import React, { Component } from "react";
import moment from 'moment';

import {
    DotsLoader,
    Navbar,
    ActionButton,
    InputField,
    CustomPopup,
    SelectField,
    CustomButton,
} from "../../components";
import { getResource } from "../../config/simpleApiCalls";
import { USER_API } from "../../config/WebServices";
import { optionRegex, nameRegex, validate } from "../../utils/validation";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            firstName: '',
            lastName: '',
            country: '0',
            position: '0',
            title: '0',
            firstNameError: '',
            lastNameError: '',
            countryError: '',
            positionError: '',
            titleError: '',
            countryList: [
                { id: 1, name: 'Pakistan' },
                { id: 2, name: 'UAE' },
            ],
            positionList: [
                { id: 1, name: 'Co-Ordinator' },
                { id: 2, name: 'TeamLead' },
            ],
            titleList: [
                { id: 1, name: 'Mr' },
                { id: 2, name: 'Mrs' },
            ],
            showPopup: false,
            isloading: false,
            users: []
        };
    }

    async componentDidMount() {
        const userData = await JSON.parse(sessionStorage.getItem("user"));
        if (userData && userData.token) {
            getResource(USER_API, userData.token)
                .then(res => {
                    this.setState({ users: res.data });
                })
                .catch(err => {
                    console.log(err, '')
                })
        }
    }

    handleNavigation = (route) => {
        this.props.history.push(route);
    };

    onChangeFirstName = async (event) => {
        this.setState({ firstName: event.target.value })
        this.setState({
            firstNameError: await validate(
                event.target.value,
                nameRegex,
                'Please enter a First name',
            ),
        });
    };
    onChangeLastName = async (event) => {
        this.setState({ lastName: event.target.value })
        this.setState({
            lastNameError: await validate(
                event.target.value,
                nameRegex,
                'Please enter a last name',
            ),
        });
    };
    onChangeCountry = async (event) => {
        this.setState({ country: event.target.value })
        this.setState({
            countryError: await validate(
                event.target.value,
                optionRegex,
                'Country is required.',
            ),
        });
    };
    onChangePosition = async (event) => {
        this.setState({ position: event.target.value })
        this.setState({
            positionError: await validate(
                event.target.value,
                optionRegex,
                'Position is required.',
            ),
        });
    };
    onChangeTitle = async (event) => {
        this.setState({ title: event.target.value })
        this.setState({
            titleError: await validate(
                event.target.value,
                optionRegex,
                'Title is required.',
            ),
        });
    };

    handlePopup = (data, showPopup) => {
        if (data) {
            this.setState({
                userId: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                country: `${data.country}`,
                position: `${data.position}`,
                title: `${data.title}`,
                showPopup,
            })
        } else {
            this.setState({ showPopup })
        }

    }

    handleUpdate = (event) => {
        event.preventDefault()
        const { userId, firstName, firstNameError, lastName, lastNameError, country, position, title } = this.state;
        if (!firstName || firstNameError) {
            this.setState({ firstNameError: 'First name is required.' });
        } else if (!lastName || lastNameError) {
            this.setState({ lastNameError: 'Last name is required.' });
        } else if (parseInt(country) === 0) {
            this.setState({ countryError: 'Country is required.' });
        } else if (parseInt(position) === 0) {
            this.setState({ positionError: 'Position is required.' });
        } else if (parseInt(title) === 0) {
            this.setState({ titleError: 'Title is required.' });
        } else {
            const payload = {
                id: userId,
                firstName,
                lastName,
                country: parseInt(country),
                position: parseInt(position),
                title: parseInt(title)
            }
            console.log(payload, 'update payload')
        }
    }

    handleDelete = (userId) => {
        console.log(userId, "userId for delete")
    }

    renderLoader = () => {
        const { isloading } = this.state;
        return <DotsLoader isloading={isloading} />;
    };

    getCountry = (countryNumber) => {
        switch (countryNumber) {
            case 1:
                return 'Pakistan';
            case 2:
                return 'UAE';
            case 3:
                return 'China';
            case 4:
                return 'Russia';
            case 5:
                return 'KSA';
            case 6:
                return 'USA';
            case 7:
                return 'UK';
            default:
                return '-';
        }
    }

    getPosition = (positionNumber) => {
        switch (positionNumber) {
            case 1:
                return 'Co-Ordinator';
            case 2:
                return 'TeamLead';
            case 3:
                return 'Manager';
            case 4:
                return 'GeneralManager';
            case 5:
                return 'CEO';
            default:
                return '-';
        }
    }

    getTitle = (titleNumber) => {
        switch (titleNumber) {
            case 1:
                return 'Mr';
            case 2:
                return 'Mrs';
            case 3:
                return 'Ms';
            default:
                return '-';
        }
    }

    render() {
        const {
            users,
            firstName,
            lastName,
            country,
            countryList,
            position,
            positionList,
            title,
            titleList,
            firstNameError,
            lastNameError,
            countryError,
            positionError,
            titleError,
            showPopup,
        } = this.state;
        return (
            <div className="container-fluid bg-light">
                {this.renderLoader()}
                <CustomPopup toClose={() => this.handlePopup(null, false)} showPopup={showPopup} children={
                    <form>
                        <InputField
                            label={"First Name"}
                            value={firstName}
                            id={"first-name"}
                            ariaDescribedby={"firstNameErr"}
                            placeholder={"Enter your first name"}
                            type={"text"}
                            onChange={this.onChangeFirstName}
                            errorMessage={firstNameError}
                        />
                        <InputField
                            label={"Last Name"}
                            value={lastName}
                            id={"Last-name"}
                            ariaDescribedby={"lastNameErr"}
                            placeholder={"Enter your last name"}
                            type={"text"}
                            onChange={this.onChangeLastName}
                            errorMessage={lastNameError}
                        />
                        <SelectField
                            label={"Country"}
                            value={country}
                            id={"country"}
                            placeholder={"Choose country"}
                            onChange={this.onChangeCountry}
                            errorMessage={countryError}
                            optionList={countryList}
                        />
                        <SelectField
                            label={"Position"}
                            value={position}
                            id={"position"}
                            placeholder={"Choose position"}
                            onChange={this.onChangePosition}
                            errorMessage={positionError}
                            optionList={positionList}
                        />
                        <SelectField
                            label={"Title"}
                            value={title}
                            id={"title"}
                            placeholder={"Choose title"}
                            onChange={this.onChangeTitle}
                            errorMessage={titleError}
                            optionList={titleList}
                        />
                        <CustomButton
                            btnText={"Update"}
                            btntype={"submit"}
                            onClick={(event) => this.handleUpdate(event)}
                        />
                    </form>
                } />
                <div className="container min-vh-100">
                    <div className="row">
                        <div className="col-12 px-3 pt-3">
                            <Navbar
                                {...this.props}
                            // createBtnOnClick={() => { }}
                            // createBtnText={'Create User'}
                            />
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
                                            <th scope="col">Take Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{this.getCountry(user.country)}</td>
                                                    <td>{this.getPosition(user.position)}</td>
                                                    <td>{this.getTitle(user.title)}</td>
                                                    <td>{moment(user.crtDate).format('MMMM Do YYYY')}</td>
                                                    <td>
                                                        <ActionButton
                                                            btntype={"edit"}
                                                            onClick={() => this.handlePopup(user, true)}
                                                        />
                                                        <ActionButton
                                                            btntype={"delete"}
                                                            onClick={() => this.handleDelete(user.id)}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

// export default connect(mapStateToProps, action)(User);
