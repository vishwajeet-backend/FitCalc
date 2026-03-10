# FitCalc - Full-Stack Fitness Calculator Application

A comprehensive fitness and health calculator platform built with the MERN stack (MongoDB, Express, React, Node.js).

## 🎯 Features

- **20+ Health & Fitness Calculators** organized in 3 categories:
  - **Fitness Calculators**: BMI, Calorie, Body Fat, BMR, Ideal Weight, Pace, Army/Navy Body Fat, Lean Body Mass, Healthy Weight, Calories Burned, One Rep Max, Target Heart Rate
  - **Pregnancy Calculators**: Pregnancy Calculator, Weight Gain, Due Date, Ovulation, Conception, Period
  - **Other Calculators**: Macro, Carbohydrate, Protein, Fat Intake, TDEE, GFR, Body Type, Body Surface Area

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **RESTful API** - Clean backend API structure with modular routes
- **Stateless Architecture** - No authentication required
- **Real-time Calculations** - Instant results for all calculators

## 🏗️ Project Structure

```
FitCalc/
├── backend/                    # Express server
│   ├── routes/
│   │   ├── calculatorRoutes.js # All calculator API endpoints
│   │   └── userRoutes.js       # User-related endpoints (history, profile)
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   └── package.json
│
├── frontend/                   # React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── BMICalculator.js
│   │   │   ├── CalorieCalculator.js
│   │   │   ├── Banner.js
│   │   │   ├── Footer.js
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── AllCalculators.js
│   │   │   ├── BMICalculatorPage.js
│   │   │   ├── CalorieCalculatorPage.js
│   │   │   ├── GenericCalculatorPage.js
│   │   │   └── ...
│   │   ├── App.css
│   │   ├── AppRouter.js        # React Router configuration
│   │   └── index.js
│   └── package.json
│
├── package.json                # Root package with scripts
└── README.md

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FitCalc
```

2. **Install all dependencies**
```bash
npm run install-all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

**Option 1: Run both servers concurrently (Recommended)**
```bash
npm start
```

This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:3000

**Option 2: Run servers separately**

Terminal 1 (Backend):
```bash
npm run start-backend
```

Terminal 2 (Frontend):
```bash
npm run start-frontend
```

## 📡 API Endpoints

### Calculator Endpoints

**BMI Calculator**
```
POST /api/calculators/bmi
Body: { age, gender, heightFeet, heightInches, weight, unit }
```

**Calorie Calculator**
```
POST /api/calculators/calorie
Body: { age, gender, weight, height, activityLevel, unit }
```

**Generic Calculator**
```
POST /api/calculators/:type
Body: { age, gender, weight, height, unit }
```

**Health Check**
```
GET /api/health
```

### User Endpoints

**Save Calculation History**
```
POST /api/users/history/save
Body: { calculatorType, data, result }
```

**Get Calculation History**
```
GET /api/users/history
```

## 🎨 Frontend Routes

- `/` - Homepage
- `/calculators` - All calculators listing page
- `/calculator/bmi` - BMI Calculator
- `/calculator/calorie` - Calorie Calculator
- `/calculator/:type` - Generic calculator page (for all other calculators)
- `/fitness` - Fitness category page
- `/pregnancy` - Pregnancy category page
- `/metabolism` - Metabolism category page

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **CSS3** - Styling

### Development Tools
- **Concurrently** - Run multiple commands simultaneously

## 📝 Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
```

## 🧮 Calculator Implementation Status

### Fully Implemented
- ✅ BMI Calculator
- ✅ Calorie Calculator
- ✅ BMR Calculator
- ✅ TDEE Calculator

### In Development (Placeholder APIs)
- 🔄 Body Fat Calculator
- 🔄 Lean Body Mass Calculator
- 🔄 Ideal Weight Calculator

## 🚀 Deployment

This application is deployed using:
- **Frontend**: Vercel (automatically deploys from the `main` branch)
- **Backend**: Render (automatically deploys from the `main` branch)
- **Database**: MongoDB Atlas

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)
- 🔄 Pace Calculator
- 🔄 Army Body Fat Calculator
- 🔄 Navy Body Fat Calculator
- 🔄 Macro Calculator
- 🔄 Protein Calculator
- 🔄 One Rep Max Calculator
- 🔄 All Pregnancy Calculators
- 🔄 Other Health Calculators

All placeholder calculators return a development status message and accept basic inputs.

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `frontend/build` directory.

## 🐛 Known Issues

- Some calculators display placeholder results while full logic is being implemented
- Frontend uses React Scripts with some deprecated webpack middleware warnings (non-breaking)

## 🔮 Future Enhancements

- [ ] Complete calculator logic for all 20+ calculators
- [ ] Add user authentication and profiles
- [ ] Implement calculation history with database
- [ ] Add data visualization (charts/graphs)
- [ ] Export results as PDF
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA) support
- [ ] Unit tests and integration tests

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React and Express**
