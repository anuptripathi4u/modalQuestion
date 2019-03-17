# ModalQuestion

This is a small utility to present a set of choices to the user as a bootstrap modal. 
The question may be single choice (radio) or a multi (checkbox) choice one.
The selected values are then passed to a callback function as an array or a single value based on question type.

Demo: https://anuptripathi4u.github.io/modalQuestion/


## Typical usage:

```javascript
modalQuestion.ask(
    'Please select your options', [
        {value: "1", label: "First"},
        {value: "2", label: "Second"},
        {value: "3", label: "Third"},
        {value: "4", label: "Fourth"}
    ],
    true,
    function (values) {
        alert("Your choices: " + values);
    }
);
```
