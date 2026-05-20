# Email-Spam-Classifier

⚠ AI-Powered Real-Time Spam Email Detector

An end-to-end Machine Learning system that classifies spam emails in real time directly inside Gmail using a Chrome Extension, FastAPI backend, and a calibrated NLP pipeline built with TF-IDF and LinearSVC.
The extension dynamically extracts opened email content from Gmail’s live DOM, sends it asynchronously to a Dockerized FastAPI API, and instantly returns spam predictions with confidence scores that are injected back into the Gmail interface as warning badges.
The project demonstrates practical applied ML engineering through real-world browser integration, low-latency inference, REST API communication, containerized deployment, and production-style system architecture optimized for fast and lightweight text classification.


📌 Project Highlights:-

✅ Real-time spam classification inside Gmail

✅ End-to-end Machine Learning deployment

✅ Chrome Extension integration (Manifest V3)

✅ FastAPI backend API

✅ Dockerized backend deployment

✅ TF-IDF NLP pipeline

✅ Calibrated probability predictions
