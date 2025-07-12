let currentPin = '';

function appendDigit(digit) {
    if (currentPin.length < 4) {
        currentPin += digit;
        updatePinDisplay();
    }
}

function clearPin() {
    currentPin = '';
    updatePinDisplay();
    document.getElementById('status').textContent = 'Enter 4-digit PIN';
    document.getElementById('status').style.color = '#666';
}

function updatePinDisplay() {
    const display = currentPin.padEnd(4, '_');
    document.getElementById('pinDisplay').textContent = display.split('').join(' ');
}

async function submitPin() {
    if (currentPin.length !== 4) {
        document.getElementById('status').textContent = 'PIN must be 4 digits';
        document.getElementById('status').style.color = 'red';
        return;
    }

    const response = await fetch('/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: currentPin })
    });

    const result = await response.json();

    if (result.verified) {
        document.getElementById('status').textContent = '✅ Access Granted!';
        document.getElementById('status').style.color = 'green';
        setTimeout(() => {
            window.location.href = result.redirectUrl;
        }, 1000);
    } else {
        document.getElementById('status').textContent = '❌ Invalid PIN';
        document.getElementById('status').style.color = 'red';
        setTimeout(clearPin, 1000);
    }
}
