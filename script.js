document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const appNum = document.getElementById('application_number').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ application_number: appNum, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('username', data.username);
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('message').innerText = data.message;
        }
    });
});
