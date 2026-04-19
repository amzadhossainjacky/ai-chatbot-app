<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'question',
        'reply',
        'conversation_type_id',
        'is_active',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array', // Cast 'tags' attribute to an array for easier manipulation
    ];

    // public function getTagsAttribute($value)
    // {
    //     return json_decode($value, true) ?? []; // Convert JSON to array, handle null values
    // }

    public function setTagsAttribute($value)
    {
        $this->attributes['tags'] = json_encode($value); // Encode array into JSON before saving
    }

    /**
     * Get the attachments associated on a project
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function attachment(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachmentable');
    }
    
    public function conversation_types(): BelongsTo
    {
        return $this->belongsTo(ConversationType::class, 'conversation_type_id');
    }

    /**
     * Get all product_question of this - relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function product_questions(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_question_mappings',  'question_id', 'product_id')->withTimestamps();
    }

    /**
     * Get all questions with products - relational data
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function question_mappings(): HasMany
    {
        return $this->hasMany(ProductQuestionMapping::class, 'question_id', 'id');
    }


}