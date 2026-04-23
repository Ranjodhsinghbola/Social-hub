<?php
session_start();
header('Content-Type: application/json');

$db = new SQLite3('users.db');

$db->exec("CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)");

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

$stmt = $db->prepare("SELECT user_id, username, email, password_hash, created_at FROM users WHERE email = :email");
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$result = $stmt->execute();
$user = $result->fetchArray(SQLITE3_ASSOC);

if ($user && password_verify($password, $user['password_hash'])) {
    $_SESSION['user_id'] = $user['user_id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    
    echo json_encode([
        'success' => true,
        'user_id' => $user['user_id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'created_at' => $user['created_at']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Email or password incorrect']);
}
?>