// Importing necessary modules and dependencies
const express = require("express");
const { ObjectId } = require("mongodb"); 
const subscriberModel = require("./models/subscribers");
const app = express(); 
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get the root endpoint
 *     description: Returns a welcome message for the root endpoint.
 *     responses:
 *       200:
 *         description: A JSON object containing the welcome message.
 *         content:
 *           application/json:
 *             example:
 *               message: This is Youtube Subscriber API
 */



// Handling the root route
app.get("/", (req, res) => {
  res.json("This is Youtube Subscriber Api"); // Sending a JSON response
});
/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Get the list of subscribers
 *     description: Retrieves the list of all subscribers.
 *     responses:
 *       200:
 *         description: A JSON array containing the list of subscribers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 *       404:
 *         description: No subscribers found.
 *         content:
 *           application/json:
 *             example:
 *               message: No subscribers found
 *       500:
 *         description: Failed to retrieve subscribers.
 *         content:
 *           application/json:
 *             example:
 *               error: Failed to retrieve subscribers
 */
// Sending  the GET request to retrieve the subscribers list
app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await subscriberModel.find({}, { __v: 0 });
    // Retrieving all subscribers from the subscriber model and excluding the "__v" field
    if (subscribers.length === 0) {
      return res.status(404).json({ message: "No subscribers found" });
      // If no subscribers are found, return  an error message
    }
    res.status(200).json(subscribers);
        // return the subscribers with a status code of 200

  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve subscribers" });
     //incase of an error, return a status code of 500 with the following message
  }
});

/**
 * @swagger
 * /subscribers/names:
 *   get:
 *     summary: Get subscribers' names and subscribed channels
 *     description: Retrieves the list of subscribers' names and their subscribed channels.
 *     responses:
 *       200:
 *         description: A JSON array containing subscribers' names and subscribed channels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubscriberNameAndChannel'
 *       404:
 *         description: No subscribers found.
 *         content:
 *           application/json:
 *             example:
 *               message: No subscribers found
 *       500:
 *         description: Failed to retrieve subscribers' names.
 *         content:
 *           application/json:
 *             example:
 *               error: Failed to retrieve subscribers' names
 */

// Sending the GET request to retrieve subscribers' names and subscribed channels
app.get("/subscribers/names", async (req, res) => {
  try {
    const subscribers = await subscriberModel.find({}, { name: 1, subscribedChannel: 1, _id: 0 });
    // Retrieving subscribers' names and subscribed channels from the subscriber model and excluding the "_id" field
    if (subscribers.length === 0) {
      return res.status(404).json({ message: "No subscribers found" });
      // If no subscribers are found, return  an error message
    }
    res.status(200).json(subscribers);
     // return the subscribers with a status code of 200
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve subscribers' names" });
      //incase of an error, return a status code of 500 with the following message
  }
});



/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Get a subscriber by ID
 *     description: Retrieves a subscriber by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the subscriber to retrieve.
 *     responses:
 *       200:
 *         description: A JSON object containing the subscriber's data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       400:
 *         description: Invalid ID provided.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid id
 *       404:
 *         description: Subscriber not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Subscriber not found
 *       500:
 *         description: Failed to retrieve the subscriber.
 *         content:
 *           application/json:
 *             example:
 *               error: Failed to retrieve the subscriber
 */


// Handling the GET request to retrieve a subscriber by id
app.get("/subscribers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
      // Validating the provided id format, returning a 400 response if it's invalid
    }
    const subscriber = await subscriberModel.findById(id, { __v: 0 });
    // Retrieving a subscriber from the subscriber model by the provided id and excluding the "__v" field
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
      // If no subscribers are found, return  an error message
    }
    res.status(200).json(subscriber);
      // return the subscribers with a status code of 200
  } catch (error) {
    res.status(500).json({ error: error.message });
     //incase of an error, return a status code of 500 with the following message
  }
});

module.exports = app;
// export the app