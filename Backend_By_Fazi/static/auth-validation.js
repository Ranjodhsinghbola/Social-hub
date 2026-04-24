/**
 * auth-validation.js
 * Gestisce la validazione dei form di Login e Sign-in e l'invio dei dati al backend Python.
 */

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.querySelector('.auth-form');
    
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 1. Raccolta dei dati dal form
            const formData = new FormData(authForm);
            const data = {};
            
            // Estraiamo i valori in base agli ID degli input
            const fullnameInput = document.getElementById('fullname');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            if (fullnameInput) data.fullname = fullnameInput.value.trim();
            if (emailInput) data.email = emailInput.value.trim();
            if (passwordInput) data.password = passwordInput.value;

            // 2. Controlli di Validazione (Frontend)
            if (!validateForm(data)) return;

            console.log("Dati validati, invio in corso...", data);

            // 3. Invio alla funzione Python (Simulazione chiamata API)
            try {
                // In un ambiente reale, l'URL sarebbe qualcosa come 'http://localhost:5000/api/register'
                // Usiamo un blocco commentato per mostrare come sarebbe la fetch reale
                /*
                const response = await fetch('http://tuo-backend-python.com/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                */

                // Simulazione di successo per la demo
                showSuccess("Dati inviati correttamente al backend Python!");
                
                // Reindirizzamento dopo un breve delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);

            } catch (error) {
                showError("Errore durante l'invio dei dati: " + error.message);
            }
        });
    }

    /**
     * Funzione di validazione principale
     */
    function validateForm(data) {
        // Controllo Nome (se presente nel form di registrazione)
        if (data.hasOwnProperty('fullname') && data.fullname.length < 3) {
            showError("Il nome completo deve avere almeno 3 caratteri.");
            return false;
        }

        // Controllo Email (Regex standard)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError("Inserisci un indirizzo email valido.");
            return false;
        }

        // Controllo Password (minimo 6 caratteri per semplicità)
        if (data.password.length < 6) {
            showError("La password deve contenere almeno 6 caratteri.");
            return false;
        }

        return true;
    }

    /**
     * Gestione feedback visivo (Errori)
     */
    function showError(message) {
        // Rimuoviamo eventuali messaggi precedenti
        removeAlerts();
        
        const alert = document.createElement('div');
        alert.className = 'auth-alert error';
        alert.style.cssText = "background: #ff4444; color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px; font-size: 0.85rem;";
        alert.innerText = message;
        
        authForm.prepend(alert);
    }

    /**
     * Gestione feedback visivo (Successo)
     */
    function showSuccess(message) {
        removeAlerts();
        const alert = document.createElement('div');
        alert.className = 'auth-alert success';
        alert.style.cssText = "background: #00c851; color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px; font-size: 0.85rem;";
        alert.innerText = message;
        
        authForm.prepend(alert);
    }

    function removeAlerts() {
        const existingAlerts = document.querySelectorAll('.auth-alert');
        existingAlerts.forEach(a => a.remove());
    }
});
