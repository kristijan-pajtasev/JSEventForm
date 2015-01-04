document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var DOC = document;
    var body = document.querySelector("body");


    // [data-form-validator]

    var validateButton = DOC.querySelector("button");
    validateButton.addEventListener("click", function(event){
        console.log("clicked");
        var validation ={
            integer: function(value) {
                console.log("integer: " + value);
            },
            notempty: function(value) {
                console.log("notempty: " + value);
            }
        };

        var elements = DOC.querySelectorAll("[data-form-validator]");
        var parsedElements = parse(elements);

        for(var i = 0, length = elements.length; i < length; i++) {
            var element = elements[i];
            var validators = element.attributes.getNamedItem("data-form-validator").value.split(",");
            console.log(validators);
            for(var j = 0, v_length = validators.length; j < v_length; j++) {
                var validator = validators[j];
                validation[validator](parsedElements[element.name]);
            }
        }

        console.log(elements);
        console.log(parsedElements);
    });

    var forms = DOC.querySelectorAll("[data-event-listener][data-event-handler]");

    for(var i = 0, length = forms.length; i < length; i++) {
        var form = forms[i];
        form.addEventListener("submit", function(event){
            console.log("submited");
            var target = event.target;
            parse(target.elements);
            event.preventDefault();
        });
    }

    function parse(elements) {
        var data = {};

        for(var i = 0, length = elements.length; i < length; i++) {
            var element= elements[i];

            if(element.name != undefined && element.name != "") {
                if(element.type == "radio") {
                    if(element.checked) {
                        data[element.name] = element.value;
                    }
                } else if(element.type == "checkbox") {
                    if(element.checked) {
                        if(data[element.name] == undefined) {
                            data[element.name] = [];
                        }
                        data[element.name].push(element.value);
                    }
                } else {
                    data[element.name] = element.value;
                }
            }
        }

        console.log(data);
        return data;

    }

});