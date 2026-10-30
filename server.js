import express from "express";
const app = express();
app.use(express.json());
// Our first API endpoint
app.get("/about", (req, res) => {
    res.send("Welcome to Airbnb Backend!");
});


const properties = [
    {
        id: 1,
        title: "Cozy Beach House",
        location: "Goa",
        pricePerNight: 2500
    },
    {
        id: 2,
        title: "Mountain View Villa",
        location: "Manali",
        pricePerNight: 4000
    }
];


app.get("/api/properties", (req, res) => {
    res.json(properties);
});


app.post("/api/properties", (req, res) => {
    const { title, location, pricePerNight } = req.body;

    // Validate the input
    if (!title || !location || pricePerNight === undefined) {
        return res.status(400).json({
            message: "Title, location, and price are required"
        });
    }

    // Validate the price
    if (
        typeof pricePerNight !== "number" ||
        !Number.isFinite(pricePerNight) ||
        pricePerNight <= 0
    ) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }

    const newProperty = {
        id: properties.length + 1,
        title,
        location,
        pricePerNight
    };

    properties.push(newProperty);

    res.status(201).json({
        message: "Property created successfully",
        property: newProperty
    });
});


app.put("/api/properties/:id", (req, res) => {
    const propertyId = Number(req.params.id);

    const property = properties.find(
        (p) => p.id === propertyId
    );

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    const { title, location, pricePerNight } = req.body;

    if (!title || !location || pricePerNight === undefined) {
        return res.status(400).json({
            message: "Title, location, and price are required"
        });
    }

    if (
        typeof pricePerNight !== "number" ||
        !Number.isFinite(pricePerNight) ||
        pricePerNight <= 0
    ) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }

    property.title = title;
    property.location = location;
    property.pricePerNight = pricePerNight;

    res.json({
        message: "Property updated successfully",
        property
    });
});


app.delete("/api/properties/:id", (req, res) => {
    const propertyId = Number(req.params.id);

    const propertyIndex = properties.findIndex(
        (p) => p.id === propertyId
    );

    if (propertyIndex === -1) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    const deletedProperty = properties.splice(propertyIndex, 1);

    res.json({
        message: "Property deleted successfully",
        property: deletedProperty[0]
    });
});



app.listen(3000, () => {
    console.log("Airbnb backend server is running on port 3000");
});