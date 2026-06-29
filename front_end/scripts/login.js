const API_URL = "http://localhost:3000/api/users/login";
const form = document.getElementById("sign-form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in...";

  const formData = new FormData(form);
  const dataPayload = Object.fromEntries(formData);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPayload),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Store the token in localStorage
      window.location.href = "/minimalist-todo-api/front_end/index.html"; // Redirect to dashboard or another page
    } else {
      alert(
        data.message || "An error occurred while logging in. Please try again.",
      );
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Server unreachable. Please try again later.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Login";
  }
});
