<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    protected $fillable = ["nombre", "codigo", "existencia", "id_bodega", "descripcion", "estado"];
}
