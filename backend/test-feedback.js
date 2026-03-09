// Quick test script to verify feedback can be saved to database
require('dotenv').config();
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');

const testFeedback = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitcalc';
    console.log('Connecting to MongoDB...');
    console.log('URI:', mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('✓ Connected to MongoDB');
    
    // Create test feedback
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      company: 'Test Company',
      rating: 5,
      feedback: 'This is a test feedback',
      acceptPrivacy: true,
      ipAddress: '127.0.0.1',
      userAgent: 'Test Script'
    };
    
    console.log('\nCreating test feedback...');
    const newFeedback = new Feedback(testData);
    
    const saved = await newFeedback.save();
    console.log('✓ Feedback saved successfully!');
    console.log('Feedback ID:', saved._id);
    console.log('Data:', saved);
    
    // Count all feedback documents
    const count = await Feedback.countDocuments();
    console.log('\nTotal feedback in database:', count);
    
    // List all feedback
    const allFeedback = await Feedback.find().limit(5);
    console.log('\nRecent feedback:');
    allFeedback.forEach((fb, index) => {
      console.log(`${index + 1}. ${fb.name} (${fb.email}) - ${fb.rating} stars - ${fb.createdAt}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

testFeedback();
