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

let transactionsData = [
  { id: 1, name: 'Whole Foods Market', account: 'Amex • Gold Card', amount: -124.80, time: 'TODAY, 2:45 PM', category: 'Groceries' },
  { id: 2, name: 'John Doe (Split Bill)', account: 'UPI • HDFC Bank', amount: 42.00, time: 'TODAY, 11:20 AM', category: 'Transfer' },
  { id: 3, name: 'Delta Airlines', account: 'Visa • Corporate', amount: -652.00, time: 'YESTERDAY, 9:00 PM', category: 'Travel' },
  { id: 4, name: 'Uber Technologies', account: 'Wallet • PlainPay Credit', amount: -18.40, time: 'YESTERDAY, 4:15 PM', category: 'Transport' },
  { id: 5, name: 'Consolidated Edison', account: 'ACH • Chase Checking', amount: -210.15, time: 'JAN 24, 2024', category: 'Bills' },
];

let subscriptionsData = [
  { id: 1, name: 'Netflix', plan: 'Standard Streaming Plan', amount: 15.99, nextRenewal: 'June 15, 2024', status: 'ACTIVE', color: 'bg-black', icon: 'netflix', category: 'Entertainment' },
  { id: 2, name: 'Spotify', plan: 'Family Premium Plan', amount: 16.99, nextRenewal: 'June 21, 2024', status: 'ACTIVE', color: 'bg-green-500', icon: 'spotify', category: 'Entertainment' },
  { id: 3, name: 'Iron Peak Gym', plan: 'Full Access + Pool', amount: 55.00, nextRenewal: 'July 01, 2024', status: 'ACTIVE', color: 'bg-blue-600', icon: 'gym', category: 'Fitness' },
  { id: 4, name: 'Adobe Creative Cloud', plan: 'All Apps Plan', amount: 54.99, nextRenewal: 'June 28, 2024', status: 'ACTIVE', color: 'bg-red-600', icon: 'adobe', category: 'Productivity' },
  { id: 5, name: 'Dropbox Plus', plan: '2TB Personal Storage', amount: 11.99, nextRenewal: 'Suspended', status: 'ON HOLD', color: 'bg-blue-400', icon: 'dropbox', category: 'Productivity' },
];

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

app.get('/api/transactions', (req, res) => {
  res.json({
    summary: {
      totalSpent: 2840.50,
      highestCategory: 'Dining Out',
      highestCategoryPercentage: 42,
      connectedAccounts: 8
    },
    transactions: transactionsData
  });
});

app.post('/api/transactions', (req, res) => {
  const { name, account, amount, category } = req.body;
  if (!name || !amount) {
    return res.status(400).json({ message: 'Name and amount are required' });
  }
  
  const newTransaction = {
    id: transactionsData.length + 1,
    name,
    account: account || 'Wallet • PlainPay',
    amount: parseFloat(amount),
    time: 'JUST NOW',
    category: category || 'Misc'
  };
  
  // Prepend to the beginning
  transactionsData.unshift(newTransaction);
  
  res.status(201).json(newTransaction);
});

app.get('/api/subscriptions', (req, res) => {
  const activeSubs = subscriptionsData.filter(sub => sub.status === 'ACTIVE');
  const totalCost = activeSubs.reduce((sum, sub) => sum + sub.amount, 0);
  
  res.json({
    summary: {
      totalMonthlyCost: totalCost,
      savingsIdentified: 12.50,
      nextRenewal: {
        name: 'Netflix',
        date: 'June 15th'
      },
      categorySplit: [
        { name: 'Entertainment', amount: 84.00, percentage: 65, color: 'bg-blue-600' },
        { name: 'Productivity', amount: 45.00, percentage: 35, color: 'bg-emerald-500' }
      ]
    },
    subscriptions: subscriptionsData
  });
});

app.post('/api/subscriptions', (req, res) => {
  const { name, plan, amount, category, nextRenewal } = req.body;
  if (!name || !amount) {
    return res.status(400).json({ message: 'Name and amount are required' });
  }
  
  const newSubscription = {
    id: subscriptionsData.length > 0 ? Math.max(...subscriptionsData.map(s => s.id)) + 1 : 1,
    name,
    plan: plan || 'Standard Plan',
    amount: parseFloat(amount),
    nextRenewal: nextRenewal || 'TBD',
    status: 'ACTIVE',
    color: 'bg-emerald-500',
    icon: 'default',
    category: category || 'Other'
  };
  
  subscriptionsData.unshift(newSubscription);
  res.status(201).json(newSubscription);
});

app.delete('/api/subscriptions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  subscriptionsData = subscriptionsData.filter(sub => sub.id !== id);
  res.status(200).json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
