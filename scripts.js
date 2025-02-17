document.getElementById('intro-video').addEventListener('loadedmetadata', function () {
    this.currentTime = this.duration - 5;
});

document.getElementById('intro-video').addEventListener('ended', function () {
    document.getElementById('intro-video-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

document.querySelector('#top-right-links a[href="login.html"]').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-popup').style.display = 'block';
});

document.getElementById('login-popup-close').addEventListener('click', function () {
    document.getElementById('login-popup').style.display = 'none';
});

document.getElementById('submit-button').addEventListener('mouseover', function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;

    if (!name || !email || !number) {
        this.style.position = 'absolute';
        this.style.top = Math.random() * 300 + 'px';
        this.style.left = Math.random() * 300 + 'px';
    }
});

document.getElementById('submit-button').addEventListener('click', async function (e) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;

    if (name && email && number) {
        try {
            const response = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, number })
            });

            if (response.ok) {
                alert('Form submitted!');
                document.getElementById('login-popup').style.display = 'none';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        e.preventDefault();
        document.getElementById('login-popup').style.display = 'none';
        document.body.innerHTML = '';
        document.body.style.backgroundColor = 'white';
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
        document.body.style.height = '100vh';
        const message = 'You  are  not entered  with  valid  information';
        let index = 0;
        const interval = setInterval(() => {
            if (index < message.length) {
                const span = document.createElement('span');
                span.textContent = message[index] + ' ';
                span.style.color = 'red';
                span.style.fontSize = '48px';
                span.style.display = 'inline-block';
                span.style.transition = 'opacity 1s';
                document.body.appendChild(span);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    document.body.innerHTML = '';
                }, 2000);
            }
        }, 100);
    }
});
