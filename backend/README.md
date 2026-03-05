# FitCalc Backend API

## Overview
This is the backend API for the FitCalc fitness calculator application. It provides a comprehensive set of calculator endpoints with proper MVC architecture, MongoDB integration, and validation middleware.

## Architecture

### Project Structure
```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── calculatorController.js   # Business logic for calculators
├── middleware/
│   └── validators.js        # Express-validator middleware
├── models/
│   └── CalculationHistory.js     # Mongoose model for calculation history
├── routes/
│   ├── calculatorRoutes.js  # Calculator API routes
│   └── userRoutes.js        # User API routes
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── server.js                # Express app initialization
```

## Features

### Calculator Types Implemented
1. **Fitness Calculators**
   - BMI (Body Mass Index)
   - BMR (Basal Metabolic Rate)
   - TDEE (Total Daily Energy Expenditure)
   - Calorie Calculator
   - Body Fat Percentage
   - Navy Body Fat
   - Army Body Fat
   - Lean Body Mass
   - Ideal Weight
   - Healthy Weight

2. **Nutrition Calculators**
   - Macro Calculator
   - Protein Calculator
   - Carbohydrate Calculator
   - Fat Intake Calculator
   - Calories Burned

3. **Fitness Activity Calculators**
   - One Rep Max
   - Pace Calculator
   - Target Heart Rate

4. **Body Composition Calculators**
   - Body Type
   - Body Surface Area

5. **Medical Calculators**
   - GFR (Glomerular Filtration Rate)

6. **Pregnancy Calculators**
   - Pregnancy Due Date
   - Pregnancy Weight Gain
   - Pregnancy Week
   - Conception Calculator
   - Ovulation Calculator
   - Period Calculator

### Key Features
- **MVC Architecture**: Clean separation of Model, Controller, and Routes
- **Database Integration**: MongoDB with Mongoose ODM
- **Data Persistence**: All calculations are saved to database (authentication-less)
- **Validation**: Express-validator middleware for input validation
- **History Tracking**: Track calculation history by session or user ID
- **Statistics**: Aggregate statistics on calculator usage
- **Auto Data Cleanup**: Old calculations auto-delete after 90 days

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Setup Steps

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your MongoDB connection string and other settings.

3. **Start MongoDB**
   
   Make sure MongoDB is running locally or you have a cloud MongoDB URI.

4. **Run the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## API Endpoints

### Health Check
```
GET /api/health
```

### Calculator Endpoints

All calculator endpoints follow the pattern:
```
POST /api/calculators/{calculator-type}
```

Example:
```
POST /api/calculators/bmi
Content-Type: application/json

{
  "age": 30,
  "gender": "male",
  "heightFeet": 5,
  "heightInches": 10,
  "weight": 180,
  "unit": "us"
}
```

### Available Calculator Endpoints

#### Fitness Calculators
- `POST /api/calculators/bmi` - Calculate BMI
- `POST /api/calculators/bmr` - Calculate BMR
- `POST /api/calculators/calorie` - Calculate daily calories
- `POST /api/calculators/tdee` - Calculate TDEE
- `POST /api/calculators/body-fat` - Calculate body fat percentage
- `POST /api/calculators/navy-body-fat` - Navy method body fat
- `POST /api/calculators/army-body-fat` - Army method body fat
- `POST /api/calculators/lean-body-mass` - Calculate lean body mass
- `POST /api/calculators/ideal-weight` - Calculate ideal weight
- `POST /api/calculators/healthy-weight` - Calculate healthy weight range

#### Nutrition Calculators
- `POST /api/calculators/macro` - Calculate macronutrients
- `POST /api/calculators/protein` - Calculate protein needs
- `POST /api/calculators/carbohydrate` - Calculate carb needs
- `POST /api/calculators/fat-intake` - Calculate fat intake
- `POST /api/calculators/calories-burned` - Calculate calories burned

#### Activity Calculators
- `POST /api/calculators/one-rep-max` - Calculate one rep max
- `POST /api/calculators/pace` - Calculate running/walking pace
- `POST /api/calculators/target-heart-rate` - Calculate target heart rate zones

#### Body Composition
- `POST /api/calculators/body-type` - Determine body type
- `POST /api/calculators/body-surface-area` - Calculate BSA

#### Medical
- `POST /api/calculators/gfr` - Calculate GFR

#### Pregnancy
- `POST /api/calculators/pregnancy-due-date` - Calculate due date
- `POST /api/calculators/pregnancy-weight-gain` - Calculate weight gain
- `POST /api/calculators/pregnancy-week` - Calculate pregnancy week
- `POST /api/calculators/conception` - Calculate conception date
- `POST /api/calculators/ovulation` - Calculate ovulation
- `POST /api/calculators/period` - Calculate period dates

### History & Statistics
```
GET /api/calculators/history?calculatorType=bmi&limit=10
GET /api/calculators/stats
```

## Database Schema

### CalculationHistory Model
```javascript
{
  calculatorType: String,      // Type of calculator used
  inputData: Mixed,            // Input parameters
  results: Mixed,              // Calculation results
  userId: ObjectId,            // Optional user ID
  sessionId: String,           // Session tracking
  ipAddress: String,           // User IP
  userAgent: String,           // Browser info
  createdAt: Date              // Timestamp
}
```

## Validation

All endpoints use express-validator middleware to validate inputs:
- Type checking (string, number, date)
- Range validation (min/max values)
- Required field validation
- Enum validation for specific values

Invalid requests return 400 status with error details.

## Error Handling

The API includes comprehensive error handling:
- Validation errors: 400 Bad Request
- Server errors: 500 Internal Server Error
- Error responses include descriptive messages

## Session Tracking

For authentication-less tracking, include session ID in headers:
```
X-Session-Id: unique-session-id
```

This allows you to:
- Retrieve calculation history for a session
- Track user behavior without authentication
- Later associate data with authenticated users

## Future Enhancements

- [ ] User authentication with JWT
- [ ] User accounts and profiles
- [ ] Saved calculations and favorites
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Share calculations feature
- [ ] Calculator recommendations based on history
- [ ] Analytics dashboard

## Testing

To test the API, you can use:
- Postman
- cURL
- Frontend application

Example cURL:
```bash
curl -X POST http://localhost:5000/api/calculators/bmi \
  -H "Content-Type: application/json" \
  -d '{"age":30,"gender":"male","heightFeet":5,"heightInches":10,"weight":180,"unit":"us"}'
```

## License

MIT License
