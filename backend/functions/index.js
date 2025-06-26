exports.syncExpenseToBigQuery = functions.firestore
  .document("expenses/{expenseId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const rows = [{
      amount: data.amount,
      category: data.category,
      note: data.note || "",
      timestamp: data.timestamp,
    }];

    try {
      await bigquery
        .dataset("expense_tracker")
        .table("expenses")
        .insert(rows);
      console.log("Synced to BigQuery:", rows);
    } catch (err) {
      console.error("BigQuery Insert Error:", err);
    }
  });
