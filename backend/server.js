import jsonServer from "json-server";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if db.json exists
const dbPath = join(__dirname, "db.json");
if (!existsSync(dbPath)) {
  console.error("❌ Error: db.json file not found!");
  console.log("📝 Please create a db.json file in your project root.");
  console.log("💡 Check the artifact above for a sample db.json structure.");
  process.exit(1);
}

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({
  static: "./dist", // Vite builds to 'dist' folder
});

// Enable CORS with specific options - Updated for production
server.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      /^https:\/\/.*\.render\.com$/, // Allow all Render domains
      /^https:\/\/.*\.onrender\.com$/, // Allow all onrender domains
      // "https://campus-buddy-v62r.vercel.app", // Your specific frontend
    ],
    credentials: true,
  })
);

// Add request logging middleware
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Helper function to get the correct base URL
function getBaseURL(req) {
  // Check if we're on Render (production)
  if (
    req.get("host").includes(".render.com") ||
    req.get("host").includes(".onrender.com")
  ) {
    return `https://${req.get("host")}`;
  }
  // For localhost development
  return `${req.protocol}://${req.get("host")}`;
}

// Custom routes before JSON Server router
// Root endpoint showing API routes
server.get("/", (req, res) => {
  const baseURL = getBaseURL(req);
  res.json({
    message: "Campus Buddy API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    routes: {
      "GET /api/events": baseURL + "/api/events",
      "GET /api/clubs": baseURL + "/api/clubs",
      "GET /api/users": baseURL + "/api/users",
      "GET /api/event_attendance": baseURL + "/api/event_attendance",
      "GET /api/event_volunteers": baseURL + "/api/event_volunteers",
      "GET /api/eventTypes": baseURL + "/api/eventTypes",
      "GET /api/tags": baseURL + "/api/tags",
      "GET /api/metadata": baseURL + "/api/metadata",
    },
    documentation: {
      "Query Parameters": "?_limit=10&_page=1&_sort=id&_order=asc",
      Filtering: "?title=Tech&clubId=1",
      "Full Text Search": "?q=search_term",
      Relationships: "?_expand=club&_embed=attendees",
    },
  });
});

// Health check endpoint
server.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    host: req.get("host"),
    url: getBaseURL(req),
  });
});

