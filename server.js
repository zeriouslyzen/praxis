const express = require('express');
const { spawn } = require('child_process');

const app = express();
const PORT = 3001;

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// Mini-ice wrapper function using Python Mini-ICEBURG
async function callMiniIce(prompt, conversationHistory = []) {
  try {
    const { spawn } = require('child_process');
    
    return new Promise((resolve, reject) => {
      // Call the Python Mini-ICEBURG implementation
      const python = spawn('python3', ['/Users/deshonjackson/Desktop/miniice/mini_ice.py', prompt]);
      
      let output = '';
      let error = '';
      
      // Set a timeout to prevent hanging
      const timeout = setTimeout(() => {
        python.kill();
        reject(new Error('Request timeout - Mini-ICEBURG took too long to respond'));
      }, 30000); // 30 second timeout
      
      python.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      python.stderr.on('data', (data) => {
        error += data.toString();
      });
      
      python.on('close', (code) => {
        clearTimeout(timeout);
        if (code === 0) {
          const response = output.trim();
          resolve({
            response: response || "I apologize, but I couldn't generate a response at this time.",
            model: 'Mini-ICEBURG',
            timestamp: new Date().toISOString()
          });
        } else {
          reject(new Error(`Mini-ICEBURG process exited with code ${code}: ${error}`));
        }
      });
      
      python.on('error', (err) => {
        clearTimeout(timeout);
        reject(new Error(`Failed to start Mini-ICEBURG process: ${err.message}`));
      });
    });
  } catch (error) {
    throw new Error(`Failed to call Mini-ICEBURG: ${error.message}`);
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    model: 'Mini-ICEBURG',
    service: 'mini-ice API',
    timestamp: new Date().toISOString()
  });
});

// Main mini-ice API endpoint
app.post('/api/mini-ice', async (req, res) => {
  try {
    const { message, conversation_history = [] } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }
    
    console.log(`[mini-ice] Processing: "${message}"`);
    
    const result = await callMiniIce(message, conversation_history);
    
    console.log(`[mini-ice] Response: "${result.response.substring(0, 100)}..."`);
    
    res.json(result);
    
  } catch (error) {
    console.error('[mini-ice] Error:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 mini-ice API server running on http://localhost:${PORT}`);
  console.log(`🧠 Model: Mini-ICEBURG (Cognitive Agent)`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`💬 API endpoint: http://localhost:${PORT}/api/mini-ice`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down mini-ice API server...');
  process.exit(0);
});
