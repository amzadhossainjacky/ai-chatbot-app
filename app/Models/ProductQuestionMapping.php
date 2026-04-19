<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductQuestionMapping extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'question_id',
    ];
    
    /**
     * Get all product_question of this - relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function questions(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    /**
     * Get all product_question of this - relational data
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function products(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    
}
