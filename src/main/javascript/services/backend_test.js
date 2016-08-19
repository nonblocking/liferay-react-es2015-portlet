import { Backend } from './backend';
import $ from 'jquery';

export class BackendTest extends Backend {

    constructor(portletConfig) {
        super();
        this.portletConfig = portletConfig;
    }

    userList(startIndex, limit) {
        var jsonFile = startIndex === 0 ? 'users.json' : 'users2.json';
        return $.get(this.portletConfig.ajaxUrl + jsonFile);
    }

    userDetail(userId) {
        return $.get(this.portletConfig.ajaxUrl + 'userDetails.json');
    }

}