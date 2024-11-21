document.addEventListener('DOMContentLoaded', function() {
    const application_number = localStorage.getItem('application_number');
    document.getElementById('application_number').innerText = `Welcome, ${application_number}`;

    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('application_number');
        window.location.href = 'login.html';
    });

    document.getElementById('rankForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const hallTicket = document.getElementById('hallTicket').value;
        const secretKey = document.getElementById('secretKey').value;
        const degree = document.getElementById('degree').value;
        const branch = document.getElementById('branch').value;

        fetch('/getRank', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hallTicket, secretKey, degree, branch })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('rankResult').innerText = `Your rank is: ${data.rank}`;
        });
    });
});
