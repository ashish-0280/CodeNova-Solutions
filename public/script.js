console.log("Website loaded successfully");

function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
}
document.querySelector('form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const message = e.target.message.value;

  const res = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });

  const data = await res.json();
  alert(data.msg);
});
