
import Property from "../models/Property.js";
import mongoose from "mongoose";

// GET all properties
export const getProperties = async (req, res, next) => {
    try {
        const properties = await Property.find();

        res.status(200).json({
            success: true,
            count: properties.length,
            properties
        });

    } catch (error) {
        next(error);
    }
};


// POST create a property
export const createProperty = async (req, res, next) => {
    try {
        const { title, location, pricePerNight } = req.body;

        if (!title || !location || pricePerNight === undefined) {
            return res.status(400).json({
                success: false,
                message: "Title, location, and price are required"
            });
        }

        if (
            typeof pricePerNight !== "number" ||
            !Number.isFinite(pricePerNight) ||
            pricePerNight <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        const newProperty = await Property.create({
            title,
            location,
            pricePerNight,
            owner: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            property: newProperty
        });

    } catch (error) {
        next(error);
    }
};


// PUT update a property
export const updateProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.id;

        if (!mongoose.isValidObjectId(propertyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid property ID"
            });
        }

        const { title, location, pricePerNight } = req.body;

        if (!title || !location || pricePerNight === undefined) {
            return res.status(400).json({
                success: false,
                message: "Title, location, and price are required"
            });
        }

        if (
            typeof pricePerNight !== "number" ||
            !Number.isFinite(pricePerNight) ||
            pricePerNight <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        const filter = {
            _id: propertyId
        };

        // Hosts can update only their own properties
        if (req.user.role !== "admin") {
            filter.owner = req.user.userId;
        }

        const updatedProperty = await Property.findOneAndUpdate(
            filter,
            {
                title,
                location,
                pricePerNight
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProperty) {
            return res.status(404).json({
                success: false,
                message: "Property not found or you do not own this property"
            });
        }

        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property: updatedProperty
        });

    } catch (error) {
        next(error);
    }
};


// DELETE a property
export const deleteProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.id;

        if (!mongoose.isValidObjectId(propertyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid property ID"
            });
        }

        const filter = {
            _id: propertyId
        };

        // Hosts can delete only their own properties
        if (req.user.role !== "admin") {
            filter.owner = req.user.userId;
        }

        const deletedProperty = await Property.findOneAndDelete(filter);

        if (!deletedProperty) {
            return res.status(404).json({
                success: false,
                message: "Property not found or you do not own this property"
            });
        }

        res.status(200).json({
            success: true,
            message: "Property deleted successfully",
            property: deletedProperty
        });

    } catch (error) {
        next(error);
    }
};
