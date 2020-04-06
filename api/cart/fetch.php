<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: Application/json');

include_once $_SERVER['DOCUMENT_ROOT']."/gildas/libraries/lib.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/db/conn.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gildas/models/Cart.php";

// Beginning of Pagination

$pagination = array();

$page = isset($_GET['page']) ? $_GET['page'] : 1;

// End of Pagination definitions

// initialize db
$DBH = new DB();
$db = $DBH->connect();

$array = array();

$yearContent = array();
$monthContent = array();

// initialize cart
$cart = new Cart($db);

$data = $cart->fetch();
$content = $data;

if(!empty($data)){
    foreach($data as $yr){
        $yearItem = explode(' ', $yr['created_at']);
        $yearItem = $yearItem[0];

        // explode yearItem
        $explodeYearItem = explode('-', $yearItem);
        $year = $explodeYearItem[0];

        $month = $explodeYearItem[1];
        array_push($yearContent, $year);
        array_push($monthContent, $month);
    }
}

$yearContent = array_unique($yearContent); // make the array unique by removing duplicates
sort($yearContent); // sort the array in ascending order

$monthContent = array_unique($monthContent); // make the array unique by removing duplicates
sort($monthContent); // sort the array in ascending order

function returnMonth($variable){
    $month = null;
    if((int)$variable == 1){
        $month = 'Jan';
    }elseif((int)$variable == 2){
        $month = 'Feb';
    }elseif((int)$variable == 3){
        $month = 'Mar';
    }elseif((int)$variable == 4){
        $month = 'Apr';
    }elseif((int)$variable == 5){
        $month = 'May';
    }elseif((int)$variable == 6){
        $month = 'Jun';
    }elseif((int)$variable == 7){
        $month = 'Jul';
    }elseif((int)$variable == 8){
        $month = 'Aug';
    }elseif((int)$variable == 9){
        $month = 'Sep';
    }elseif((int)$variable == 10){
        $month = 'Oct';
    }elseif((int)$variable == 11){
        $month = 'Nov';
    }else{
        $month = 'Dec';
    }
    return $month;
}

foreach($yearContent as $theYear){
    $array[$theYear] = array();
    foreach($monthContent as $theMonth){
        $letMonth = returnMonth($theMonth);
        $array[$theYear][$letMonth] = array();
    }
}

if(!empty($content)){
    foreach($content as $key=> $item){
        $getYearContent = explode(' ', $item['created_at']);
        $getYearContent = $getYearContent[0];

        $getYear = explode('-', $getYearContent);
        $getResYear = $getYear[0];
        $getResMonth = $getYear[1];

        foreach($yearContent as $key => $newYear){

            if($newYear == $getResYear){
                $newLetMonth = returnMonth($getResMonth);
                array_push($array[$newYear][$newLetMonth], $item);
            }
        }
    }
}

if(isset($_GET['report'])){
    $count = count($yearContent);
    $reportYears = array();
    for($count; $count>0; $count--){
        array_push($reportYears, $yearContent[$count-1]);
    }

    $count = count($reportYears);
    // item quantity
    $start = $page == 1 ? 0 : $page * 20 -20;
    $start = ($start>$count)?$count:$start;
    $final = ($start == 0 | $start == 1) ? ($page *20) : ($page + 1) * 20 - 20;
    $final = ($final>$count) ? $count : $final;

    // Pagination setup
    for($start; $start<$final; $start++){
        array_push($pagination, $reportYears[$start]);
    }
    echo json_encode($pagination);
}
elseif(isset($_GET['year'])){
    $requestYear = sanitize_text($_GET['year']);
    
    $AllYear = array();
    $actualYear = null;
    $truth = false;

    foreach($array as $key => $idYear){
        if($requestYear == $key){
            $actualYear = $idYear;
            $truth = true;
        }
    }

    if($truth){
        foreach($actualYear as $key => $allMonths){
            $totalCount = count($allMonths);
            array_push($AllYear,array('month'=>$key, 'report'=>$totalCount));
        }

        $count = count($AllYear);
        // item quantity
        $start = $page == 1 ? 0 : $page * 20 -20;
        $start = ($start>$count)?$count:$start;
        $final = ($start == 0 | $start == 1) ? ($page *20) : ($page + 1) * 20 - 20;
        $final = ($final>$count) ? $count : $final;
        
        // Pagination setup
        for($start; $start<$final; $start++){
            array_push($pagination, $AllYear[$start]);
        }
        echo json_encode($pagination);
    }else{
        echo json_encode(array());
    }
}
elseif (isset($_GET['yr']) & isset($_GET['mon'])) {
    $yr = sanitize_text($_GET['yr']);
    $mon = sanitize_text($_GET['mon']);

    $getContent = array();
    $contentValue = null;
    $monValue = null;
    $truth = false;

    foreach ($array as $key => $valueYear) {
        if($key == $yr){
            $contentValue = $valueYear;
            $truth = true;
        }
    }

    if($truth){
        foreach ($contentValue as $key => $cMonth) {
            if($key == $mon){
                $monValue = $cMonth;
            }
        }

        if(is_null($monValue)){
            echo json_encode(array());
        }else{
            $count = count($monValue);
            // item quantity
            $start = $page == 1 ? 0 : $page * 20 -20;
            $start = ($start>$count)?$count:$start;
            $final = ($start == 0 | $start == 1) ? ($page *20) : ($page + 1) * 20 - 20;
            $final = ($final>$count) ? $count : $final;

            // Pagination setup
            for($start; $start<$final; $start++){
                array_push($pagination, $monValue[$start]);
            }
            echo json_encode($pagination);
        }
    }else{
        echo json_encode(array());
    }
}

//echo json_encode($array);