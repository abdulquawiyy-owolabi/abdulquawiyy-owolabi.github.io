<?php
// send_message.php

// Set headers for JSON response
header('Content-Type: application/json');

// Initialize response array
$response = [
    'status' => 'error',
    'message' => 'An unknown error occurred'
];

// Check if the form was submitted using POST method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get form data and sanitize inputs
    $name = isset($_POST['name']) ? filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING) : '';
    $message = isset($_POST['message']) ? filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING) : '';
    
    // Validate data
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response['message'] = 'All fields are required.';
        echo json_encode($response);
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Please enter a valid email address.';
        echo json_encode($response);
        exit;
    }
    
    // Set email recipient
    $to = 'oaabdulquawiyy@gmail.com'; // Recipient email from the HTML
    
    // Set email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Build email content
    $email_content = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 15px; border-bottom: 1px solid #ddd; }
            .content { padding: 20px 0; }
            .footer { font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 15px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Subject:</strong> $subject</p>
                <p><strong>Message:</strong></p>
                <p>" . nl2br($message) . "</p>
            </div>
            <div class='footer'>
                <p>This email was sent from your website contact form on " . date('F j, Y, g:i a') . "</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Send email
    if (mail($to, "Contact Form: $subject", $email_content, $headers)) {
        $response = [
            'status' => 'success',
            'message' => 'Your message has been sent. Thank you!'
        ];
    } else {
        $response['message'] = 'Unable to send message. Please try again.';
        
        // For debugging purposes (in development environment only)
        // $response['debug'] = error_get_last();
    }
}

// Return JSON response
echo json_encode($response);
exit;