// API documentation endpoint at /api - Updated for production
server.get("/api", (req, res) => {
  const baseURL = getBaseURL(req);

  // Get all available routes from the router
  const db = router.db.getState();
  const routes = Object.keys(db).map((resource) => ({
    resource,
    endpoints: [
      {
        method: "GET",
        url: `${baseURL}/api/${resource}`,
        description: `Get all ${resource}`,
      },
      {
        method: "GET",
        url: `${baseURL}/api/${resource}/:id`,
        description: `Get ${resource} by ID`,
      },
      {
        method: "POST",
        url: `${baseURL}/api/${resource}`,
        description: `Create new ${resource}`,
      },
      {
        method: "PUT",
        url: `${baseURL}/api/${resource}/:id`,
        description: `Update ${resource} by ID`,
      },
      {
        method: "PATCH",
        url: `${baseURL}/api/${resource}/:id`,
        description: `Partially update ${resource} by ID`,
      },
      {
        method: "DELETE",
        url: `${baseURL}/api/${resource}/:id`,
        description: `Delete ${resource} by ID`,
      },
    ],
  }));

  // Send HTML response with styled endpoint documentation
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Campus Buddy API - Endpoints</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
                color: #333;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
                font-weight: 700;
            }
            
            .header p {
                font-size: 1.2em;
                opacity: 0.9;
            }
            
            .environment-badge {
                display: inline-block;
                background: rgba(255,255,255,0.2);
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9em;
                margin-top: 10px;
            }
            
            .stats {
                display: flex;
                justify-content: space-around;
                background: #f8fafc;
                padding: 20px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .stat-item {
                text-align: center;
            }
            
            .stat-number {
                font-size: 2em;
                font-weight: bold;
                color: #4f46e5;
            }
            
            .stat-label {
                color: #64748b;
                font-size: 0.9em;
                margin-top: 5px;
            }
            
            .content {
                padding: 30px;
            }
            
            .resource-section {
                margin-bottom: 40px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                overflow: hidden;
            }
            
            .resource-header {
                background: #f1f5f9;
                padding: 20px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .resource-title {
                font-size: 1.5em;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 5px;
            }
            
            .resource-count {
                color: #64748b;
                font-size: 0.9em;
            }
            
            .endpoints {
                padding: 0;
            }
            
            .endpoint {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid #f1f5f9;
                transition: background-color 0.2s;
            }
            
            .endpoint:hover {
                background: #f8fafc;
            }
            
            .endpoint:last-child {
                border-bottom: none;
            }
            
            .method {
                font-weight: bold;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8em;
                min-width: 60px;
                text-align: center;
                margin-right: 15px;
            }
            
            .method.GET { background: #dcfce7; color: #166534; }
            .method.POST { background: #fef3c7; color: #92400e; }
            .method.PUT { background: #dbeafe; color: #1e40af; }
            .method.PATCH { background: #f3e8ff; color: #7c2d12; }
            .method.DELETE { background: #fecaca; color: #dc2626; }
            
            .endpoint-url {
                flex: 1;
                font-family: 'Courier New', monospace;
                font-size: 0.9em;
                color: #4f46e5;
                margin-right: 15px;
                word-break: break-all;
            }
            
            .endpoint-description {
                color: #64748b;
                font-size: 0.9em;
            }
            
            .quick-links {
                margin-top: 30px;
                padding: 20px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .quick-links h3 {
                margin-bottom: 15px;
                color: #1e293b;
            }
            
            .links-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
            }
            
            .link-item {
                background: white;
                padding: 15px;
                border-radius: 6px;
                border: 1px solid #e2e8f0;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            
            .link-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .link-item a {
                color: #4f46e5;
                text-decoration: none;
                font-weight: 500;
            }
            
            .link-item a:hover {
                text-decoration: underline;
            }
            
            .link-description {
                color: #64748b;
                font-size: 0.85em;
                margin-top: 5px;
            }
            
            .footer {
                text-align: center;
                padding: 30px;
                border-top: 1px solid #e2e8f0;
                background: #f8fafc;
                color: #64748b;
            }
            
            .copy-btn {
                background: #4f46e5;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8em;
                margin-left: 10px;
                transition: background 0.2s;
            }
            
            .copy-btn:hover {
                background: #3730a3;
            }
            
            @media (max-width: 768px) {
                .stats {
                    flex-direction: column;
                    gap: 20px;
                }
                
                .endpoint {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
                
                .endpoint-url {
                    margin-right: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎓 Campus Buddy API</h1>
                <p>RESTful API for campus event management</p>
                <div class="environment-badge">🌐 ${
                  baseURL.includes("render") ? "Production" : "Development"
                }</div>
            </div>
            
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number">${Object.keys(db).length}</div>
                    <div class="stat-label">Resources</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${Object.keys(db).length * 6}</div>
                    <div class="stat-label">Total Endpoints</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${Object.values(db).reduce(
                      (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
                      0
                    )}</div>
                    <div class="stat-label">Records</div>
                </div>
            </div>
            
            <div class="content">
                ${routes
                  .map(
                    (route) => `
                    <div class="resource-section">
                        <div class="resource-header">
                            <div class="resource-title">/${route.resource}</div>
                            <div class="resource-count">${
                              Array.isArray(db[route.resource])
                                ? db[route.resource].length
                                : 0
                            } records</div>
                        </div>
                        <div class="endpoints">
                            ${route.endpoints
                              .map(
                                (endpoint) => `
                                <div class="endpoint">
                                    <span class="method ${endpoint.method}">${endpoint.method}</span>
                                    <span class="endpoint-url">${endpoint.url}</span>
                                    <span class="endpoint-description">${endpoint.description}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                `
                  )
                  .join("")}
                
                <div class="quick-links">
                    <h3>🔗 Quick Links</h3>
                    <div class="links-grid">
                        ${Object.keys(db)
                          .map(
                            (resource) => `
                            <div class="link-item">
                                <a href="${baseURL}/api/${resource}" target="_blank">View ${resource}</a>
                                <div class="link-description">Browse all ${resource} data</div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>📚 Campus Buddy API • Built with JSON Server • <a href="${baseURL}/" style="color: #4f46e5;">API Documentation</a></p>
                <p style="margin-top: 10px; font-size: 0.8em;">Server running on: ${baseURL}</p>
            </div>
        </div>
        
        <script>
            // Add copy functionality for URLs
            document.querySelectorAll('.endpoint-url').forEach(url => {
                url.style.cursor = 'pointer';
                url.addEventListener('click', () => {
                    navigator.clipboard.writeText(url.textContent);
                    
                    // Show feedback
                    const originalText = url.textContent;
                    url.textContent = '📋 Copied!';
                    url.style.color = '#22c55e';
                    
                    setTimeout(() => {
                        url.textContent = originalText;
                        url.style.color = '#4f46e5';
                    }, 2000);
                });
            });
        </script>
    </body>
    </html>
  `);
});

// Use the router for API routes
server.use("/api", router);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// Serve React app for all other routes (SPA support)
server.get("*", (req, res) => {
  const indexPath = join(__dirname, "dist", "index.html");
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: "Not Found",
      message: "React app not built yet. Run 'npm run build' first.",
      timestamp: new Date().toISOString(),
    });
  }
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`🚀 Campus Buddy JSON Server is running on port ${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/`);
  console.log(`🔗 API Endpoints: http://localhost:${port}/api`);
  console.log(`❤️  Health Check: http://localhost:${port}/health`);

  // Show production URLs if deployed
  if (process.env.RENDER_EXTERNAL_URL) {
    console.log(`\n🌐 Production URLs:`);
    console.log(`   📚 API Documentation: ${process.env.RENDER_EXTERNAL_URL}/`);
    console.log(`   🔗 API Endpoints: ${process.env.RENDER_EXTERNAL_URL}/api`);
    console.log(
      `   ❤️  Health Check: ${process.env.RENDER_EXTERNAL_URL}/health`
    );
  }

  console.log(`\n📋 Available Routes:`);
  console.log(`   • GET /api/events - List all events`);
  console.log(`   • GET /api/clubs - List all clubs`);
  console.log(`   • GET /api/users - List all users`);
  console.log(`   • GET /api/event_attendance - List attendance records`);
  console.log(`   • GET /api/event_volunteers - List volunteer records`);
  console.log(`   • GET /api/eventTypes - List event types`);
  console.log(`   • GET /api/tags - List all tags`);
  console.log(`   • GET /api/metadata - Get app metadata`);
  console.log(`\n🔍 Try these example requests:`);
  console.log(`   • http://localhost:${port}/api/events`);
  console.log(`   • http://localhost:${port}/api/events?_limit=5`);
  console.log(`   • http://localhost:${port}/api/events?q=tech`);
  console.log(`   • http://localhost:${port}/api/events?_expand=club`);
});
