<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AgentNotify extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'user_id',
        'conversation_id',
        'is_read',
    ];

    /**
     * Get all leads- relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function leads(): BelongsTo
    {
        return $this->belongsTo(Lead::class, 'lead_id', 'id');
    }

    /**
     * Get all users- relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get all users- relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function conversations(): BelongsTo
    {
        return $this->belongsTo(Conversation::class, 'conversation_id', 'id');
    }

}
