function JSForm(config) {

    var validation ={
        integer: function(value) {
            var digitsRemoved = value.replace(/\d+/, "");
            if(digitsRemoved != "") {
                return "This field has to be whole number."
            }
            return true;
        },
        notempty: function(value) {
            if(value == undefined != value == "") {
                return "This field is required."
            }
            return true;
        }
    };

    if(config != undefined && config.validations != undefined) {
        var validations = config.validations;
        var keys = Object.keys(validations);

        for(var i = 0, length = keys.lenght; i < lenght; i++) {
            var key = keys[i];
            validation[key] = validations[key];
        }
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

        return data;

    }

    function valid(elements) {

        var errors;
        var parsedElements = parse(elements);

        for(var i = 0, length = elements.length; i < length; i++) {
            var element = elements[i];
            var validators = element.attributes.getNamedItem("data-form-validator").value.split(",");
            for(var j = 0, v_length = validators.length; j < v_length; j++) {
                var validator = validators[j];
                var valid = validation[validator](parsedElements[element.name]);
                if(valid != true) {
                    if(errors == undefined) {
                        errors = {};
                    }
                    if(errors[element.name] == undefined) {
                        errors[element.name] = []
                    }
                    errors[element.name].push(valid);
                }
            }
        }

        if(errors == undefined) {
            return true;
        } else {
            return errors;
        }
    }

    return {
        parse: parse,
        valid: valid,
        addValidator: function(key, action) {
            validation[key] = action;
        }
    }
}