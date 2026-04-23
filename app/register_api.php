<?php
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

$username = $input['username'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if (strlen($username) < 3 || strlen($username) > 16) {
    echo json_encode(['success' => false, 'message' => 'Username must be between 3 and 16 characters']);
    exit();
}
if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $db->prepare("INSERT INTO users (username, password_hash, email) VALUES (:username, :hash, :email)");
    $stmt->bindValue(':username', $username, SQLITE3_TEXT);
    $stmt->bindValue(':hash', $password_hash, SQLITE3_TEXT);
    $stmt->bindValue(':email', $email, SQLITE3_TEXT);
    
    if ($stmt->execute()) {
        $user_id = $db->lastInsertRowID();
        echo json_encode([
            'success' => true, 
            'message' => 'Registration complete!',
            'user_id' => $user_id,
            'username' => $username,
            'email' => $email
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration error']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
}
?>