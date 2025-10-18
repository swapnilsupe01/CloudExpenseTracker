# CloudExpenseTracker

Live Link: http://34.100.135.108/

 Overview:
 
CloudExpenseTracker is a full-stack application that allows users to:
Submit daily expenses via a web form (Frontend)
Store the data in Firebase Firestore
Sync the latest expense to BigQuery for analytics
Host the frontend via VM + NGINX
Use a Firebase service account for secure server-side operations


Deployment Steps (Summary)
✅ VM Setup
Google Compute Engine VM (Ubuntu)
Installed Node.js, npm, git, nginx
Cloned this repo into VM

✅ Firebase & Firestore
Created Firebase project: cloudexpensepro
Enabled Firestore and added service account JSON (firebase-key.json)
Backend uses admin.firestore() to save and read expenses

✅ BigQuery
Dataset: expense_tracker
Table: expenses
Backend syncs latest Firestore entry to BigQuery via @google-cloud/bigquery

✅ Hosting
Frontend deployed using nginx (/var/www/html)
Backend runs with node index.js on port 8080

✅ Networking (Firewall & VPN)
Configured firewall rules to allow inbound HTTP (port 80) and backend (port 8080).
Enabled VPN access (optional) for secure remote administration of the VM and backend endpoints.

🧪 Testing
Open: http://34.100.135.108/

Submit an expense → Firestore → sync to BigQuery

Trigger /sync-latest-expense API to move latest Firestore entry to BigQuery.

