document.getElementById('expenseForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  const expense = {
    amount: +form.amount.value,
    category: form.category.value,
    note: form.note.value,
    timestamp: new Date().toISOString()
  };

  try {
    await db.collection("expenses").add(expense);
    alert("✅ Expense added!");
    form.reset();
  } catch (err) {
    console.error("❌ Error adding expense:", err);
    alert("Failed to add expense: " + err.message);
  }
});

function handleFileUpload() {
  const fileInput = document.getElementById('expenseFile');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();

  // CSV support only
  if (file.name.endsWith('.csv')) {
    reader.onload = function (e) {
      const csv = e.target.result;

      const parsed = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
      });

      parsed.data.forEach(async (row) => {
        try {
          // Push row as JSON to Firestore
          await db.collection("expenses").add({
            amount: Number(row.amount),
            category: row.category,
            note: row.note || "",
            timestamp: new Date().toISOString()
          });
        } catch (err) {
          console.error("Upload failed for row:", row, err);
        }
      });

      alert("CSV uploaded successfully!");
    };

    reader.readAsText(file);
  } else {
    alert("Only CSV files are supported right now.");
  }
}
