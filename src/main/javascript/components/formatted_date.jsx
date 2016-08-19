import React from 'react';

class FormattedDate extends React.Component {

    render() {
        let date = this.props.date;
        if (typeof(date) === 'number') {
            date = new Date(date);
        }

        let formattedDate = '';
        if (date) {
            const year = date.getFullYear();
            const month = ('0' + date.getMonth()).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            formattedDate = `${year}-${month}-${day}`;
        }

        return (
            <span>{formattedDate}</span>
        );
    }
}

export default FormattedDate;