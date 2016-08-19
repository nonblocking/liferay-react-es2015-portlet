

export class DynamicViewService {

    constructor(defaultComp = null, defaultCompParams = {}) {
        this.defaultComp = defaultComp;
        this.defaultCompParams = defaultCompParams;
        this.stateChangeCallback = null;
    }

    show(comp, params = {}) {
        if (this.stateChangeCallback) {
            this.stateChangeCallback(comp, params);
        }
    }

    _setStateChangeCallback(stateChangeCallback) {
        this.stateChangeCallback = stateChangeCallback;
        if (this.defaultComp) {
            this.show(this.defaultComp, this.defaultCompParams);
        }
    }
}
