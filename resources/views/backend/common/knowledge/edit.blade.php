<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->

@push('css')
{{-- <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/tagmanager/3.0.2/tagmanager.min.css"> --}}
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css"
    rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.css" rel="stylesheet">
    <style>
        .bootstrap-tagsinput .tag {
            margin-right: 2px;
            color: #ffffff;
            background: #2196f3;
            padding: 3px 7px;
            border-radius: 3px;
        }
        .bootstrap-tagsinput {
            width: 100%;
        }
    </style>
@endpush

<!--start content -->
@section('content')
    <div class="page-content">
        <!-- start breadcrumb -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <h4>Knowledge</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb d-flex justify-content-end">
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Knowledge</li>
                        <li class="breadcrumb-item active" aria-current="page">Edit</li>
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
                            <div class="f-18">Edit</div>
                            <div>
                                <a href="{{ route(\Request::segment(1) . '.knowledge') }}">
                                    <button type="button" class="add-btn"><i
                                            class="{{ _icons('arrow_left') }}"></i>Back</button>
                                </a>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <form method="post" action="{{ route(\Request::segment(1) . '.knowledge.update', $model->id) }}">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-12 col-md-12 mb-2">
                                        <input type="text" class="form-control" id="title" name="title" value="{{$model->title}}">
                                        @if ($errors->has('title'))
                                            <div class="mt-1 text-danger">{{ $errors->first('title') }}</div>
                                        @else
                                            <div class="mt-1">Knowledge required</div>
                                        @endif
                                    </div>
                                    <div class="col-12 col-md-12 mb-2">
                                        <textarea class="form-control" id="description" name="description" rows="4">{!! old('description', $model->description) !!}</textarea>
                                        @if ($errors->has('description'))
                                            <div class="mt-1 text-danger">{{ $errors->first('description') }}</div>
                                        @else
                                            <div class="mt-1">Description required</div>
                                        @endif
                                    </div>

                                </div>

                                <div class="row">
                                    <label class="col-sm-3 col-form-label"></label>
                                    <div class="col-12">
                                        <div
                                            class="d-md-flex d-grid align-items-center justify-content-between gap-3 py-2 px-3 rounded-3 custom-bg">
                                            <div class="form-switch form-check-success">
                                                <input class="form-check-input" type="hidden" name="is_active"
                                                    value="0">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckSuccess" name="is_active" value="1" {{ $model->is_active == 1 ? 'checked' : '' }}>
                                            </div>

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

@push('js')

{{-- <script src="{{ asset('backend/assets/plugins/input-tags/js/tagsinput.js')}}"></script> --}}

{{-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tagmanager/3.0.2/tagmanager.min.js"></script>
<script type="text/javascript">
    $(".tm-input").tagsManager();
</script> --}}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.js"></script>
    <script>
        $(function () {
            var imageUrlButton = function (context) {
                var ui = $.summernote.ui;
                return ui.button({
                    contents: '<i class="note-icon-picture"></i>',
                    tooltip: 'Insert image by URL',
                    click: function () {
                        var url = window.prompt('Image URL');
                        if (url) {
                            context.invoke('editor.insertImage', url);
                        }
                    }
                }).render();
            };

            $('#description').summernote({
                height: 200,
                buttons: {
                    imageUrl: imageUrlButton,
                },
                toolbar: [
                    ['history', ['undo', 'redo']],
                    ['style', ['style']],
                    ['font', ['bold', 'italic', 'underline', 'clear']],
                    ['fontname', ['fontname']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'imageUrl']],
                    ['view', ['fullscreen', 'codeview', 'help']]
                ]
            });
        });
    </script>
@endpush
