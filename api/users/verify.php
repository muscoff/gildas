<?php
session_start();
session_regenerate_id(true);

include $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/models/Users.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$users = new Users($db);

$url = from_another_url();
$url = explode('?', $url);
$url = $url[0];

if(isset($_POST['username']) & !empty($_POST['password'])){
    $users->username = sanitize_text($_POST['username']);
    $users->password = sanitize_text($_POST['password']);

    if($users->verify_pass()){
        $_SESSION['user'] = $users->username;
        $url = url.'users/dashboard.php';
        redirect($url);
    }else{
        $msg = 'Invalid username or password';
        redirect_msg($url, $msg);
    }
}