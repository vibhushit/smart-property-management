const express = require('express');
const app = express();
const port = 3000; // You can use any available port
const Joi = require('joi');
const path = require('path');

app.use(express.json());

//property data
const propertyData = {
    properties :   [
        {
            id: 101,
            name: 'Property 1',
            dateOfCreation: '2023-09-23',
            location: 'Goregaon',
            type: 'Apartment',
            rent: 'INR 50,000/month',
            t_id: "1",
            t_name: "Tarun Saraswat"
        },
        {
            id: 102,
            name: 'Property 2',
            dateOfCreation: '2023-09-23',
            location: 'Bandra',
            type: 'Apartment',
            rent: 'INR 60,000/month',
            t_id: "2",
            t_name: "Vibhushit Tyagi"
        }
    ]
}


// Serve static files from the current directory (where app.js is located)
app.use(express.static(__dirname));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/propertyData', (req, res) => {
    res.send(propertyData);
});

//post
app.post('/registerProperty', (req, res) => {

    const { error } = validateProperty(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    //Increment the car id
    const property = {
        id: propertyData.properties.length + 1,
        name: req.body.name,
        dateOfCreation: req.body.dateOfCreation,
        location: req.body.location,
        type: req.body.type,
        rent: req.body.rent,
        t_id: req.body.t_id,
        t_name: req.body.t_name
    };
    propertyData.properties.push(property);
    res.send(property);
});


//Validate Information
function validateProperty(property) {
    const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        dateOfCreation: Joi.string().required(),
        location: Joi.string().required(),
        type: Joi.string().required(),
        rent: Joi.string().required(),
        t_id : Joi.string().required(),
        t_name:Joi.string().required()

    });

    const validation = schema.validate(property);
    return validation
}



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
