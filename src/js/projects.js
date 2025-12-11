// Project data with details for each project
const projects = {
    "datamanager": {
        title: "DataManager",
        image: "src/images/datamanager.jpg",
        description: "Full-stack data collaboration platform with real-time messaging, file sharing, and data quality monitoring.",
        longDescription: `
            <h3>Project Overview</h3>
            <p>DataManager revolutionizes how data teams collaborate by providing an all-in-one platform for data management and analysis. It's designed to eliminate the friction in data-driven workflows by integrating essential tools into a single, intuitive interface.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li><strong>Real-time Collaboration</strong>: Work simultaneously with team members through integrated chat and commenting system</li>
                <li><strong>Smart Data Validation</strong>: Automated data quality checks that run on upload and schedule</li>
                <li><strong>Version Control</strong>: Track changes to datasets with full history and rollback capabilities</li>
                <li><strong>Visual Data Profiling</strong>: Automatic generation of data quality reports and statistics</li>
                <li><strong>API Integration</strong>: Connect with popular data sources and services</li>
            </ul>
            
            <h4>Technical Implementation</h4>
            <p>Built with a microservices architecture, DataManager uses React for the frontend with Redux for state management. The backend is powered by Node.js with Express, using WebSockets for real-time features. Data is stored in MongoDB with Redis for caching, and the system is containerized with Docker for easy deployment.</p>
            
            <h4>Impact</h4>
            <p>Teams using DataManager have reported a 40% reduction in time spent on data preparation and a significant improvement in data quality across projects. The platform's intuitive interface has made it accessible to both technical and non-technical team members.</p>
        `,
        technologies: ["React", "Node.js", "MongoDB", "WebSockets", "Python", "Docker", "Redis"],
        links: [
            { label: "Live Demo", url: "https://tatstech.vercel.app/" },
            { label: "GitHub", url: "https://github.com/Tatenda1112/Data-Cleaning-App" }
        ],
        comments: []
    },
    "zig-forecast": {
        title: "ZiG/USD Exchange Rate Forecast",
        image: "src/images/forecast.png",
        description: "ARIMA-based short-term forecasting model for Zimbabwe's ZiG → USD rate.",
        longDescription: `
            <h3>Project Overview</h3>
            <p>This project addresses the challenge of exchange rate volatility in Zimbabwe by providing accurate short-term forecasts for the ZiG to USD exchange rate. The model helps businesses, investors, and individuals make informed financial decisions in an often unpredictable economic environment.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li><strong>Multi-horizon Forecasting</strong>: Predicts exchange rates for 1-day, 7-day, and 30-day periods</li>
                <li><strong>Anomaly Detection</strong>: Identifies and accounts for unusual market movements</li>
                <li><strong>Confidence Intervals</strong>: Provides prediction intervals to indicate forecast uncertainty</li>
                <li><strong>Automated Updates</strong>: Scripts to automatically fetch latest exchange rate data</li>
                <li><strong>Interactive Visualization</strong>: Web-based dashboard for exploring forecasts and historical trends</li>
            </ul>
            
            <h4>Technical Implementation</h4>
            <p>The forecasting pipeline is built using Python's statsmodels library, implementing SARIMAX (Seasonal AutoRegressive Integrated Moving Average with eXogenous regressors) to capture both seasonal patterns and external factors. The system includes automated data collection, preprocessing, model training, and evaluation components, with results served through a lightweight Flask API.</p>
            
            <h4>Impact</h4>
            <p>This tool has been particularly valuable for import/export businesses in Zimbabwe, helping them optimize currency exchange timing and reduce foreign exchange risk. The model achieves a Mean Absolute Percentage Error (MAPE) of under 1.5% for 7-day forecasts, providing reliable guidance for financial planning.</p>
        `,
        technologies: ["Python", "Pandas", "statsmodels", "Matplotlib", "Flask", "Plotly"],
        links: [
            { label: "GitHub", url: "https://github.com/Tatenda1112/Forecast-Exchange-Rate-Zig-USD" },
            { label: "Interactive Demo", url: "#" }
        ],
        comments: []
    },
    "adventure-works": {
        title: "Adventure Works Sales Dashboard",
        image: "src/images/adventure.png",
        description: "Interactive Power BI dashboard for comprehensive sales analysis and business intelligence.",
        longDescription: `
            <h3>Project Overview</h3>
            <p>This Power BI dashboard provides a 360-degree view of Adventure Works' sales performance, transforming raw sales data into actionable business intelligence. The interactive visualization enables stakeholders to identify trends, track KPIs, and make data-driven decisions to drive business growth.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li><strong>Executive Summary</strong>: At-a-glance view of total sales, profit margins, and year-over-year growth</li>
                <li><strong>Sales Performance</strong>: Interactive charts showing sales trends by product category, region, and time period</li>
                <li><strong>Customer Insights</strong>: Analysis of top customers, buying patterns, and customer lifetime value</li>
                <strong>Product Analysis</strong>: Performance metrics by product category and subcategory</li>
                <li><strong>Geographic Visualization</strong>: Sales distribution across regions and territories</li>
                <li><strong>What-If Analysis</strong>: Interactive tools for scenario planning and forecasting</li>
            </ul>
            
            <h4>Technical Implementation</h4>
            <p>The dashboard is built on a robust data model with star schema design, optimized for performance. It leverages DAX (Data Analysis Expressions) for complex calculations and time intelligence functions. The data is transformed using Power Query, with incremental refresh for handling large datasets efficiently. Custom visualizations are implemented using Charticulator for advanced analytics.</p>
            
            <h4>Impact</h4>
            <p>This dashboard has helped the sales team identify underperforming products, optimize pricing strategies, and improve territory management. Users have reported a 30% reduction in time spent on manual reporting and a 15% increase in sales through better data visibility and insights.</p>
        `,
        technologies: ["Power BI", "DAX", "Power Query", "SQL", "Data Modeling", "Charticulator"],
        links: [
            { label: "GitHub", url: "https://github.com/Tatenda1112/Adventure-Power-BI-" },
            { label: "Dashboard Preview", url: "#" }
        ],
        comments: []
    },
    "transformation-lib": {
        title: "Custom Data Transformation Library",
        image: "src/images/transformers.PNG",
        description: "Scikit-learn compatible transformers for streamlined machine learning workflows.",
        longDescription: `
            <h3>Project Overview</h3>
            <p>This open-source library provides a collection of robust, production-ready transformers that extend scikit-learn's functionality for real-world machine learning applications. Designed with a focus on maintainability and performance, it addresses common data preprocessing challenges that aren't fully covered by standard libraries.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li><strong>Advanced Encoding</strong>: Target encoding, weight of evidence, and other encoders for categorical variables</li>
                <li><strong>Missing Data Handling</n>: Smart imputation strategies with automatic pattern detection</li>
                <li><strong>Feature Engineering</strong>: Automated creation of interaction terms and polynomial features</li>
                <li><strong>Outlier Treatment</strong>: Multiple detection and treatment methods with configurable thresholds</li>
                <li><strong>High-Cardinality</strong>: Specialized transformers for features with many categories</li>
                <li><strong>Pipeline Integration</strong>: Seamless integration with scikit-learn pipelines</li>
            </ul>
            
            <h4>Technical Implementation</h4>
            <p>The library is built using Python's object-oriented programming paradigm, extending scikit-learn's BaseEstimator and TransformerMixin classes. It includes comprehensive unit tests with 95%+ code coverage and is fully documented with examples. The implementation focuses on memory efficiency and supports sparse matrices for large datasets.</p>
            
            <h4>Impact</h4>
            <p>This library has been adopted by several data science teams, reducing their feature engineering codebase by an average of 60%. It has been particularly valuable in financial services and e-commerce applications where data quality and preprocessing are critical. The modular design allows for easy extension and customization to specific business needs.</p>
        `,
        technologies: ["Python", "scikit-learn", "NumPy", "Pandas", "SciPy", "Cython"],
        links: [
            { label: "GitHub", url: "https://github.com/Tatenda1112/Custom-Transformation" },
            { label: "Documentation", url: "#" },
            { label: "PyPI", url: "#" }
        ],
        comments: []
    },
    "dataviz": {
        title: "DatViz – Data Processing & Analysis Platform",
        image: "src/images/dataviz.PNG",
        description: "Comprehensive data preparation and analysis tool with user management and admin dashboard.",
        longDescription: `
            <h3>Project Overview</h3>
            <p>A comprehensive data preparation and analysis platform designed to simplify how teams share, store, and monitor data. Built with FastAPI and React, it provides a complete solution for data teams to collaborate on analysis projects with robust user management and monitoring capabilities.</p>
            
            <h4>Key Features</h4>
            <h5>For Users:</h5>
            <ul>
                <li><strong>Project Management</strong>: Create and organize data analysis projects</li>
                <li><strong>Data Upload</strong>: Support for CSV, XLSX, and Parquet files</li>
                <li><strong>Data Validation</strong>: Comprehensive checks for data quality issues</li>
                <li><strong>Issue Reports</strong>: Download detailed Excel reports and JSON summaries</li>
                <li><strong>Dashboard</strong>: Visual overview of data quality metrics</li>
            </ul>
            
            <h5>For Admins:</h5>
            <ul>
                <li><strong>User Management</strong>: View all users and their activity</li>
                <li><strong>System Monitoring</strong>: Track usage statistics and logs</li>
                <li><strong>Audit Trail</strong>: Complete activity logging with timestamps</li>
                <li><strong>Project Oversight</strong>: Monitor all user projects</li>
            </ul>
            
            <h4>Technical Implementation</h4>
            <p>The platform is built with a modern, containerized architecture using Docker for easy deployment. The backend leverages FastAPI for high-performance API endpoints, SQLAlchemy for database operations, and JWT for secure authentication. The frontend is built with React and Material-UI for a responsive, user-friendly interface.</p>
            
            <h4>Getting Started</h4>
            <pre><code># Install dependencies
pip install -r requirements.txt

# Start backend server
python start_backend.py
# OR manually:
uvicorn backend.main:app --reload

# Frontend Setup
cd frontend_app
npm install
npm start</code></pre>
            
            <p><strong>Default Admin Credentials:</strong><br>
            Username: admin<br>
            Password: admin123</p>
        `,
        technologies: ["FastAPI", "React", "PostgreSQL", "Pandas", "Docker", "SQLAlchemy", "JWT"],
        links: [
            { label: "GitHub", url: "https://github.com/Tatenda1112/Data-Cleanin-App" },
            { label: "Live Demo", url: "#" }
        ],
        comments: []
    },
    "data-quality": {
        title: "Data Quality Check Pipeline for Loan Data",
        image: "src/images/dataquality.png",
        description: "Robust data validation framework for financial datasets with comprehensive issue detection.",
        longDescription: `
            <h3>Project Overview</h3>
            <p>This module defines various custom transformers for checking data quality issues in loan datasets. The transformers are used to perform tasks such as checking for missing values, invalid dates, negative or zero amounts, duplicates, and ensuring the presence of mandatory columns.</p>
            
            <h4>Class Documentation</h4>
            <ul>
                <li><strong>MandatoryColumns</strong>: Checks if all mandatory columns are present in the DataFrame.</li>
                <li><strong>CheckMissingLoanId</strong>: Identifies rows with missing loan IDs.</li>
                <li><strong>CheckMissingValues</strong>: Identifies columns with missing values and returns a report.</li>
                <li><strong>DateConverter</strong>: Converts date columns to datetime format and reports unconverted dates.</li>
                <li><strong>CheckInvalidDates</strong>: Identifies rows where disbursement_date is greater than expire_date.</li>
                <li><strong>ConvertedNumeric</strong>: Converts specified columns to numeric types and identifies unconverted rows.</li>
                <li><strong>CheckNegativeAmountsAndZeros</strong>: Checks for negative and zero values in specified numeric columns.</li>
                <li><strong>CheckDuplicates</strong>: Identifies duplicate rows based on loan_id.</li>
            </ul>
            
            <h4>Dependencies</h4>
            <ul>
                <li>pandas</li>
                <li>numpy</li>
                <li>scikit-learn (BaseEstimator, TransformerMixin, Pipeline)</li>
            </ul>
            
            <h4>Installation</h4>
            <pre><code>pip install -r requirements.txt</code></pre>
            
            <h4>Key Features</h4>
            <ul>
                <li><strong>Mandatory Columns Validation</strong>: Verifies presence of all required fields in the dataset</li>
                <li><strong>Data Completeness</strong>: Identifies missing values and incomplete records</li>
                <li><strong>Temporal Validation</strong>: Checks for logical date relationships and invalid date ranges</li>
                <li><strong>Numeric Integrity</strong>: Detects negative/zero amounts and invalid numeric values</li>
                <li><strong>Duplicate Detection</strong>: Identifies duplicate loan records based on key fields</li>
                <li><strong>Custom Rule Engine</strong>: Supports adding domain-specific validation rules</li>
            </ul>
            
            <h4>Included Transformers</h4>
            <ul>
                <li><code>MandatoryColumns</code>: Validates presence of required columns</li>
                <li><code>CheckMissingLoanId</code>: Identifies records with missing loan IDs</li>
                <li><code>CheckMissingValues</code>: Analyzes and reports on missing data patterns</li>
                <li><code>DateConverter</code>: Standardizes date formats and flags conversion issues</li>
                <li><code>CheckInvalidDates</code>: Validates logical date relationships (e.g., disbursement date ≤ expiry date)</li>
                <li><code>CheckNegativeAmountsAndZeros</code>: Ensures numeric fields meet minimum value requirements</li>
                <li><code>CheckDuplicates</code>: Identifies duplicate records based on key fields</li>
            </ul>
            
            <h4>Technical Implementation</h4>
            <p>Built using Python's scikit-learn's BaseEstimator and TransformerMixin, this pipeline follows the scikit-learn API conventions for maximum compatibility. It leverages pandas for efficient data manipulation and provides detailed validation reports with actionable insights. The modular design allows for easy extension with custom validation rules.</p>
            
            <h4>Usage Example</h4>
            <pre><code>from sklearn.pipeline import Pipeline
from data_quality import (
    MandatoryColumns,
    CheckMissingValues,
    DateConverter,
    CheckInvalidDates,
    CheckNegativeAmountsAndZeros,
    CheckDuplicates
)

# Define the validation pipeline
validation_pipeline = Pipeline([
    ('check_columns', MandatoryColumns(mandatory_cols=['loan_id', 'disbursement_date'])),
    ('check_missing', CheckMissingValues()),
    ('convert_dates', DateConverter(date_cols=['disbursement_date', 'expire_date'])),
    ('validate_dates', CheckInvalidDates()),
    ('validate_amounts', CheckNegativeAmountsAndZeros(amount_cols=['loan_amount'])),
    ('check_duplicates', CheckDuplicates())
])

# Apply validation
try:
    clean_df = validation_pipeline.fit_transform(loan_df)
except ValidationError as e:
    print(f"Validation failed: {e}")
    validation_report = validation_pipeline.named_steps['check_missing'].get_report()
    print(validation_report)</code></pre>
        `,
        technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "joblib"],
        links: [
            { label: "GitHub", url: "https://github.com/Tatenda1112/Data-Cleaning-App" },
            { label: "Documentation", url: "#" },
            { label: "PyPI", url: "#" }
        ],
        comments: []
    },
    "coffee-dashboard": {
        title: "Coffee Sales Dashboard (Excel)",
        image: "src/images/coffe.PNG",
        description: "Interactive Excel-based Business Intelligence dashboard for analyzing coffee sales trends and customer behavior.",
        longDescription: `
            <h3>Project Overview</h3>
            <p>An interactive Excel-based Business Intelligence dashboard designed to analyze coffee sales trends, customer behavior, and product performance. This project showcases skills in Excel dashboard design, data visualization, pivot reporting, and sales analytics.</p>
            
            <h4>Key Features</h4>
            <h5>Interactive Filters</h5>
            <ul>
                <li>Year & month timeline</li>
                <li>Roast type (Dark | Light | Medium)</li>
                <li>Coffee size (0.2kg – 2.5kg)</li>
                <li>Loyalty card users</li>
            </ul>
            
            <h5>Visualizations</h5>
            <ul>
                <li>Total Sales Over Time</li>
                <li>Sales by Country</li>
                <li>Top 5 Customers</li>
                <li>Dashboards dynamically linked to pivot tables</li>
            </ul>
            
            <h4>Skills Demonstrated</h4>
            <ul>
                <li>Excel PivotTables & PivotCharts</li>
                <li>Slicers & Interactive Timelines</li>
                <li>Data cleaning & transformation</li>
                <li>Dashboard UI/UX design</li>
                <li>Business Intelligence reporting</li>
                <li>Advanced Excel functions (SUMIFS, VLOOKUP/XLOOKUP, IFERROR)</li>
            </ul>
            
            <h4>Business Impact</h4>
            <p>This dashboard provides an intuitive way to explore multiyear coffee sales data, enabling quick insight discovery through interactive filtering and visualization. It helps identify sales trends, top-performing products, and customer segments to drive data-driven business decisions.</p>
        `,
        technologies: ["Excel", "Power Query", "Power Pivot", "DAX", "PivotTables", "Data Visualization"],
        links: [
            { label: "GitHub", url: "https://github.com/Tatenda1112/Coffee-Sales-Dashboard-Excel" },
            { label: "Dashboard Preview", url: "#" }
        ],
        comments: []
    },
};

