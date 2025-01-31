const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const subscriptions = require('./subscriptions.json');


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.post('/subscribe', (req, res) => {
    subscriptions.push({
        email: req.body.email,
        name: req.body.name
    });
    
    fs.writeFileSync('./subscriptions.json', JSON.stringify(subscriptions), { encoding: 'utf-8' });

    res.redirect('/success.html');
});

app.listen(3000, () => console.log('Server running on port 3000'));
