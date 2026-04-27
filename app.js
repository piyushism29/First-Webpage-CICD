const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Health check endpoint
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  // Main page
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });

    return res.end(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Azure DevOps Architecture</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(to right, #000428, #925000ff);
      color: white;
      text-align: center;
      padding: 20px;
    }
    h2 { margin-top: 40px; color: #00a4ef; }

    .row {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }

    .box {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
      padding: 15px;
      border-radius: 8px;
      width: 170px;
      transition: transform 0.3s;
    }

    .box:hover {
        transform: scale(1.05);
        background: rgba(255,255,255,0.2);
    }

    .arrow { font-size: 24px; color: #ff8c00; }
  </style>
</head>

<body>

<h1>🚀 Azure CICD Pipeline2</h1>

<h2>🏗️ Infrastructure (Terraform)</h2>
<div class="row">
  <div class="box">Terraform</div>
  <div class="arrow">➡️</div>
  <div class="box">Azure Resource Group</div>
  <div class="arrow">➡️</div>
  <div class="box">Azure Virtual Machine</div>
</div>

<h2>⚙️ Continuous Deployment (Native Node.js)</h2>
<div class="row">
  <div class="box">👨‍💻 VS Code</div>
  <div class="arrow">➡️</div>

  <div class="box">📦 GitLab Repository</div>
  <div class="arrow">➡️</div>

  <div class="box">⚙️ GitLab Runner</div>
  <div class="arrow">➡️</div>

  <div class="box">🔑 SSH Key (File Variable)</div>
  <div class="arrow">➡️</div>

  <div class="box">📂 RSYNC Code Transfer</div>
  <div class="arrow">➡️</div>

  <div class="box">☁️ Azure VM (Node.js)</div>
</div>

<p style="margin-top:40px; font-style: italic;">
  Deployed directly to Linux VM without Docker containers.
</p>

<p><b>Last Deployment Sync:</b> ${new Date().toLocaleString()}</p>

</body>
</html>`);
  }

  // Handle unknown routes
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

// Start server on 0.0.0.0 to be accessible from the Public IP
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://your-azure-ip:${PORT}`);
});

// Error handling
process.on("uncaughtException", (err) => {
  console.error("Unhandled Error:", err);
});