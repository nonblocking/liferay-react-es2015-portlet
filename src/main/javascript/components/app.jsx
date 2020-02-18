import React from 'react';
import DynamicView from './dynamic_view.jsx';
import PropTypes from 'prop-types';

class App extends React.Component {

    getChildContext() {
        return this.props.context;
    }

    render() {
        return (
            <div>
                <h2>React Portlet Demo ES2015</h2>
                <p>Authenticated User: <strong>{this.props.portletConfig.authenticatedUser}</strong></p>
                <DynamicView />
            </div>
        );
    }

}

App.childContextTypes = {
    dynamicViewService: PropTypes.object,
    backend: PropTypes.object
};

export default App;
