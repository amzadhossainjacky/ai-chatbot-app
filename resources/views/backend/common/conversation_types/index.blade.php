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
                    <h4>Conversation Types</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb d-flex justify-content-end">
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Conversation Type</li>
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
                                {{-- {{route(\Request::segment(1) . '.questions.create')}} --}}
                                @can('conversation-type-create')
                                    <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <button type="button"  class="add-btn"><i class="{{_icons('arrow_right')}}"></i>Add</button>
                                    </a>
                                @endcan
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body table-responsive">
                            <table class="table data-table">
                                <thead class="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        @can('conversation-type-edit')
                                            <th width="100px">Action</th>
                                        @endcan
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

            <div class="row row-cols-auto">
                <div class="col">
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Conversation Type</h5>
                                    <button type="button" class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div class="modal-body pt-3 pb-1">
                                    <label for="conversation_type_id" class="form-label">Conversation type name <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" id="name" name="name" value="" class="form-control" >
                                    </div>
                                        <span class="text-danger name_error d-inline-block" id="name_error"></span>
                                </div>

                                <div class="modal-footer">
                                    {{-- <button type="button" class="modal-close-btn" data-bs-dismiss="modal"><i class="{{ _icons('close') }}"></i>Clear</button> --}}
                                    <button type="submit" id="save" value="Save" class="add-btn"><i class="{{ _icons('save') }}"></i>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--end row-->
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
            clearform()

            //hide the modal errors
            $("#formerrors").hide();

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
                ajax: "{{ route(Request::segment(1) . '.conversation_types') }}",
                columns: [{
                        data: 'id',
                        name: 'id'
                    },
                    {
                        data: 'name',
                        name: 'name'
                    },
                    @can('conversation-type-edit')
                        { 
                            data: 'action', 
                            name: 'action', 
                            orderable: false, 
                            searchable: false
                        },
                    @endcan
            ]});

            //create start
            $("#save").click(function () {
                //clear form error
                clear_validation_error();

                if ($(this).val() == 'Save') {
                    $.ajax({
                        url: "{{ route(Request::segment(1) . '.conversation_types.store') }}",
                        method: "POST",
                        data: {
                            name: $("#name").val(),
                        },
                        success: function (response) {
                            console.log(response)
                            if (response.success) {
                                Swal.fire({
                                    icon: 'success',
                                    title: "Create Successfully",
                                    timer: 2000,
                                    showConfirmButton: false,
                                    position: 'top-end',
                                    toast: true
                                });
                                $('.data-table').DataTable().ajax.reload();
                                clearform();
                            } else {
                                if(response.errors){
                                    $.each(response.errors, function (key, value) {
                                        $('#'+key+'').html(value[0]);
                                    });
                                }else{
                                        Swal.fire({
                                        icon: 'error',
                                        title: "Something is wrong !",
                                        timer: 2000,
                                        showConfirmButton: false,
                                        position: 'top-end',
                                        toast: true
                                    });
                                }
                                
                            }
                        },
                        error: function (error) {
                            Swal.fire({
                                icon: 'error',
                                title: "Something is wrong !",
                                timer: 2000,
                                showConfirmButton: false,
                                position: 'top-end',
                                toast: true
                            });
                        }
                    });
                }
            });
            //Create end

            //clear form data
            function clearform() {
                $('#name').val('');
                $("#exampleModal").modal('hide');
                clear_validation_error();
            }

            //clear validation
            function clear_validation_error() {
                $('#name_error').html('');
            }

            //close the form
            $("#close").click(function () {
                clearform();
            });

        });
    </script>
@endpush
<!--end indivisual pages javascript -->
