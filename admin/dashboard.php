<?php 
session_start();
session_regenerate_id(true);
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php"; 

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
    <link rel="stylesheet" href="<?=url;?>css/admin/dashboard.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/nav.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/sidemenu.css">
    <title>Admin - Point of Sale</title>
</head>
<body>
    <?php include_once $_SERVER['DOCUMENT_ROOT']."/gildas/admin/includes/topNav.php";?>

    <div class="width-10 height-10"></div>

    <div class="width-80 min-height-30 menu-options padding-all-10">
        <div class="optionTitle uppercase">Menu options</div>
        <div class="width-100 height-5"></div>
        
        <div class="row">
            <div class="col-3 col-l-6 col-m-6 col-s-12 padding-all-10">
                <a href="<?=url;?>admin/stock.php">
                    <div class="width-100 height-10 relative overflow-hidden list-item">
                        <div class="click-btn"></div>
                        <div class="absolute"><i class="fas fa-cogs"></i> Stock Mananger</div>
                    </div>
                </a>
            </div>
            <div class="col-3 col-l-6 col-m-6 col-s-12 padding-all-10">
                <a href="<?=url;?>admin/product_inquiry.php">
                    <div class="width-100 height-10 relative overflow-hidden list-item">
                        <div class="click-btn"></div>
                        <div class="absolute"><i class="fas fa-cog"></i> Product Inquiry</div>
                    </div>
                </a>
            </div>
            <div class="col-3 col-l-6 col-m-6 col-s-12 padding-all-10">
                <a href="<?=url;?>admin/sales.php">
                    <div class="width-100 height-10 relative overflow-hidden list-item">
                        <div class="click-btn"></div>
                        <div class="absolute"><i class="fas fa-coins"></i> Accounting</div>
                    </div>
                </a>
            </div>
            <div class="col-3 col-l-6 col-m-6 col-s-12 padding-all-10">
                <a href="<?=url;?>admin/report.php">
                    <div class="width-100 height-10 relative overflow-hidden list-item">
                        <div class="click-btn"></div>
                        <div class="absolute"><i class="fas fa-clipboard-list"></i> Report</div>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <?php include_once $_SERVER['DOCUMENT_ROOT']."/gildas/admin/includes/sidemenu.php"; ?>

    <script src="<?=url;?>js/admin/sidemenu.js"></script>
</body>
</html>

<?php
}else{
    $link = url.'admin/';
    header('Location: '.$link);
}
?>