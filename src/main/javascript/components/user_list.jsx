import React from 'react';
import UserDetail from './user_detail.jsx';
import PropTypes from 'prop-types';

class UserList extends React.Component {

    constructor() {
        super();
        this.entriesPerPage = 10;

        this.state = {
            users: [],
            currentPage: 0,
            totalEntries: 0
        }
    }

    componentWillMount() {
        //DI
        this.dynamicViewService = this.context.dynamicViewService;
        this.backend = this.context.backend;

        this.loadUsers();
    }

    totalPages() {
        return Math.floor(this.state.totalEntries / this.entriesPerPage) + 1;
    }

    isLastPage() {
        return this.state.totalEntries < (this.state.currentPage + 1) * this.entriesPerPage;
    }

    isFirstPage() {
        return this.state.currentPage === 0;
    }

    nextPage() {
        if (!this.isLastPage()) {
            this.setState({
                users: [],
                currentPage: this.state.currentPage + 1,
                totalEntries: 0
            }, () => {
                this.loadUsers();
            });
        }
    }

    previousPage() {
        if (!this.isFirstPage()) {
            this.setState({
                users: [],
                currentPage: this.state.currentPage - 1,
                totalEntries: 0
            }, () => {
                this.loadUsers();
            });
        }
    }

    showDetails(userId) {
        this.dynamicViewService.show(UserDetail, { userId });
    }

    loadUsers() {
        this.backend.userList(this.state.currentPage * this.entriesPerPage, this.entriesPerPage).then(
            (data, textStatus) => {
                this.setState({
                    users: data.users,
                    currentPage: this.state.currentPage,
                    totalEntries: data.total
                });
            }, (jqXHR, textStatus) => {
                alert('Error: ' + textStatus);
            });
    }

    render() {
        const previousPageDisabledClass = this.isFirstPage() ? 'disabled' : '';
        const nextPageDisabledClass = this.isLastPage() ? 'disabled' : '';

        const userListRows = this.state.users.map((user, idx) =>
            <tr key={user.userId} className={idx % 2 === 0 ? 'odd' : 'even'}>
                <td>{user.screenName}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.emailAddress}</td>
                <td><a href='#' onClick={this.showDetails.bind(this, user.userId)}>Details</a></td>
            </tr>
        );

        return (
            <div>
                <h3>Portal User List</h3>
                <table className="portlet-user-table">
                    <thead>
                        <tr>
                            <th>Screen Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>EMail Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userListRows}
                    </tbody>
                </table>
                <div className="portlet-controls">
                    Page {this.state.currentPage + 1} of {this.totalPages()}
                    &nbsp;
                    <a href="#" onClick={this.previousPage.bind(this)} className={previousPageDisabledClass}>Previous Page</a>
                    |
                    <a href="#" onClick={this.nextPage.bind(this)} className={nextPageDisabledClass}>Next Page</a>
                </div>
            </div>
        );
    }
}

UserList.contextTypes = {
    dynamicViewService: PropTypes.object,
    backend: PropTypes.object
};

export default UserList;