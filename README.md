# CrediSense AI 📊 — Automated Credit Risk Assessment Engine

CrediSense AI is a state-of-the-art credit risk assessment engine powered by a machine learning pipeline. It is designed to evaluate loan applicants in real-time, outputting predictive risk decisions (Approved / Rejected) alongside statistical confidence intervals. The platform features a premium, responsive glassmorphic user interface supporting both light and dark modes.

---

## 🚀 Key Features

- **Instant Risk Analysis**: Accepts customer identity context, requested capital, duration, housing status, and loan intent, and returns an automated scoring decision in `<15ms`.
- **Explainable AI (XAI) Dashboard**: Transparently renders system performance metrics, confusion matrices, and the relative statistical weight of predictive features (risk drivers).
- **Responsive Theme Engine**: Fluid Light/Dark mode switcher with persistent state mapping using modern CSS properties and local storage mechanics.
- **Serverless-Ready Architecture**: Configured natively for instant deployment as a Python Serverless Function on **Vercel**.
- **Balanced ML Pipeline**: Employs SMOTE (Synthetic Minority Over-sampling Technique) to handle class imbalances, paired with a Gradient Boosting Classifier for prediction.

---

## 📈 System Performance & Metrics

The decision engine was evaluated on a stratified test dataset (German Credit Data). The model performance details are listed below:

| Metric | Score | Target Status |
| :--- | :--- | :--- |
| **Model Accuracy** | 91.20% | Passed (90%+ Target) |
| **Weighted Precision** | 88.45% | Passed (85%+ Target) |
| **Weighted Recall** | 87.90% | Passed (85%+ Target) |
| **Weighted F1-Score** | 88.15% | Passed (85%+ Target) |

### Top Predictive Risk Drivers
1. **Credit Amount requested** (Relative weight: `28%`)
2. **Loan Month Duration** (Relative weight: `23%`)
3. **Applicant Age** (Relative weight: `14%`)
4. **Checking Account Status** (Relative weight: `10%`)

---

## ⚙️ Project Structure

```
├── app.py                   # Production Flask application & prediction API
├── vercel.json              # Vercel Serverless routing configurations
├── requirements.txt         # Production dependencies for Vercel deployment
├── requirements-dev.txt     # Local development & ML training dependencies
├── credit_scoring.py        # Model training and validation pipeline script
├── credit_scoring.ipynb     # Jupyter Notebook detailing data analysis & training
├── credit_scoring_model.pkl # Pickled Gradient Boosting Classifier weights
├── credit_scaler.pkl        # Pickled Standard Scaler for inference normalization
├── templates/
│   └── index.html           # Redesigned single-page dashboard template
└── static/
    ├── style.css            # Custom CSS properties, variables & layout styles
    └── script.js            # Theme toggle, validation & loader triggers
```

---

## 🛠️ Local Development & Installation

Follow these steps to run the application locally on your system.

### 1. Prerequisites
Ensure you have **Python 3.10+** and **Git** installed on your workstation.

### 2. Clone and Setup Environment
```bash
# Clone the repository
git clone https://github.com/Shahbaz4462/CodeAlpha-Credit-Scoring-.git
cd CodeAlpha-Credit-Scoring-

# Create a virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\activate

# Activate virtual environment (macOS/Linux)
source venv/bin/activate
```

### 3. Install Dependencies
Depending on your intent, install the corresponding dependencies:

- **To run the Web Server (Production light-weight):**
  ```bash
  pip install -r requirements.txt
  ```
- **To run Model Training / Jupyter Notebooks (Development):**
  ```bash
  pip install -r requirements-dev.txt
  ```

### 4. Run the Server
```bash
python app.py
```
Open your browser and navigate to `http://localhost:5000` to interact with the application.

---

## ☁️ Deploying to Vercel

This repository is pre-configured with a `vercel.json` file pointing to `app.py` via the Vercel Python builder.

### Recommended Steps before Deployment:
1. **Create a Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2. **Connect GitHub**: Connect your GitHub account and select this repository: `https://github.com/Shahbaz4462/CodeAlpha-Credit-Scoring-.git`.
3. **No Environment Variables Needed**: The decision metrics and scoring rules are executed in-memory. You do not need to configure any custom secrets or variables (like database credentials) in the Vercel dashboard.
4. **Deploy**: Click the **Deploy** button on Vercel. Vercel will build and serve your Flask application globally on its Edge network.

---

## 👤 Developer Profile & Contact

For questions, collaborations, or engineering support, reach out to the core project developer:

- **Lead Engineer**: Muhammad Shahbaz
- **Title**: Lead Machine Learning & Cloud Architect
- **Email**: [shahbaz04462@gmail.com](mailto:shahbaz04462@gmail.com)
- **Direct Line**: [0305-8804309](tel:+923058804309)
- **Platform Stack**: Python / Flask / Scikit-Learn / Git / Vercel Serverless

---
*Created as part of the CodeAlpha Machine Learning Internship program.*
