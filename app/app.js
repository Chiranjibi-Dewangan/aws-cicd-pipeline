const express = require('express');
const app = express();
const port = 3000;

// Get hostname
const os = require('os');
const hostname = os.hostname();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AWS DevOps Demo</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .container {
          background: rgba(255,255,255,0.1);
          padding: 30px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
        h1 { margin-top: 0; }
        .info { 
          background: rgba(0,0,0,0.2);
          padding: 15px;
          border-radius: 5px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 AWS CI/CD Pipeline Demo</h1>
        <div class="info">
          <strong>Instance:</strong> ${hostname}
        </div>
        <div class="info">
          <strong>Status:</strong> Running
        </div>
        <div class="info">
          <strong>Deployed via:</strong> GitHub Actions + Terraform
        </div>
        <p>This app is automatically deployed to AWS using Infrastructure as Code.</p>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Instance: ${hostname}`);
});
