<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTempQueueConversationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_queue_conversations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lead_id');
            $table->unsignedBigInteger('conversation_id');
            $table->longText('token')->nullable();
            $table->enum('status', ['1', '2', '3','4'])->comment('1=pending, 2=new, 3=progress , 4=completed')->default('4');
            $table->timestamps();

             ## References
             $table->foreign('conversation_id')->references('id')->on('conversations')->onDelete('cascade');
             $table->foreign('lead_id')->references('id')->on('leads')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('temp_queue_conversations');
    }
}
