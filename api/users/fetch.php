<?php

include $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include $_SERVER['DOCUMENT_ROOT']."/gildas/models/Users.php";

// initialize db
$DBH = new DB();
$db = $DBH->connect();

// initialize product
$users = new Users($db);

$data = $users->fetch();

echo json_encode($data);