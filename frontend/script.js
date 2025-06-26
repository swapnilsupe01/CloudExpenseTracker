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
