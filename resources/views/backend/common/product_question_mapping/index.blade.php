<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->
@push('css')
    <!-- DataTables -->
    <link href="{{ asset('backend/assets/plugins/Drag-And-Drop/dist/imageuploadify.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('backend/assets/plugins/datatable/css/dataTables.bootstrap5.min.css') }}" rel="stylesheet" />
@endpush
<!--start content -->
@section('content')
    <div class="page-content">
        <!-- start breadcrumb -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <h4>Product Question Mapping</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb d-flex justify-content-end">
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Product Question Mapping</li>
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
                            <div>
                                @can('product-question-mapping-create')
                                    <a  href="{{ route(\Request::segment(1) . '.product_question_mapping.create') }}">
                                        <button type="button"  class="add-btn"><i class="{{_icons('arrow_right')}}"></i>Add</button>
                                    </a>
                                @endcan
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body table-responsive custom-text-wrap">
                            <table class="table data-table">
                                <thead class="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Question Name</th>
                                        <th>Product Title</th>
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
    <script src="{{ asset('backend/assets/plugins/Drag-And-Drop/dist/imageuploadify.min.js') }}"></script>
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
                ajax: "{{ route(Request::segment(1) . '.product_question_mapping') }}",
                columns: [{
                        data: 'id',
                        name: 'id'
                    },
                    {
                        data: 'question',
                        name: 'question'
                    },
                    {
                        data: 'product_name',
                        name: 'product_name'
                    },
                    /* {
                        data: 'action',
                        name: 'action',
                        orderable: false,
                        searchable: false
                    }, */
                ],
            });
        });
        
    </script>
@endpush
<!--end indivisual pages javascript -->
