<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->

@push('css')
	<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
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
                        <li class="breadcrumb-item active" aria-current="page">Create</li>
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
                            <div class="f-18">Create</div>
                            <div>
                                <a href="{{ route(\Request::segment(1) . '.product_question_mapping') }}">
                                    <button type="button" class="add-btn"><i
                                            class="{{ _icons('arrow_left') }}"></i>Back</button>
                                </a>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <form method="post" action="{{ route(\Request::segment(1) . '.product_question_mapping.store') }}">
                                @csrf
                                <div class="row mb-3">

                                    <div class="col-12 col-md-6 mb-2">
                                        <select class="form-select select2" name="question_id" id="question_id">
                                        </select>

                                        @if ($errors->has('question_id'))
                                            <div class="mt-1 text-danger">{{ $errors->first('question_id') }}</div>
                                        @else
                                            <div class="mt-1">Question required</div>
                                        @endif
                                    </div>

                                    <div class="col-12 col-md-6 mb-2">
                                        <select class="form-select select2" name="product_id[]" id="product_id" multiple="multiple">
                                        </select>

                                        @if ($errors->has('product_id'))
                                            <div class="mt-1 text-danger">{{ $errors->first('product_id') }}</div>
                                        @else
                                            <div class="mt-1">Product required</div>
                                        @endif
                                    </div>
                                </div>

                                <div class="row">
                                    <label class="col-sm-3 col-form-label"></label>
                                    <div class="col-12">
                                        <div class="d-md-flex d-grid align-items-center justify-content-start gap-3 py-2 px-3 rounded-3 custom-bg">
                                            <button type="submit" class="add-btn"><i
                                                    class="{{ _icons('save') }}"></i>Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
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
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script>
        $(document).ready(function() {
            //$('#question_id').select2();
            
            $('.select2').select2();

            //crf validated
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            //question fetch
            $('#question_id').select2({
                placeholder: 'Select question',
                minimumInputLength: 0,
                ajax: {
                    type: "POST",
                    url: "{{ url(Request::segment(1) . '/get-all-active-product-questions') }}",
                    dataType: "JSON",
                    data: function(params) {
                        return {
                            q: params.term,
                        };
                    },
                    delay: 250,

                    //mark:select
                    processResults: function(data) {
                        return {
                            results: $.map(data.data, function(item) {
                                return {
                                    text: item.question,
                                    id: item.id
                                }
                            })
                        };

                    },
                    cache: true
                }
            });

            $('#product_id').select2({
                placeholder: 'Select product',
                minimumInputLength: 0,
                ajax: {
                    type: "POST",
                    url: "{{ url(Request::segment(1) . '/get-all-active-products') }}",
                    dataType: "JSON",
                    data: function(params) {
                        return {
                            q: params.term,
                        };
                    },
                    delay: 250,

                    //mark:select
                    processResults: function(data) {
                        return {
                            results: $.map(data.data, function(item) {
                                return {
                                    text: item.title,
                                    id: item.id
                                }
                            })
                        };

                    },
                    cache: true
                }
            });

        });
        
    </script>
@endpush
<!--end indivisual pages javascript -->