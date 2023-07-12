import React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css'
const stripePromise = loadStripe('pk_test_51NSTN1Cmyd0XbLfoHOSNd2tG494zrzdYDJpa0diQr2dOEr2jhcZHr7eRO9D0JM5WTBwMIazfvDsuA3zu7X9tGi3E00IJVL7GTo');

const CheckoutForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission or validation if needed
  };

  return (
    <Elements stripe={stripePromise}>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group controlId="cardElement">
          <Form.Label>Card Details</Form.Label>
          <CardElement className="form-control" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Pay
        </Button>
      </Form>
    </Elements>
  );
};

export default CheckoutForm;