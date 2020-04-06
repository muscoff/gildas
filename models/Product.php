<?php

class Product{
    private $table = 'product';
    private $DBH;
    public $id;
    public $title;
    public $price;
    public $qty;
    public $barcode;
    public $img;
    public $created_at;

    public function __construct($db){
        $this->DBH = $db;
    }

    public function fetch(){
        $query = "SELECT * FROM ".$this->table;

        // prepare
        $STH = $this->DBH->prepare($query);

        // execute
        $STH->execute();

        $data = array();

        if($STH->rowCount()){
            while($row = $STH->fetch(PDO::FETCH_OBJ)){
                $item = array(
                    'id' => (int)$row->id,
                    'title' => $row->title,
                    'price' => (double)$row->price,
                    'qty' => (int)$row->qty,
                    'barcode' => $row->barcode,
                    'img' => $row->img,
                    'created_at' => $row->created_at,
                );
                array_push($data, $item);
            }
            return $data;
        }else{
            return null;
        }
    }

    public function single(){
        $query = "SELECT * FROM ".$this->table." WHERE `id`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->id]);

        if($STH->rowCount()){
            $row = $STH->fetch(PDO::FETCH_OBJ);
            $data = array(
                'id'=>$row->id,
                'title'=>$row->title,
                'price'=>$row->price,
                'qty'=>$row->qty,
                'barcode'=>$row->barcode,
                'img'=>$row->img,
                'created_at'=>$row->created_at
            );
            return $data;
        }else{
            return null;
        }
    }

    public function search(){
        $query = "SELECT `id`, `title`, `price`, `qty`, `img` FROM ".$this->table." WHERE `barcode`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->barcode]);

        if($STH->rowCount()){
            $row = $STH->fetch(PDO::FETCH_OBJ);
            $data = array(
                'id'=>(int)$row->id,
                'title'=>$row->title,
                'price'=>(double)$row->price,
                'qty'=>(int)$row->qty,
                'img'=>$row->img
            );
            return $data;
        }else{
            return null;
        }
    }

    public function create(){
        $query = "INSERT INTO ".$this->table." (`title`, `price`, `qty`, `barcode`, `img`) VALUES (:title, :price, :qty, :barcode, :img)";

        // prepare
        $STH = $this->DBH->prepare($query);

        // bindParams
        $STH->bindParam(':title', $this->title);
        $STH->bindParam(':price', $this->price);
        $STH->bindParam(':qty', $this->qty);
        $STH->bindParam(':barcode', $this->barcode);
        $STH->bindParam(':img', $this->img);

        // execute
        $STH->execute();

        if($STH->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function edit(){
        $query = "UPDATE ".$this->table." SET `title`=?, `price`=?, `qty`=?, `barcode`=? WHERE `id`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->title, $this->price, $this->qty, $this->barcode, $this->id]);

        if($STH->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function updateImage(){
        $query = "UPDATE ".$this->table." SET `img`=? WHERE `id`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->img, $this->id]);

        if($STH->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function imageName(){
        $query = "SELECT `img` FROM ".$this->table." WHERE `id`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->id]);

        if($STH->rowCount()){
            $data = $STH->fetch(PDO::FETCH_OBJ);
            $data = $data->img;

            $explodeData = explode('/', $data);
            $item = end($explodeData);
            return $item;
        }else{
            return null;
        }
    }

    public function delete(){
        $query = "DELETE FROM ".$this->table." WHERE `id`=?";

        $STH = $this->DBH->prepare($query);

        $STH->execute([$this->id]);

        if($STH->rowCount()){
            return true;
        }else{
            return false;
        }
    }
}