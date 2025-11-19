<?php
header('Content-Type: application/json');

// Simulate processing delay
sleep(1);

// Get form data
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$age = $_POST['age'] ?? '';
$gender = $_POST['gender'] ?? [];
$address = $_POST['address'] ?? '';
$country = $_POST['country'] ?? '';
$state = $_POST['state'] ?? '';
$city = $_POST['city'] ?? '';
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';
$terms = isset($_POST['terms']) ? true : false;

// Basic server-side validation
$errors = [];

if (empty($firstName)) $errors[] = 'First name is required';
if (empty($lastName)) $errors[] = 'Last name is required';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (empty($phone)) $errors[] = 'Phone number is required';
if (empty($gender)) $errors[] = 'Gender is required';
if (!$terms) $errors[] = 'You must agree to terms and conditions';
if ($password !== $confirmPassword) $errors[] = 'Passwords do not match';

// Simulate occasional server error for testing
if (rand(1, 10) === 1) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error occurred']);
    exit;
}

if (empty($errors)) {
    // Simulate successful registration
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'data' => [
            'name' => $firstName . ' ' . $lastName,
            'email' => $email
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
}
?>
