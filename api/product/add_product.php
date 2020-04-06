<?php
//header('Content-type: Application/json');

include $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/models/Product.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$product = new Product($db);

if(isset($_POST)){
    $product->title = sanitize_text($_POST['title']);
    $product->price = sanitize_text($_POST['price']);
    $product->qty = sanitize_text($_POST['qty']);
    $product->barcode = sanitize_text($_POST['barcode']);

    $image = null;

    $img = !empty($_FILES['img']['name']) ? $_FILES['img'] : null;
    $server = $_SERVER['DOCUMENT_ROOT']."/gildas/images/products";
    $db = url."images/products";
    $image = single_image($img, $db, $server);

    if(is_null($img)){
        $product->img = null;

        if($product->create()){
            echo json_encode(array('msg'=>'New Product Added'));
        }else{
            echo json_encode(array('msg'=>'Insertion failed!'));
        }
    }else{
        $file_moved = move_file($image['tmp'], $image['server_location']);
        $truth = $file_moved[0];
        $product->img = $image['db_location'];

        if($truth){
            if($product->create()){
                echo json_encode(array('msg'=>'New Product Added'));
            }else{
                unlink($image['server_location']);
                echo json_encode(array('msg'=>'Insertion failed'));
            }
        }else{
            echo json_encode(array('msg'=>'failed to move file to server'));
        }
    }
}