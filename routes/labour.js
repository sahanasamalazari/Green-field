const express = require('express');
const router = express.Router();
const Labour = require('../models/labour');

// Get all labours with optional filtering by status
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const labours = await Labour.find(filter);
    res.json(labours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new labour
router.post('/', async (req, res) => {
  try {
    // Check for existing labour with same details and status
    const existingLabour = await Labour.findOne({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      contact: req.body.contact,
      workType: req.body.workType,
      wage: req.body.wage,
      workDate: req.body.workDate,
      crop: req.body.crop,
      status: req.body.status || 'current',
    });

    if (existingLabour) {
      return res.status(409).json({ message: 'Labour details already present in this section' });
    }

    const labour = new Labour({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      contact: req.body.contact,
      workType: req.body.workType,
      wage: req.body.wage,
      workDate: req.body.workDate,
      crop: req.body.crop,
      status: req.body.status || 'current',
    });

    const newLabour = await labour.save();
    res.status(201).json(newLabour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update labour by ID
router.put('/:id', getLabour, async (req, res) => {
  if (req.body.name != null) {
    res.labour.name = req.body.name;
  }
  if (req.body.age != null) {
    res.labour.age = req.body.age;
  }
  if (req.body.gender != null) {
    res.labour.gender = req.body.gender;
  }
  if (req.body.contact != null) {
    res.labour.contact = req.body.contact;
  }
  if (req.body.workType != null) {
    res.labour.workType = req.body.workType;
  }
  if (req.body.wage != null) {
    res.labour.wage = req.body.wage;
  }
  if (req.body.workDate != null) {
    res.labour.workDate = req.body.workDate;
  }
  if (req.body.crop != null) {
    res.labour.crop = req.body.crop;
  }
  if (req.body.status != null) {
    res.labour.status = req.body.status;
  }

  try {
    const updatedLabour = await res.labour.save();
    res.json(updatedLabour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete labour by ID (soft delete)
router.delete('/:id', getLabour, async (req, res) => {
  try {
    res.labour.status = 'deleted';
    await res.labour.save();
    res.json({ message: 'Deleted Labour (soft delete)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get labour by ID
async function getLabour(req, res, next) {
  let labour;
  try {
    labour = await Labour.findById(req.params.id);
    if (labour == null) {
      return res.status(404).json({ message: 'Cannot find labour' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.labour = labour;
  next();
}

module.exports = router;
