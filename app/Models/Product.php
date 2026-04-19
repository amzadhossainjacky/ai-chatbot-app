<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'link',
        'is_active',
        'thumbnail',
    ];

    /**
     * Get the attachments associated on a project
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function attachment(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachmentable');
    }
}
