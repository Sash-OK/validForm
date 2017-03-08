/**
 * validForm
 * Версия от 08.03.2017
 **/

jQuery.fn.extend({

    validForm: function (options) {

        /* options default */
        var options = $.extend({
            classNok: false, /* CSS класс для полей с ошибкой */
            classOk: false, /* CSS класс для полей без ошибки */
            required: [{
                /* Массив с полями формы, которые надо проверять */
                selector: '[name=name]', /* Указываем какое поле нужно проверять */
                fieldParentClass: false, /* Селектор для стилизации поля с ошибкой */
                pattern: /^.+$/, /* Регулярное выражение для проверки поля */
                errorMessage: false, /* Текст сообщения об ошибке */
                errorTagName: false, /* Тег для текста об ошибке */
                errorClassName: false, /* Класс тега с сообщением об ошибке */
                errorContainer: false, /* Элемент в который будет вставлена ошибка */
                customFunc: function () {
                } /* Нужно ли проверять поле (можно указать функцию) */
            }],

            onSuccess: function (form) {

                $(form).unbind('submit').submit();
            },
            onFalue: function (form) {
                console.log('FAIL');
            }
        }, options);

        /* Проверяем нужно ли создавать сообщение об ошибке */
        function errorFields(config, $form) {

            /* Создаем перемменную с ID ошибки - err_ + номер элемента в массиве */
            var errClass = 'error-' + $.inArray(config, options.required);

            /* Если ошибка уже есть показываем её */
            if ($form.find('.' + errClass).length) {
                $form.find('.' + errClass).fadeIn(500);
            } else {

                /* Создаем тег и вставляем в него сообщение об ошибке */
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

        /* Проверяем заполнение обязательных полей */
        function checkField($input, config) {

            var $form = $input.parents('form'),
                func = typeof config.customFunc === 'function' ? config.customFunc() : undefined,
                validValue = config.pattern && $input.val().length && $input.val().match(config.pattern);

            if (validValue || func) {

                /* Создаем перемменную с ID ошибки - err_ + номер элемента в массиве */
                var errClass = '.error-' + $.inArray(config, options.required);

                /* Ошибки нет, то удаляем у поля класс - classNok и добавляем класс - classОk*/
                if (config.fieldParentClass) {
                    $input.parents(config.fieldParentClass)
                        .removeClass(options.classNok || '')
                        .addClass(options.classOk || '');
                } else {
                    $input.removeClass(options.classNok || '')
                        .addClass(options.classOk || '');
                }

                /* Удаляем тег с ошибкой */
                $form.find(errClass).fadeOut(500);

                return false;
            } else {
                /* Ошибка есть, то удаляем у поля класс - classOk и добавляем класс - classNok*/
                if (config.fieldParentClass) {

                    $input.parents(config.fieldParentClass)
                        .removeClass(options.classOk || '')
                        .addClass(options.classNok || '');
                } else {

                    $form.find(config.selector)
                        .removeClass(options.classOk || '')
                        .addClass(options.classNok || '');
                }

                /* Создаем тег с сообщением об ошибке, если он задан при инициализации */
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

            /* Вешаем событие снятия фокуса на каждое поле */
            options.required.forEach(function (item) {
                $form.find(item.selector).on('change', function () {
                    checkField($(this), item);
                });
            });
        });
    }
});