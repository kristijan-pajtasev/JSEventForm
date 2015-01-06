function JSEvent() {
    var events = {};


    function trigger(key, event, _this){
        var keyCombination = key.split(":");
        var type = keyCombination[0];
        var name = keyCombination[1];
        events[type][name](event, _this);
    }

    function register(key, action) {
        var keyCombination = key.split(":");
        var type = keyCombination[0];
        var name = keyCombination[1];

        if(events[type] == undefined){
            events[type] = {};
        }
        events[type][name] = action;
    }

    return {
        trigger: trigger,
        register: register
    }
}