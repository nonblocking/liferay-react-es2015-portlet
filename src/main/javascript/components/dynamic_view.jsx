
import React from 'react';
import PropTypes from 'prop-types';

class DynamicView extends React.Component {

    constructor() {
        super();
        this.state = {
            comp: null,
            params: null
        }
    }

    componentWillMount() {
        //DI
        this.dynamicViewService = this.context.dynamicViewService;
        this.dynamicViewService._setStateChangeCallback((comp, params) => {
            this.setState({ comp, params });
        });
    }


    render() {
        if (this.state.comp) {
            const viewComp = React.createElement(this.state.comp, this.state.params);
            return (
                <div>{viewComp}</div>
            );
        }

        return (
          <div>No component to show</div>
        );
    }
}

DynamicView.contextTypes = {
    dynamicViewService: PropTypes.object
};

export default DynamicView;
