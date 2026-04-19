<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->
@push('css')
    <!-- DataTables -->
    <link href="{{ asset('backend/assets/plugins/datatable/css/dataTables.bootstrap5.min.css') }}" rel="stylesheet" />

    <style>
        #chat_details {
            /* overflow-y: auto; 
            height: 350px; 
            margin-top: 70px; */
        }
        .chat-content{
            padding: 15px 15px 15px 15px !important;
            height: 350px;
            overflow-y: auto !important; 
            margin-top: 70px;
        }
    </style>
@endpush
<!--start content -->
@section('content')
@php
    dump($conversations)
@endphp
<div class="page-content">
    <div class="chat-wrapper">
            <div class="chat-sidebar">
                <div class="chat-sidebar-header">
                    <div class="d-flex align-items-center">
                        <div class="chat-user-online">
                            <img src="{{ asset('backend/assets/images/avatars/avatar-2.png') }}" width="45" height="45" class="rounded-circle" alt="">
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <p class="mb-0">{{Auth::user()->name}}</p>
                        </div>
                        <div class="dropdown">
                            <div class="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i class="bx bx-dots-horizontal-rounded"></i>
                            </div>
                            <div class="dropdown-menu dropdown-menu-end"> <a class="dropdown-item" href="javascript:;">Settings</a>
                                <div class="dropdown-divider"></div>	<a class="dropdown-item" href="javascript:;">Help &amp; Feedback</a>
                                <a class="dropdown-item" href="javascript:;">Enable Split View Mode</a>
                                <a class="dropdown-item" href="javascript:;">Keyboard Shortcuts</a>
                                <div class="dropdown-divider"></div>	<a class="dropdown-item" href="javascript:;">Sign Out</a>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3"></div>
                    <div class="chat-tab-menu mt-3">
                        <ul class="nav nav-pills nav-justified" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-bs-toggle="pill" href="javascript:;" aria-selected="true" role="tab">
                                    <div class="font-24"><i class="bx bx-conversation"></i>
                                    </div>
                                    <div><small>Chats</small>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="pill" href="javascript:;" aria-selected="false" tabindex="-1" role="tab">
                                    <div class="font-24"><i class="bx bx-bell"></i>
                                    </div>
                                    <div><small>Notifications</small>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat-sidebar-content">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-Chats">
                            <div class="chat-list ps ps--active-y">
                                <div class="list-group list-group-flush" id="conversation_list">
                                    
                                    @foreach ($conversations as $item)
                                    <a href="javascript:;" class="list-group-item" id="conversation_{{$item->id}}" onclick="get_conversation_details('{{$item->id}}', '{{$item->leads->phone}}', '{{$item->token}}')">
                                            <div class="d-flex">
                                                <div class="flex-grow-1 ms-2">
                                                    <h6 class="mb-0 chat-title">P: {{$item->leads->phone}}</h6>
                                                    <p class="mb-0 chat-msg"></p>
                                                </div>
                                                <div class="chat-time">{{_date_format($item->created_at)}}</div>
                                            </div>
                                        </a>
                                    @endforeach

                                </div>
                            <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                        </div>

                        <div class="ps__rail-y" style="top: 0px; height: 300px; right: 0px;">
                            <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 168px;">
                            </div>
                        </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>

           {{--  <div id="chat_details"> --}}
                <div class="chat-header d-flex align-items-center">
                    <div class="chat-toggle-btn"><i class="bx bx-menu-alt-left"></i>
                    </div>
                    <div>
                        <h4 class="mb-1 font-weight-bold" id="conversation_user"> None</h4>
                        {{-- <div class="list-inline d-sm-flex mb-0 d-none"> <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"><small class="bx bxs-circle me-1 chart-online"></small>Active Now</a>
                        </div> --}}
                    </div>
                    <div class="chat-top-header-menu ms-auto">
                        <a href="javascript:;"><i class="bx bx-user-plus"></i></a>
                    </div>
                </div>

                <div id="chat_details">
                   
                </div>
                
            {{-- </div> --}}
                
        <!--start chat overlay-->
        <div class="overlay chat-toggle-btn-mobile"></div>
        <!--end chat overlay-->
    </div>
</div>
@endsection
<!--end content -->

<!--start indivisual pages javascript -->
@push('js')
    <!-- Include DataTables -->
    <script src="{{ asset('backend/assets/plugins/datatable/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('backend/assets/plugins/datatable/js/dataTables.bootstrap5.min.js') }}"></script>

    <script>
        new PerfectScrollbar('.chat-list');
		// new PerfectScrollbar('.chat-content');
        var chat_details = document.getElementById('chat_details');
        var conversation_user_id = document.getElementById('conversation_user');

        //time formator 
        function _time_format(dateString) {
            var dateObject = new Date(dateString);
            var hours = dateObject.getHours();
            var minutes = dateObject.getMinutes();

            // Determine if it's AM or PM
            var amOrPm = hours >= 12 ? 'PM' : 'AM';

            // Convert hours from 24-hour to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // 12 AM or 12 PM should display as 12

            // Add leading zeros if necessary
            var formattedHours = ('0' + hours).slice(-2);
            var formattedMinutes = ('0' + minutes).slice(-2);

            // Construct the time string with AM/PM indicator
            var timeString = formattedHours + ':' + formattedMinutes + ' ' + amOrPm;
            return timeString;
        }
    </script>

    


