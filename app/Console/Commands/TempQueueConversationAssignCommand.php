<?php

namespace App\Console\Commands;

use App\Models\Session;
use App\Models\Conversation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\ConversationAssociate;
use App\Models\TempQueueConversation;
use App\Services\ConversationService;
use App\Events\NewConversationAttachEvent;
use App\Events\TempQueueConversationEvent;

class TempQueueConversationAssignCommand extends Command
{

    ## Service properties
    private ConversationService $conversation_service;
    
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'conversation:assign';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Temp Queue Conversation Assign';

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
        $this->conversation_service->temp_queue_assign();
        /* $login_user_ids = [];

        $sessions = DB::table('sessions')->get();

        $login_user_ids = Session::whereNotNull('user_id')
            ->where('user_id', '<>', 1) // Exclude user ID 1
            ->distinct()
            ->pluck('user_id')->toArray();

        $associates_users = ConversationAssociate::whereHas(
            'conversation',
            function ($query) {
                $query->where('status', 2);
            },
        )->distinct()
            ->pluck('user_id')->toArray();

        $unique_ids = array_diff($login_user_ids, $associates_users);
        $unique_ids_array = array_values($unique_ids);

        if (count($unique_ids_array) > 0) {
            foreach ($unique_ids_array as $key => $user_id) {
                $temp_queue_conversation = TempQueueConversation::first();

                // Check for null in a single conditional statement
                if (!$temp_queue_conversation) {
                    continue; // Skip iteration if temp_queue_conversation is null
                }

                $conversation = Conversation::with('leads')->where('id', $temp_queue_conversation->conversation_id)->first();

                if ($conversation) {
                    // Update conversation status
                    $conversation->status = 2;
                    $conversation->save();

                    // Create conversation association
                    $assign_user = new ConversationAssociate();
                    $assign_user->conversation_id = $conversation->id;
                    $assign_user->user_id = $user_id;
                    $assign_user->save();

                    // Delete temporary queue conversation
                    TempQueueConversation::destroy($temp_queue_conversation->id);

                    NewConversationAttachEvent::dispatch($conversation, $user_id);
                    TempQueueConversationEvent::dispatch();
                    //agent status event call
                    $this->conversation_service->get_conversation_info_by_id($conversation->id);
                } else {
                    //nothing
                }
            }
        } */
    }
}
