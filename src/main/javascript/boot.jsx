import React from 'react';
import { render } from 'react-dom';

import { DynamicViewService } from './services/dynamic_view_service';
import { BackendTest } from './services/backend_test';
import { BackendLiferay } from './services/backend_liferay';

import App from './components/app.jsx';
import UserList from './components/user_list.jsx';

function start(appRootElement, portletConfig) {
    const dynamicViewService = new DynamicViewService(UserList);

    let backend = null;
    if (portletConfig.isStandalone) {
        backend = new BackendTest(portletConfig);
    } else {
        backend = new BackendLiferay(portletConfig);
    }

    const context = {
        dynamicViewService, backend
    };

    render(<App portletConfig={portletConfig} context={context}/>, appRootElement);
}

global.startReactPortletDemoApp = start;