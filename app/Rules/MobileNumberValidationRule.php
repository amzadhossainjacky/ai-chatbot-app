<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class MobileNumberValidationRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        // Replace with your desired mobile number format regex
        $regex = "/(^([8]{2})?(01){1}[3-9]{1}\d{8})$/";

        // Use preg_match to check for valid format
        return preg_match($regex, $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid mobile number format.';
    }
}
