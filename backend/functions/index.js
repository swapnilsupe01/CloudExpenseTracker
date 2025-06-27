const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json'); // 🔑 load credentials

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cloudexpensepro.firebaseio.com" // ✅ use your actual project ID
});
const db = admin.firestore();

// Initialize BigQuery
const bigquery = new BigQuery();
const datasetId = 'expense_tracker';
const tableId = 'expenses';

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('VM backend is working!');
});

// Sync latest expense to BigQuery
app.post('/sync-latest-expense', async (req, res) => {
  try {
    const snapshot = await db.collection('expenses')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).send('No expense found');
    }

    const doc = snapshot.docs[0].data();

    const rows = [{
      amount: doc.amount,
      category: doc.category,
      note: doc.note || '',
      timestamp: doc.timestamp
    }];

    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log('Synced to BigQuery:', rows);

    res.status(200).send('Synced latest expense to BigQuery');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error syncing expense');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
