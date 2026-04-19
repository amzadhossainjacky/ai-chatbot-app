<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempQueueConversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'token',
        'status',
        'lead_id',
        'conversation_id'
    ];
}
