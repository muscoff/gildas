<?php 
session_start();
session_regenerate_id(true);
include $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php"; 

if(isset($_SESSION['admin'])){
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?=url;?>css/css/all.css">
    <link rel="stylesheet" href="<?=url;?>css/style.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/users.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/sidemenu.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/nav.css">
    <title>Admin - Sales</title>
</head>
<body>
    <?php include_once $_SERVER['DOCUMENT_ROOT']."/gildas/admin/includes/topNav.php";?>

    <div class="width-10 height-10"></div>

    <div class="width-30 width-lx-50 width-l-60 width-m-80 width-s-90 min-height-30 menu-options padding-all-10">
        <div class="optionTitle uppercase">
            <div class="blue-text"><i class="fas fa-cogs"></i> Create Users</div>
        </div>
        <div class="width-100 min-height-5 flex-column justify-content-center align-items-center center-text">
            <div id="response" class="font-allerRg padding-all-10 green-text"></div>
        </div>

        <div class="padding-all-10">
            <div id="msgHolder" class="font-allerRg blue-text"></div> <br />
            <form onsubmit="onSubmit(event)">
                <div><input type="text" placeholder="Email" name="email" id="email" /></div>
                <div id="message" class="font-12 red-text"></div><br />

                <div><input type="submit" value="Create User" disabled /></div><br />
            </form>
        </div>
       
    </div>

    <div class="width-100 height-20"></div>        

    <?php include $_SERVER['DOCUMENT_ROOT']."/gildas/admin/includes/sidemenu.php"; ?>
    
    <script src="<?=url;?>js/admin/sidemenu.js"></script>
    <script src="<?=url;?>js/admin/users.js"></script>
</body>
</html>

<?php
}else{
    $link = url.'admin/';
    header('Location: '.$link);
}
?>