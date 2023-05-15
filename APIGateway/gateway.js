const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
///////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add_product', async (req, res) => {
  try {
    const orderData = req.body;
    console.log('Order data received:', orderData);
    const response = await axios.post('http://localhost:4545/products', orderData);
    console.log('Response from product service:', response.data);
    res.status(201).send(response.data);
  } catch (error) {
    console.error('Error while adding product:', error);
    res.status(500).send(error.message);
  }
});



// Define the /products endpoint
app.get('/view_products', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4545/products');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.get('/view_product/:id', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4545/product/'+req.params.id);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.delete('/delete_product/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    await axios.delete(`http://localhost:4545/product/${orderId}`);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////


// Define the /users endpoint
app.post('/add_customer', async (req, res) => {
  
  try {
    const orderData = req.body;
    const response = await axios.post('http://localhost:5555/create_customer', orderData);
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/authenticate_customer', async (req, res) => {
  try {
    //console.log(`Received data: ${JSON.stringify(req.body)}`);
    const userData = req.body;
    

    const response = await axios.post('http://localhost:5555/authenticate', userData);
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/view_customers', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5555/customers');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


app.get('/view_customer/:id', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5555/customer/'+req.params.id);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.delete('/delete_customer/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    console.log(orderId)
    await axios.delete(`http://localhost:5555/customer/${orderId}`);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//////////////////////////////////////////////////////////////////////////////////
// Define the /orders endpoint
app.post('/add_order', async (req, res) => {
  try {
    const orderData = req.body;
    const response = await axios.post('http://localhost:7777/order', orderData);
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/view_orders', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:7777/orders');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.get('/view_order/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
  
    const orderData = await axios.get(`http://localhost:7777/order/${orderId}`);
    res.status(200).send(orderData.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/delete_order/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    await axios.delete(`http://localhost:7777/order/${orderId}`);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Start the API gateway server
const port = 4000;
app.listen(port, () => {
  console.log(`API gateway server started on port ${port}`);
});