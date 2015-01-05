document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var DOC = document;
    var body = document.querySelector("body");
    var formObject = new JSForm();

    var validateButton = DOC.querySelector("button");
    validateButton.addEventListener("click", function(event){
        console.log(formObject.valid(DOC.querySelectorAll("[data-form-validator]")));
    });

    var forms = DOC.querySelectorAll("[data-event-listener][data-event-handler]");

    for(var i = 0, length = forms.length; i < length; i++) {
        var form = forms[i];
        form.addEventListener("submit", function(event){
            var target = event.target;
            formObject.parse(target.elements);
            event.preventDefault();
        });
    }

});