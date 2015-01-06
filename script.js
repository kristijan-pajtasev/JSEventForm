document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    function getValidationFields(element) {
        var fields = [];
        if(element.attributes.getNamedItem("data-form-validator") != undefined) {
            fields.push(element);
        }
        var children = element.children;
        for(var i = 0, length = children.length; i < length; i++) {
            fields = fields.concat(getValidationFields(children[i]));
        }
        return fields;
    }

    var events = new JSEvent();
    events.register("click:test", function(){alert("test")});
    events.register("click:test1", function(){alert("test1")});
    events.register("submit:submitTest", function(event){console.log(event);alert("");
        event.preventDefault();
        var formService = new JSForm(event);
        var form = event.target;
        var valid = formService.valid(getValidationFields(form));
        if(valid == true) {
            var data = formService.parse(form);
            console.log("parsed valid data");
            console.log(data);
        } else {
            console.log("errors");
            console.log(valid);
        }
    });

    var body = document.querySelector("body");

    var eventTypes = ["click", "submit"];
    for(var i = 0, length = eventTypes.length; i < length; i++) {
        body.addEventListener(eventTypes[i], function(event) {
            var target = event.target;
            var registeredEvent = target.attributes.getNamedItem("data-event");
            if(registeredEvent != undefined && registeredEvent.value.indexOf(event.type) >= 0) {
                var eventsList = registeredEvent.value.split(",");
                for(var j = 0, jLength = eventsList.length; j < jLength; j++) {
                    events.trigger(eventsList[j], event, this);
                }
            }
        });
    }
});