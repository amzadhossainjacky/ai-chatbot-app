<!--start nav -->
<div class="primary-menu">
    <nav class="navbar navbar-expand-lg align-items-center">
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header border-bottom">
                <div class="d-flex align-items-center">
                    <div class="">
                        <img src="{{ asset('backend/assets/images/logo-icon.jpg') }}" class="logo-icon" alt="logo icon">
                    </div>
                    <div class="">
                        <h4 class="logo-text">Rocker</h4>
                    </div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav align-items-center flex-grow-1">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route(\Request::segment(1) . '.dashboard') }}">
                            <div class="menu-title d-flex align-items-end"><i class='{{_icons('home')}}'></i>Dashboard</div>
                        </a>
                    </li>
                    @can('lead-list')
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route(\Request::segment(1) . '.leads') }}">
                                <div class="menu-title d-flex align-items-end"><i class='{{ _icons('users') }}'></i>Leads</div>
                            </a>
                        </li>
                    @endcan
                  
                    @can('question-list')
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route(\Request::segment(1) . '.questions') }}">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('idea')}}'></i>Questions</div>
                            </a>
                        </li>
                    @endcan 
                    {{-- @can('product-list')
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route(\Request::segment(1) . '.products') }}">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('product')}}'></i>Products</div>
                            </a>
                        </li>
                    @endcan --}}
                    @can('knowledge-list')
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route(\Request::segment(1) . '.knowledge') }}">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('knowledge')}}'></i>Knowledge</div>
                            </a>
                        </li>
                    @endcan
                    @can('conversation-list')
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route(\Request::segment(1) . '.conversations') }}">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('messages')}}'></i>Conversations</div>
                            </a>
                        </li>
                    @endcan
                    @can('chat-menu-list')
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown" style="vertical-align: middle">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('operation')}}'></i>Chats</div>
                                <div class="ms-auto dropy-icon"><i class='{{_icons('arrow_caret_down')}}'></i></div>
                            </a>
                            <ul class="dropdown-menu">
                                @can('chat-list')
                                    <li> <a class="dropdown-item" href="{{ route(\Request::segment(1) . '.chats') }}"><i class='{{_icons('arrow_right_1')}}'></i>Chats</a></li>
                                @endcan
                            </ul>
                        </li>
                    @endcan
                    @can('mapping-menu-list')
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown" style="vertical-align: middle">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('mapping')}}'></i>Mapping</div>
                                <div class="ms-auto dropy-icon"><i class='{{_icons('arrow_caret_down')}}'></i></div>
                            </a>
                            <ul class="dropdown-menu">
                                @can('product-question-mapping-list')
                                    <li> <a class="dropdown-item" href="{{ route(\Request::segment(1) . '.product_question_mapping') }}"><i class='{{_icons('arrow_right_1')}}'></i>Product Question</a></li>
                                @endcan
                            </ul>
                        </li>
                    @endcan
                    @can('operation-menu-list')
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown" style="vertical-align: middle">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('operation')}}'></i>Operation</div>
                                <div class="ms-auto dropy-icon"><i class='{{_icons('arrow_caret_down')}}'></i></div>
                            </a>
                            <ul class="dropdown-menu">
                                @can('conversation-type-list')
                                    <li> <a class="dropdown-item" href="{{ route(\Request::segment(1) . '.conversation_types') }}"><i class='{{_icons('arrow_right_1')}}'></i>Conversation Types</a></li>
                                @endcan
                            </ul>
                        </li>
                    @endcan
                    @can('setting-menu-list')
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown" style="vertical-align: middle">
                                <div class="menu-title d-flex align-items-end"><i class='{{_icons('settings_gear')}}'></i>Setting</div>
                                <div class="ms-auto dropy-icon"><i class='{{_icons('arrow_caret_down')}}'></i></div>
                            </a>
                            <ul class="dropdown-menu">
                                @can('role-list')
                                    <li> <a class="dropdown-item" href="{{ route(\Request::segment(1) . '.roles') }}"><i class='{{_icons('arrow_right_1')}}'></i>Roles</a></li>
                                @endcan
                                @can('user-list')
                                    <li> <a class="dropdown-item" href="{{ route(\Request::segment(1) . '.users') }}"><i class='{{_icons('arrow_right_1')}}'></i>Users</a></li>
                                @endcan
                            </ul>
                        </li>
                    @endcan

                </ul>
            </div>
        </div>
    </nav>
</div>
<!--end nav -->
