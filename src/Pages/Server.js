const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connectioncd src
mongoose.connect('mongodb+srv://sabareeshk21it:sabari123@cluster0.x9h8t.mongodb.net/resort?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose model for bookings
const Booking = require("./Booking.js");

// API route for handling bookings
app.post("/book", async (req, res) => {
  try {
    
    // Create a new booking document using the Mongoose model
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const Razorpay = require("razorpay");

app.post("/custom_pay", async (req, res) => {
  console.log("Run server")
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_zpcvSUNJXUqrLv',
            key_secret:'uGZApKWjnDBHcfaMiQQctHxQ',
        });

        console.log(Math.round(req.body.amount))

        const options = {
            amount: Math.round(req.body.amount)*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");
        res.json(order);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
