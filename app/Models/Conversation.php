<?php

namespace App\Models;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'token',
        'status',
        'lead_id'
    ];

    /**
     * Get all associated persons of this - relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function associates(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'conversation_associates',  'conversation_id', 'user_id');
    }

    /**
     * Get all leads- relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function leads(): BelongsTo
    {
        return $this->belongsTo(Lead::class, 'lead_id', 'id');
    }

    /**
     * Get all details persons of this - relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function conversation_details(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'conversation_details',  'conversation_id', 'id');
    }

    /**
     * Get all leads- relational data
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function agent_notify(): HasOne
    {
        return $this->hasOne(AgentNotify::class);
    }

}
