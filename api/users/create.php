<?php

include $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/models/Users.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$users = new Users($db);

if(isset($_POST['email']) & !empty($_POST['email'])){
    $users->username = sanitize_text($_POST['email']);
    $users->password = 'pass';

    if($users->create()){
        $msg = 'Account created';
        echo json_encode(array('msg'=>$msg, 'created'=>true));
    }else{
        $msg = 'Opeartion failed.. Account not created';
        echo json_encode(array('msg'=>$msg, 'created'=>false));
    }
}