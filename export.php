<?php
// Export functionality

// Define the files that can be exported
$allowedFiles = [
    'index.html',
    'css/styles.css',
    'js/script.js',
    'send_message.php',
    'export.php'
];

// Get the requested file
$requestedFile = isset($_GET['file']) ? $_GET['file'] : '';

// Create a zip file for 'all' option
if ($requestedFile === 'all') {
    // Create temporary zip file
    $zipFilename = 'portfolio_files.zip';
    $zipPath = tempnam(sys_get_temp_dir(), 'zip');
    
    $zip = new ZipArchive();
    if ($zip->open($zipPath, ZipArchive::CREATE) !== TRUE) {
        die("Cannot create zip file");
    }
    
    // Add all allowed files to the zip
    foreach ($allowedFiles as $file) {
        if (file_exists($file)) {
            $zip->addFile($file, $file);
        }
    }
    
    // Add assets folder if it exists
    if (is_dir('assets')) {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator('assets', RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $item) {
            $relativePath = 'assets/' . $iterator->getSubPathName();
            if (is_file($item)) {
                $zip->addFile($item, $relativePath);
            } else if (is_dir($item)) {
                $zip->addEmptyDir($relativePath);
            }
        }
    }
    
    $zip->close();
    
    // Send the zip file to the browser
    header('Content-Type: application/zip');
    header('Content-Disposition: attachment; filename="' . $zipFilename . '"');
    header('Content-Length: ' . filesize($zipPath));
    header('Pragma: no-cache');
    
    readfile($zipPath);
    unlink($zipPath); // Delete the temporary file
    exit;
}

// Handle individual file downloads
elseif (in_array($requestedFile, $allowedFiles) && file_exists($requestedFile)) {
    $fileInfo = pathinfo($requestedFile);
    $filename = $fileInfo['basename'];
    
    // Set appropriate content type based on file extension
    switch ($fileInfo['extension']) {
        case 'html':
            $contentType = 'text/html';
            break;
        case 'css':
            $contentType = 'text/css';
            break;
        case 'js':
            $contentType = 'application/javascript';
            break;
        case 'php':
            $contentType = 'application/octet-stream'; // Force download for PHP files
            break;
        default:
            $contentType = 'application/octet-stream';
    }
    
    header('Content-Type: ' . $contentType);
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Content-Length: ' . filesize($requestedFile));
    header('Pragma: no-cache');
    
    readfile($requestedFile);
    exit;
}
