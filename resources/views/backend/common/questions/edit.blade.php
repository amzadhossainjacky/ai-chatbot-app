<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->

@push('css')
{{-- <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/tagmanager/3.0.2/tagmanager.min.css"> --}}
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css"
    rel="stylesheet" />
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
                    <h4>Questions</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb d-flex justify-content-end">
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Questions</li>
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
                                <a href="{{ route(\Request::segment(1) . '.questions') }}">
                                    <button type="button" class="add-btn"><i
                                            class="{{ _icons('arrow_left') }}"></i>Back</button>
                                </a>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <form method="post" action="{{ route(\Request::segment(1) . '.questions.update', $model->id) }}" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-12 col-md-6 mb-2">
                                        <input type="text" class="form-control" id="question" name="question" value="{{$model->question}}">
                                        @if ($errors->has('question'))
                                            <div class="mt-1 text-danger">{{ $errors->first('question') }}</div>
                                        @else
                                            <div class="mt-1">Question required</div>
                                        @endif
                                    </div>
                                    <div class="col-12 col-md-6 mb-2">
                                        <input type="text" class="form-control" id="reply" name="reply" value="{{$model->reply}}">
                                        @if ($errors->has('reply'))
                                            <div class="mt-1 text-danger">{{ $errors->first('reply') }}</div>
                                        @else
                                            <div class="mt-1">Reply required</div>
                                        @endif
                                    </div>

                                    <div class="col-12 col-md-6 mb-2">
                                        <input type="text" class="form-control" id="conversation_type_id" value="{{@$model->conversation_types->name}}" disabled>
                                        <div class="mt-1">Conversation type required</div>
                                    </div>

                                    <div class="col-12 col-md-6 mb-2">
                                        <input type="file" class="form-control" id="attachment" name="attachment">
                                        @if ($errors->has('attachment'))
                                            <div class="mt-1 text-danger">{{ $errors->first('attachment') }}</div>
                                        @else
                                            <div class="mt-1">Attachment optional</div>
                                        @endif
                                    </div>
                                    {{-- <div>{{$model->tags}}</div> --}}
                                    <div class="col-12 col-md-6 mb-2" id="tags"  style="display: block;">
                                        <input class="form-control" type="text" data-role="tagsinput" name="tags" value="{{ $model->tags }}">
                                        <div class="mt-1">Menu tag optional</div>
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

<script>
    let conversation_type_id = document.getElementById("conversation_type_id");

            if(conversation_type_id.value != "Faq"){
                let tags = document.getElementById("tags");
                tags.style.display = 'none';
            }

        //     let selectedOption = conversation_type_id.selectedOptions[0]; // Get the first selected option
        // if (selectedOption) {
        //     let tags = document.getElementById("tags");
        //     if(selectedOption.innerHTML == "Faq"){
        //         tags.style.display = 'block';  
        //     }else{
        //         tags.style.display = 'none';
        //     }
        // }
</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.js"></script>
@endpush
