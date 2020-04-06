<?php 
session_start();
session_regenerate_id(true);

include_once $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php"; 

if(isset($_SESSION['user'])){
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?=url;?>css/css/all.css">
    <link rel="stylesheet" href="<?=url;?>css/style.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/sidemenu.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/nav.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/product.css">
    <title>Users - Sales</title>
</head>
<body>
    <!-- Top nav -->
    <?php include_once $_SERVER['DOCUMENT_ROOT']."/gildas/users/includes/topNav.php"; ?>

    <div class="width-10 height-10"></div>

    <div id="holder" class="width-40 width-lx-50 width-l-60 width-m-80 width-s-90 min-height-30 menu-options padding-all-10">
        <div class="optionTitle uppercase">
            <div class="blue-text"><i class="fas fa-cog"></i> Product Inquiry</div>
        </div>
        <div id="response" class="width-100 height-5 green-text padding-all-10 flex-column justify-content-center align-items-center center-text font-allerRg"></div>

        <div class="padding-all-10" id="table">
            
        </div>
       
        <div class="width-100 height-5"></div>
        <div id="arrow" class="width-100 height-10 flex-column justify-content-center align-items-center">
            <div class="center-text font-20">
                <span class="padding-right-10"><i class="fas fa-arrow-left red-text blue-hover padding-all-10" id="back"></i></span>
                <span class="padding-left-10"><i class="fas fa-arrow-right blue-text green-hover padding-all-10" id="forward"></i></span>
            </div>
        </div>
    </div>

    <div class="width-100 height-20"></div>        

    <?php include_once $_SERVER['DOCUMENT_ROOT']."/gildas/users/includes/sidemenu.php"; ?>    

    <script src="<?=url;?>js/users/sidemenu.js"></script>
    <script src="<?=url;?>js/users/product.js"></script>
</body>
</html>

<?php
}else{
    $link = url.'users/';
    header('Location: '.$link);
}
?>