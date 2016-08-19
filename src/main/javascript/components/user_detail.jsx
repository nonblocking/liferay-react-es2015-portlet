import React from 'react';
import UserList from './user_list.jsx';
import FormattedDate from './formatted_date.jsx';

class UserDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            userData: null
        }
    }

    componentWillMount() {
        //DI
        this.dynamicViewService = this.context.dynamicViewService;
        this.backend = this.context.backend;

        this.loadDetails();
    }

    showList() {
        this.dynamicViewService.show(UserList);
    }

    loadDetails() {
        this.backend.userDetail(this.props.userId).then(
            (data, textStatus) => {
                this.setState({
                    userData: data
                });
            }, (jqXHR, textStatus) => {
                alert('Error: ' + textStatus);
            });
    }

    render() {
        if (this.state.userData) {
            return (
                <div>
                    <h3>Portal User: {this.state.userData.screenName}</h3>
                    <table className="portlet-user-table">
                        <tbody>
                            <tr>
                                <td>Screen Name:</td>
                                <td>{this.state.userData.screenName}</td>
                            </tr>
                            <tr className="even">
                                <td>EMail Address:</td>
                                <td>{this.state.userData.emailAddress}</td>
                            </tr>
                            <tr>
                                <td>First Name:</td>
                                <td>{this.state.userData.firstName}</td>
                            </tr>
                            <tr className="even">
                                <td>Last Name:</td>
                                <td>{this.state.userData.lastName}</td>
                            </tr>
                            <tr>
                                <td>Last Login Date:</td>
                                <td><FormattedDate date={this.state.userData.lastLoginDate}/></td>
                            </tr>
                            <tr className="even">
                                <td>Last Login IP:</td>
                                <td>{this.state.userData.lastLoginIp}</td>
                            </tr>
                            <tr>
                                <td>Language:</td>
                                <td>{this.state.userData.languageId}</td>
                            </tr>
                            <tr className="even">
                                <td>User Groups:</td>
                                <td>{this.state.userData.userGroups}</td>
                            </tr>
                            <tr>
                                <td>Roles:</td>
                                <td>{this.state.userData.roles}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="portlet-controls">
                        <a href="#" onClick={this.showList.bind(this)}>Back</a>
                    </div>
                </div>
            );
        }

        return (
            <div>Loading...</div>
        );
    }
}

UserDetail.contextTypes = {
    dynamicViewService: React.PropTypes.object,
    backend: React.PropTypes.object
};

export default UserDetail;