{{-- conversation details fetch when select one user --}}
<script>
    var conversation_id = "";
    var conversation_token = "";
    var conversation_user = "";
    function get_conversation_details($conversation_id, $conversation_user, $conversation_token){
        // user operational info
        conversation_id = $conversation_id;
        conversation_user = $conversation_user;
        conversation_token = $conversation_token;
        //console.log(conversation_token)
        
        chat_details.innerHTML = '';
        conversation_user_id.innerHTML = conversation_user;

        const apiLastConversationUrl = "{{ route(Request::segment(1) . '.conversation.details') }}";

        $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        $.ajax({
            url: apiLastConversationUrl,
            type: 'POST', 
            dataType: 'json', 
            data: {
                id: conversation_id,
            },
            success: function(response) {
                
                console.log(response.data);
                let data = response.data

                let chat_content = document.getElementById('chat_content');

                data.forEach(element => {

                    if(element.receive_status == 1){
                        var htmlContentString = '<div class="chat-content-leftside">' +
                                                        '<div class="d-flex">' +
                                                            '<div class="flex-grow-1 me-2">' +
                                                                '<p class="mb-0 chat-time">'+ _time_format(element.created_at) + '</p>' +
                                                                '<p class="chat-left-msg">' + element.message_body + '</p>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>';
                        chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                    }

                    
                    if(element.receive_status == 2){
                        var htmlContentString = '<div class="chat-content-rightside">' +
                                                        '<div class="d-flex ms-auto">' +
                                                            '<div class="flex-grow-1 me-2">' +
                                                                '<p class="mb-0 chat-time text-end">'+"you, "+  _time_format(element.created_at) + '</p>' +
                                                                '<p class="chat-right-msg">' + element.message_body + '</p>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>';
                        chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                    }
                    //content 
                
                });

                
            },
            error: function(xhr, status, error) {
                
                console.error(xhr.responseText);
            }
        });

       let htmlChatDetailString =
            '<div class="chat-content ps ps--active-y" id="chat_content">' +
            '</div>' +
            '<div class="chat-footer d-flex align-items-center">' +
            '<div class="flex-grow-1 pe-2">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" placeholder="Type a message" value="" name="agent_message" id="agent_message">' +
            '<button type="submit" class="add-btn mx-2" name="submit" id="submit"><i class="bi bi-save2"></i>Save' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';
            chat_details.insertAdjacentHTML('beforeend', htmlChatDetailString);

        //agent message send
        setupAgentMessageSend();
        echoListener();
    }
