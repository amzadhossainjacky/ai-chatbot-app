<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->
@push('css')
    <!-- DataTables -->
    <link href="{{ asset('backend/assets/plugins/datatable/css/dataTables.bootstrap5.min.css') }}" rel="stylesheet" />
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
                            <p class="mb-0">Rachel Zane</p>
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
                                        <a href="javascript:;" class="list-group-item" id="conversation_{{$item->id}}">
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

                <div class="chat-header d-flex align-items-center">
                    <div class="chat-toggle-btn"><i class="bx bx-menu-alt-left"></i>
                    </div>
                    <div>
                        <h4 class="mb-1 font-weight-bold">Harvey Inspector</h4>
                        <div class="list-inline d-sm-flex mb-0 d-none"> <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"><small class="bx bxs-circle me-1 chart-online"></small>Active Now</a>
                        </div>
                    </div>
                    <div class="chat-top-header-menu ms-auto">
                        <a href="javascript:;"><i class="bx bx-user-plus"></i></a>
                    </div>
                </div>
                <div class="chat-content ps ps--active-y" id="chat_content">
    
                   {{--  <div class="ps__rail-x" style="left: 0px; bottom: -628px;">
                        <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;">
                        </div>
                    </div>
                    <div class="ps__rail-y" style="top: 628px; height: 520px; right: 0px;">
                        <div class="ps__thumb-y" tabindex="0" style="top: 285px; height: 235px;"></div>
                    </div> --}}
                </div>
                <div class="chat-footer d-flex align-items-center">
                    <div class="flex-grow-1 pe-2">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Type a message" value="" name="agent_message" id="agent_message">
                            <button type="submit" class="add-btn mx-2" name="submit" id="submit"><i class="bi bi-save2"></i>Save
                            </button>
                        </div>
                    </div>
                    {{-- <div class="chat-footer-menu">
                        <button type="submit" class="add-btn" name="submit" id="submit"><i class="bi bi-save2"></i>Save
                        </button>
                    </div> --}}
                </div>
        
            
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
		new PerfectScrollbar('.chat-content');
    </script>

    <script>
        //API endpoint URL
        const apiMessageSendUrl = 'http://127.0.0.1:8000/api/message-send';
        var message_send = document.getElementById('submit');

        let message = document.getElementById('agent_message');
        message_send.addEventListener('click', (e) => {
         e.preventDefault();
            if (message.value == "") {
                alert("Please enter a valid reply.");
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
            })
            .then(data => {
                console.log(data)

                //empty content input by user

                let chat_content = document.getElementById('chat_content');

                //content 
                var htmlContentString = '<div class="chat-content-leftside">' +
                                            '<div class="d-flex">' +
                                                '<div class="flex-grow-1 me-2">' +
                                                    '<p class="mb-0 chat-time">'+ getCurrentTime() + '</p>' +
                                                    '<p class="chat-left-msg">' + message.value + '</p>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';
                    chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                
                    message.value = '';
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                if (message.value == "") {
                    alert("Please enter a valid reply.");
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
                })
                .then(data => {
                    console.log(data)

                    //empty content input by user

                    let chat_content = document.getElementById('chat_content');

                    //content 
                    var htmlContentString = '<div class="chat-content-leftside">' +
                                                '<div class="d-flex">' +
                                                    '<div class="flex-grow-1 me-2">' +
                                                        '<p class="mb-0 chat-time">'+ getCurrentTime() + '</p>' +
                                                        '<p class="chat-left-msg">' + message.value + '</p>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';
                        chat_content.insertAdjacentHTML('beforeend', htmlContentString);
                    
                        message.value = '';
                })
                .catch(error => {
                    // Handle errors
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
        });

    </script>
    
<script src="http://localhost:8000/js/app.js"></script>
<script>
    
    $(document).ready(function()
        {
            Echo.channel('017109996837b140781f3716f78ad3518a2220d6a06e23914b2c9e5').listen('MessageReceiveEvent', (e) =>{
                console.log(e.message)
                let chat_content = document.getElementById('chat_content');
                var htmlContentString = '<div class="chat-content-rightside">' +
                                            '<div class="d-flex ms-auto">' +
                                                '<div class="flex-grow-1 me-2">' +
                                                    '<p class="mb-0 chat-time text-end">'+'you,'+ getCurrentTime() + '</p>' +
                                                    '<p class="chat-right-msg">' + e.message + '</p>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';

                    chat_content.insertAdjacentHTML('beforeend', htmlContentString);
            })
        });
</script>
   
    
@endpush
<!--end indivisual pages javascript -->
