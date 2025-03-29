<?php
// Set headers for JSON response
header('Content-Type: application/json');

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Basic validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required'
        ]);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email format'
        ]);
        exit;
    }
    
    // Email configuration - replace with your actual email
    $to = 'oaabdulquawiyy@gmail.com';
    $subject_line = "Portfolio Contact: $subject";
    
    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email body
    $email_body = "
    <html>
    <head>
        <title>New Contact Message</title>
    </head>
    <body>
        <h2>Contact Message from Your Portfolio</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br($message) . "</p>
    </body>
    </html>
    ";
    
    // Send email
    $mail_sent = @mail($to, $subject_line, $email_body, $headers);
    
    if ($mail_sent) {
        // Success response
        echo json_encode([
            'success' => true,
            'message' => 'Message sent successfully'
        ]);
    } else {
        // Error response
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send message. Please try again later.'
        ]);
    }
} else {
    // Not a POST request
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
