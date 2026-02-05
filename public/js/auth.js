document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const msg = document.getElementById('message');

    if (localStorage.getItem('token')) {
        window.location.href = '/admin'; // Redirect if already logged in
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('user', JSON.stringify(data));
                    window.location.href = '/admin';
                } else {
                    msg.textContent = data.message;
                    msg.style.color = '#ef4444';
                }
            } catch (error) {
                msg.textContent = "Connection error";
            }
        });
    }
});
