<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: Application/json');

include_once $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/models/Product.php";

$barcode = isset($_GET['barcode']) ? $_GET['barcode'] : die();

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize Product
$product = new Product($db);

$product->barcode = sanitize_text($barcode);

$search = $product->search();

echo json_encode($search);