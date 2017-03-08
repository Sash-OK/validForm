# validForm
 
 [Demo page](https://sash-ok.github.io/validForm/index.html)

## Подключение

```html
<script src="js/jquery.min.js"></script>
<script src="js/validForm.js"></script>
```

```javascript
$(document).ready(function(){
  $('.js-form-1').validForm(options);
});
```

### Опции

```javascript
var options = {
        classNok: 'class-name', /* CSS класс для полей с ошибкой */
        classOk: 'class-name', /* CSS класс для полей без ошибки */
        required: [{
            /* Массив с полями формы, которые надо проверять */
            selector: '[name=name]', /* Указываем какое поле нужно проверять */
            fieldParentClass: '.selector', /* Селектор родителя поля, к которому будет добавлен класс, если не указан то класс будет добавлен к самому полю */
            pattern: /^.+$/, /* Регулярное выражение для проверки значения поля */
            errorTagName: 'div', /* Тег для сообщения об ошибке */
            errorClassName: 'error-class', /* Класс тега с сообщением об ошибке */
            errorMessage: '<strong>Ошибка!</strong>', /* Сообщение об ошибке(содержимое текст или HTML) */
            errorContainer: '.selector', /* Элемент в который будет вставлена ошибка, если не указан то сообщение будет добавлено после проверяемого поля */
            customFunc: function () {
                /* Функция для проверки поля, должна вернуть true или false */
            }
        }],

        onSuccess: function (form) {
            /* Действие при успешной проверке всех полей, по умолчанию $(form).unbind('submit').submit(); */
        },
        onFalue: function (form) {
            /* Действие при не правильно заполненных или не заполненных полях формы */
        }
    }
```
