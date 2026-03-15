<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($_FILES['image']['name']);

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            $fileUrl = 'https://qr-nexus.za.com/user/' . $uploadFile;
            echo $fileUrl;
            exit;
        } else {
            http_response_code(500);
            echo 'Failed to upload file.';
            exit;
        }
    } else {
        http_response_code(400);
        echo 'No file uploaded or upload error.';
        exit;
    }
} else {
    http_response_code(405);
    echo 'Method not allowed.';
    exit;
}
?>
