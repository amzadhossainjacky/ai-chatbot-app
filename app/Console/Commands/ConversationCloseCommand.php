<?php

namespace App\Console\Commands;

use DateTime;
use Carbon\Carbon;
use App\Models\Conversation;
use Illuminate\Console\Command;
use App\Models\TempQueueConversation;
use App\Services\ConversationService;
use App\Events\ConversationStatusEvent;

class ConversationCloseCommand extends Command
{

    ## Service properties
    private ConversationService $conversation_service;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'conversation:close';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Daily conversation close';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->conversation_service = new ConversationService();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $conversations = Conversation::where('status', '!=', 4)->get();

        if (count($conversations) > 0) {
            foreach ($conversations as $key => $item) {
                $conversation = Conversation::where('id', $item->id)->first();

                if ($conversation) {
                    $created_at = new DateTime($conversation->created_at);

                    $created_at->modify('+24 hours');

                    $current_datetime = new DateTime();

                    if ($created_at < $current_datetime) {
                        $conversation->status = 4;
                        $conversation->save();

                        // Delete temporary queue conversation
                        TempQueueConversation::where('token', $conversation->token)->delete();

                        // Dispatch ConversationStatusEvent
                        ConversationStatusEvent::dispatch(4, $conversation->id);

                        // Call get_conversation_info_by_id method from conversation_service
                        $this->conversation_service->get_conversation_info_by_id($conversation->id);
                    }
                }
            }
        }
    }
}
