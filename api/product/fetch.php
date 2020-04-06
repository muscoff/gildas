<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: Application/json');

include $_SERVER['DOCUMENT_ROOT'].'/gildas/db/conn.php';
include $_SERVER['DOCUMENT_ROOT'].'/gildas/models/Product.php';

$page = isset($_GET['page']) ? $_GET['page'] : 1;

//db initialize
$DBH = new DB();
$db = $DBH->connect();

$arr = array();

// initialize Product
$product = new Product($db);

$data = $product->fetch();

// get data length
$count = count($data);

// item quantity
$start = $page == 1 ? 0 : $page * 20 -20;
$start = ($start>$count)?$count:$start;
$final = ($start == 0 | $start == 1) ? ($page *20) : ($page + 1) * 20 - 20;
$final = ($final>$count) ? $count : $final;

if(!empty($data)){
    for($start; $start<$final; $start++){
        array_push($arr, $data[$start]);
    }
}

echo json_encode($arr);