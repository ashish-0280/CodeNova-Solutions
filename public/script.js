console.log("Website loaded successfully");

function toggleMenu() {
  const navItems = document.querySelector('.nav-items');
  navItems.classList.toggle('active');
}

const BASE_URL = "http://localhost:5000";

// Contact form submission
document.querySelector('form[action*="contact"], #contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const message = e.target.message.value;

  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    alert(data.msg || 'Message sent successfully');
  } catch (err) {
    console.error(err);
    alert('Failed to send message');
  }
});

// Login form submission
document.querySelector('#login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      window.location.href = "index.html";
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('Login error');
  }
});

// Signup form submission
document.querySelector('#signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword?.value;

  if (password !== confirmPassword) {
    return alert("Passwords do not match.");
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Signup successful!');
      window.location.href = "login.html";
    } else {
      alert(data.message || 'Signup failed');
    }
  } catch (err) {
    console.error(err);
    alert('Signup error');
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const logoutBtn = document.querySelector('.logout-btn');


  if (token) {
    loginBtn?.classList.add('hidden');
    signupBtn?.classList.add('hidden');
    logoutBtn.style.display = 'inline-block';

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert("Logged out successfully");
      window.location.href = "index.html";
    });
  } else {
    loginBtn?.classList.remove('hidden');
    signupBtn?.classList.remove('hidden');
    logoutBtn.style.display = 'none';
  }
});

// Modal content definitions
const modalContent = {
  automation: {
    title: "Automation",
    text: "Streamline operations with modern tools and custom workflows that save time and reduce human error.",
    link: "automation.html"
  },
  cybersecurity: {
    title: "Cybersecurity",
    text: "Secure your infrastructure with advanced tools, threat detection, and 24/7 monitoring services.",
    link: "cybersecurity.html"
  },
  analytics: {
    title: "Analytics",
    text: "Uncover trends and drive smarter decisions using modern data dashboards and visualizations.",
    link: "analytics.html"
  }
};

// Show modal on card click
document.querySelectorAll(".explore-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.getAttribute("data-modal");
    const content = modalContent[key];
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
      <h2>${content.title}</h2>
      <p>${content.text}</p>
      <a class="btn" href="${content.link}">Learn More</a>
    `;

    document.getElementById("modal").classList.remove("hidden");
  });
});

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});



