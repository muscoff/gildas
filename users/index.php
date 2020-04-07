<?php
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php";

$msg = isset($_GET['msg']) ? $_GET['msg'] : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/css/all.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/users/index.css">
    <title>User - Login</title>
</head>
<body>
    <div class="width-100 height-100 flex-column align-items-center">
        <div class="width-30 width-lx-60 width-l-70 width-m-90 width-s-100 loginForm">
            
            <div class="width-90 margin-auto">
                <div class="admin-title">User Login</div>
                <form action="<?=url;?>api/users/verify.php" method="POST">
                    <input type="text" placeholder="Username" name="username" /><br /> <br />
                    <input type="password" placeholder="Password" name="password" /><br />
                    <div class="font-allerRg font-12 green-text"><?=$msg?></div><br />
                    <button type="submit">Login <i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>