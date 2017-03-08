/**
 * validForm
 * Версия от 08.03.2017
 **/

jQuery.fn.extend({

    validForm: function (options) {

        var options = $.extend({
            classNok: false,
            classOk: false,
            required: [{
                selector: '[name=name]',
                fieldParentClass: false,
                pattern: /^.+$/,
                errorMessage: false,
                errorTagName: false,
                errorClassName: false,
                errorContainer: false,
                customFunc: function () {}
            }],

            onSuccess: function (form) {

                $(form).unbind('submit').submit();
            },
            onFalue: function (form) {
                console.log('FAIL');
            }
        }, options);

        function errorFields(config, $form) {

            var errClass = 'error-' + $.inArray(config, options.required);

            if ($form.find('.' + errClass).length) {
                $form.find('.' + errClass).fadeIn(500);
            } else {

                var $errorTag = $('<' + config.errorTagName + '></' + config.errorTagName + '>')
                    .css('display', 'none')
                    .addClass(errClass)
                    .addClass(config.errorClassName ? config.errorClassName : '')
                    .html(config.errorMessage);

                if (config.errorContainer) {
                    $form.find(config.errorContainer).append($errorTag);
                    $errorTag.fadeIn(500);
                } else {
                    $errorTag.insertAfter($form.find(config.selector)).fadeIn(500);
                }
            }
        }

        function checkField($input, config) {

            var $form = $input.parents('form'),
                func = typeof config.customFunc === 'function' ? config.customFunc() : undefined,
                validValue = config.pattern && $input.val().length && $input.val().match(config.pattern);

            if (validValue || func) {

                var errClass = '.error-' + $.inArray(config, options.required);

                if (config.fieldParentClass) {
                    $input.parents(config.fieldParentClass)
                        .removeClass(options.classNok || '')
                        .addClass(options.classOk || '');
                } else {
                    $input.removeClass(options.classNok || '')
                        .addClass(options.classOk || '');
                }

                $form.find(errClass).fadeOut(500);

                return false;
            } else {

                if (config.fieldParentClass) {

                    $input.parents(config.fieldParentClass)
                        .removeClass(options.classOk || '')
                        .addClass(options.classNok || '');
                } else {

                    $form.find(config.selector)
                        .removeClass(options.classOk || '')
                        .addClass(options.classNok || '');
                }

                if (config.errorTagName && config.errorMessage) {
                    errorFields(config, $form);
                }

                return true;
            }
        }

        return this.each(function () {

            var $form = $(this);

            $(this).on('submit', function (event) {
                event.preventDefault();
                var errors = options.required.map(function (item) {

                        if ($form.find(item.selector).length) {
                            return checkField($form.find(item.selector), item);
                        } else {
                            return false;
                        }
                    }),
                    chekErrors = function (err) {
                        return err === true;
                    };

                if (errors.some(chekErrors)) {

                    $(options.onFalue(this));
                } else {

                    $(options.onSuccess(this));
                }
            });

            options.required.forEach(function (item) {
                $form.find(item.selector).on('change', function () {
                    checkField($(this), item);
                });
            });
        });
    }
});