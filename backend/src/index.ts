import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { outcomes } from "./outcomes.ts";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/plinko-game?replicaSet=rs0&directConnection=true";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  balance: { type: Number, default: 1000 },
  totalWagered: { type: Number, default: 0 },
  totalWon: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// Game History Schema
const gameHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  betAmount: { type: Number, required: true },
  multiplier: { type: Number, required: true },
  payout: { type: Number, required: true },
  profit: { type: Number, required: true },
  pattern: [{ type: String }],
  outcome: { type: Number, required: true },
  finalPoint: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const GameHistory = mongoose.model("GameHistory", gameHistorySchema);

const TOTAL_DROPS = 16;

const MULTIPLIERS: { [key: number]: number } = {
  0: 16, 1: 9, 2: 2, 3: 1.4, 4: 1.4, 5: 1.2, 6: 1.1, 7: 1,
  8: 0.5, 9: 1, 10: 1.1, 11: 1.2, 12: 1.4, 13: 1.4, 14: 2, 15: 9, 16: 16
};

// Middleware to verify user
const verifyUser = async (req: any, res: any, next: any) => {
  const userId = req.headers["user-id"];
  
  if (!userId) {
    return res.status(401).json({ error: "User ID required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Invalid user ID" });
  }
};

// ===== USER ROUTES =====

// Register new user
app.post("/api/users/register", async (req, res) => {
  try {
    const { username, email, initialBalance } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const user = new User({
      username,
      email,
      balance: initialBalance || 1000
    });

    await user.save();
    res.status(201).json({ 
      message: "User created successfully",
      userId: user._id,
      balance: user.balance
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get user profile
app.get("/api/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-__v");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Search user by email (for login)
app.get("/api/users/search", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const user = await User.findOne({ email }).select("-__v");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to search user" });
  }
});

// Update user balance (admin/deposit)
app.patch("/api/users/:userId/balance", async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.balance += amount;
    await user.save();

    res.json({ 
      message: "Balance updated",
      newBalance: user.balance 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update balance" });
  }
});

// Get user statistics
app.get("/api/users/:userId/stats", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const recentGames = await GameHistory.find({ userId: user._id })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      balance: user.balance,
      totalWagered: user.totalWagered,
      totalWon: user.totalWon,
      gamesPlayed: user.gamesPlayed,
      netProfit: user.totalWon - user.totalWagered,
      recentGames
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// ===== GAME ROUTES =====

// Play game
app.post("/api/game/play", verifyUser, async (req: any, res: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { betAmount } = req.body;
    const user = req.user;

    // Validation
    if (!betAmount || betAmount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Invalid bet amount" });
    }

    if (user.balance < betAmount) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Generate game outcome
    let outcome = 0;
    const pattern: string[] = [];
    
    for (let i = 0; i < TOTAL_DROPS; i++) {
      if (Math.random() > 0.5) {
        pattern.push("R");
        outcome++;
      } else {
        pattern.push("L");
      }
    }

    const multiplier = MULTIPLIERS[outcome];
    const possibleOutcomes = outcomes[outcome];
    const finalPoint = possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length) || 0];
    
    const payout = betAmount * multiplier;
    const profit = payout - betAmount;

    // Update user balance and stats
    user.balance = user.balance - betAmount + payout;
    user.totalWagered += betAmount;
    user.totalWon += payout;
    user.gamesPlayed += 1;
    await user.save({ session });

    // Save game history
    const gameHistory = new GameHistory({
      userId: user._id,
      betAmount,
      multiplier,
      payout,
      profit,
      pattern,
      outcome,
      finalPoint
    });
    await gameHistory.save({ session });

    await session.commitTransaction();

    res.json({
      success: true,
      point: finalPoint,
      multiplier,
      pattern,
      betAmount,
      payout,
      profit,
      newBalance: user.balance,
      gameId: gameHistory._id
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("Game error:", error);
    res.status(500).json({ error: "Failed to process game" });
  } finally {
    session.endSession();
  }
});

// Get game history
app.get("/api/game/history/:userId", async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query;
    
    const history = await GameHistory.find({ userId: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await GameHistory.countDocuments({ userId: req.params.userId });

    res.json({
      history,
      total,
      page: Math.floor(Number(skip) / Number(limit)) + 1,
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game history" });
  }
});

// Get leaderboard
app.get("/api/leaderboard", async (req, res) => {
  try {
    const { type = "profit", limit = 10 } = req.query;
    
    let sortField = {};
    if (type === "profit") {
      sortField = { totalWon: -1 };
    } else if (type === "wagered") {
      sortField = { totalWagered: -1 };
    } else if (type === "games") {
      sortField = { gamesPlayed: -1 };
    }

    const leaderboard = await User.find()
      .select("username balance totalWagered totalWon gamesPlayed")
      .sort(sortField)
      .limit(Number(limit));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Get recent games (all users)
app.get("/api/game/recent", async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    const recentGames = await GameHistory.find()
      .populate("userId", "username")
      .sort({ timestamp: -1 })
      .limit(Number(limit));

    res.json(recentGames);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent games" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});