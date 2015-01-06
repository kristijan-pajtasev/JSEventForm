document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var events = new JSEvent();
    events.register("click:test", function(){alert("test")});
    events.register("click:test1", function(){alert("test1")});
    events.register("submit:submitTest", function(event){console.log(event);alert("");
        event.preventDefault();
        var formService = new JSForm(event);
        var form = event.target;
        var data = formService.parse(form.elements);
        console.log(data);
    });

    var DOC = document;
    var body = document.querySelector("body");

    //var validateButton = DOC.querySelector("button");
    //validateButton.addEventListener("click", function(event){
    //    console.log(formObject.valid(DOC.querySelectorAll("[data-form-validator]")));
    //});


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

    var forms = DOC.querySelectorAll("[data-event-listener][data-event-handler]");

});