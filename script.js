const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  form.querySelectorAll(".error").forEach(span => span.textContent = "");
  status.textContent = "";
  let isValid = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name) {
    form.name.nextElementSibling.textContent = "Name is required";
    isValid = false;
  }
  if (!email) {
    form.email.nextElementSibling.textContent = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    form.email.nextElementSibling.textContent = "Email is invalid";
    isValid = false;
  }
  if (!message) {
    form.message.nextElementSibling.textContent = "Message is required";
    isValid = false;
  }
  if (!isValid) return;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      status.textContent = "Message sent successfully!";
      form.reset();
    } else {
      status.textContent = "Something went wrong. Try again.";
    }
  } catch (err) {
    status.textContent = "Network error. Please try later.";
  }
});
