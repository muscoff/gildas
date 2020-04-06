<?php
header('Content-type: Application/json');

include $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/models/Product.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$product = new Product($db);

if(isset($_POST['id'])){
    $product->id = sanitize_text($_POST['id']);
    $product->title = sanitize_text($_POST['title']);
    $product->price = sanitize_text($_POST['price']);
    $product->qty = sanitize_text($_POST['qty']);
    $product->barcode = sanitize_text($_POST['barcode']);

    if($product->edit()){
        echo_json(array('msg'=>'Record updated'));
    }else{
        echo_json(array('msg'=>'Failed to update record'));
    }
}