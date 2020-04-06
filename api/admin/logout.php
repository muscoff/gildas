<?php
session_start();
session_unset();
session_destroy();

include_once $_SERVER['DOCUMENT_ROOT']."/gildas/def/def.php";

$link = url.'admin/';
header('Location: '.$link);