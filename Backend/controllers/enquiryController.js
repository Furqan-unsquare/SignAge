const Enquiry = require('../model/enquiry');

// POST: Create a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Create new enquiry
    const enquiry = new Enquiry({ name, email, phone, message });
    await enquiry.save();

    res.status(201).json({ message: 'Enquiry submitted successfully', data: enquiry });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: Fetch all enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json( enquiries );
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createEnquiry, getEnquiries };