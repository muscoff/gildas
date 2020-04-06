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

if(isset($_POST['id'])){
    $product->id = sanitize_text($_POST['id']);
    
    $oldImage = $product->imageName();

    $image = !empty($_FILES['img']) ? $_FILES['img'] : null;
    $db = url.'images/products';
    $server = $_SERVER['DOCUMENT_ROOT'].'/gildas/images/products';
    
    if(is_null($image)){
        echo_json(array('msg'=>'Image size should be 2MB or less.'));
    }
    else{
        $img = single_image($image, $db, $server);
        $product->img = $img['db_location'];

        $truth = move_file($img['tmp'], $img['server_location']);
        $truth = $truth[0];

        if($truth){
            if($product->updateImage()){
                $setImageToRemove = $_SERVER['DOCUMENT_ROOT']."/gildas/images/products/".$oldImage;
                if(!empty($oldImage)){
                    unlink($setImageToRemove);
                    echo_json(array('msg'=>'Successful upload. Old image deleted and record updated!'));
                }else{
                    echo_json(array('msg'=>'Successful upload. Record updated!'));
                }
            }else{
                unlink($img['server_location']);
                echo_json(array('msg'=>'Failed to update record'));
            }
        }else{
            echo_json(array('msg'=>'Upload failed. Try again'));
        }
    }
}