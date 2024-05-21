const express = require('express');
const mongoose = require('mongoose');
const CircuitBreaker = require('opossum');
const bodyParser = require('body-parser');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(bodyParser.json());


const circuitBreakerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 5000
};
const circuit = new CircuitBreaker(mongoose.connection, circuitBreakerOptions);

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});


mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    setTimeout(() => {
        console.log('Trying to reconnect to MongoDB...');
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log('MongoDB reconnected'))
            .catch(err => console.error('Error reconnecting to MongoDB:', err));
    }, 5000); 
});



// Simula problemas temporales en MongoDB después de 6 segundos
setTimeout(() => {
    console.log('Simulating MongoDB connection issues');
    mongoose.connection.emit('error', new Error('MongoDB connection lost'));
}, 6000);


const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
