<?php

class Cart{
    private $table = 'cart';
    private $DBH;
    public $id;
    public $info;
    public $role;
    public $paid;
    public $created_at;

    public function __construct($db){
        $this->DBH = $db;
    }

    public function fetch(){
        $query = "SELECT * FROM ".$this->table;

        $STH = $this->DBH->prepare($query);

        $STH->execute();

        $data = array();

        if($STH->rowCount()){
            while($row = $STH->fetch(PDO::FETCH_OBJ)){
                $item = array(
                    'id'=>$row->id,
                    'cart'=>json_decode($row->info, true),
                    'role'=>$row->role,
                    'paid'=>$row->paid,
                    'created_at'=>$row->created_at
                );
                array_push($data, $item);
            }
            return $data;
        }else{
            return null;
        }
    }

    public function fetch_user(){
        $query = "SELECT * FROM ".$this->table." WHERE `role`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->role]);

        $data = array();

        if($STH->rowCount()){
            while($row = $STH->fetch(PDO::FETCH_OBJ)){
                $item = array(
                    'id'=>$row->id,
                    'cart'=>json_decode($row->info, true),
                    'role'=>$row->role,
                    'paid'=>$row->paid,
                    'created_at'=>$row->created_at
                );
                array_push($data, $item);
            }
            return $data;
        }else{
            return null;
        }
    }

    public function create(){
        $query = "INSERT INTO ".$this->table." (`info`, `role` ,`paid`) VALUES (:info, :role, :paid)";

        $STH = $this->DBH->prepare($query);

        // bind params
        $STH->bindParam(":info", $this->info);
        $STH->bindParam(":role", $this->role);
        $STH->bindParam(":paid", $this->paid);

        $STH->execute();

        if($STH->rowCount()){
            return true;
        }else{
            return false;
        }
    }
}