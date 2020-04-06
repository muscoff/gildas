<?php

include $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/models/Admin.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$admin = new Admin($db);

$data = $admin->fetch();

if($data){
    echo json_encode(array('valid'=>true));
}else{
    echo json_encode(array('valid'=>false));
}