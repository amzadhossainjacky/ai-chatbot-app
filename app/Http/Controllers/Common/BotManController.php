<?php

namespace App\Http\Controllers\Common;

use App\Services\BotmanService;
use BotMan\BotMan\Facades\BotMan;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class BotManController extends Controller {
    ## Service properties
    private BotmanService $botman_service;

    protected $question;

    /**
     * constructor method
     * @return void
     */
    public function __construct() {
        $this->botman_service = new BotmanService();
    }

    /**
     * Place your BotMan logic here.
     */
    public function handle() {
        $botman = app('botman');

        $botman->hears('{message}', function ($botman, $message) {

            // $reply = $this->botman_service->ask_question($message);

            // if ($reply == NULL) {
            //     $botman->reply("I didn't quite get that. Could you please clarify or ask in a different way?");
            // } else {
            //     $botman->reply($reply->reply);
            // }

            // Process the current question and get the answer
            $reply = $this->botman_service->ask_question($message);

            if ($reply == null) {
                $botman->reply("I didn't quite get that. Could you please clarify or ask in a different way?");
            } else {
                // Store the current question and answer in the session
                Session::put('botman_question', $message);
                Session::put('botman_answer', $reply->reply);

                // Reply with the answer
                $botman->reply($reply->reply);
            }

        });

        $botman->listen();
    }

    /**
     * Place your BotMan logic here.
     */
    // public function askName($botman)
    // {
    //     $botman->ask('Hello! What is your Name?', function(Answer $answer) {

    //         $name = $answer->getText();

    //         $this->say('Nice to meet you '.$name);
    //     });
    // }
}