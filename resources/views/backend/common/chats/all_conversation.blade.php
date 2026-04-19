<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->
@push('css')
    <!-- DataTables -->
    {{-- <link href="{{ asset('backend/assets/plugins/datatable/css/dataTables.bootstrap5.min.css') }}" rel="stylesheet" /> --}}

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
{{-- @php
    dump($conversation_info)
@endphp --}}
<div class="page-content">
    <!-- Main content -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-info card-outline">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div class="f-18">All Chat Details</div>
                        <div>
                            <a href="{{ route(\Request::segment(1) . '.chats') }}">
                                <button type="button" class="add-btn"><i
                                        class="{{ _icons('arrow_left') }}"></i>Back</button>
                            </a>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="row justify-content-center">
                            <div class="col-12">
                                <div id="chat_details" class="card p-2">
                                    @if (count($conversations) > 0)
                                        @foreach ($conversations as $index => $conversation)

                                            @if($conversation->conversation_type_id == 1)
                                                @if($conversation->receive_status == 1)
                                                    <div class="chat-content-leftside">
                                                        <div class="d-flex">
                                                            <div class="flex-grow-1 me-2">
                                                                <p class="mb-0 chat-time">{{ _time_format_changes($conversation->created_at) }}</p>
                                                                <p class="chat-left-msg"> {{$conversation->message_body}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                        
                                                @endif
                                                @if($conversation->receive_status == 2)
                                    
                                                    <div class="chat-content-rightside">
                                                        <div class="d-flex ms-auto">
                                                            <div class="flex-grow-1 me-2">
                                                                <p class="mb-0 chat-time text-end">
                                                                    @if(count(optional($conversation->questions)->attachment ?? []) > 0)
                                                                    @foreach (optional($conversation->questions)->attachment ?? [] as $attachment)
                                                                        @php
                                                                            $filePath = 'storage/attachments/' . $attachment->file;
                                                                            $url = asset($filePath);
                                                                            $extension = pathinfo($attachment->file, PATHINFO_EXTENSION);
                                                                        @endphp
                                                                            <a href="{{ $url }}" target="_blank" class="mb-2 text-end">
                                                                                <img src="{{ $url }}" height="100px" width="120px" alt="Attachment">
                                                                            </a>
                                                                    @endforeach
                                                                @endif
                                                                </p>
                                                                <p class="mb-0 chat-time text-end">you, {{ _time_format_changes($conversation->created_at) }}</p>
                                                                <p class="chat-right-msg">{{$conversation->message_body}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                            @endif

                                            @if($conversation->conversation_type_id == 2)
                                                @if($conversation->receive_status == 1)
                                                <div class="chat-content-leftside">
                                                        <div class="d-flex">
                                                            <div class="flex-grow-1 me-2">
                                                                <p class="mb-0 chat-time">{{ _time_format_changes($conversation->created_at) }}</p>
                                                                <p class="chat-left-msg"> {{$conversation->message_body}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                                @if($conversation->receive_status == 2)
                                                    <div class="chat-content-rightside">
                                                        <div class="d-flex ms-auto">
                                                            <div class="flex-grow-1 me-2">
                                                                <p class="mb-0 chat-time text-end">
                                                                    @if(count(optional($conversation->questions)->attachment ?? []) > 0)
                                                                        @foreach (optional($conversation->questions)->attachment ?? [] as $attachment)
                                                                            @php
                                                                                $filePath = 'storage/attachments/' . $attachment->file;
                                                                                $url = asset($filePath);
                                                                                $extension = pathinfo($attachment->file, PATHINFO_EXTENSION);
                                                                            @endphp
                                                                                <a href="{{ $url }}" target="_blank" class="mb-2 text-end">
                                                                                    <img src="{{ $url }}" height="100px" width="120px" alt="Attachment">
                                                                                </a>
                                                                        @endforeach
                                                                    @endif
                                                                </p>
                                                                
                                                                <p class="mb-0 chat-time text-end">you, {{ _time_format_changes($conversation->created_at) }}</p>
                                                                <p class="chat-right-msg">
                                                                    {{$conversation->message_body}}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                        <div class="chat-content-rightside">
                                                            <div class="d-flex ms-auto">
                                                                <div class="flex-grow-1 me-2">
                                                                    @if (count($conversation->questions->product_questions) > 0)
                                                                        @foreach ($conversation->questions->product_questions as    $product_question)
                                                                            <p class="mb-0 chat-time text-end">
                                                                                @php
                                                                                    $filePath = 'storage/attachments/' . $product_question->thumbnail;
                                                                                    $url = asset($filePath);
                                                                                    $extension = pathinfo($product_question->thumbnail, PATHINFO_EXTENSION);
                                                                                @endphp
                                                                                <a href="{{ $url }}" target="_blank" class="mb-2 text-end">
                                                                                    <img src="{{ $url }}" height="100px" width="120px" alt="Attachment">
                                                                                </a>
                                                                                <strong class="d-block">
                                                                                    Title : {{ $product_question->title }} <br>
                                                                                    Description : {{ $product_question->description }} <br>
                                                                                </strong>
                                                                                
                                                                            </p>
                                                                        @endforeach
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                            
                                                @endif
                                            @endif

                                            @if($conversation->conversation_type_id == 3)
                                                @if($conversation->receive_status == 1)
                                                    <div class="chat-content-leftside">
                                                        <div class="d-flex">
                                                            <div class="flex-grow-1 me-2">
                                                                <p class="mb-0 chat-time">{{ _time_format_changes($conversation->created_at) }}</p>
                                                                <p class="chat-left-msg"> {{$conversation->message_body}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                        
                                                @endif
                                                @if($conversation->receive_status == 2)
                                                    <div class="chat-content-rightside">
                                                        <div class="d-flex ms-auto">
                                                            <div class="flex-grow-1 me-2">
                                                                <p class="mb-0 chat-time text-end">you, {{ _time_format_changes($conversation->created_at) }}</p>
                                                                <p class="chat-right-msg">{{$conversation->message_body}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                            
                                                    @endif
                                                @endif
                                        @endforeach
                                    @elseif(count($conversations) == 0)
                                        <div class="text-center p-3 my-2 background_primary_bg text-light">
                                            <div>Haven't any conversation</div>
                                        </div>
                                    @endif
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
@endsection
<!--end content -->

<!--start indivisual pages javascript -->
@push('js')
    <!-- Include DataTables -->
    <script src="{{ asset('backend/assets/plugins/datatable/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('backend/assets/plugins/datatable/js/dataTables.bootstrap5.min.js') }}"></script>

@endpush
<!--end indivisual pages javascript -->
