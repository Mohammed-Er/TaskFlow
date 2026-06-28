const API_URL = "http://localhost:3000/api/users/register";
const form = document.getElementById("sign-form");

const submitBtn = form.querySelector('button[type="submit"]'); 

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Signing up...";

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
      alert("Registration successful! Please log in.");
      window.location.href = "login.html"; 
    } else {
      alert(data.message || "An error occurred while signing up. Please try again.");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    alert("Server unreachable. Please try again later.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign up";
  }
});