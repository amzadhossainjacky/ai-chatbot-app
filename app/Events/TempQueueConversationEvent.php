<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use App\Services\ConversationService;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class TempQueueConversationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $queue_count = 0;
    private ConversationService $conversation_service;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->conversation_service = new ConversationService();
        $count = $this->conversation_service->get_total_temp_queue();
        if($count){
            $this->queue_count = $count;
        }else{
            $this->queue_count = 0;
        }
        
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('queue_count');
    }
}
