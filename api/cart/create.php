<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers:Content-type');
//header('Content-type: Application/json');

include_once $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/models/Cart.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize cart
$cart = new Cart($db);

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

$cart->info = json_encode($json_obj->body);
$cart->role = $json_obj->role;
$cart->paid = $json_obj->paid;

if($cart->create()){
    echo json_encode(array('msg'=>'Transaction completed. Thank you', 'truth'=>true));
}else{
    echo json_encode(array('msg'=>'Failed transaction. Try again', 'truth'=>false));
}