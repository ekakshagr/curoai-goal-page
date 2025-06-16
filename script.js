const form = document.getElementById('goalForm');
const goalInput = document.getElementById('goal');

const responseMsg = document.getElementById('responseMessage');
// Set today's date as minimum for deadline input
const deadlineInput = document.getElementById('deadline');
const today = new Date().toISOString().split("T")[0];
deadlineInput.setAttribute("min", today);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const goalText = goalInput.value.trim();
  const deadline = deadlineInput.value;

  const goalData = {
    goal: goalText,
    deadline: deadline,
  };

  try {
    const response = await fetch("https://curoai.free.beeceptor.com/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalData),
    });

    if (response.ok) {
      responseMsg.textContent = "✅ Goal submitted successfully!";
      responseMsg.style.color = "lightgreen";
      form.reset();
    } else {
      responseMsg.textContent = "❌ Failed to submit goal.";
      responseMsg.style.color = "red";
    }
  } catch (error) {
    responseMsg.textContent = "⚠️ Network error. Try again later.";
    responseMsg.style.color = "orange";
    console.error(error);
  }
});
