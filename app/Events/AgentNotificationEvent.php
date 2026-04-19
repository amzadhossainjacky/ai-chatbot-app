<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class AgentNotificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $agent_email;
    public $lead_phone;
    public $conversation_token;
    public $message = "Conversation assign to you";

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($agent_email, $lead_phone, $conversation_token)
    {
        //$notification_data
        $this->agent_email = $agent_email;
        $this->lead_phone = $lead_phone;
        $this->conversation_token = $conversation_token;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel($this->agent_email.'_agent_notification');
    }
}
