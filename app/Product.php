<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    public function getPriceAttribute($value){
        return number_format($value, 0, ',', '.');
    }

    public function getPriceOldAttribute($value){
        return number_format($value, 0, ',', '.');
    }
}
