<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ConversationDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'question_id',
        'conversation_type_id',
        'message_body',
        'lead_id',
        'user_id',
        'receive_status',
        'is_read'
    ];


    public function questions(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

}
