<!doctype html>
<html lang="en">

<!-- start head section -->

<head>
    <!-- start meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- end meta tags -->

    {{-- ChatBot --}}
    {{-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/botman-web-widget@0/build/assets/css/chat.min.css"> --}}

    <!-- start favicon -->
    <link rel="icon" href="{{ asset('backend/assets/images/favicon-32x32.png') }}" type="image/png" />
    <!-- end favicon-->

    <!-- start plugins -->
    <link href="{{ asset('backend/assets/plugins/vectormap/jquery-jvectormap-2.0.2.css') }}" rel="stylesheet" />
    <link href="{{ asset('backend/assets/plugins/simplebar/css/simplebar.css') }}" rel="stylesheet" />
    <link href="{{ asset('backend/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css') }}" rel="stylesheet" />
    <link href="{{ asset('backend/assets/plugins/datatable/css/dataTables.bootstrap5.min.css') }}" rel="stylesheet" />
    <!-- end plugins -->

    <!-- start loader -->
    {{-- <link href="{{ asset('backend/assets/css/pace.min.css') }}" rel="stylesheet" />
    <script src="{{ asset('backend/assets/js/pace.min.js') }}"></script> --}}
    <!-- end loader -->

    <!-- start Bootstrap CSS -->
    <link href="{{ asset('backend/assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('backend/assets/css/bootstrap-extended.css') }}" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link href="{{ asset('backend/assets/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('backend/assets/css/icons.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <!-- end Bootstrap CSS -->

    <!-- start toastr CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
    <!-- end toastr CSS -->

    <!-- start Theme Style CSS -->
    <link rel="stylesheet" href="{{ asset('backend/assets/css/dark-theme.css') }}" />
    <link rel="stylesheet" href="{{ asset('backend/assets/css/semi-dark.css') }}" />
    <link rel="stylesheet" href="{{ asset('backend/assets/css/header-colors.css') }}" />
    <link rel="stylesheet" href="{{ asset('backend/assets/css/custom.css') }}">
    <!-- end Theme Style CSS -->

     @stack('css')
    <title>ChatBot</title>
</head>
<!-- end head section -->

<!-- start body section -->

<body>
    <!--wrapper-->
    <div class="wrapper">
        <!--start header wrapper-->
        <div class="header-wrapper">
            <!--start include header -->
            @include('backend.includes.header')
            <!--end include header -->

            <!--start include nav-->
            @include('backend.includes.nav')
            <!--end include nav-->
        </div>
        <!--end header wrapper-->

        <!--start page wrapper -->
        <div class="page-wrapper">
            @yield('content')
        </div>
        <!--end page wrapper -->
        
         <!--agent path past code demo -->
        {{-- <div id ="chat_customer_window" style="visibility:hidden;">
            <iframe src="http://114.130.69.203/chat_customer-main/vicidial_chat_customer_side.php" style="position: fixed; bottom: 87px; right: 0; margin:20px; width:300px; height:70%; z-index: 9999999999999999; border-radius: 14px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"></iframe>
        </div>
        <div id="chat_btn">
            <div onclick="chat_with_live_agent('open')" style="position: fixed; bottom: 0; right: 0; margin:20px; z-index: 9999999999999999;"><img src="http://114.130.69.203/chat_customer/images/chat_open.png" style="height: 60px;width: 60px; z-index:2;"></div>
        </div> --}}
         <!--agent path past code demo -->


        <!-- search modal -->
        <div class="modal" id="SearchModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-md-down">
                <div class="modal-content">
                    <div class="modal-header gap-2">
                        <div class="position-relative popup-search w-100">
                            <input class="form-control form-control-lg ps-5 border border-3 border-primary"
                                type="search" placeholder="Search">
                            <span
                                class="position-absolute top-50 search-show ms-3 translate-middle-y start-0 top-50 fs-4"><i
                                    class='bx bx-search'></i></span>
                        </div>
                        <button type="button" class="btn-close d-md-none" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="search-list">
                            <p class="mb-1">Html Templates</p>
                            <div class="list-group">
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action active align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-angular fs-4'></i>Best Html Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-vuejs fs-4'></i>Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-magento fs-4'></i>Responsive Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-shopify fs-4'></i>eCommerce Html Templates</a>
                            </div>
                            <p class="mb-1 mt-3">Web Designe Company</p>
                            <div class="list-group">
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-windows fs-4'></i>Best Html Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-dropbox fs-4'></i>Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-opera fs-4'></i>Responsive Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-wordpress fs-4'></i>eCommerce Html Templates</a>
                            </div>
                            <p class="mb-1 mt-3">Software Development</p>
                            <div class="list-group">
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-mailchimp fs-4'></i>Best Html Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-zoom fs-4'></i>Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-sass fs-4'></i>Responsive Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-vk fs-4'></i>eCommerce Html Templates</a>
                            </div>
                            <p class="mb-1 mt-3">Online Shoping Portals</p>
                            <div class="list-group">
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-slack fs-4'></i>Best Html Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-skype fs-4'></i>Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-twitter fs-4'></i>Responsive Html5 Templates</a>
                                <a href="javascript:;"
                                    class="list-group-item list-group-item-action align-items-center d-flex gap-2 py-1"><i
                                        class='bx bxl-vimeo fs-4'></i>eCommerce Html Templates</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end search modal -->

        <!--start overlay-->
        <div class="overlay toggle-icon"></div>
        <!--end overlay-->

        <!--Start Back To Top Button-->
        <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>
        <!--End Back To Top Button-->

        <!--include footer -->
        @include('backend.includes.footer')
        <!--include footer -->
    </div>
    <!--end wrapper-->

    <!-- All JavaScript -->

    <!-- start Bootstrap JS -->
    <script src="{{ asset('backend/assets/js/bootstrap.bundle.min.js') }}"></script>
    <!-- end Bootstrap JS -->

    <!-- start plugins js-->
    <script src="{{ asset('backend/assets/js/jquery.min.js') }}"></script>
    {{-- <script src="{{ asset('backend/assets/plugins/simplebar/js/simplebar.min.js') }}"></script> --}}
    <script src="{{ asset('backend/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js') }}"></script>
    <script src="{{ asset('backend/assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js') }}"></script>
    <script src="{{ asset('backend/assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js') }}"></script>
    <script src="{{ asset('backend/assets/plugins/chartjs/js/chart.js') }}"></script>
    <!-- end plugins js-->



	<script src="{{ asset('backend/assets/plugins/datatable/js/jquery.dataTables.min.js') }}"></script>
	<script src="{{ asset('backend/assets/plugins/datatable/js/dataTables.bootstrap5.min.js') }}"></script>

    <!-- start app JS-->
    <script src="{{ asset('backend/assets/js/app.js') }}"></script>
    <!-- end app JS-->

    <!-- start toastr JS-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    {!! @Toastr::message() !!}
    <!-- end toastr JS-->

    <!-- start indivisual js loaded -->
    @stack('js')
    <!-- end indivisual js loaded -->

    <!-- start custom JS-->
    <script type="text/javascript"></script>
    <!-- end custom JS-->


    {{-- <script>
        var botmanWidget = {
            title: 'ChatBot',
            aboutText: 'Start the conversation with Hi',
            introMessage: "Hi, I'm here to assist you! Feel free to ask me anything or let me know what you need help with"
        };
    </script> --}}

  {{--   <script src='https://cdn.jsdelivr.net/npm/botman-web-widget@0/build/js/widget.js'></script> --}}
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    {{-- <script src="http://localhost:8000/storage/attachments/cdn/js/chatbot_sdk.js"></script> --}}

    <script>
        function getCurrentTime() {
            var now = new Date();
            var hh = now.getHours();
            var min = now.getMinutes();
            var ampm = (hh >= 12) ? 'PM' : 'AM';
            hh = hh % 12;
            hh = hh ? hh : 12;
            hh = hh < 10 ? '0' + hh : hh;
            min = min < 10 ? '0' + min : min;
            var time = hh + ":" + min + " " + ampm;
            return time;
        }
    </script>

{{-- echo install fetch --}}
{{-- <script src="http://localhost:8000/js/app.js"></script> --}}



{{-- for public private chanels --}}
{{-- <script src="{{asset('js/app.js')}}"></script>
<script>
    Echo.channel('Live-Chat').listen('MessageSendEvent', (e) =>{
        console.log(e.message)
    })
</script> --}}


</body>
<!-- end body section -->

</html>
