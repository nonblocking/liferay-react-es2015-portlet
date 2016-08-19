import { Backend } from './backend';
import $ from 'jquery';

export class BackendLiferay extends Backend {

    constructor(portletConfig) {
        super();
        this.portletConfig = portletConfig;
    }

    userList(startIndex, limit) {
        return this.ajaxPost('userList', { startIndex: startIndex, limit: limit });
    }

    userDetail(userId) {
        return this.ajaxPost('userDetail', { userId: userId });
    }

    ajaxPost(method, data){
        return $.ajax({
            url: this.portletConfig.ajaxUrl + '&p_p_resource_id=' + method,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: data
        });
    }
}