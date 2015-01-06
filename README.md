JSEventForm
===========

Event handling in JS and parsing forms

I created this project as a my own solution for event handling and form parsing.
During my work I didn't like to have a lot event listeners or large switch cases. Also,
since I worked with lots of forms I wanted to exclude some logic which would give me as
clean data as I could have.



Detailed description
====================

script.js
In script js I register 2 event listeners on body, click and submit. I could set other listeners
also but for example purposes I used only these two. Inside of html i use data-event attributes to
tell me which event triggers which function on which element. So in case that I want to listen
for click event on some span element, it will have attribute data-event="click:someFunction".
If I want to have more than one action on my element, I will add them separated with comma(,).
Inside of handler i check if action I want to trigger is for same type of event as the event
occurred so that multiple different events can be registered. Rest of script.js codes are functions which
happen on event or call form validations or parsing. Reason why I used this kind of event listener registrations
is because it is completely independent to any library and has minimal number of event listeners (number of
listeners is equal to number of event types to listen).

event.js
This file has one simple function and it is used just to hold and trigger event callbacks. I decided to use this
kind of saving actions because I wanted some object to save all of my actions without having some large switch
cases or something. Like this I can just register events for some object on one place. Also I made this "object"
as function so that each time you want to use it should use new JSEvent(). Like this, in case that I want to have 3
separated objects holding each logic each can have it's own events and in my event handler I can just on some way
chose on which object to trigger it. Maybe one more data attribute.

form.js
This file also contains just one function. It is designed to receive form elements, however, if it receives
some other array with same important attributes (value, name, checked, type, ...) it should work. Object returns
three exposed functions: parse, valid and addValidator. Add validator receives 2 parameters. First is validator
and second is validation as function. Value of element will be passed to validation function. Valid function
walks trough elements and checks if it has validation on it. To get it add data-form-validator element. If
You want more that one validator separate them with comma (data-form-validator="nonempty,integer"). If all
elements with this attribute are valid, function returns true. I other case returns object with keys of invalid
fields and each has array of messages returned from validator. Parse function walks trough form elements and
returns object where key is element name and value is element value. If element is multi value element (checkbox)
it returns array of checked values. For now, this does not support file type, but I do plan on adding it by using
File API.