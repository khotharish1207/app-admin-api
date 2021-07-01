module.exports = (app) => {
    const orders = require('../controllers/order.controller.js');

    // Create a new Note
    app.post('/orders', orders.create);

    // Retrieve all orders
    app.get('/orders', orders.findAll);

    // Retrieve a single Note with orderId
    app.get('/orders/:orderId', orders.findOne);

    // Update order with orderId
    app.put('/orders/:orderId', orders.update);

    // Delete order with orderId
    app.delete('/orders/:orderId', orders.delete);
}
