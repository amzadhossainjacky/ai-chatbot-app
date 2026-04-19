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
                        <div class="f-18">Details</div>
                        <div>
                            <a href="{{ route(\Request::segment(1) . '.leads') }}">
                                <button type="button" class="add-btn"><i
                                        class="{{ _icons('arrow_left') }}"></i>Back</button>
                            </a>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="row justify-content-center">
                            <div class="col-12">
                                {{-- <div class="bg-primary d-flex align-items-center">
                                    <div class="chat-toggle-btn"><i class="bx bx-menu-alt-left"></i>
                                    </div>
                                    <div>
                                        <h4 class="mb-1 font-weight-bold" id="conversation_user"> None</h4>
                                        <input type="text" id="current_token" style="display: none;">
                                        
                                    </div>
                                    <div class="chat-top-header-menu ms-auto">
                                        <a href="javascript:;"><i class="bx bx-user-plus"></i></a>
                                    </div>
                                </div> --}}
                        
                                <div id="chat_details" class="card p-2">
                                    @if (count($conversations) > 0)
                                    @foreach ($conversations as $index => $conversation)
                                    <div class="text-center p-3 my-2 background_primary_bg text-light">
                                        @php
                                        @endphp
                                        <div>Conversation {{ $loop->index + 1 }}, <span>Date: {{_date_format($conversation[0]['created_at'])}} </span></div>
                                    </div>
                    
                                    @foreach ($conversation as $item)
                                        @if($item['receive_status'] == 1)
                                            <div class="chat-content-leftside">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1 me-2">
                                                        <p class="mb-0 chat-time">{{ _time_format_changes($item['created_at']) }}</p>
                                                        <p class="chat-left-msg"> {{$item['message_body']}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                
                                        @endif
                                        @if($item['receive_status'] == 2)
                                                <div class="chat-content-rightside">
                                                    <div class="d-flex ms-auto">
                                                        <div class="flex-grow-1 me-2">
                                                            <p class="mb-0 chat-time text-end">you, {{ _time_format_changes($item['created_at']) }}</p>
                                                            <p class="chat-right-msg">{{$item['message_body']}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        
                                                @endif
                                            @endforeach
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
