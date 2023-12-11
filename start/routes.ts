import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login').as('login')
  Route.post('register', 'AuthController.register').as('register')
  Route.post('logout', 'AuthController.logout').as('logout')
})
  .prefix('auth')
  .as('auth')

Route.group(() => {
  Route.resource('pets', 'PetsController').apiOnly().as('pets')
  Route.resource('pets.weights', 'WeightsController').apiOnly().as('weights')
}).middleware('auth')