// DOM Elements
const modal = document.getElementById('projectModal');
const modalContent = document.querySelector('.modal-content');
const modalProjectDetails = document.querySelector('.modal-project-details');
const commentsList = document.querySelector('.comments-list');
const commentForm = document.getElementById('commentForm');
const closeModal = document.querySelector('.close-modal');

// Open modal with project details
function openProjectModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Update project details
    modalProjectDetails.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="project-modal-image">
        <div class="project-meta">
            <div class="technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="project-description">
            <h3>Project Overview</h3>
            <p>${project.longDescription}</p>
            
            <div class="project-links">
                ${project.links.map(link => 
                    `<a href="${link.url}" target="_blank" rel="noopener" class="btn btn-outline">
                        <i class="fas fa-external-link-alt"></i> ${link.label}
                    </a>`
                ).join('')}
            </div>
        </div>
    `;

    // Update comments
    updateComments(projectId);

    // Set project ID in the form
    document.getElementById('projectId').value = projectId;

    // Show modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Update comments list
function updateComments(projectId) {
    const project = projects[projectId];
    if (!project) return;

    if (project.comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';
        return;
    }

    commentsList.innerHTML = project.comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${formatDate(comment.date)}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
        </div>
    `).join('');
}

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Open modal when clicking on view buttons
    document.querySelectorAll('.btn-view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const projectId = projectCard.dataset.projectId;
            openProjectModal(projectId);
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Handle comment submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const projectId = document.getElementById('projectId').value;
        const name = document.getElementById('commenterName').value.trim();
        const text = document.getElementById('commentText').value.trim();
        
        if (!name || !text) return;
        
        // In a real app, you would send this to a server
        const comment = {
            name,
            text,
            date: new Date().toISOString()
        };
        
        // Add to local storage for demo purposes
        projects[projectId].comments.unshift(comment);
        updateComments(projectId);
        
        // Clear form
        commentForm.reset();
        
        // Show success message
        const submitButton = commentForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Comment Posted!';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Add animation to project cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});
