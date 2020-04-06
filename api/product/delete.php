<?php
header('Content-type: Application/json');

include $_SERVER['DOCUMENT_ROOT'].'/gildas/libraries/lib.php';
include $_SERVER['DOCUMENT_ROOT'].'/gildas/db/conn.php';
include $_SERVER['DOCUMENT_ROOT'].'/gildas/models/Product.php';

$id = isset($_GET['id']) ? $_GET['id'] : die();

//db initialize
$DBH = new DB();
$db = $DBH->connect();

// initialize Product
$product = new Product($db);
$product->id = sanitize_text($id);

$img = $product->imageName();

if($product->delete()){
    $image = $_SERVER['DOCUMENT_ROOT']."/gildas/images/products/".$img;
    unlink($image);
    echo json_encode(array('msg'=>'Record deleted'));
}else{
    echo json_encode(array('msg'=>'Operation failed'));
}