</script>
{{-- <script>
    var conversation_id = "";
    var conversation_token = "";
    var conversation_user = "";

    function get_conversation_details($conversation_id, $conversation_user, $conversation_token) {
        // user operational info
        conversation_id = $conversation_id;
        conversation_user = $conversation_user;
        conversation_token = $conversation_token;

        chat_details.innerHTML = '';
        conversation_user_id.innerHTML = conversation_user;

        const apiLastConversationUrl = "{{ route(Request::segment(1) . '.conversation.details') }}";

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: apiLastConversationUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                id: conversation_id,
            },
            success: function (response) {

                console.log(response.data);
                let data = response.data

                createChatInput(); // Create chat input area

                // Loop through data after chat input area is created
                data.forEach(element => {
                    let chat_content = document.getElementById('chat_content');
                    
                    if (element.receive_status == 1) {
                        var htmlContentString = '<div class="chat-content-leftside">' +
                            '<div class="d-flex">' +
                            '<div class="flex-grow-1 me-2">' +
                            '<p class="mb-0 chat-time">' + _time_format(element.created_at) + '</p>' +
                            '<p class="chat-left-msg">' + element.message_body + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                    }

                    if (element.receive_status == 2) {
                        var htmlContentString = '<div class="chat-content-rightside">' +
                            '<div class="d-flex ms-auto">' +
                            '<div class="flex-grow-1 me-2">' +
                            '<p class="mb-0 chat-time text-end">' + "you, " + _time_format(element.created_at) + '</p>' +
                            '<p class="chat-right-msg">' + element.message_body + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    function createChatInput() {
        var htmlChatDetailString =
            '<div class="chat-content ps ps--active-y" id="chat_content">' +
            '</div>' +
            '<div class="chat-footer d-flex align-items-center">' +
            '<div class="flex-grow-1 pe-2">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" placeholder="Type a message" value="" name="agent_message" id="agent_message">' +
            '<button type="submit" class="add-btn mx-2" name="submit" id="submit"><i class="bi bi-save2"></i>Save' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';
        chat_details.insertAdjacentHTML('beforeend', htmlChatDetailString);

        // Attach event listeners for agent message send
        setupAgentMessageSend();
    }
</script> --}}

{{-- agent message send --}}
<script>

    function setupAgentMessageSend() {
        if (chat_details.innerHTML.trim() !== '') {
            //API endpoint URL
            const apiMessageSendUrl = 'http://127.0.0.1:8000/api/message-send';
            let message_send = document.getElementById('submit');

            let message = document.getElementById('agent_message');
            message_send.addEventListener('click', (e) => {
                e.preventDefault();

                // Disable the button to prevent multiple clicks
                message_send.disabled = true;

                if (message.value == "") {
                    alert("Please enter a valid reply.");
                    message_send.disabled = false; // Re-enable the button
                    return 0;
                }

                let requestData = {
                    message: message.value,
                };

                fetch(apiMessageSendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }).then(data => {
                    //console.log(data);

                    //empty content input by user
                    let chat_content = document.getElementById('chat_content');

                    //content 
                    var htmlContentString = '<div class="chat-content-rightside">' +
                        '<div class="d-flex ms-auto">' +
                        '<div class="flex-grow-1 me-2">' +
                        '<p class="mb-0 chat-time text-end">' + "you, " + getCurrentTime() + '</p>' +
                        '<p class="chat-right-msg">' + message.value + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    chat_content.insertAdjacentHTML('beforeend', htmlContentString);

                    // Enable the button after fetch request is completed
                    message_send.disabled = false;
                    message.value = '';
                }).catch(error => {
                    // Handle errors
                    console.error('There was a problem with the fetch operation:', error);
                    // Enable the button in case of error
                    message_send.disabled = false;
                });
            });
            // message_send.addEventListener('click', (e) => {
            //     e.preventDefault();
            //     if (message.value == "") {
            //         alert("Please enter a valid reply.");
            //         return 0;
            //     }

            //     let requestData = {
            //         message: message.value,
            //     };

            //     fetch(apiMessageSendUrl, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(requestData)
            //     }).then(response => {
            //         if (!response.ok) {
            //             throw new Error('Network response was not ok');
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         console.log(data)

            //         //empty content input by user

            //         let chat_content = document.getElementById('chat_content');

            //         //content 
            //         var htmlContentString = '<div class="chat-content-rightside">' +
            //                                     '<div class="d-flex ms-auto">' +
            //                                         '<div class="flex-grow-1 me-2">' +
            //                                             '<p class="mb-0 chat-time text-end">'+"you, "+  getCurrentTime() + '</p>' +
            //                                             '<p class="chat-right-msg">' + message.value + '</p>' +
            //                                         '</div>' +
            //                                     '</div>' +
            //                                 '</div>';
            //             chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                    
            //             message.value = '';
            //     })
            //     .catch(error => {
            //         // Handle errors
            //         console.error('There was a problem with the fetch operation:', error);
            //     });
            // });

            // document.addEventListener('keydown', (e) => {
                
            //     if (e.key === "Enter") {
            //         if (message.value == "") {
            //             alert("Please enter a valid reply.");
            //             return 0;
            //         }

            //         let requestData = {
            //             message: message.value,
            //         };

            //         fetch(apiMessageSendUrl, {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify(requestData)
            //         }).then(response => {
            //             if (!response.ok) {
            //                 throw new Error('Network response was not ok');
            //             }
            //             return response.json();
            //         })
            //         .then(data => {
            //             console.log(data)

            //             //empty content input by user

            //             let chat_content = document.getElementById('chat_content');

            //             //content 
            //             var htmlContentString = '<div class="chat-content-rightside">' +
            //                                     '<div class="d-flex ms-auto">' +
            //                                         '<div class="flex-grow-1 me-2">' +
            //                                             '<p class="mb-0 chat-time text-end">'+"you, "+ getCurrentTime() + '</p>' +
            //                                             '<p class="chat-right-msg">' + message.value + '</p>' +
            //                                         '</div>' +
            //                                     '</div>' +
            //                                 '</div>';
            //             chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                        
            //                 message.value = '';
            //         })
            //         .catch(error => {
            //             // Handle errors
            //             console.error('There was a problem with the fetch operation:', error);
            //         });
            //     }
            // });

        }
    }

    // Call setupMessageSend to initialize message sending functionality

</script>



<script src="http://localhost:8000/js/app.js"></script>

{{-- receive listen from chatbot --}}
<script>
    
    function echoListener(){
        $(document).ready(function()
        {
            Echo.channel(conversation_token).listen('MessageReceiveEvent', (e) =>{
                console.log(e.message)
                let chat_content = document.getElementById('chat_content');

                    var htmlContentString = '<div class="chat-content-leftside">' +
                                                        '<div class="d-flex">' +
                                                            '<div class="flex-grow-1 me-2">' +
                                                                '<p class="mb-0 chat-time">'+ getCurrentTime() + '</p>' +
                                                                '<p class="chat-left-msg">' + e.message + '</p>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>';
                        chat_content.insertAdjacentHTML('beforeend', htmlContentString);
            })
        });
    }
    
</script>


@endpush
<!--end indivisual pages javascript -->
