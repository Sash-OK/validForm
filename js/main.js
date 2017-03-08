$(document).ready(function () {
    $('.js-form-1').validForm({
        classNok: 'has-error',
        classOk: 'has-success',
        required: [
            {
                selector: '#file1',
                customFunc: function () {
                    return $('#file1').val().length > 0;
                },
                errorMessage: 'empty file',
                errorTagName: 'b',
                errorClassName: 'error',
                errorContainer: '.js-file-error',
                fieldParentClass: '.form-group'
            },
            {
                selector: '.js-check',
                customFunc: function () {
                    return $('.js-check').is(':checked');
                },
                errorMessage: 'required !!!!',
                errorTagName: 'b',
                errorClassName: 'error',
                errorContainer: '.js-check-error',
                fieldParentClass: '.form-group'
            },
            {
                selector: '[name=name]',
                pattern: /^[a-zA-Zа-яА-Я0-9\s]{3,}$/i,
                errorTagName: 'b',
                errorClassName: 'error',
                fieldParentClass: '.form-group',
                errorMessage: 'required field',
                errorContainer: '.js-name-error'
            },
            {
                selector: '[name=email]',
                pattern: /^[0-9a-z\-_\.]+@[0-9a-z\-_\.]+\.[0-9a-z\-_\.]{2,5}$/i,
                errorClassName: 'error',
                fieldParentClass: '.form-group',
                errorMessage: 'required field',
                errorTagName: 'b',
                errorContainer: '.js-email-error'
            },
            {
                selector: '[name=phone]',
                pattern: /^[\d\+\s\-\(\)]{5,}$/i,
                errorClassName: 'error',
                fieldParentClass: '.form-group',
                errorMessage: 'required field',
                errorTagName: 'b',
                errorContainer: '.js-phone-error'
            }
        ],
        onSuccess: function (form) {

            alert('Form submitted');

        },
        onFalue: function (form) {
            console.log('FAIL !!!!!!!');
        }
    });
});
