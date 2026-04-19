<!--start master layout -->
@extends('backend.layouts.master')
<!--end master layout -->

<!--start content -->
@section('content')
    <div class="page-content">
        <!-- start breadcrumb -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <h4>Product</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb d-flex justify-content-end">
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Product</li>
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
                                <a href="{{ route(\Request::segment(1) . '.products') }}">
                                    <button type="button" class="add-btn"><i
                                            class="{{ _icons('arrow_left') }}"></i>Back</button>
                                </a>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <form method="post" action="{{ route(\Request::segment(1) . '.products.update', $model->id) }}" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-12 col-md-6">
                                        <div>
                                            <div class="input-group">
                                                <input type="text" id="title" name="title" class="form-control" value="{{$model->title}}">
                                            </div>
                                        </div>
                                        @if ($errors->has('title'))
                                            <div class="mt-1 text-danger">{{ $errors->first('title') }}</div>
                                        @else
                                            <div class="mt-1">Title required</div>
                                        @endif
                                    </div>

                                    <div class="col-12 col-md-6 mt-2 mt-md-0">
                                        <div>
                                            <div class="input-group">
                                                <input type="text" id="link" name="link" class="form-control" value="{{$model->link}}">
                                            </div>
                                        </div>
                                        @if ($errors->has('link'))
                                            <div class="mt-1 text-danger">{{ $errors->first('link') }}</div>
                                        @else
                                            <div class="mt-1">Link (Optional)</div>
                                        @endif
                                    </div>

                                    <div class="col-12 col-md-12 mt-2">
                                        <div>
                                            <div class="input-group">
                                                <textarea type="text" id="description" name="description" class="form-control" rows="4" cols="50"> {{$model->description}}</textarea>
                                            </div>
                                        </div>
                                        @if ($errors->has('description'))
                                            <div class="mt-1 text-danger">{{ $errors->first('description') }}</div>
                                        @else
                                            <div class="mt-1">Description required</div>
                                        @endif
                                    </div>

                                    <div class="col-12 col-md-12 mt-2">
                                        <div>
                                            <div class="input-group">
                                                <input id="attachment" type="file" name="attachment" class="form-control">
                                            </div>
                                        </div>
                                        @if ($errors->has('attachment'))
                                            <div class="mt-1 text-danger">{{ $errors->first('attachment') }}</div>
                                        @else
                                            <div class="mt-1">Attachment (Optional)</div>
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
