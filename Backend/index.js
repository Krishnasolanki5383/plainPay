const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mock Data
const dashboardData = {
  summary: {
    spentToday: 45,
    topExpenses: ['morning coffee', 'lunch'],
    remainingBudget: 120,
    dailyBudget: 165
  },
  weeklyTrend: [
    { day: 'MON', food: 40, transport: 10 },
    { day: 'TUE', food: 60, transport: 15 },
    { day: 'WED', food: 35, transport: 10 },
    { day: 'THU', food: 55, transport: 10 },
    { day: 'FRI', food: 80, transport: 20 },
    { day: 'SAT', food: 95, transport: 5 },
    { day: 'SUN', food: 20, transport: 0 },
  ],
  recentTransactions: [
    { id: 1, name: 'Blue Bottle Coffee', time: '9:15 AM', category: 'Food & Drink', amount: -6.50 },
    { id: 2, name: 'Metropolitan Transit', time: '8:30 AM', category: 'Transport', amount: -2.75 },
    { id: 3, name: 'Salad Stop', time: 'Yesterday', category: 'Food & Drink', amount: -14.20 },
    { id: 4, name: 'Netflix Subscription', time: 'Yesterday', category: 'Entertainment', amount: -15.99 },
  ],
  savingsGoal: {
    name: 'Tokyo Trip fund',
    progressPercentage: 85,
    currentAmount: 4250,
    targetAmount: 5000
  },
  upcomingPayment: {
    name: 'Rent Payment',
    dueInDays: 4,
    amount: 1850.00
  },
  securityControls: {
    onlinePayments: true,
    contactless: false
  }
};

// Auth Endpoints (Mock)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // Mock success response
  res.status(201).json({
    message: 'User registered successfully',
    token: 'mock-jwt-token-12345',
    user: { id: 1, name, email }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  // Mock success response
  res.status(200).json({
    message: 'Login successful',
    token: 'mock-jwt-token-12345',
    user: { id: 1, name: 'Alex', email }
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
