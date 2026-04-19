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
                    <h4>Products</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb d-flex justify-content-end">
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Products</li>
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
                                @can('product-create')
                                    <a  data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Link</th>
                                        <th>Image</th>
                                        @can('product-edit')
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
                <div class="col col-md-12">
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog {{-- modal-lg --}}">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Products</h5>
                                    <button type="button" class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div class="modal-body pt-3 pb-1">
                                    <div class="row">
                                        <div class="col col-md-12">
                                            <div>
                                                <label for="title" class="form-label">Title<span class="text-danger">*</span></label>
                                                <div class="input-group">
                                                    <input type="text" id="title" name="title" class="form-control" >
                                                </div>
                                                <span class="text-danger name_error d-inline-block" id="title_error"></span>
                                            </div>
        
                                            <div>
                                                <label for="description" class="form-label">Description<span class="text-danger">*</span></label>
                                                <div class="input-group">
                                                    <textarea type="text" id="description" name="description" class="form-control" rows="4" cols="50"></textarea>
                                                </div>
                                                <span class="text-danger name_error d-inline-block" id="description_error"></span>
                                            </div>
                                            <div>
                                                <label for="link" class="form-label">Link (Optional)</label>
                                                <div class="input-group">
                                                    <input type="text" id="link" name="link" class="form-control">
                                                </div>
                                                <span class="text-danger name_error d-inline-block" id="link_error"></span>
                                            </div>
                                        </div>
                                        <div class="col col-md-12">
                                            <div class="mb-2">
                                                <label for="file" class="form-label">Attachment (Optional)</label>
                                                {{-- <input id="image-uploadify" type="file" accept=".xlsx,.xls,image/*,.doc,audio/*,.docx,video/*,.ppt,.pptx,.txt,.pdf" multiple="" style="display: none;"> --}}
                                                {{-- <input id="image-uploadify" type="file" name="attachment" accept="image/*" multiple style="display: none;"> --}}
                                                <div class="input-group">
                                                    <input id="attachment" type="file" name="attachment" class="form-control">
                                                </div>
                                                <span class="text-danger name_error d-inline-block" id="attachment_error"></span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="modal-footer d-md-flex d-grid align-items-center justify-content-between gap-3 py-2 px-3 ">
                                    <div class="form-switch form-check-success">
                                        <input class="form-check-input" type="checkbox" id="is_active" name="is_active" value="1" checked>
                                    </div>
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
    <script src="{{ asset('backend/assets/plugins/Drag-And-Drop/dist/imageuploadify.min.js') }}"></script>
    <script>
        $(document).ready(function() {
            clearform()
            //checkbox initial value
            let is_active = $('#is_active').val();

            $("#is_active").click(function () {
                //after change
                if(this.checked == true){
                    is_active = 1
                }else{
                    is_active = 0
                }
            });

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
                ajax: "{{ route(Request::segment(1) . '.products') }}",
                columns: [{
                        data: 'id',
                        name: 'id'
                    },
                    {
                        data: 'title',
                        name: 'title'
                    },
                    {
                        data: 'description',
                        name: 'description'
                    },
                    {
                        data: 'link',
                        name: 'link'
                    },
                    {
                        data: 'attachment',
                        name: 'attachment'
                    },
                    @can('product-edit')
                        {
                            data: 'action',
                            name: 'action',
                            orderable: false,
                            searchable: false
                        },
                    @endcan
                    
                ],
            });

            //create start
            $("#save").click(function () {
                //clear form error
                clear_validation_error();

                if ($(this).val() == 'Save') {

                    var form_data = new FormData();
                    form_data.append('title', $("#title").val());
                    form_data.append('description', $("#description").val());
                    form_data.append('is_active', is_active);

                    if($("#link").val() !== ""){
                        form_data.append('link', $("#link").val());
                    }

                    // Get all selected files
                    let files = $('#attachment')[0].files;

                    //Count the number of files
                    var number_of_files = 0;
                    number_of_files = files.length;
                    
                    //check single file attach
                    //"Can't select multiple images, please select single one.".
                    // if(number_of_files > 1){
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: number_of_files,
                    //         timer: 2000,
                    //         showConfirmButton: false,
                    //         position: 'top-end',
                    //         toast: true
                    //     });

                    //     return 0;
                    // }

                    if(number_of_files > 0){
                        form_data.append('attachment', $('#attachment')[0].files[0]);
                    }

                    $.ajax({
                        url: "{{ route(Request::segment(1) . '.products.store') }}",
                        method: "POST",
                        data: form_data,
                        processData: false,
                        contentType: false,
                        success: function (response) {
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
                $('#title').val('');
                $('#description').val('');
                $('#link').val('');
                $('#attachment').val('');
                $("#exampleModal").modal('hide');
                clear_validation_error();
            }

            //clear validation
            function clear_validation_error() {
                $('#title_error').html('');
                $('#description_error').html('');
                $('#link_error').html('');
                $('#attachment_error').html('');
            }

            //close the form
            $("#close").click(function () {
                clearform();
            });

        });
        
    </script>
@endpush
<!--end indivisual pages javascript -->
