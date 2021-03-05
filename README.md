# Проект Mesto  бэкенд
Проект выполнен в рамках Проектной работы №1З

## Функциональность

- GET /users — возвращает всех пользователей
- GET /users/:userId - возвращает пользователя по _id
- POST /users — создаёт пользователя 
- GET /cards — возвращает все карточки
- POST /cards — создаёт карточку
- DELETE /cards/:cardId — удаляет карточку по идентификатору
- PATCH /users/me — обновляет профиль
- PATCH /users/me/avatar — обновляет аватар
- PUT /cards/:cardId/likes — поставить лайк карточке
- DELETE /cards/:cardId/likes — убрать лайк с карточки


## Директории

`/routes` — папка с файлами роутера  
`/controlers` - папка с колбэками роутеров
`/models` - папка со схемами основных коллекций

  

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
