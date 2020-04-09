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
    <link rel="stylesheet" href="<?=url;?>css/admin/sales.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/sidemenu.css">
    <link rel="stylesheet" href="<?=url;?>css/admin/nav.css">
    <title>Admin - Sales</title>
</head>
<body>
    <?php include_once $_SERVER['DOCUMENT_ROOT']."/gildas/admin/includes/topNav.php";?>

    <div class="width-10 height-10"></div>

    <!-- menu-options -->
    <div class="width-80 white-bg menu-options width-lx-90 width-l-60 width-m-80 width-s-100 min-height-30 padding-all-10">
        <div class="optionTitle uppercase">
            <div style="color:rgb(94, 128, 160);"><i class="fas fa-coins"></i> Accounting - Sales Point</div>
        </div>
        <div class="width-100 height-5"></div>

        <div class="row">
            <div class="col-6 col-l-12 col-m-12 col-s-12 padding-all-10">
                <div class="width-100 min-height-50 shadow1">
                    <div class="heading">Please key in the barcode and quantity to add product to cart</div> <br />
                    
                    <div class="width-90 margin-auto">
                        <div><input type="text" id="barcode" placeholder="Input barcode" /></div><br />
                        <div><input type="number" id="qty" placeholder="Type quantity" disabled /></div>
                        <div id="msg" class="display-none font-12 red-text font-allerRg"></div><br />
                        <div><button id="pay" disabled><i class="fas fa-cart-plus"></i> Add Item</button></div> <br />

                        <div class="total">
                            <div id="move">
                                <div class="flex-row">
                                    <div class="col-3 font-allerRg">Total Amount</div>
                                    <div class="col-9"><input type="text" id="total" disabled /></div>
                                </div>
                            </div>
                        </div> <br />

                        <div id="grab" class="width-100 green-text">
                            <div class="row">
                                <div class="col-6 padding-all-5"><input type="text" id="accept-money" placeholder="Amount Received" /></div>
                                <div class="col-6 padding-all-5"><input type="text" id="balance" placeholder="Change" disabled /></div>
                                <div class="col-12 padding-all-5 font-12 font-allerRg" id="notice">Amount must be a number</div>
                            </div> <br />
                            <button id="accept-payment" disabled><i class="fas fa-money-check-alt"></i> Accept Payment</button>
                        </div> <br />
                        <!-- <div class="width-100 height-5"></div> -->
                    </div>
                </div>
            </div>
            <div class="col-6 col-l-12 col-m-12 col-s-12 padding-all-10">
                <div class="width-100 min-height-30 shadow2">
                    <div class="cartHeading">cart items</div>
                    <div class="width-100 height-3"></div>
                    
                    <div class="row" id="row">
                        
                    </div>
                </div>
            </div>
        </div>
       
    </div>

    <div class="width-100 height-20"></div>        

    <?php include_once $_SERVER['DOCUMENT_ROOT']."/gildas/admin/includes/sidemenu.php"; ?>    

    <script>
        var admin_status = "<?=$_SESSION['admin'];?>";
    </script>
    <script src="<?=url;?>js/admin/sidemenu.js"></script>
    <script src="<?=url;?>js/admin/sales.js"></script>
</body>
</html>

<?php
}else{
    $link = url.'admin/';
    header('Location: '.$link);
}
?>