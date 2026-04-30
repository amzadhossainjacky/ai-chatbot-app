<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->
@push('css')
    <!-- DataTables -->
    <link href="{{ asset('backend/assets/plugins/datatable/css/dataTables.bootstrap5.min.css') }}" rel="stylesheet" />
@endpush
<!--start content -->
@section('content')
    <div class="page-content">
        <!-- start breadcrumb -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <h4>Leads</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb d-flex justify-content-end">
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Chat</li>
                        <li class="breadcrumb-item active" aria-current="page">List</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- end breadcrumb-->

        <!-- Main content -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card card-info card-outline">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <div class="f-18">List</div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body table-responsive">
                            <table class="table data-table">
                                <thead class="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Lead</th>
                                        <th>Agent Name</th>
                                        <th>Date</th>
                                        <th>Created At</th>
                                        @can('chat-faq-conversation')
                                            <th>Faq Chat</th>
                                        @endcan
                                       {{--  @can('chat-product-conversation')
                                            <th>Product Chat</th>
                                        @endcan --}}
                                        @can('chat-live-conversation')
                                            <th>Live Chat</th>
                                        @endcan

                                        @can('chat-all-conversation')
                                            <th>All Chat</th>
                                        @endcan
                                            
                                        
                                        {{-- <th width="100px">Action</th> --}}
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
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
    <script>
        $(document).ready(function() {

             //crf validated
             $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });


            //data table 
            $('.data-table').DataTable({
                processing: true,
                serverSide: true,
                lengthMenu: [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],
                ajax: "{{ route(Request::segment(1) . '.chats') }}",
                columns: [{
                        data: 'id',
                        name: 'id'
                    },
                    {
                        data: 'leads.phone',
                        name: 'leads.phone'
                    },
                    {
                        data: 'agent',
                        name: 'agent'
                    },
                    {
                        data: 'date',
                        name: 'date'
                    },
                    { 
                        data: 'created_at',
                        name: 'created_at',
                        visible: false
                    },
                    @can('chat-faq-conversation')
                    {
                        data: 'faq_chat',
                        name: 'faq_chat'
                    },
                    @endcan
                    /* @can('chat-product-conversation')
                    {
                        data: 'product_chat',
                        name: 'product_chat'
                    }, */
                    @endcan
                    @can('chat-live-conversation')
                    {
                        data: 'live_chat',
                        name: 'live_chat'
                    },
                    @endcan
                    @can('chat-all-conversation')
                    {
                        data: 'all_chat',
                        name: 'all_chat'
                    },
                    @endcan
                    // {
                    //     data: 'action',
                    //     name: 'action',
                    //     orderable: false,
                    //     searchable: false
                    // },
                ]
            });


        });
    </script>
@endpush
<!--end indivisual pages javascript -->
