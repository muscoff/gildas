<?php

include_once $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/models/Users.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";

$email = isset($_GET['email']) ? $_GET['email'] : die();
$email = sanitize_text($email);

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$users = new Users($db);
$users->username = $email;

if($users->findEmail()){
    echo json_encode(array('valid'=>true));
}else{
    echo json_encode(array('valid'=>false));
}