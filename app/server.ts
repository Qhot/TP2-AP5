import App from './app'
import OrdersController from './src/orders/orders.controller'

const app = new App([
  new OrdersController(),
], 1337)

app.listen()
