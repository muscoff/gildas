<?php

include_once $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/models/Users.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize users
$users = new Users($db);

if(isset($_POST['password']) & !empty($_POST['password'])){
    $users->username = sanitize_text($_POST['username']);
    $users->password = sanitize_text($_POST['password']);

    if($users->updatePassword()){
        echo json_encode(array('msg'=>'Password updated'));
    }else{
        echo json_encode(array('msg'=>'Failed to update password'));
    }
}