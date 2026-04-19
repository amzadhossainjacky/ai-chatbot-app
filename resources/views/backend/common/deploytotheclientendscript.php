<?php

?>

<!DOCTYPE html>
<html lang="en">

<head>
8
</head>

<body>
    <h2>chat icon</h2>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- <script src="http://localhost:8000/js/app.js"></script> -->
    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/laravel-echo@1.11.2/dist/echo.iife.js"></script>

    <script>
        // document.addEventListener('DOMContentLoaded', function() {
            var Echo = new Echo({
                broadcaster: 'pusher',
                key: 'ABCDEFG',
                cluster: 'mt1',
                wsHost: 'drcchat.ihelpbd.com',
                wsPort: 6001,
                wssPort: 6001,
                forceTLS: false,
                disableStats: true,
                enabledTransports: ['ws', 'wss'],
            });
        //});
    </script>
    <script src="http://drcchat.ihelpbd.com/storage/attachments/cdn/js/chatbot_sdk.js"></script>
</body>

</html>