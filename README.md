# 🛡️ Subscription Guardian


**A smart Chrome Extension to track, manage, and monitor all your paid subscriptions and free trials — from one clean dashboard.**

[![Django](https://img.shields.io/badge/Django-6.0.6-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/Django_REST_Framework-3.17.1-red?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)


---

## 📌 Project Overview

**Subscription Guardian** is a full-stack subscription management tool delivered as a Chrome Extension with a Django REST Framework backend. It helps users take control of their recurring expenses by providing a centralized dashboard to add, track, edit, and delete subscriptions — all with real-time spending analytics.

Users can monitor upcoming renewals, track expiring free trials, filter and search subscriptions by category, and get instant spend summaries — all without ever leaving their browser. The extension also automatically detects popular services (Netflix, Spotify, Canva, ChatGPT) based on the active browser tab, making data entry faster.

> 🚀 **Live Backend:** Deployed on [Render](https://render.com/) with PostgreSQL — always available, no local server needed.

---

## ✨ Features

### 🔐 Authentication
- Secure **User Registration and Login**
- **JWT-based Authentication** with token refresh support
- **User-specific Data Isolation** — each user sees only their own subscriptions

### 📋 Subscription Management
- ➕ **Add Subscription** — name, cost, billing cycle, category, start date, trial status
- ✏️ **Edit Subscription** — update any subscription detail in place
- 🗑️ **Delete Subscription** — remove subscriptions cleanly

### 📊 Dashboard Analytics
- 💰 **Monthly Spend Calculation** — total cost normalized to a monthly view
- 📅 **Yearly Spend Calculation** — projected annual cost at a glance
- 🔢 **Total Subscription Count**
- 🧪 **Trial Subscription Count**
- 💳 **Paid Subscription Count**
- 🔔 **Upcoming Renewals Tracking** — see what's due soon
- ⏳ **Expiring Trials Tracking** — never miss a trial end date

### 🔍 Search, Filter & Sort
- 🔎 **Search Subscriptions** by name
- 🏷️ **Category Filtering** — Entertainment, Productivity, Tools, and more
- ↕️ **Subscription Sorting** — by cost, name, or renewal date

### 🌐 Chrome Extension
- 🤖 **Automatic Service Detection** based on active browser tab
  - Detects **Netflix**, **Spotify**, **Canva**, and **ChatGPT / OpenAI** websites
  - Pre-fills the service name when adding a new subscription
- Clean, responsive **popup UI** — fully functional without leaving your current page

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML, CSS, JavaScript (Chrome Extension) |
| **Backend** | Python, Django 6.0.6, Django REST Framework 3.17.1 |
| **Authentication** | JWT (via `djangorestframework-simplejwt`) |
| **Database (Dev)** | SQLite |
| **Database (Prod)** | PostgreSQL (via `psycopg2-binary`, hosted on Render) |
| **Deployment** | Render (with Gunicorn + WhiteNoise) |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────┐
│          Chrome Extension            │
│  (HTML + CSS + JS Popup Interface)   │
│                                      │
│  • Tab URL Detection                 │
│  • JWT Token Storage (localStorage)  │
│  • Fetch API → DRF Backend           │
└──────────────┬───────────────────────┘
               │  HTTPS + JWT
               ▼
┌──────────────────────────────────────┐
│      Django REST Framework API       │
│         (Hosted on Render)           │
│                                      │
│  • /api/v1/register/  → Register     │
│  • /api/v1/login/     → Login        │
│  • /api/v1/token/refresh/ → Refresh  │
│  • /api/v1/subscriptions/ → CRUD     │
│  • /api/v1/stats/     → Analytics    │
└──────────────┬───────────────────────┘
               │  Django ORM
               ▼
┌──────────────────────────────────────┐
│  SQLite (Dev) │ PostgreSQL (Prod)    │
│                                      │
│  • Users Table                       │
│  • Subscriptions Table               │
└──────────────────────────────────────┘
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.10+
- pip
- Google Chrome Browser
- Git

---

### 🖥️ Backend Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/jatin-agrawal17/subscription-guardian.git
cd subscription-guardian
```

#### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost:127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

> **For production on Render**, set `DATABASE_URL` to your PostgreSQL connection string and `DEBUG=False`.

#### 5. Apply Migrations

```bash
python manage.py migrate
```

#### 6. Run the Development Server

```bash
python manage.py runserver
```

The backend will be running at `http://127.0.0.1:8000/`

---

### 🧩 Chrome Extension Setup

#### 1. Open Chrome Extensions Page

Navigate to `chrome://extensions/` in your browser.

#### 2. Enable Developer Mode

Toggle **Developer mode** ON (top-right corner).

#### 3. Load the Extension

Click **"Load unpacked"** and select the `subscription_ext/` folder from the cloned repository.

#### 4. Configure the API Base URL

In `subscription_ext/config/` (or `popup.js`), update the base URL:

```javascript
// For local development
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// For production (Render deployment)
const API_BASE_URL = "https://your-app.onrender.com/api/v1";
```

#### 5. Pin and Use

Click the puzzle icon in Chrome, pin **Subscription Guardian**, and click its icon to open the popup.

---

## 📡 API Overview

All endpoints require JWT authentication **except** `/register/` and `/login/`.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/v1/register/` | ✅ | Register a new user |
| `POST` | `/api/v1/login/` | ✅ | Login and receive JWT tokens |
| `POST` | `/api/v1/token/refresh/` | ✅ | Refresh JWT access token |
| `GET` | `/api/v1/subscriptions/` | ✅ | List all user subscriptions |
| `POST` | `/api/v1/subscriptions/` | ✅ | Add a new subscription |
| `PUT` | `/api/v1/subscriptions/{id}/` | ✅ | Update a subscription |
| `DELETE` | `/api/v1/subscriptions/{id}/` | ✅ | Delete a subscription |
| `GET` | `/api/v1/dashboard/` | ✅ | Get dashboard analytics |

### Authentication Header

```http
Authorization: Bearer <access_token>
```

### Sample Subscription Payload

```json
{
  "name": "Netflix",
  "cost": 649.00,
  "billing_cycle": "monthly",
  "category": "Entertainment",
  "start_date": "2024-01-01",
  "is_trial": false,
  "renewal_date": "2024-07-01"
}
```

---

## 📁 Project Structure

```
subscription-guardian/
│
├── accounts/                   # User registration & JWT auth
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── subscriptions/              # Subscription CRUD & analytics
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── admin.py
│   └── urls.py
│
├── subscription_ext/           # Chrome Extension frontend
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.css
│   ├── popup.js
│   ├── icons/
│   └── config/
│
├── config/                    # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── staticfiles/
├── .env
├── .gitignore
├── db.sqlite3
├── manage.py
├── Procfile                    # Render deployment entry point
├── requirements.txt
└── runtime.txt
```

---

## 👤 Author

**Jatin Agrawal**
Final Year B.Tech Student | LNMIIT Jaipur
Machine Learning & Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-jatin--agrawal17-181717?style=for-the-badge&logo=github)](https://github.com/jatin-agrawal17)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/jatin-agrawal17)

---
⭐ **If you found this project useful, give it a star!** ⭐

*Built with ❤️ using Django REST Framework and Chrome Extension APIs*
