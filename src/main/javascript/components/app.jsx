import React from 'react';
import DynamicView from './dynamic_view.jsx';

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
    dynamicViewService: React.PropTypes.object,
    backend: React.PropTypes.object
};

export default App;
