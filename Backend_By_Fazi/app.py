from flask import Flask, request, jsonify, session, render_template, redirect
from werkzeug.security import generate_password_hash, check_password_hash
import re

# Importiamo i nostri moduli
import database
from blueprints.user import User

app = Flask(__name__)
app.secret_key = 'chiave_segreta_molto_sicura'

# Inizializza il database all'avvio
database.init_db()

user = User()

@app.route('/')
def mostra_index():    
    return render_template('index.html')

@app.route('/signin_page')
def show_signin():
    return render_template('signin.html')

@app.route('/login_page')
def show_login():
    return render_template('login.html')

@app.route('/make_post')
def make_post():
    return redirect('/')

@app.route('/api/register', methods=['POST'])
def register():
    return redirect('/')

@app.route('/api/login', methods=['POST'])
def login():    
    return redirect('/')
    
@app.route('/api/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    # Mantiene lo stesso comportamento JavaScript di logout.php
    return '''
    <script>
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    </script>
    '''

if __name__ == '__main__':
    app.run(debug=True)