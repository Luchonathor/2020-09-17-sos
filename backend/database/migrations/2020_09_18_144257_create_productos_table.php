<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('codigo');
            $table->integer('existencia')->unsingned()->default(0);
            $table->string('descripcion');
            $table->enum('estado', ['activo','inactivo','pendiente'])->default('pendiente');
            $table->timestamps();

            $table->foreignId('id_bodega')
                ->references('id')
                ->on('bodegas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
