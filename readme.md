## 14.07.22

- первый билд
- фиксы ошибок в консоли
- улучшено отображение даты создания и добавлена дата изменения поста

## 03.08.22

- первая буква имени в аватаре если нет аватара
- возможность добавлять комментарии
- теперь комментарии добавляются мгновенно, без ожидания ответа от сервера

## 04.08.22

- в постах вместо числа просмотров показываются аватары

## 08.08.22

- исправлена ошибка: удалена прозрачность аватарок просмотревших пост
- исправил ошибку регистрации: удалил из БД старый уникальный индекс email

## 09.08.22

- список просмотров работает

## 10.08.22

- код списка просмотров стал получше

## 11.08.22

- оптимизировал запросы в бд: убрал дублирующие данные, теперь данные передаются методом populate()
- работает счетчик комментариев

## 15.08.22

- сортировка статей по популярности

## 16.08.22

- вывод ошибок на экран

## 18.08.22

- запрет на удаление, редактирование постов если не авторизован
- поиск по тегам

## 19.08.22

- нормальное отображение и запись тегов
- исправил ошибку Warning: Internal React error: Expected static flag was missing. Please notify the React team.

## 22.08.22

- теги в постах, при создании постов и в блоке "теги" это теперь один и тот же многофункциональный компонент
- при клике на тег внутри поста происходит переход на страницу с постами и сортировка по данному тегу
- приклике на логотип приложения происходит переход на главную и загрузка постов
- обработал ошибку, связанную с тем, что символ # в строке поиска не позволяет отправлять некоторые запросы
- теги отфильтрованы от клонов и отсортитрованы по популярности

## 23.08.22

- обработка ошибок при создании поста
- удаление тегов кликом на него во время созданя поста
- исправлено добавление тегов. Работает теперь с русскими буквами, а так же не допускает спец символы

## 25.08.22

- полная смена дизайна по макетам

## 25.08.22

- фиксы дизайна

## 01.09.22

  <!-- - создание и редактирование заметок происходит на главной странице без переходов на другую страницу -->
  <!-- - полностью заметка теперь открывается в окне popup -->
  <!-- - поправил значки в текстовом редакторе -->
  <!-- - изменение размера заметок -->
  <!-- - перетаскивание заметок -->
