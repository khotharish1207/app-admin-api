const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
  // Create a Order
  const note = new Order({
    ...req.body,
  });

  // Save Order in the database
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Order.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

// Find a single note with a orderId
exports.findOne = (req, res) => {
  Order.findById(req.params.orderId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.orderId,
      });
    });
};

// Update a note identified by the orderId in the request
exports.update = (req, res) => {
  // Find note and update it with the request body
  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      console.log(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.orderId,
        error: err.message,
      });
    });
};

// Delete a note with the specified orderId in the request
exports.delete = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.send({ message: "Order deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.orderId,
      });
    });
};
