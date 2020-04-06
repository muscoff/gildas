<?php

class Admin{
    private $table = 'admin_table';
    private $DBH;
    public $id;
    public $username;
    public $password;
    public $created_at;

    public function __construct($db){
        $this->DBH = $db;
    }

    public function fetch(){
        $query = "SELECT * FROM ".$this->table;

        $STH = $this->DBH->prepare($query);

        $STH->execute();

        if($STH->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function create(){
        $query = "INSERT INTO ".$this->table." (`username`, `password`) VALUES (:username, :password)";

        $STH = $this->DBH->prepare($query);

        $this->password = password_hash($this->password, PASSWORD_DEFAULT);

        // bindParam
        $STH->bindParam(':username', $this->username);
        $STH->bindParam(':password', $this->password);

        // execute
        $STH->execute();

        if($STH->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function verify_pass(){
        $query = "SELECT `password` FROM ".$this->table." WHERE `username`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->username]);

        if($STH->rowCount()){
            $row = $STH->fetch(PDO::FETCH_OBJ);
            $pass = $row->password;
            if(password_verify($this->password, $pass)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}