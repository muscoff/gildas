<?php
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php";

$valid = json_decode(file_get_contents(url.'api/admin/fetch.php'),true);
$valid = $valid['valid'];

$msg = isset($_GET['msg']) ? $_GET['msg'] : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?=url;?>css/css/all.css">
    <link rel="stylesheet" href="<?=url;?>css/style.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/index.css">
    <title>Admin - Point of Sale</title>
</head>
<body>
    <div class="width-100 height-100 flex-column align-items-center">
        <div class="width-30 loginForm">
            
            <div class="width-90 margin-auto">
                <div class="admin-title">Admin Login</div>
                <form method="POST" action="<?=url;?>api/admin/<?=(($valid)?'verify.php':'create.php');?>">
                    <input type="text" placeholder="Username" name="username" /><br /> <br />
                    <input type="password" placeholder="Password" name="password" /><br />
                    <div class="font-allerRg font-12 green-text"><?=$msg?></div><br />
                    <button type="submit">Login <i class="fas fa-paper-plane white-text"></i></button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>