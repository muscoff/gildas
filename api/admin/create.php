<?php

include $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/models/Admin.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$admin = new Admin($db);

$url = from_another_url();
$url = explode('?', $url);
$url = $url[0];

if(isset($_POST['username']) & !empty($_POST['password'])){
    $admin->username = sanitize_text($_POST['username']);
    $admin->password = sanitize_text($_POST['password']);

    if($admin->create()){
        $msg = 'Account created';
        redirect_msg($url, $msg);
    }else{
        $msg = 'Opeartion failed.. Account not created';
        redirect_msg($url, $msg);
    }
}