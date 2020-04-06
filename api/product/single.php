<?php
header('Access-Control-Allow-Origin: *');
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

$single = $product->single();

echo json_encode($single);
