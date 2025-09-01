const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { executeCode } = require('./services/codeExecutor');
const { generateHint, generateAptitudeVariants } = require('./services/aiHelper');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5111;

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Code execution service is running' });
});

// Code execution endpoint
app.post('/api/execute', async (req, res) => {
  try {
    const { code, language, testCases, problemId } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Code and language are required'
      });
    }

    console.log(`Executing ${language} code for problem ${problemId}`);

    const results = await executeCode(code, language, testCases, problemId);

    res.json({
      success: true,
      results
    });

  } catch (error) {
    console.error('Code execution error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error during code execution'
    });
  }
});

// AI: DSA/Aptitude hints
app.post('/api/ai/hint', async (req, res) => {
  try {
    const { type = 'dsa', problemStatement, code, constraints } = req.body || {};
    const data = await generateHint({ type, problemStatement, code, constraints });
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('AI hint endpoint error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate hint' });
  }
});

// AI: Aptitude variants
app.post('/api/ai/aptitude/variants', async (req, res) => {
  try {
    const { question, count } = req.body || {};
    if (!question) return res.status(400).json({ success: false, error: 'question is required' });
    const data = await generateAptitudeVariants({ question, count });
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('AI variants endpoint error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate variants' });
  }
});

// Test endpoint
app.post('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test endpoint working',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Code execution server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Code execution: http://localhost:${PORT}/api/execute`);
});

module.exports = app;
