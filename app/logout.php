<?php
session_start();
session_destroy();
?>
<script>
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
</script>