const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  Stripe = require("stripe"),
  TEST_API_KEY = "sk_test_###############################",
  stripe = new Stripe(TEST_API_KEY);

app.use(cors());
app.use(bodyParser.json());
app.set(bodyParser.urlencoded({ extended: true }));

app.get("/pay", async (req, res) => {
  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2020-08-27" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      customer: customer.id,
    });
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (e) {
    res.json({ msg: e.message });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server started");
});
