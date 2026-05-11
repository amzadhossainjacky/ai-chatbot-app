"use strict";
/* var commonUrl = "https://nbrchat.ihelpbd.com/";
//var commonTicketUrl = "http://114.130.69.220/";
var commonTicketUrl = "https://omni.ihelpbd.com/";
//var commonTicketUrl = "https://172.18.49.230/";
const commonTicketBearerToken = "iHelp_Web_Fontainer@2025";
 */

var commonUrl = "http://127.0.0.1:8000/";
//var commonTicketUrl = "http://114.130.69.220/";
var commonTicketUrl = "https://omni.ihelpbd.com/";
//var commonTicketUrl = "https://172.18.49.230/";
const commonTicketBearerToken = "iHelp_Web_Fontainer@2025";

function getCurrentTime() {
    var now = new Date();
    var hh = now.getHours();
    var min = now.getMinutes();
    var ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    hh = hh ? hh : 12;
    hh = hh < 10 ? "0" + hh : hh;
    min = min < 10 ? "0" + min : min;
    var time = hh + ":" + min + " " + ampm;
    return time;
}

//time formator
function _time_format(dateString) {
    let dateObject = new Date(dateString);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();

    // Determine if it's AM or PM
    let amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 AM or 12 PM should display as 12

    // Add leading zeros if necessary
    let formattedHours = ("0" + hours).slice(-2);
    let formattedMinutes = ("0" + minutes).slice(-2);

    // Construct the time string with AM/PM indicator
    let timeString = formattedHours + ":" + formattedMinutes + " " + amOrPm;
    return timeString;
}

function create_ihelp_chatbot_card_css() {
    var create_ihelp_chatbot_card_css = document.createElement("link");

    // Set attributes for the link element
    create_ihelp_chatbot_card_css.rel = "stylesheet";
    create_ihelp_chatbot_card_css.type = "text/css";
    create_ihelp_chatbot_card_css.href =
        commonUrl + "storage/attachments/cdn/css/chatbot_sdk.css"; // URL to your CSS file

    // Append the link element to the document's head
    document.head.appendChild(create_ihelp_chatbot_card_css);

    create_ihelp_chatbot_card_css.onload = function () {
        var ihelp_chatbot_card_layout = create_ihelp_chatbot_card_layout();
        var ihelp_chatbot_appear_layout = create_ihelp_chatbot_appear_layout();

        document.body.appendChild(ihelp_chatbot_card_layout);
        document.body.appendChild(ihelp_chatbot_appear_layout);
        // Initialize Select2 after the elements are added to the DOM

        $(document).ready(function () {
            $(".ihelp_ticket_sector_select").select2();
            $(".ihelp_ticket_bsw_select").select2();
            $(".ihelp_ticket_agency_type_select").select2();
            $(".ihelp_ticket_type_of_clp_select").select2();
            $(".ihelp_ticket_issue_category_select").select2();
        });
    };
}

//ihelp chatbot card layout methods
function create_ihelp_chatbot_card_layout() {
    /*#########################################################################################           
                                ihelp chatbot card container start         
    #########################################################################################*/

    let ihelp_chatbot_card_container = document.createElement("div");
    ihelp_chatbot_card_container.id = "ihelp_chatbot_card";
    ihelp_chatbot_card_container.classList.add("ihelp_chatbot_card", "hidden");

    /*#############           ihelp chatbot card head container start         #############*/
    let ihelp_chatbot_card_head_container = document.createElement("div");
    ihelp_chatbot_card_head_container.classList.add("ihelp_chatbot_card_head");
    ihelp_chatbot_card_container.appendChild(ihelp_chatbot_card_head_container);

    /**************           ihelp chatbot card head user container start         *************/
    let ihelp_chatbot_card_head_user_container = document.createElement("div");
    ihelp_chatbot_card_head_user_container.classList.add(
        "ihelp_chatbot_card_head_user"
    );
    ihelp_chatbot_card_head_container.appendChild(
        ihelp_chatbot_card_head_user_container
    );

    /**************           ihelp chatbot card head image  start         *************/
    // let ihelp_chatbot_card_head_image = document.createElement('img');
    // ihelp_chatbot_card_head_image.src = 'images/bot.jpg';
    // ihelp_chatbot_card_head_image.classList.add('bot_image');
    // ihelp_chatbot_card_head_user_container.appendChild(ihelp_chatbot_card_head_image);

    let ihelp_chatbot_card_head_image = document.createElement("div");
    //ihelp_chatbot_card_head_image.classList.add('bot_image');
    ihelp_chatbot_card_head_image.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
                <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
                </svg>`;
    ihelp_chatbot_card_head_user_container.appendChild(
        ihelp_chatbot_card_head_image
    );
    /**************           ihelp chatbot card head image  end         *************/

    /**************           ihelp chatbot card head user status container start         *************/
    let ihelp_chatbot_card_head_user_status_container =
        document.createElement("div");
    ihelp_chatbot_card_head_user_status_container.classList.add(
        "ihelp_chatbot_card_head_user_status"
    );
    ihelp_chatbot_card_head_user_container.appendChild(
        ihelp_chatbot_card_head_user_status_container
    );

    /**************           ihelp chatbot card head user status details container start         *************/
    let ihelp_chatbot_card_head_user_status_details_container =
        document.createElement("div");
    ihelp_chatbot_card_head_user_status_details_container.classList.add(
        "ihelp_chatbot_card_head_user_status_details"
    );
    ihelp_chatbot_card_head_user_status_details_container.id =  "ihelp_chatbot_card_head_user_status_details_container";
    ihelp_chatbot_card_head_user_status_container.appendChild(
        ihelp_chatbot_card_head_user_status_details_container
    );

    //create the heading element of user status details
    let ihelp_chatbot_card_head_user_status_details_heading_element =
        document.createElement("h1");
    ihelp_chatbot_card_head_user_status_details_heading_element.textContent =
        "BSW";
    ihelp_chatbot_card_head_user_status_details_container.appendChild(
        ihelp_chatbot_card_head_user_status_details_heading_element
    );

    //ceate the span element of user status details
    let ihelp_chatbot_card_head_user_status_details_span_element =
        document.createElement("span");
    ihelp_chatbot_card_head_user_status_details_span_element.textContent =
        "Chat";
    ihelp_chatbot_card_head_user_status_details_container.appendChild(
        ihelp_chatbot_card_head_user_status_details_span_element
    );
    ihelp_chatbot_card_head_user_status_container.appendChild(
        ihelp_chatbot_card_head_user_status_details_container
    );
    /**************           ihelp chatbot card head user status details container end         *************/

    /**************           ihelp chatbot card minimize container start         *************/
    let ihelp_chatbot_card_minimize_container = document.createElement("div");
    ihelp_chatbot_card_minimize_container.classList.add(
        "ihelp_chatbot_card_minimize"
    );
    ihelp_chatbot_card_head_user_status_container.appendChild(
        ihelp_chatbot_card_minimize_container
    );

    let ihelp_chatbot_card_minimize_span_element =
        document.createElement("span");
    ihelp_chatbot_card_minimize_span_element.id =
        "ihelp_chatbot_card_minimize_icon";
    ihelp_chatbot_card_minimize_span_element.classList.add(
        "ihelp_chatbot_card_close_icon"
    );
    ihelp_chatbot_card_minimize_span_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/></svg>`;
    ihelp_chatbot_card_minimize_container.appendChild(
        ihelp_chatbot_card_minimize_span_element
    );
    /**************           ihelp chatbot card close container end         *************/

    /**************           ihelp chatbot card close container start         *************/
    let ihelp_chatbot_card_close_container = document.createElement("div");
    ihelp_chatbot_card_close_container.classList.add(
        "ihelp_chatbot_card_close"
    );
    ihelp_chatbot_card_head_user_status_container.appendChild(
        ihelp_chatbot_card_close_container
    );

    let ihelp_chatbot_card_close_span_element = document.createElement("span");
    ihelp_chatbot_card_close_span_element.id = "ihelp_chatbot_card_close_icon";
    ihelp_chatbot_card_close_span_element.classList.add(
        "ihelp_chatbot_card_close_icon"
    );
    //ihelp_chatbot_card_close_span_element.textContent = 'X';
    ihelp_chatbot_card_close_span_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>`;
    ihelp_chatbot_card_close_container.appendChild(
        ihelp_chatbot_card_close_span_element
    );
    /**************           ihelp chatbot card close container end         *************/
    /**************           ihelp chatbot card head user status container end         *************/
    /**************           ihelp chatbot card head user container end         *************/
    /*#############           ihelp chatbot card head container end         #############*/

    // <div class="">
    //     <span class="" id=""></span>
    // </div>
    // <div class="ihelp_chatbot_card_close">
    //     <span class="ihelp_chatbot_card_close_icon" id="ihelp_chatbot_card_close_icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    //         <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
    //       </svg></span>
    // </div>

    /*#############           ihelp chatbot card body container start         #############*/
    let ihelp_chatbot_main_body_container = document.createElement("div");
    ihelp_chatbot_main_body_container.classList.add("ihelp_chatbot_main_body");
    ihelp_chatbot_card_container.appendChild(ihelp_chatbot_main_body_container);

    /*(((((())))))         ihelp chatbot message box start          (((((())))))*/
    let ihelp_chatbot_message_box = document.createElement("div");
    ihelp_chatbot_message_box.classList.add("ihelp_chatbot_message_container");
    ihelp_chatbot_main_body_container.appendChild(ihelp_chatbot_message_box);

    /**************           ihelp chatbot card message body container start         *************/
    let ihelp_chatbot_message_body_container = document.createElement("div");
    ihelp_chatbot_message_body_container.classList.add(
        "ihelp_chatbot_card_message_body"
    );
    ihelp_chatbot_message_body_container.id = "ihelp_chatbot_card_message_body";
    ihelp_chatbot_message_box.appendChild(ihelp_chatbot_message_body_container);

    /**************           ihelp chatbot card message chatlist container start         *************/
    let ihelp_chatbot_message_chatlist_container =
        document.createElement("div");
    ihelp_chatbot_message_chatlist_container.classList.add(
        "ihelp_chatbot_card_message_chatlist"
    );
    ihelp_chatbot_message_chatlist_container.id =
        "ihelp_chatbot_card_message_chatlist";

    //     ihelp_chatbot_message_chatlist_container.innerHTML = `<ul class="ihelp_chatbot_chat_card_list" id="ihelp_chatbot_chat_card_list">
    //     <li class="ihelp_chatbot_chat_single_card">
    //         <div class="ihelp_chatbot_chat_single_card_image"> <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""></div>
    //         <div class="ihelp_chatbot_chat_single_card_content">
    //             <h3>Hyped Mind studio enterprise</h3>
    //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, esse. Lorem ipsum dolor sit amet.</p>
    //             <p class="small_text">Lorem ipsum dolor sit amet.</p>

    //             <a href="" class="ihelp_chatbot_chat_single_card_button">Find out more</a>
    //         </div>
    //     </li>
    //     <li class="ihelp_chatbot_chat_single_card">
    //         <div class="ihelp_chatbot_chat_single_card_image"> <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""></div>
    //         <div class="ihelp_chatbot_chat_single_card_content">
    //             <h3>Hyped Mind studio enterprise</h3>
    //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, esse. Lorem ipsum dolor sit amet.</p>
    //             <p class="small_text">Lorem ipsum dolor sit amet.</p>

    //             <a href="" class="ihelp_chatbot_chat_single_card_button">Find out more</a>
    //         </div>
    //     </li>
    // </ul>`;

    ihelp_chatbot_message_body_container.appendChild(
        ihelp_chatbot_message_chatlist_container
    );
    /**************           ihelp chatbot card message chatlist container end          *************/

    /**************           ihelp chatbot card message body container end          *************/

    /**************           ihelp chatbot card message footer container start         *************/
    let ihelp_chatbot_message_body_footer_container =
        document.createElement("div");
    ihelp_chatbot_message_body_footer_container.classList.add(
        "ihelp_chatbot_card_message_footer"
    );
    ihelp_chatbot_message_body_footer_container.id =
        "ihelp_chatbot_question_form";
    ihelp_chatbot_message_box.appendChild(
        ihelp_chatbot_message_body_footer_container
    );

    /**************           ihelp chatbot card footer container start         *************/
    let ihelp_chatbot_card_footer_container = document.createElement("div");
    ihelp_chatbot_card_footer_container.id =
        "ihelp_chatbot_card_footer_container";
    ihelp_chatbot_card_footer_container.classList.add(
        "ihelp_chatbot_card_for_footer_container"
    );
    ihelp_chatbot_card_container.appendChild(
        ihelp_chatbot_card_footer_container
    );

    /**************           ihelp chatbot card footer container end         *************/

    /*************           ihelp chatbot card footer button container start       *************/
    let ihelp_chatbot_card_footer_button_container =
        document.createElement("div");
    ihelp_chatbot_card_footer_button_container.id =
        "ihelp_chatbot_card_footer_button_container";
    ihelp_chatbot_card_footer_button_container.classList.add(
        "ihelp_chatbot_card_for_footer_button_container"
    );
    ihelp_chatbot_card_footer_container.appendChild(
        ihelp_chatbot_card_footer_button_container
    );
    /**************           ihelp chatbot card footer button container end         *************/

    /**************           ihelp chatbot card footer left button container start       *************/
    let ihelp_chatbot_card_footer_left_button =
        document.createElement("button");
    ihelp_chatbot_card_footer_left_button.id =
        "ihelp_chatbot_card_footer_left_button";
    ihelp_chatbot_card_footer_left_button.classList.add(
        "ihelp_chatbot_card_for_footer_left_button"
    );
    ihelp_chatbot_card_footer_left_button.innerHTML = "Ticket";
    ihelp_chatbot_card_footer_button_container.appendChild(
        ihelp_chatbot_card_footer_left_button
    );
    /**************           ihelp chatbot card footer left button container end         *************/

    /**************           ihelp chatbot card footer right button container start       *************/
    let ihelp_chatbot_card_footer_right_button =
        document.createElement("button");
    ihelp_chatbot_card_footer_right_button.id =
        "ihelp_chatbot_card_footer_right_button";
    ihelp_chatbot_card_footer_right_button.classList.add(
        "ihelp_chatbot_card_for_footer_right_button"
    );
    ihelp_chatbot_card_footer_right_button.innerHTML = "Chat";
    ihelp_chatbot_card_footer_button_container.appendChild(
        ihelp_chatbot_card_footer_right_button
    );
    /**************           ihelp chatbot card footer right button container end         *************/

    /**************           ihelp chatbot ticket card body container start          *************/
    let ihelp_chatbot_for_ticket_container_box = document.createElement("div");

    ihelp_chatbot_for_ticket_container_box.classList.add(
        "ihelp_chatbot_for_ticket_container_box"
    );
    ihelp_chatbot_for_ticket_container_box.classList.add("hidden");
    ihelp_chatbot_for_ticket_container_box.id =
        "ihelp_chatbot_ticket_container_box";
    ihelp_chatbot_main_body_container.appendChild(
        ihelp_chatbot_for_ticket_container_box
    );

    // Create Name field
    let ihelp_ticket_name_label = document.createElement("label");
    ihelp_ticket_name_label.htmlFor = "ihelpContactName";
    ihelp_ticket_name_label.innerText = "Contact Name / পরিচিতির নাম";
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_ticket_name_label);

    let ihelp_ticket_name_input = document.createElement("input");
    ihelp_ticket_name_input.type = "text";
    ihelp_ticket_name_input.id = "ihelp_contact_name";
    ihelp_ticket_name_input.name = "ihelp_contact_name";
    ihelp_ticket_name_input.placeholder = "Enter your name";
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_ticket_name_input);

    // Create error message container (empty by default)
    let ihelp_ticket_name_error = document.createElement("div");
    ihelp_ticket_name_error.id = "ihelp_contact_name_error";
    ihelp_ticket_name_error.className = "error-message";
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_ticket_name_error);

    // Create Email field
    let ihelp_ticket_email_label = document.createElement("label");
    ihelp_ticket_email_label.htmlFor = "email";
    ihelp_ticket_email_label.innerHTML =
        'Email / ইমেইল <span style="color:red">*</span>';
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_email_label
    );

    let ihelp_ticket_email_label_input = document.createElement("input");
    ihelp_ticket_email_label_input.type = "email";
    ihelp_ticket_email_label_input.id = "ihelp_email";
    ihelp_ticket_email_label_input.name = "ihelp_email";
    ihelp_ticket_email_label_input.required = true;
    ihelp_ticket_email_label_input.placeholder = "Enter your email";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_email_label_input
    );

    // Create error message container (empty by default)
    let ihelp_ticket_email_error = document.createElement("div");
    ihelp_ticket_email_error.id = "ihelp_contact_email_error";
    ihelp_ticket_email_error.className = "error-message";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_email_error
    );

    /*#################  sector html start  ####################*/
    // Create Sector field
    let ihelp_ticket_sector_label = document.createElement("label");
    ihelp_ticket_sector_label.htmlFor = "ihelpSector";
    ihelp_ticket_sector_label.innerHTML =
        'Sector of user reporting Issues <span style="color:red">*</span>';
    ihelp_ticket_sector_label.title =
        "Select the sector or department related to the issue";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_sector_label
    );

    // Create <select> element
    let ihelp_ticket_sector_select = document.createElement("select");
    ihelp_ticket_sector_select.id = "ihelp_sector";
    ihelp_ticket_sector_select.name = "ihelp_sector";
    ihelp_ticket_sector_select.classList.add("ihelp_ticket_sector_select");

    // // Create and append <option>s
    // let optionPrivate = document.createElement("option");
    /* optionPrivate.value = "Private";
    optionPrivate.text = "Private";
    optionPrivate.selected = true;

    let optionPublic = document.createElement("option");
    optionPublic.value = "Public";
    optionPublic.text = "Public";

    let optionNGO = document.createElement("option");
    optionNGO.value = "NGO";
    optionNGO.text = "NGO";

    // Append options to the select
    ihelp_ticket_sector_select.appendChild(optionPrivate);
    ihelp_ticket_sector_select.appendChild(optionPublic);
    ihelp_ticket_sector_select.appendChild(optionNGO); */

    // Append select to the container
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_sector_select
    );

    /*#################  sector html end  ####################*/

    // Create subject field
    let ihelp_ticket_subject_label = document.createElement("label");
    ihelp_ticket_subject_label.htmlFor = "ihelpSubjectName";
    ihelp_ticket_subject_label.innerHTML =
        'Subject / বিষয় <span style="color:red">*</span>';
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_subject_label
    );

    let ihelp_ticket_subject_input = document.createElement("input");
    ihelp_ticket_subject_input.type = "text";
    ihelp_ticket_subject_input.id = "ihelp_subject_name";
    ihelp_ticket_subject_input.name = "ihelp_subject_name";
    ihelp_ticket_subject_input.required = true;
    ihelp_ticket_subject_input.placeholder = "Enter subject";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_subject_input
    );

    // Create error message container (empty by default)
    let ihelp_ticket_subject_error = document.createElement("div");
    ihelp_ticket_subject_error.id = "ihelp_contact_subject_error";
    ihelp_ticket_subject_error.className = "error-message";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_subject_error
    );

    // Create description field
    let ihelp_ticket_description_label = document.createElement("label");
    ihelp_ticket_description_label.htmlFor = "ihelpDescription";
    ihelp_ticket_description_label.innerText = "Description / বর্ণনা";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_description_label
    );

    let ihelp_ticket_description_textarea = document.createElement("textarea");
    ihelp_ticket_description_textarea.id = "ihelp_description";
    ihelp_ticket_description_textarea.name = "ihelp_description";
    ihelp_ticket_description_textarea.placeholder = "Enter description";
    ihelp_ticket_description_textarea.rows = 8; // You can adjust the rows and cols if needed
    ihelp_ticket_description_textarea.cols = 20;

    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_description_textarea
    );

    /*#################  bsw html start  ####################*/
    // Create Sector field
    let ihelp_ticket_bsw_label = document.createElement("label");
    ihelp_ticket_bsw_label.htmlFor = "ihelpBSW";
    ihelp_ticket_bsw_label.innerHTML =
        'BSW Application <span style="color:red">*</span>';
    ihelp_ticket_bsw_label.title =
        "Please Provide the related BSW Services for Issue Handling";
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_ticket_bsw_label);

    // Create <select> element
    let ihelp_ticket_bsw_select = document.createElement("select");
    ihelp_ticket_bsw_select.id = "ihelp_bsw";
    ihelp_ticket_bsw_select.name = "ihelp_bsw";
    ihelp_ticket_bsw_select.classList.add("ihelp_ticket_bsw_select");

    // Create and append <option>s
    /* let name_option_clp = document.createElement("option");
    name_option_clp.value = "CLP";
    name_option_clp.text = "CLP";
    name_option_clp.selected = true;

    let name_option_tariff = document.createElement("option");
    name_option_tariff.value = "Tariff or AI Tariff";
    name_option_tariff.text = "Tariff or AI Tariff";

    // Append options to the select
    ihelp_ticket_bsw_select.appendChild(name_option_clp);
    ihelp_ticket_bsw_select.appendChild(name_option_tariff); */

    // Append select to the container
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_ticket_bsw_select);

    /*#################  bsw html end  ####################*/

    /*#################  agency type html start  ####################*/
    // Create Sector field
    let ihelp_ticket_agency_type_label = document.createElement("label");
    ihelp_ticket_agency_type_label.htmlFor = "agencyType";
    ihelp_ticket_agency_type_label.innerHTML =
        'Agency Type / এজেন্সির ধরন <span style="color:red">*</span>';
    ihelp_ticket_agency_type_label.title =
        "Please Provide the related BSW Services for Issue Handling";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_agency_type_label
    );

    // Create <select> element
    let ihelp_ticket_agency_type_select = document.createElement("select");
    ihelp_ticket_agency_type_select.id = "ihelp_agent_type";
    ihelp_ticket_agency_type_select.name = "ihelp_agent_type";
    ihelp_ticket_agency_type_select.classList.add(
        "ihelp_ticket_agency_type_select"
    );

    // Create and append <option>s
    /* let name_option_general_drug = document.createElement("option");
    name_option_general_drug.value =
        "DGDA : Directorate General of Drug Administration";
    name_option_general_drug.text =
        "DGDA : Directorate General of Drug Administration";
    name_option_general_drug.selected = true;

    let name_option_department_enviroment = document.createElement("option");
    name_option_department_enviroment.value = "DOE : Department of Environment";
    name_option_department_enviroment.text = "DOE : Department of Environment";

    // Append options to the select
    ihelp_ticket_agency_type_select.appendChild(name_option_general_drug);
    ihelp_ticket_agency_type_select.appendChild(
        name_option_department_enviroment
    ); */

    // Append select to the container
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_agency_type_select
    );

    let ihelp_ticket_agency_type_error = document.createElement("div");
    ihelp_ticket_agency_type_error.id = "ihelp_contact_agency_error";
    ihelp_ticket_agency_type_error.className = "error-message";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_agency_type_error
    );

    /*#################  agency type html end  ####################*/

    /*#################  type of clp html start  ####################*/
    // Create Sector field
    let ihelp_ticket_type_of_clp_label = document.createElement("label");
    ihelp_ticket_type_of_clp_label.htmlFor = "ihelpClp";
    ihelp_ticket_type_of_clp_label.innerHTML =
        'Type of CLP / নির্বাচন করুন<span style="color:red">*</span>';
    ihelp_ticket_type_of_clp_label.title = "Please Provide the type of clp";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_type_of_clp_label
    );

    let ihelp_ticket_type_of_clp_select = document.createElement("select");
    ihelp_ticket_type_of_clp_select.id = "ihelp_type_of_clp";
    ihelp_ticket_type_of_clp_select.name = "ihelp_type_of_clp[]";
    ihelp_ticket_type_of_clp_select.multiple = true; // for multi-select
    ihelp_ticket_type_of_clp_select.classList.add(
        "ihelp_ticket_type_of_clp_select"
    );

    // Create and append <option>s
    /* let name_option_import_of_hazardous = document.createElement("option");
    name_option_import_of_hazardous.value =
        "4601 DoE Clearance Certificate for Import of Hazardous Substances";
    name_option_import_of_hazardous.text =
        "4601 DoE Clearance Certificate for Import of Hazardous Substances";

    let name_option_import_of_hazardous_4601 = document.createElement("option");
    name_option_import_of_hazardous_4601.value =
        "4602 DoE Clearance Certificate for Export of Hazardous Substances";
    name_option_import_of_hazardous_4601.text =
        "4602 DoE Clearance Certificate for Export of Hazardous Substances";

    // Append options to the select
    ihelp_ticket_type_of_clp_select.appendChild(
        name_option_import_of_hazardous
    );
    ihelp_ticket_type_of_clp_select.appendChild(
        name_option_import_of_hazardous_4601
    ); */

    // Append select to the container
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_type_of_clp_select
    );

    let clpErrorDiv = document.createElement("div");
    clpErrorDiv.id = "ihelp_contact_type_of_clp_error";
    clpErrorDiv.className = "error-message";
    ihelp_chatbot_for_ticket_container_box.appendChild(clpErrorDiv);

    /*#################  type of clp html end  ####################*/

    /*#################  issue category html start  ####################*/
    // Create Sector field
    let ihelp_ticket_issue_category_label = document.createElement("label");
    ihelp_ticket_issue_category_label.htmlFor = "issueCategory";
    ihelp_ticket_issue_category_label.innerHTML =
        'Issue Category / সমস্যার ধরন <span style="color:red">*</span>';
    ihelp_ticket_issue_category_label.title =
        "Please Provide the related issue category for Issue Handling";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_issue_category_label
    );

    // Create <select> element
    let ihelp_ticket_issue_category_select = document.createElement("select");
    ihelp_ticket_issue_category_select.id = "ihelp_issue_category";
    ihelp_ticket_issue_category_select.name = "ihelp_issue_category";
    ihelp_ticket_issue_category_select.classList.add(
        "ihelp_ticket_issue_category_select"
    );

    /* // Create and append <option>s
    let name_option_none = document.createElement("option");
    name_option_none.value = "CLP";
    name_option_none.text = "CLP";
    name_option_none.selected = true;

    let name_option_clp_application_submission =
        document.createElement("option");
    name_option_clp_application_submission.value = "CLP Application Submission";
    name_option_clp_application_submission.text = "CLP Application Submission";

    // Append options to the select
    ihelp_ticket_issue_category_select.appendChild(name_option_none);
    ihelp_ticket_issue_category_select.appendChild(
        name_option_clp_application_submission
    ); */

    // Append select to the container
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_issue_category_select
    );

    /*#################  issue category html end  ####################*/

    /*#################  issue capcha html start  ####################*/

    let ihelp_ticket_capcha_label = document.createElement("label");
    ihelp_ticket_capcha_label.htmlFor = "capcha";
    ihelp_ticket_capcha_label.innerHTML =
        'Please verify to proceed <span style="color:red">*</span>';
    ihelp_ticket_capcha_label.title =
        "Please verify to proceed for human verification";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_capcha_label
    );

    // Create the CAPTCHA container div
    let ihelp_ticket_captcha = document.createElement("div");
    ihelp_ticket_captcha.id = "captcha";

    // Create the input box for user to type captcha answer
    let ihelp_captcha_input = document.createElement("input");
    ihelp_captcha_input.type = "text";
    ihelp_captcha_input.placeholder = "Captcha";
    ihelp_captcha_input.id = "cpatchaTextBox";
    ihelp_captcha_input.name = "captcha_input";

    // Append both to your container
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_ticket_captcha);
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_captcha_input);

    let ihelp_captcha_error = document.createElement("div");
    ihelp_captcha_error.id = "ihelp_captcha_error";
    ihelp_captcha_error.className = "error-message";
    ihelp_chatbot_for_ticket_container_box.appendChild(ihelp_captcha_error);
    /*#################  issue capcha html end  ####################*/

    //Create wrapper div to hold everything
    let ihelp_ticket_attchment_label = document.createElement("label");
    ihelp_ticket_attchment_label.htmlFor = "ihelpAttachment";
    ihelp_ticket_attchment_label.innerHTML = "Attachment / সংযুক্তি (Optional)";
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_attchment_label
    );
    const ihelp_ticket_attachment_container = document.createElement("div");

    // Create first <p> block (button + file input)
    const upload_wrapper = document.createElement("p");

    // Create <label> for input
    const upload_label = document.createElement("label");
    upload_label.htmlFor = "attachment";

    // Create <a> button inside label
    const upload_btn = document.createElement("a");
    upload_btn.id = "ihelp_attachment_button";
    upload_btn.setAttribute("role", "button");
    upload_btn.setAttribute("aria-disabled", "false");
    upload_btn.innerText = "+ Attach File";

    // Append button to label, label to uploadWrapper
    upload_label.appendChild(upload_btn);
    // upload_wrapper.appendChild(upload_label);

    // Create <input type="file">
    const upload_input = document.createElement("input");
    upload_input.type = "file";
    upload_input.name = "file[]";
    upload_input.accept = ".pdf";
    upload_input.id = "attachment";
    upload_input.style.visibility = "hidden";
    upload_input.style.position = "absolute";
    upload_input.multiple = true;

    // Append input to uploadWrapper
    upload_wrapper.appendChild(upload_input);

    // Create second <p> block for file names
    const files_area = document.createElement("p");
    files_area.id = "files_area";

    const files_list = document.createElement("span");
    files_list.id = "files_list";

    const files_names = document.createElement("span");
    files_names.id = "files_names";

    // Nest the spans
    files_list.appendChild(files_names);
    files_area.appendChild(files_list);

    // Append everything to main container

    ihelp_ticket_attachment_container.appendChild(upload_label);
    ihelp_ticket_attachment_container.appendChild(upload_wrapper);
    ihelp_ticket_attachment_container.appendChild(files_area);

    // Append main container to chatbot box
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_attachment_container
    );

    // Create Submit Button
    let ihelp_ticket_submit_button = document.createElement("button");
    ihelp_ticket_submit_button.type = "submit";
    ihelp_ticket_submit_button.id = "ihelp_ticket_submit_button";
    ihelp_ticket_submit_button.innerText = "Submit";

    // Append to container
    ihelp_chatbot_for_ticket_container_box.appendChild(
        ihelp_ticket_submit_button
    );
    /**************           ihelp chatbot card body container end          *************/

    /**************           ihelp chatbot messaage popup menu container start         *************/
    let ihelp_chatbot_messaage_popup_menu_container =
        document.createElement("div");
    ihelp_chatbot_messaage_popup_menu_container.classList.add(
        "messaage_popup_menu"
    );
    ihelp_chatbot_message_body_footer_container.appendChild(
        ihelp_chatbot_messaage_popup_menu_container
    );

    /**************           ihelp chatbot messaage popup menu icon container start         *************/
    let ihelp_chatbot_message_popup_menu_icon_container =
        document.createElement("span");
    ihelp_chatbot_message_popup_menu_icon_container.classList.add(
        "message_popup_menu_icon"
    );
    ihelp_chatbot_message_popup_menu_icon_container.id =
        "message_popup_menu_icon";
    ihelp_chatbot_message_popup_menu_icon_container.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>`;
    ihelp_chatbot_messaage_popup_menu_container.appendChild(
        ihelp_chatbot_message_popup_menu_icon_container
    );
    /**************           ihelp chatbot messaage popup menu icont container end          *************/

    /**************           ihelp chatbot messaage popup menu bar container start         *************/
    let ihelp_chatbot_messaage_popup_menu_bar_container =
        document.createElement("div");
    ihelp_chatbot_messaage_popup_menu_bar_container.classList.add(
        "messaage_popup_menu_bar",
        "menu_bar_hidden"
    );
    ihelp_chatbot_messaage_popup_menu_bar_container.id =
        "messaage_popup_menu_bar";
    ihelp_chatbot_messaage_popup_menu_container.appendChild(
        ihelp_chatbot_messaage_popup_menu_bar_container
    );

    /**************           ihelp chatbot message popup menu box start         *************/
    let ihelp_chatbot_messaage_popup_menu_bar_box =
        document.createElement("div");
    ihelp_chatbot_messaage_popup_menu_bar_box.classList.add(
        "message_popup_menu_bar_container"
    );
    ihelp_chatbot_messaage_popup_menu_bar_container.appendChild(
        ihelp_chatbot_messaage_popup_menu_bar_box
    );

    /**************           ihelp chatbot message popup menu list start         *************/
    let ihelp_chatbot_messaage_popup_menu_list = document.createElement("div");
    ihelp_chatbot_messaage_popup_menu_list.classList.add(
        "message_popup_menu_bar_list"
    );
    ihelp_chatbot_messaage_popup_menu_list.id = "message_popup_menu_bar_list";
    // ihelp_chatbot_messaage_popup_menu_list.innerHTML = `<a href="#" class="messaage_bar_link">Appointment</a>
    //     <a href="#" class="messaage_bar_link">FAQ</a>
    //     <a href="#" class="messaage_bar_link">FAQ</a>
    //     <a href="#" class="messaage_bar_link">FAQ</a>
    //     <a href="#" class="messaage_bar_link">FAQ</a>
    //     <a href="#" class="messaage_bar_link">FAQ</a>`;

    ihelp_chatbot_messaage_popup_menu_bar_box.appendChild(
        ihelp_chatbot_messaage_popup_menu_list
    );
    /**************           ihelp chatbot message popup menu list end          *************/

    /**************           help chatbot message popup menu box end          *************/
    /**************           ihelp chatbot messaage popup menu bar container end          *************/
    /**************           ihelp chatbot messaage popup menu container end          *************/

    /**************           ihelp chatbot message form container start         *************/
    let ihelp_chatbot_message_form_container = document.createElement("form");
    ihelp_chatbot_message_form_container.classList.add("ihelp_chatbot_form");
    ihelp_chatbot_message_form_container.action = "";
    ihelp_chatbot_message_body_footer_container.appendChild(
        ihelp_chatbot_message_form_container
    );

    /**************            ihelp chatbot message form input start         *************/
    let ihelp_chatbot_message_form_input = document.createElement("input");
    ihelp_chatbot_message_form_input.id = "ihelp_chatbot_question_input";
    ihelp_chatbot_message_form_input.classList.add("ihelp_chatbot_input");
    ihelp_chatbot_message_form_input.type = "text";
    ihelp_chatbot_message_form_input.name = "question";
    ihelp_chatbot_message_form_input.placeholder = "Enter your query";
    ihelp_chatbot_message_form_container.appendChild(
        ihelp_chatbot_message_form_input
    );
    /**************           i ihelp chatbot message form input end         *************/

    /**************           ihelp chatbot phone form input button start         *************/
    let ihelp_chatbot_message_form_input_button =
        document.createElement("button");
    ihelp_chatbot_message_form_input_button.textContent = "Send";
    ihelp_chatbot_message_form_container.appendChild(
        ihelp_chatbot_message_form_input_button
    );
    /**************           ihelp chatbot phone form input button end         *************/

    /**************            ihelp chatbot message form container end          *************/
    /**************           ihelp chatbot card message footer container end          *************/
    /*(((((())))))         ihelp chatbot message box end          (((((())))))*/

    /*(((((())))))         ihelp chatbot phone box start          (((((())))))*/
    let ihelp_chatbot_phone_box = document.createElement("div");
    ihelp_chatbot_phone_box.classList.add("ihelp_chatbot_phone_container");
    ihelp_chatbot_phone_box.id = "ihelp_chatbot_phone_container";
    ihelp_chatbot_main_body_container.appendChild(ihelp_chatbot_phone_box);

    /**************           ihelp chatbot phone class start         *************/
    let ihelp_chatbot_phone_div = document.createElement("div");
    ihelp_chatbot_phone_div.classList.add("ihelp_chatbot_phone");
    ihelp_chatbot_phone_box.appendChild(ihelp_chatbot_phone_div);

    /**************           ihelp chatbot phone form container start         *************/
    let ihelp_chatbot_phone_form_container = document.createElement("form");
    ihelp_chatbot_phone_form_container.classList.add(
        "ihelp_chatbot_phone_form"
    );
    ihelp_chatbot_phone_form_container.id = "ihelp_chatbot_phone_form";
    ihelp_chatbot_phone_form_container.action = "";
    ihelp_chatbot_phone_div.appendChild(ihelp_chatbot_phone_form_container);

    /**************           ihelp chatbot phone form input start         *************/
    let ihelp_chatbot_phone_form_input = document.createElement("input");
    ihelp_chatbot_phone_form_input.id = "ihelp_chatbot_phone_input";
    ihelp_chatbot_phone_form_input.classList.add("ihelp_chatbot_phone_input");
    ihelp_chatbot_phone_form_input.type = "number";
    ihelp_chatbot_phone_form_input.name = "phone";
    ihelp_chatbot_phone_form_input.value = "";
    ihelp_chatbot_phone_form_input.placeholder = "Enter your phone number";
    ihelp_chatbot_phone_form_container.appendChild(
        ihelp_chatbot_phone_form_input
    );
    /**************           ihelp chatbot phone form input end         *************/

    /**************           ihelp chatbot phone form input button start         *************/
    let ihelp_chatbot_phone_form_input_button =
        document.createElement("button");
    ihelp_chatbot_phone_form_input_button.textContent = "Enter";
    ihelp_chatbot_phone_form_container.appendChild(
        ihelp_chatbot_phone_form_input_button
    );
    /**************           ihelp chatbot phone form input button end         *************/
    /**************          ihelp chatbot phone form container end         *************/
    /**************           ihelp chatbot phone class end         *************/
    /*(((((())))))         ihelp chatbot phone box end          (((((())))))*/

    /*(((((())))))         ihelp chatbot urge phone box start          (((((())))))*/
    let ihelp_chatbot_urge_phone_box = document.createElement("div");
    ihelp_chatbot_urge_phone_box.classList.add(
        "ihelp_chatbot_urge_for_container"
    );
    ihelp_chatbot_urge_phone_box.id = "ihelp_chatbot_urge_phone_container";
    ihelp_chatbot_main_body_container.appendChild(ihelp_chatbot_urge_phone_box);

    /**************           ihelp chatbot urge phone class start         *************/
    let ihelp_chatbot_urge_phone_class_div = document.createElement("div");
    ihelp_chatbot_urge_phone_class_div.classList.add(
        "ihelp_chatbot_urge_for_phone_container"
    );
    ihelp_chatbot_urge_phone_box.appendChild(
        ihelp_chatbot_urge_phone_class_div
    );
    /**************           ihelp chatbot phone classclass end         *************/

    /**************           ihelp chatbot urge phone button start         *************/
    let ihelp_chatbot_urge_phone_button = document.createElement("button");
    ihelp_chatbot_urge_phone_button.classList.add(
        "ihelp_chatbot_urge_for_phone_button"
    );
    ihelp_chatbot_urge_phone_button.id = "ihelp_chatbot_urge_phone_button";
    ihelp_chatbot_urge_phone_button.textContent = "Start with your phone";
    ihelp_chatbot_urge_phone_class_div.appendChild(
        ihelp_chatbot_urge_phone_button
    );
    /**************           ihelp chatbot phone classclass end         *************/
    /*(((((())))))         ihelp chatbot urge phone box end          (((((())))))*/

    /**************           ihelp chatbot card head user container end         *************/
    /*#############           ihelp chatbot card body container end         #############*/

    /*#########################################################################################           
                                ihelp chatbot card container end         
    #########################################################################################*/

    return ihelp_chatbot_card_container;
}

//initial apear icon created
function create_ihelp_chatbot_appear_layout() {
    // create the chatbot apear layout
    let ihelp_chatbot_appear_container = document.createElement("div");
    ihelp_chatbot_appear_container.id = "ihelp_chatbot_appear_id";
    ihelp_chatbot_appear_container.classList.add(
        "ihelp_chatbot_appear",
        "shown"
    );

    // create the chatbot apear icon
    let ihelp_chatbot_appear_icon = document.createElement("span");
    ihelp_chatbot_appear_icon.classList.add("ihelp_chatbot_appear_icon");
    ihelp_chatbot_appear_icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
    </svg>`;

    // append the icon to the chatbot apear layout
    ihelp_chatbot_appear_container.appendChild(ihelp_chatbot_appear_icon);

    return ihelp_chatbot_appear_container;
}

//ihelp chatbot card css
var ihelp_chatbot_card_css = create_ihelp_chatbot_card_css();

window.onload = function () {
    //#####                   backend code integrition               ##### ///
    var ihelp_chatbot_card = document.getElementById("ihelp_chatbot_card");
    var ihelp_chatbot_card_close_icon = document.getElementById(
        "ihelp_chatbot_card_close_icon"
    );
    var ihelp_chatbot_phone_container = document.getElementById(
        "ihelp_chatbot_phone_container"
    );
    var ihelp_chatbot_urge_phone_button = document.getElementById(
        "ihelp_chatbot_urge_phone_button"
    );
    var ihelp_chatbot_urge_for_container = document.getElementById(
        "ihelp_chatbot_urge_phone_container"
    );
    var ihelp_chatbot_appear_id = document.getElementById(
        "ihelp_chatbot_appear_id"
    );
    var ihelp_chatbot_card_minimize_icon = document.getElementById(
        "ihelp_chatbot_card_minimize_icon"
    );
    var message_popup_menu_bar_list = document.getElementById(
        "message_popup_menu_bar_list"
    );

    //other var for chatbot question submit
    var ihelp_chatbot_phone_form = document.getElementById(
        "ihelp_chatbot_phone_form"
    );
    var ihelp_chatbot_question_form = document.getElementById(
        "ihelp_chatbot_question_form"
    );
    var ihelp_chatbot_card_message_chatlist = document.getElementById(
        "ihelp_chatbot_card_message_chatlist"
    );
    var ihelp_chatbot_phone_input = document.getElementById(
        "ihelp_chatbot_phone_input"
    );
    var ihelp_chatbot_question_input = document.getElementById(
        "ihelp_chatbot_question_input"
    );
    var ihelp_chatbot_card_message_body = document.getElementById(
        "ihelp_chatbot_card_message_body"
    );

    //declaration for menu bar hide and show
    var message_popup_menu_icon = document.getElementById(
        "message_popup_menu_icon"
    );
    var messaage_popup_menu_bar = document.getElementById(
        "messaage_popup_menu_bar"
    );

    var ihelp_chatbot_ticket_container_box = document.getElementById(
        "ihelp_chatbot_ticket_container_box"
    );

    var ihelp_ticket_submit_button = document.getElementById(
        "ihelp_ticket_submit_button"
    );

    var ihelp_ticket_sector_select_options =
        document.getElementById("ihelp_sector");

    var ihelp_ticket_bsw_select_options = document.getElementById("ihelp_bsw");

    var ihelp_ticket_issue_category_options = document.getElementById(
        "ihelp_issue_category"
    );
    var ihelp_ticket_agency_type_select_options =
        document.getElementById("ihelp_agent_type");
    var ihelp_ticket_clp_type_select_options =
        document.getElementById("ihelp_type_of_clp");

    var ihelp_contact_name = document.getElementById("ihelp_contact_name");

    var ihelp_email = document.getElementById("ihelp_email");

    var ihelp_subject_name = document.getElementById("ihelp_subject_name");

    var ihelp_description = document.getElementById("ihelp_description");

    //API endpoint URL
    const apiUrl = commonUrl + "api/question";
    const tokenApiUrl = commonUrl + "api/token";

    //API endpoint URL
    const apiConversationTypeUrl = commonUrl + "api/conversation-types";

    /* onload data fetch */
    getExistingConversation();
    /* onload data fetch */

    //chatbot appear button listener
    ihelp_chatbot_appear_id.addEventListener("click", () => {
        //get phone number from local storage
        var localStoragePhone = localStorage.getItem("phone");
        if (localStoragePhone != null) {
            if (localStoragePhone.trim() !== "") {
                ihelp_chatbot_appear_id.classList.add("hidden");
                ihelp_chatbot_appear_id.classList.remove("shown");
                ihelp_chatbot_phone_container.classList.add("hidden");
                ihelp_chatbot_phone_container.classList.remove("shown");
                ihelp_chatbot_urge_for_container.classList.add("hidden");
                ihelp_chatbot_urge_for_container.classList.remove("shown");
                ihelp_chatbot_card.classList.add("shown");
                ihelp_chatbot_card.classList.remove("hidden");

                //check existing chat for on load process
                let existing_token = localStorage.getItem("token");
                let existing_conversation_type =
                    localStorage.getItem("conversation_type");
                if (existing_token !== "" || existing_token != null) {
                    Echo.leave(existing_token);
                }
                if (
                    (existing_token !== "" &&
                        existing_conversation_type !== "") ||
                    (existing_token != null &&
                        existing_conversation_type != null)
                ) {
                    chatbot_echo_listener(existing_token);
                }
                //check existing chat for on load process
            }
        } else {
            ihelp_chatbot_appear_id.classList.add("hidden");
            ihelp_chatbot_appear_id.classList.remove("shown");
            ihelp_chatbot_phone_container.classList.add("shown");
            ihelp_chatbot_phone_container.classList.remove("hidden");
            ihelp_chatbot_urge_for_container.classList.add("shown");
            ihelp_chatbot_urge_for_container.classList.remove("hidden");
            ihelp_chatbot_card.classList.add("shown");
            ihelp_chatbot_card.classList.remove("hidden");
        }

        if (ihelp_chatbot_card.classList.contains("minimized")) {
            ihelp_chatbot_card.classList.remove("minimized");
            ihelp_chatbot_card.classList.add("shown");
            ihelp_chatbot_card.classList.remove("hidden");
        }

        //Make a POST request
        fetch(apiConversationTypeUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                let array = data.data;
                message_popup_menu_bar_list.innerHTML = "";

                array.forEach((element) => {
                    var htmlQuestionString =
                        '<a href="javascript:;" class="messaage_bar_link" onclick="handleClick(\'' +
                        element.name +
                        "')\">" +
                        element.name +
                        "</a>";
                    message_popup_menu_bar_list.insertAdjacentHTML(
                        "beforeend",
                        htmlQuestionString
                    );
                });
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    });

    //chatbot card minimize listener
    ihelp_chatbot_card_minimize_icon.addEventListener("click", () => {
        ihelp_chatbot_appear_id.classList.remove("hidden");
        ihelp_chatbot_appear_id.classList.add("shown");
        ihelp_chatbot_phone_container.classList.remove("hidden");
        ihelp_chatbot_phone_container.classList.remove("shown");
        ihelp_chatbot_urge_for_container.classList.add("hidden");
        ihelp_chatbot_urge_for_container.classList.remove("shown");
        ihelp_chatbot_card.classList.add("minimized");
        ihelp_chatbot_card.classList.remove("shown");
    });

    //chatbot card close listener
    ihelp_chatbot_card_close_icon.addEventListener("click", () => {
        //ticket container box hide
        ihelp_chatbot_ticket_container_box.classList.remove("shown");
        ihelp_chatbot_ticket_container_box.classList.add("hidden");

        //empty ticket container box
        clearTicketContainer();

        //existing token channel leave
        let token = localStorage.getItem("token");

        const apiCloseUrl = commonUrl + "api/chatbot-close-conversation";
        if (token) {
            Echo.leave(token);
            let closeData = {
                token: token,
            };
            fetch(apiCloseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(closeData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);
                })
                .catch((error) => {
                    alert("few issue from system");
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        }
        ihelp_chatbot_urge_for_container.classList.add("shown");
        ihelp_chatbot_urge_for_container.classList.remove("hidden");
        ihelp_chatbot_phone_container.classList.add("shown");
        ihelp_chatbot_phone_container.classList.remove("hidden");
        ihelp_chatbot_card.classList.add("hidden");
        ihelp_chatbot_card.classList.remove("shown");
        ihelp_chatbot_appear_id.classList.add("shown");
        ihelp_chatbot_appear_id.classList.remove("hidden");
        localStorage.removeItem("phone");
        localStorage.removeItem("conversation_type");
        //localStorage.removeItem("timeout_id");
        localStorage.removeItem("token");
        localStorage.removeItem("time");

        //change header user status
        let ihelp_chatbot_card_head_user_status_details_container =
            document.getElementById('ihelp_chatbot_card_head_user_status_details_container');
        let span = ihelp_chatbot_card_head_user_status_details_container.querySelector('span');
        if (span) {
            span.textContent = "Chat";
        }
    });

    //chatbot chatting start with urge option listener
    ihelp_chatbot_urge_phone_button.addEventListener("click", () => {
        document.getElementById("ihelp_chatbot_phone_input").value = "";
        ihelp_chatbot_urge_for_container.classList.add("hidden");
        ihelp_chatbot_urge_for_container.classList.remove("shown");
    });

    //chatbot phone number submit listener
    ihelp_chatbot_phone_form.addEventListener("submit", (e) => {
        e.preventDefault();
        var phoneNumber = e.target.elements.phone.value;
        var tokenData = {
            phone: phoneNumber,
        };
        if (phoneNumber.trim() !== "") {
            fetch(tokenApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tokenData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);

                    //set local storage
                    if (data.message === "Continued") {
                        alert("Please try later or try with other credencial.");
                    } else {
                        if (data.data.token != null) {
                            localStorage.setItem("phone", phoneNumber);
                            localStorage.setItem("token", data.data.token);
                            // let datetime1 =  new Date().toLocaleString();
                            let datetime = new Date().getTime();
                            localStorage.setItem("time", datetime);
                            ihelp_chatbot_phone_container.classList.remove(
                                "shown"
                            );
                            ihelp_chatbot_phone_container.classList.add(
                                "hidden"
                            );

                            // chatbot_echo_listener(data.data.token)
                            ihelp_chatbot_card_message_chatlist.innerHTML = "";

                            handleClick("Faq");
                        }
                    }

                    //storage remove after few mitues
                    //local_storage_remove();
                })
                .catch((error) => {
                    alert("few issue from system");
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        } else {
            alert("Phone number is empty. Please enter a valid phone number.");
        }
    });

    //chatbot ihelp_chatbot_card_footer_right_button listener
    ihelp_chatbot_card_footer_right_button.addEventListener("click", () => {
        // Remove 'shown' if it exists before adding 'hidden'
        ihelp_chatbot_ticket_container_box.classList.remove("shown");
        ihelp_chatbot_ticket_container_box.classList.add("hidden");

        let ihelp_chatbot_card_head_user_status_details_container =
            document.getElementById('ihelp_chatbot_card_head_user_status_details_container');
        let span = ihelp_chatbot_card_head_user_status_details_container.querySelector('span');
        if (span) {
            span.textContent = "Chat";
        }
    });

    ihelp_chatbot_card_footer_left_button.addEventListener("click", () => {
        // Remove 'hidden' if it exists before adding 'shown'
        ihelp_chatbot_ticket_container_box.classList.remove("hidden");
        ihelp_chatbot_ticket_container_box.classList.add("shown");
        let ihelp_chatbot_card_head_user_status_details_container =
            document.getElementById('ihelp_chatbot_card_head_user_status_details_container');
        let span = ihelp_chatbot_card_head_user_status_details_container.querySelector('span');
        if (span) {
            span.textContent = "Add Ticket";
        }

        createCaptcha();
    });

    //submit the ticket form
    ihelp_ticket_submit_button.addEventListener("click", (e) => {
        e.preventDefault();
        const userInput = document
            .getElementById("cpatchaTextBox")
            .value.trim();

        // Proceed with actual form submission or next step
        // let fetch_ihelp_contact_name_value = ihelp_contact_name.value;
        // let fetch_ihelp_email_contact_name_value = ihelp_email.value;
        // let fetch_ihelp_ticket_sector_value =
        //     ihelp_ticket_sector_select_options.selectedOptions[0].value;
        // let fetch_ihelp_subject_name = ihelp_subject_name.value;
        // let fetch_ihelp_description_value = ihelp_description.value;
        // let fetch_ihelp_ticket_bsw_select_value =
        //     ihelp_ticket_bsw_select_options.selectedOptions[0].value;
        // let fetch_ihelp_ticket_issue_category_value =
        //     ihelp_ticket_issue_category_options.selectedOptions[0].value;
        // let fetch_ihelp_ticket_agency_type_value =
        //     ihelp_ticket_agency_type_select_options.selectedOptions[0].value;
        // let fetch_ihelp_ticket_clp_type_value = Array.from(
        //     ihelp_ticket_clp_type_select_options.selectedOptions
        // ).map((option) => option.value);

        let fetch_ihelp_contact_name_value =
            ihelp_contact_name?.value?.trim() ?? null;
        let fetch_ihelp_email_contact_name_value =
            ihelp_email?.value?.trim() ?? null;

        let fetch_ihelp_ticket_sector_value =
            ihelp_ticket_sector_select_options?.selectedOptions[0]?.value ??
            null;

        let fetch_ihelp_subject_name =
            ihelp_subject_name?.value?.trim() ?? null;
        let fetch_ihelp_description_value =
            ihelp_description?.value?.trim() ?? null;

        let fetch_ihelp_ticket_bsw_select_value =
            ihelp_ticket_bsw_select_options?.selectedOptions[0]?.value ?? null;

        let fetch_ihelp_ticket_issue_category_value =
            ihelp_ticket_issue_category_options?.selectedOptions[0]?.value ??
            null;

        let fetch_ihelp_ticket_agency_type_value =
            ihelp_ticket_agency_type_select_options?.selectedOptions[0]
                ?.value ?? null;

        let fetch_ihelp_ticket_clp_type_value = Array.from(
            ihelp_ticket_clp_type_select_options?.selectedOptions ?? []
        ).map((option) => option.value);

        // If nothing selected, clp_type_value will be an empty array, so set to null
        if (fetch_ihelp_ticket_clp_type_value.length === 0) {
            fetch_ihelp_ticket_clp_type_value = null;
        }

        if (userInput === code) {
            const captchaDisplay = document.getElementById("captcha");
            const captchaInput = document.getElementById("cpatchaTextBox");
            const captchaErrorDiv = document.getElementById(
                "ihelp_captcha_error"
            );

            captchaInput.classList.remove("input-error");
            captchaErrorDiv.innerText = "";

            //     if (!fetch_ihelp_contact_name_value) {
            //     alert("❗ Please enter your contact name.");
            //     return;
            // }

            // if (!fetch_ihelp_email_contact_name_value) {
            //     alert("❗ Please enter your email.");
            //     return;
            // }

            // if (!fetch_ihelp_ticket_sector_value) {
            //     alert("❗ Please select a ticket sector.");
            //     return;
            // }

            // if (!fetch_ihelp_subject_name) {
            //     alert("❗ Please enter the subject.");
            //     return;
            // }

            // if (!fetch_ihelp_description_value) {
            //     alert("❗ Please enter the description.");
            //     return;
            // }

            // if (!fetch_ihelp_ticket_bsw_select_value) {
            //     alert("❗ Please select a BSW application.");
            //     return;
            // }

            // if (!fetch_ihelp_ticket_issue_category_value) {
            //     alert("❗ Please select an issue category.");
            //     return;
            // }

            // if (!fetch_ihelp_ticket_agency_type_value) {
            //     alert("❗ Please select an agency type.");
            //     return;
            // }

            // if (!fetch_ihelp_ticket_clp_type_value || fetch_ihelp_ticket_clp_type_value.length === 0) {
            //     alert("❗ Please select at least one CLP type.");
            //     return;
            // }

            const isNameValid = validateFormFields();

            var tokenData = {
                account_name: "NULL",
                contact_name: fetch_ihelp_contact_name_value,
                customer_mail: fetch_ihelp_email_contact_name_value,
                report_issue: fetch_ihelp_ticket_sector_value,
                subject: fetch_ihelp_subject_name,
                description: fetch_ihelp_description_value,
                bsw_app: fetch_ihelp_ticket_bsw_select_value,
                agency_type: fetch_ihelp_ticket_agency_type_value,
                clp_type: fetch_ihelp_ticket_clp_type_value,
                issue_cat: fetch_ihelp_ticket_issue_category_value,
                attachment: "NULL",
            };

            //alert("✅ Valid Captcha");
            let imageFiles = document.getElementById("attachment").files;

            let formData = new FormData();
            formData.append("account_name", "NULL");
            formData.append("contact_name", fetch_ihelp_contact_name_value);
            formData.append("report_issue", fetch_ihelp_ticket_sector_value);
            formData.append("customer_mail", fetch_ihelp_email_contact_name_value);
            formData.append("subject", fetch_ihelp_subject_name);
            formData.append("description", fetch_ihelp_description_value);
            formData.append("bsw_app", fetch_ihelp_ticket_bsw_select_value);
            formData.append(
                "agency_type",
                fetch_ihelp_ticket_agency_type_value
            );
            formData.append(
                "clp_type",
                JSON.stringify(fetch_ihelp_ticket_clp_type_value)
            );
            formData.append(
                "issue_cat",
                fetch_ihelp_ticket_issue_category_value
            );

            console.log("formData Files:", formData);

            // Append multiple files
            if (imageFiles.length > 0) {
                for (let i = 0; i < imageFiles.length; i++) {
                    formData.append("attachment[]", imageFiles[i]); // Use "attachment[]" for PHP array-style handling
                }
            } else {
                formData.append("attachment[]", "NULL");
            }

            //ticket submited

            
            fetch(
                commonTicketUrl + "web_fontainer_ticket_api/create_ticket.php",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${commonTicketBearerToken}`,
                        // DO NOT manually set "Content-Type" for FormData
                    },
                    body: formData,
                }
            )
            .then(async (response) => {
                const responseData = await response.json();
                //console.log("Response Data:", responseData);

                if (!response.ok) {
                    throw new Error("Server Error: " + response.statusText);
                }

                // Optional: Success message
                // alert("✅ Ticket submitted successfully! ticket_id: " + responseData.ticket_id);
                //clearTicketAllField()
                    document.getElementById("ihelp_contact_name").value = "";
                    document.getElementById("ihelp_email").value = "";
                    document.getElementById("ihelp_subject_name").value = "";
                    document.getElementById("ihelp_description").value = "";
                    document.getElementById("cpatchaTextBox").value = "";
                    document.getElementById("attachment").value = "";
                    $('#ihelp_agent_type').val(null).trigger('change');
                    $('#ihelp_type_of_clp').val(null).trigger('change');

                    alert(`✅ Ticket submitted successfully!\nTicket ID: ${responseData.ticket_id}`);
                    createCaptcha()
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        } else {
            const captchaDisplay = document.getElementById("captcha");
            const captchaInput = document.getElementById("cpatchaTextBox");
            const captchaErrorDiv = document.getElementById(
                "ihelp_captcha_error"
            );

            if (captchaInput.value.trim() === "") {
                captchaInput.classList.add("input-error");
                captchaErrorDiv.innerText = "CAPTCHA is required";
            } else if (
                captchaInput.value.trim() !== captchaDisplay.innerText.trim()
            ) {
                captchaInput.classList.add("input-error");
                captchaErrorDiv.innerText = "❌ Invalid CAPTCHA. Try again.";
                createCaptcha(); // Regenerate the CAPTCHA
                captchaInput.value = ""; // Clear input
            } else {
                captchaInput.classList.remove("input-error");
                captchaErrorDiv.innerText = "";
            }
        }
    });

    ///menu bar listener
    ihelp_chatbot_card.addEventListener("click", (e) => {
        if (message_popup_menu_icon.contains(e.target)) {
            if (messaage_popup_menu_bar.classList.contains("menu_bar_hidden")) {
                messaage_popup_menu_bar.classList.remove("menu_bar_hidden");
                messaage_popup_menu_bar.classList.add("menu_bar_shown");
            } else {
                messaage_popup_menu_bar.classList.add("menu_bar_hidden");
                messaage_popup_menu_bar.classList.remove("menu_bar_shown");
            }
        } else if (messaage_popup_menu_bar.contains(e.target)) {
            return;
        } else {
            if (messaage_popup_menu_bar.classList.contains("menu_bar_shown")) {
                messaage_popup_menu_bar.classList.remove("menu_bar_shown");
                messaage_popup_menu_bar.classList.add("menu_bar_hidden");
            }
        }
    });

    ///chatbot form submit listener
    ihelp_chatbot_question_form.addEventListener("submit", (e) => {
        e.preventDefault(e.target.elements.question.value);

        //storage remove after few mitues
        //local_storage_remove();

        if (e.target.elements.question.value == "") {
            alert("Ask query is empty. Please enter a valid query.");

            return 0;
        }
        var local_storage_conversation_type =
            localStorage.getItem("conversation_type");
        var local_storage_phone = localStorage.getItem("phone");
        if (local_storage_conversation_type == null) {
            localStorage.setItem("conversation_type", "Faq");
            local_storage_conversation_type =
                localStorage.getItem("conversation_type");
        }
        var question = e.target.elements.question.value;
        var requestData = {
            q: question,
            phone: local_storage_phone,
            conversation_type: local_storage_conversation_type,
        };

        // if(local_storage_phone == null){
        //     chat_close()
        //     alert('please close the chatbot and give a phone number again.');
        // }

        if (local_storage_conversation_type == "Faq") {
            // Make a POST request
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);
                    ihelp_chatbot_card_message_body.scrollTop =
                        ihelp_chatbot_card_message_body.scrollHeight;

                    //empty question input by user
                    ihelp_chatbot_question_input.value = "";

                    //question insert to the dom user
                    var htmlQuestionString =
                        '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                        question +
                        '</span><span class="ihelp_chatbot_user_date">' +
                        getCurrentTime() +
                        "</span></li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlQuestionString
                    );

                    //reply insert to the dom chatbot
                    if (data.data.file == null) {
                        var htmlReplyString =
                            '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                            data.data.reply +
                            '</span><span class="ihelp_chatbot_date">' +
                            getCurrentTime() +
                            "</span></li>";
                        ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                            "beforeend",
                            htmlReplyString
                        );
                    }

                    if (data.data.file != null) {
                        var htmlReplyStringAndImage =
                            '<li class="ihelp_chatbot">' +
                            '<span class="ihelp_chatbot_chat">' +
                            data.data.reply +
                            "</span>" +
                            '<span class="ihelp_chatbot_chat_image">' +
                            '<img src="' +
                            data.data.file +
                            '" alt="">' +
                            "</span>" +
                            '<span class="ihelp_chatbot_date">' +
                            getCurrentTime() +
                            "</span>" +
                            "</li>";
                        ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                            "beforeend",
                            htmlReplyStringAndImage
                        );
                    }
                    //reply insert to the dom chatbot
                    if (data.data.tags != null) {
                        // Split the comma-separated string into an array of tags
                        const tags = data.data.tags
                            ? data.data.tags.split(",")
                            : [];
                        let htmlTagString = '<li class="ihelp_chatbot_tag">';

                        for (const tag of tags) {
                            htmlTagString += `<span class="ihelp_chatbot_tag_item" onclick="handleTagClick('${tag}')">${tag}</span>`;
                        }

                        htmlTagString += `</li>`;
                        ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                            "beforeend",
                            htmlTagString
                        );
                    }
                })
                .catch((error) => {
                    // Handle errors
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        }

        if (local_storage_conversation_type == "Product") {
            // Make a POST request
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    //console.log(data)

                    ihelp_chatbot_card_message_body.scrollTop =
                        ihelp_chatbot_card_message_body.scrollHeight;

                    //empty question input by user
                    ihelp_chatbot_question_input.value = "";

                    //question insert to the dom user
                    var htmlQuestionString =
                        '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                        question +
                        '</span><span class="ihelp_chatbot_user_date">' +
                        getCurrentTime() +
                        "</span></li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlQuestionString
                    );

                    //reply insert to the dom chatbot
                    if (data.data.file == null) {
                        var htmlReplyString =
                            '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                            data.data.reply +
                            '</span><span class="ihelp_chatbot_date">' +
                            getCurrentTime() +
                            "</span></li>";
                        ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                            "beforeend",
                            htmlReplyString
                        );
                    }

                    if (data.data.file != null) {
                        var htmlReplyStringAndImage =
                            '<li class="ihelp_chatbot">' +
                            '<span class="ihelp_chatbot_chat">' +
                            data.data.reply +
                            "</span>" +
                            '<span class="ihelp_chatbot_chat_image">' +
                            '<img src="' +
                            data.data.file +
                            '" alt="">' +
                            "</span>" +
                            '<span class="ihelp_chatbot_date">' +
                            getCurrentTime() +
                            "</span>" +
                            "</li>";
                        ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                            "beforeend",
                            htmlReplyStringAndImage
                        );
                    }

                    if (data.data.product) {
                        let products = data.data.product;

                        let listCounter = 1; // Initialize the counter

                        // Find the highest number used in existing IDs
                        document
                            .querySelectorAll(
                                '[id^="ihelp_chatbot_chat_card_list_"]'
                            )
                            .forEach(function (element) {
                                let idNumber = parseInt(
                                    element.id.split("_").pop()
                                );
                                if (idNumber >= listCounter) {
                                    listCounter = idNumber + 1;
                                }
                            });

                        function generateUniqueListID() {
                            let listID = listCounter;
                            // listCounter++; // Increment the counter for the next list
                            return listID;
                        }

                        ///

                        let htmlReplyCardStringAndImage =
                            '<li class="ihelp_chatbot">' +
                            '<div class="ihelp_chatbot_chat_card_list_container">' +
                            '<div id="left_arrow_container_' +
                            generateUniqueListID() +
                            '" class="hidden" onclick="select_card_list(\'left_arrow_container_' +
                            generateUniqueListID() +
                            "')\">" +
                            '<span class="ihelp_chatbot_chat_card_arrow left_arrow" id="chatting_card_left_arrow_' +
                            generateUniqueListID() +
                            '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-left" viewBox="0 0 16 16">' +
                            '<path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"/>' +
                            "</svg></span>" +
                            "</div>" +
                            '<div id="right_arrow_container_' +
                            generateUniqueListID() +
                            '" class="shown" onclick="select_card_list(\'right_arrow_container_' +
                            generateUniqueListID() +
                            "')\">" +
                            '<span class="ihelp_chatbot_chat_card_arrow right_arrow" id="chatting_card_right_arrow_' +
                            generateUniqueListID() +
                            '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">' +
                            '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>' +
                            "</svg></span>" +
                            "</div>" +
                            // '<ul class="ihelp_chatbot_chat_card_list" id="ihelp_chatbot_chat_card_list">';
                            '<ul class="ihelp_chatbot_chat_card_list" id="ihelp_chatbot_chat_card_list_' +
                            generateUniqueListID() +
                            '">'; // Use the generated unique ID

                        products.forEach(function (item) {
                            htmlReplyCardStringAndImage +=
                                '<li class="ihelp_chatbot_chat_single_card">' +
                                '<div class="ihelp_chatbot_chat_single_card_image">' +
                                '<img src="' +
                                item.thumbnail +
                                '" alt="">' +
                                "</div>" +
                                '<div class="ihelp_chatbot_chat_single_card_content">' +
                                "<h3>" +
                                item.title +
                                "</h3>" +
                                "<p>" +
                                item.description +
                                "</p>";
                            if (item.link) {
                                htmlReplyCardStringAndImage +=
                                    '<a href="' +
                                    item.link +
                                    '" class="ihelp_chatbot_chat_single_card_button" target="_blank">Find out more</a>';
                            }
                            htmlReplyCardStringAndImage += "</div>" + "</li>";
                        });

                        htmlReplyCardStringAndImage +=
                            "</ul>" +
                            "</div>" +
                            '<span class="ihelp_chatbot_date">' +
                            getCurrentTime() +
                            "</span>" +
                            "</li>";

                        ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                            "beforeend",
                            htmlReplyCardStringAndImage
                        );

                        initial_card_list(
                            "initial_card_list_" + generateUniqueListID()
                        );
                    }
                })
                .catch((error) => {
                    // Handle errors
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        }

        if (local_storage_conversation_type == "Live-Chat") {
            // Make a POST request
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);

                    //empty question input by user
                    ihelp_chatbot_question_input.value = "";

                    //question insert to the dom user
                    var htmlQuestionString =
                        '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                        question +
                        '</span><span class="ihelp_chatbot_user_date">' +
                        getCurrentTime() +
                        "</span></li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlQuestionString
                    );
                })
                .catch((error) => {
                    // Handle errors
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        }
    });

    //check close
    setInterval(function () {
        let datetime = new Date().getTime();

        //check existing chat for on load process
        let existing_time = localStorage.getItem("time");

        if (existing_time != null) {
            let dif = 0;
            dif = datetime - existing_time;

            const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
            //const millisecondsIn24Hours = 60000;

            if (dif > millisecondsIn24Hours) {
                let token = localStorage.getItem("token");

                const apiCloseUrl =
                    commonUrl + "api/chatbot-close-conversation";
                if (token != null) {
                    Echo.leave(token);
                    let closeData = {
                        token: token,
                    };
                    fetch(apiCloseUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(closeData),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json();
                        })
                        .then((data) => {
                            //console.log(data);
                        })
                        .catch((error) => {
                            alert("close few issue from system");
                            console.error(
                                "There was a problem with the fetch operation:",
                                error
                            );
                        });
                }
                ihelp_chatbot_urge_for_container.classList.add("shown");
                ihelp_chatbot_urge_for_container.classList.remove("hidden");
                ihelp_chatbot_phone_container.classList.add("shown");
                ihelp_chatbot_phone_container.classList.remove("hidden");
                ihelp_chatbot_card.classList.add("hidden");
                ihelp_chatbot_card.classList.remove("shown");
                ihelp_chatbot_appear_id.classList.add("shown");
                ihelp_chatbot_appear_id.classList.remove("hidden");
                localStorage.removeItem("phone");
                localStorage.removeItem("conversation_type");
                //localStorage.removeItem("timeout_id");
                localStorage.removeItem("token");
                localStorage.removeItem("time");
            }
        } else {
            localStorage.removeItem("phone");
            localStorage.removeItem("conversation_type");
            localStorage.removeItem("token");
            localStorage.removeItem("time");
        }
    }, 1000);

    $(document).ready(function () {
        Echo.channel("conversation_close").listen(
            "ConversationCloseEvent",
            (e) => {
                let conversation_token = localStorage.getItem("token");
                if (conversation_token == e.conversation_token) {
                    Echo.leave(conversation_token);
                    // console.log(conversation_token)
                    // console.log(e.conversation_token)
                    ihelp_chatbot_urge_for_container.classList.add("shown");
                    ihelp_chatbot_urge_for_container.classList.remove("hidden");
                    ihelp_chatbot_phone_container.classList.add("shown");
                    ihelp_chatbot_phone_container.classList.remove("hidden");
                    ihelp_chatbot_card.classList.add("hidden");
                    ihelp_chatbot_card.classList.remove("shown");
                    ihelp_chatbot_appear_id.classList.add("shown");
                    ihelp_chatbot_appear_id.classList.remove("hidden");
                    localStorage.removeItem("phone");
                    localStorage.removeItem("conversation_type");
                    //localStorage.removeItem("timeout_id");
                    localStorage.removeItem("token");
                    localStorage.removeItem("time");
                }
            }
        );
    });

    /* ticket attachment */
    const dt = new DataTransfer(); // Permet de manipuler les fichiers de l'input file
    $("#attachment").on("change", function (e) {
        for (var i = 0; i < this.files.length; i++) {
            let fileBloc = $("<span/>", { class: "file_block" }),
                fileName = $("<span/>", {
                    class: "name",
                    text: this.files.item(i).name,
                });
            fileBloc
                .append('<span class="file_delete"><span>+</span></span>')
                .append(fileName);
            $("#files_list > #files_names").append(fileBloc);
        }
        // Ajout des fichiers dans l'objet DataTransfer
        for (let file of this.files) {
            dt.items.add(file);
        }
        // Mise à jour des fichiers de l'input file après ajout
        this.files = dt.files;

        // EventListener pour le bouton de suppression créé
        $("span.file_delete").click(function () {
            let name = $(this).next("span.name").text();
            // Supprimer l'affichage du nom de fichier
            $(this).parent().remove();
            for (let i = 0; i < dt.items.length; i++) {
                // Correspondance du fichier et du nom
                if (name === dt.items[i].getAsFile().name) {
                    // Suppression du fichier dans l'objet DataTransfer
                    dt.items.remove(i);
                    continue;
                }
            }
            // Mise à jour des fichiers de l'input file après suppression
            document.getElementById("attachment").files = dt.files;
        });
    });

    //all ticket api implementation
    //http://114.130.69.220/web_fontainer_ticket_api/reporting_issue.php

    //Fetch report issue throuh api
    fetch(commonTicketUrl + "web_fontainer_ticket_api/reporting_issue.php", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${commonTicketBearerToken}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success" && Array.isArray(data.data)) {
                data.data.forEach((sector) => {
                    let option = document.createElement("option");
                    option.value = sector.id;
                    option.text = sector.name;
                    ihelp_ticket_sector_select_options.appendChild(option);
                });
            } else {
                console.error("Unexpected response format:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching sectors:", error);
        });

    //Fetch bsw application through api
    fetch(commonTicketUrl + "web_fontainer_ticket_api/bsw_application.php", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${commonTicketBearerToken}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success" && Array.isArray(data.data)) {
                data.data.forEach((sector) => {
                    let option = document.createElement("option");
                    option.value = sector.id;
                    option.text = sector.name;
                    ihelp_ticket_bsw_select_options.appendChild(option);
                });
            } else {
                console.error("Unexpected response format:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching sectors:", error);
        });

    //Fetch issue category application through api
    fetch(commonTicketUrl + "web_fontainer_ticket_api/issue_type.php", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${commonTicketBearerToken}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success" && Array.isArray(data.data)) {
                data.data.forEach((sector) => {
                    let option = document.createElement("option");
                    option.value = sector.id;
                    option.text = sector.name;
                    ihelp_ticket_issue_category_options.appendChild(option);
                });
            } else {
                console.error("Unexpected response format:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching sectors:", error);
        });

    $(document).ready(function () {
        $("#ihelp_bsw").on("change", function () {
            const selectedOption = $(this).find("option:selected");
            const id = selectedOption.val();
            //alert(`You selected: ${selectedOption.text()} (ID: ${selectedOption.val()})`);

            //fetch agency type select options through api by bsw application
            const url =
                commonTicketUrl +
                `web_fontainer_ticket_api/agency_type.php?bsw_application=${encodeURIComponent(
                    id
                )}`;
            const $select = $("#ihelp_ticket_agency_type_select_options");
            fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${commonTicketBearerToken}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data);
                    if (data.status == "error") {
                        //alert("No agency type found for this BSW application.");
                        $select.empty(); // Clear existing options
                        ihelp_ticket_agency_type_select_options.innerHTML = "";
                        $select.trigger("change"); // Refresh Select2
                    }

                    if (data.status === "success" && Array.isArray(data.data)) {
                        $select.empty(); // Clear existing options
                        data.data.forEach((sector) => {
                            let option = document.createElement("option");
                            option.value = sector.id;
                            option.text = sector.name;
                            ihelp_ticket_agency_type_select_options.appendChild(
                                option
                            );
                        });
                        $select.trigger("change"); // Refresh Select2
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        });

        // Fetch clp type when the agent type application changes
        $("#ihelp_agent_type").on("change", function () {
            const selectedOption = $(this).find("option:selected");
            const id = selectedOption.val();
            //alert(`You selected: ${selectedOption.text()} (ID: ${selectedOption.val()})`);

            const url =
                commonTicketUrl +
                `web_fontainer_ticket_api/clp_type.php?agency_type=${encodeURIComponent(
                    id
                )}`;

            const $select = $("#ihelp_ticket_agency_type_select_options");
            fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${commonTicketBearerToken}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data);
                    if (data.status == "error") {
                        //alert("No agency type found for this BSW application.");
                        $select.empty(); // Clear existing options
                        ihelp_ticket_clp_type_select_options.innerHTML = "";
                        $select.trigger("change"); // Refresh Select2
                    }

                    if (data.status === "success" && Array.isArray(data.data)) {
                        $select.empty(); // Clear existing options
                        data.data.forEach((sector) => {
                            let option = document.createElement("option");
                            option.value = sector.id;
                            option.text = sector.name;
                            ihelp_ticket_clp_type_select_options.appendChild(
                                option
                            );
                        });
                        $select.trigger("change"); // Refresh Select2
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        });
    });
};

function handleClick($question) {
    // handleLoader()
    //menu bar hide when clickable
    if (messaage_popup_menu_bar.classList.contains("menu_bar_shown")) {
        messaage_popup_menu_bar.classList.remove("menu_bar_shown");
        messaage_popup_menu_bar.classList.add("menu_bar_hidden");
    }

    //storage remove after few mitues
    //local_storage_remove();

    let apiUrl = commonUrl + "api/question";

    let local_storage_conversation_type = $question;
    let local_storage_phone = localStorage.getItem("phone");
    let token = localStorage.getItem("token");
    if (token !== null) {
        Echo.leave(token);
    }

    localStorage.setItem("conversation_type", $question);

    let question = $question;
    let requestData = {
        q: question,
        phone: local_storage_phone,
        conversation_type: local_storage_conversation_type,
    };

    // if(local_storage_phone == null){
    //     chat_close()
    //     alert('please close the chatbot and give a phone number again.');

    // }

    if (local_storage_conversation_type == "Faq") {
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                ihelp_chatbot_card_message_body.scrollTop =
                    ihelp_chatbot_card_message_body.scrollHeight;

                //empty question input by user
                ihelp_chatbot_question_input.value = "";

                //question insert to the dom user
                var htmlQuestionString =
                    '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                    question +
                    '</span><span class="ihelp_chatbot_user_date">' +
                    getCurrentTime() +
                    "</span></li>";
                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                    "beforeend",
                    htmlQuestionString
                );

                //reply insert to the dom chatbot
                if (data.data.file == null) {
                    var htmlReplyString =
                        '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                        data.data.reply +
                        '</span><span class="ihelp_chatbot_date">' +
                        getCurrentTime() +
                        "</span></li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyString
                    );
                }

                if (data.data.file != null) {
                    var htmlReplyStringAndImage =
                        '<li class="ihelp_chatbot">' +
                        '<span class="ihelp_chatbot_chat">' +
                        data.data.reply +
                        "</span>" +
                        '<span class="ihelp_chatbot_chat_image">' +
                        '<img src="' +
                        data.data.file +
                        '" alt="">' +
                        "</span>" +
                        '<span class="ihelp_chatbot_date">' +
                        getCurrentTime() +
                        "</span>" +
                        "</li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyStringAndImage
                    );
                }
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }

    if (local_storage_conversation_type == "Product") {
        // Make a POST request
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                ihelp_chatbot_card_message_body.scrollTop =
                    ihelp_chatbot_card_message_body.scrollHeight;
                //empty question input by user
                ihelp_chatbot_question_input.value = "";

                //question insert to the dom user
                var htmlQuestionString =
                    '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                    question +
                    '</span><span class="ihelp_chatbot_user_date">' +
                    getCurrentTime() +
                    "</span></li>";
                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                    "beforeend",
                    htmlQuestionString
                );

                //reply insert to the dom chatbot
                if (data.data.file == null) {
                    var htmlReplyString =
                        '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                        data.data.reply +
                        '</span><span class="ihelp_chatbot_date">' +
                        getCurrentTime() +
                        "</span></li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyString
                    );
                }

                if (data.data.file != null) {
                    var htmlReplyStringAndImage =
                        '<li class="ihelp_chatbot">' +
                        '<span class="ihelp_chatbot_chat">' +
                        data.data.reply +
                        "</span>" +
                        '<span class="ihelp_chatbot_chat_image">' +
                        '<img src="' +
                        data.data.file +
                        '" alt="">' +
                        "</span>" +
                        '<span class="ihelp_chatbot_date">' +
                        getCurrentTime() +
                        "</span>" +
                        "</li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyStringAndImage
                    );
                }

                if (data.data.product) {
                    let products = data.data.product;

                    //
                    let listCounter = 1; // Initialize the counter

                    // Find the highest number used in existing IDs
                    document
                        .querySelectorAll(
                            '[id^="ihelp_chatbot_chat_card_list_"]'
                        )
                        .forEach(function (element) {
                            let idNumber = parseInt(
                                element.id.split("_").pop()
                            );
                            if (idNumber >= listCounter) {
                                listCounter = idNumber + 1;
                            }
                        });

                    function generateUniqueListID() {
                        let listID = listCounter;
                        // listCounter++; // Increment the counter for the next list
                        return listID;
                    }

                    ///
                    let htmlReplyCardStringAndImage =
                        '<li class="ihelp_chatbot">' +
                        '<div class="ihelp_chatbot_chat_card_list_container">' +
                        '<div id="left_arrow_container_' +
                        generateUniqueListID() +
                        '" class="hidden" onclick="select_card_list(\'left_arrow_container_' +
                        generateUniqueListID() +
                        "')\">" +
                        '<span class="ihelp_chatbot_chat_card_arrow left_arrow" id="chatting_card_left_arrow_' +
                        generateUniqueListID() +
                        '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-left" viewBox="0 0 16 16">' +
                        '<path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"/>' +
                        "</svg></span>" +
                        "</div>" +
                        '<div id="right_arrow_container_' +
                        generateUniqueListID() +
                        '" class="shown" onclick="select_card_list(\'right_arrow_container_' +
                        generateUniqueListID() +
                        "')\">" +
                        '<span class="ihelp_chatbot_chat_card_arrow right_arrow" id="chatting_card_right_arrow_' +
                        generateUniqueListID() +
                        '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">' +
                        '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>' +
                        "</svg></span>" +
                        "</div>" +
                        // '<ul class="ihelp_chatbot_chat_card_list" id="ihelp_chatbot_chat_card_list">';
                        '<ul class="ihelp_chatbot_chat_card_list" id="ihelp_chatbot_chat_card_list_' +
                        generateUniqueListID() +
                        '">'; // Use the generated unique ID

                    // products.forEach(function(item) {
                    //     htmlReplyCardStringAndImage += '<li class="ihelp_chatbot_chat_single_card">' +
                    //         '<div class="ihelp_chatbot_chat_single_card_image">' +
                    //         '<img src="' + item.thumbnail + '" alt="">' +
                    //         '</div>' +
                    //         '<div class="ihelp_chatbot_chat_single_card_content">' +
                    //         '<h3>' + item.title + '</h3>' +
                    //         '<p>' + item.description + '</p>' +
                    //         '<a href="' + item.link + '" class="ihelp_chatbot_chat_single_card_button" target="_blank">Find out more</a>' +
                    //         '</div>' +
                    //         '</li>';
                    // });

                    products.forEach(function (item) {
                        htmlReplyCardStringAndImage +=
                            '<li class="ihelp_chatbot_chat_single_card">' +
                            '<div class="ihelp_chatbot_chat_single_card_image">' +
                            '<img src="' +
                            item.thumbnail +
                            '" alt="">' +
                            "</div>" +
                            '<div class="ihelp_chatbot_chat_single_card_content">' +
                            "<h3>" +
                            item.title +
                            "</h3>" +
                            "<p>" +
                            item.description +
                            "</p>";
                        if (item.link) {
                            htmlReplyCardStringAndImage +=
                                '<a href="' +
                                item.link +
                                '" class="ihelp_chatbot_chat_single_card_button" target="_blank">Find out more</a>';
                        }
                        htmlReplyCardStringAndImage += "</div>" + "</li>";
                    });

                    htmlReplyCardStringAndImage +=
                        "</ul>" +
                        "</div>" +
                        '<span class="ihelp_chatbot_date">' +
                        getCurrentTime() +
                        "</span>" +
                        "</li>";

                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyCardStringAndImage
                    );

                    initial_card_list(
                        "initial_card_list_" + generateUniqueListID()
                    );
                }
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }

    if (local_storage_conversation_type == "Live-Chat") {
        chatbot_echo_listener(token);
        //Make a POST request
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                //console.log(data);

                //empty question input by user
                ihelp_chatbot_question_input.value = "";

                //question insert to the dom user
                var htmlQuestionString =
                    '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                    question +
                    '</span><span class="ihelp_chatbot_user_date">' +
                    getCurrentTime() +
                    "</span></li>";
                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                    "beforeend",
                    htmlQuestionString
                );
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }
}

function handleTagClick($tag) {
    let apiUrl = commonUrl + "api/question";

    let local_storage_conversation_type =
        localStorage.getItem("conversation_type");
    let local_storage_phone = localStorage.getItem("phone");

    if (local_storage_conversation_type != "Faq") {
        alert("Please select first Faq.");
        return 0;
    }

    if (local_storage_phone == null) {
        alert("Please select close the chat and restart. Something is wrong");
        return 0;
    }

    let question = $tag;
    let requestData = {
        q: question,
        phone: local_storage_phone,
        conversation_type: local_storage_conversation_type,
    };

    if (local_storage_conversation_type == "Faq") {
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                //console.log(data);

                ihelp_chatbot_card_message_body.scrollTop =
                    ihelp_chatbot_card_message_body.scrollHeight;

                //empty question input by user
                ihelp_chatbot_question_input.value = "";

                //question insert to the dom user
                var htmlQuestionString =
                    '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                    question +
                    '</span><span class="ihelp_chatbot_user_date">' +
                    getCurrentTime() +
                    "</span></li>";
                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                    "beforeend",
                    htmlQuestionString
                );

                //reply insert to the dom chatbot
                if (data.data.file == null) {
                    var htmlReplyString =
                        '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                        data.data.reply +
                        '</span><span class="ihelp_chatbot_date">' +
                        getCurrentTime() +
                        "</span></li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyString
                    );
                }

                if (data.data.file != null) {
                    var htmlReplyStringAndImage =
                        '<li class="ihelp_chatbot">' +
                        '<span class="ihelp_chatbot_chat">' +
                        data.data.reply +
                        "</span>" +
                        '<span class="ihelp_chatbot_chat_image">' +
                        '<img src="' +
                        data.data.file +
                        '" alt="">' +
                        "</span>" +
                        '<span class="ihelp_chatbot_date">' +
                        getCurrentTime() +
                        "</span>" +
                        "</li>";
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyStringAndImage
                    );
                }

                //reply insert to the dom chatbot
                if (data.data.tags != null) {
                    // Split the comma-separated string into an array of tags
                    const tags = data.data.tags
                        ? data.data.tags.split(",")
                        : [];
                    let htmlTagString = '<li class="ihelp_chatbot_tag">';

                    for (const tag of tags) {
                        htmlTagString += `<span class="ihelp_chatbot_tag_item" onclick="handleTagClick('${tag}')">${tag}</span>`;
                    }

                    htmlTagString += `</li>`;
                    ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                        "beforeend",
                        htmlTagString
                    );
                    //console.log(tags);
                }
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }
}

function initial_card_list(id_number) {
    //console.log(id_number);
    let str = id_number;
    let match = str.match(/_([^_]*)$/);
    let number = match ? parseInt(match[1]) : null;

    let left_arrow_container = document.getElementById(
        "left_arrow_container_" + number
    );
    let right_arrow_container = document.getElementById(
        "right_arrow_container_" + number
    );
    let ihelp_chatbot_chat_card_list = document.getElementById(
        "ihelp_chatbot_chat_card_list_" + number
    );

    if (ihelp_chatbot_chat_card_list.children.length <= 1) {
        // Check left_arrow_container
        if (
            left_arrow_container &&
            left_arrow_container.classList.contains("shown")
        ) {
            left_arrow_container.classList.remove("shown");
            left_arrow_container.classList.add("hidden");
        } else {
            left_arrow_container.classList.add("hidden");
        }

        // Check right_arrow_container
        if (
            right_arrow_container &&
            right_arrow_container.classList.contains("shown")
        ) {
            right_arrow_container.classList.remove("shown");
            right_arrow_container.classList.add("hidden");
        } else {
            right_arrow_container.classList.add("hidden");
        }
    }
}

function select_card_list(id_number) {
    let str = id_number;
    let match = str.match(/_([^_]*)$/);
    let number = match ? parseInt(match[1]) : null;

    let left_arrow_container = document.getElementById(
        "left_arrow_container_" + number
    );
    let right_arrow_container = document.getElementById(
        "right_arrow_container_" + number
    );
    let ihelp_chatbot_chat_card_list = document.getElementById(
        "ihelp_chatbot_chat_card_list_" + number
    );

    // if (ihelp_chatbot_chat_card_list.children.length <= 1) {
    //     // Check left_arrow_container
    //     if (left_arrow_container && left_arrow_container.classList.contains('shown')) {
    //         left_arrow_container.classList.remove('shown');
    //         left_arrow_container.classList.add('hidden');
    //     } else {
    //         left_arrow_container.classList.add('hidden');
    //     }

    //     // Check right_arrow_container
    //     if (right_arrow_container && right_arrow_container.classList.contains('shown')) {
    //         right_arrow_container.classList.remove('shown');
    //         right_arrow_container.classList.add('hidden');
    //     } else {
    //         right_arrow_container.classList.add('hidden');
    //     }
    // }

    ihelp_chatbot_chat_card_list &&
        ihelp_chatbot_chat_card_list.addEventListener("scroll", () => {
            if (ihelp_chatbot_chat_card_list.scrollLeft >= 5) {
                left_arrow_container &&
                    left_arrow_container.classList.add("shown");
                left_arrow_container &&
                    left_arrow_container.classList.remove("hidden");
            } else {
                left_arrow_container &&
                    left_arrow_container.classList.remove("shown");
                left_arrow_container &&
                    left_arrow_container.classList.add("hidden");
            }

            if (
                Math.ceil(
                    ihelp_chatbot_chat_card_list.scrollLeft +
                        ihelp_chatbot_chat_card_list.clientWidth
                ) < Math.ceil(ihelp_chatbot_chat_card_list.scrollWidth)
            ) {
                right_arrow_container &&
                    right_arrow_container.classList.remove("hidden");
                right_arrow_container &&
                    right_arrow_container.classList.add("shown");
            } else {
                right_arrow_container &&
                    right_arrow_container.classList.remove("shown");
                right_arrow_container &&
                    right_arrow_container.classList.add("hidden");
            }
        });

    left_arrow_container &&
        left_arrow_container.addEventListener("click", () => {
            ihelp_chatbot_chat_card_list.scrollLeft -= 250;
            if (ihelp_chatbot_chat_card_list.scrollLeft <= 250) {
                left_arrow_container.classList.add("hidden");
                left_arrow_container.classList.remove("shown");
            } else {
                left_arrow_container.classList.remove("hidden");
                left_arrow_container.classList.add("shown");
            }
            if (
                ihelp_chatbot_chat_card_list.scrollLeft +
                    ihelp_chatbot_chat_card_list.clientWidth <=
                ihelp_chatbot_chat_card_list.scrollWidth
            ) {
                right_arrow_container.classList.remove("hidden");
                right_arrow_container.classList.add("shown");
            }
        });

    right_arrow_container &&
        right_arrow_container.addEventListener("click", () => {
            ihelp_chatbot_chat_card_list.scrollLeft += 250;
            if (
                Math.ceil(
                    ihelp_chatbot_chat_card_list.scrollLeft +
                        ihelp_chatbot_chat_card_list.clientWidth
                ) == Math.ceil(ihelp_chatbot_chat_card_list.scrollWidth)
            ) {
                right_arrow_container.classList.add("hidden");
                right_arrow_container.classList.remove("shown");
            } else {
                right_arrow_container.classList.remove("hidden");
                right_arrow_container.classList.add("shown");
            }
            if (ihelp_chatbot_chat_card_list.scrollLeft >= 0) {
                left_arrow_container.classList.remove("hidden");
                left_arrow_container.classList.add("shown");
            }
        });
}

// need to be work when remove

// function local_storage_remove() {
//     // Retrieve previous timeout ID from local storage
//     var timeout_id = localStorage.getItem("timeout_id");

//     if (timeout_id) {
//         // Clear the previous timeout if it exists
//         clearTimeout(timeout_id);
//     }

//     // Set new timeout and store the ID for 1 hr
//     timeout_id = setTimeout(function () {
//         localStorage.removeItem("phone");
//         localStorage.removeItem("conversation_type");
//         localStorage.removeItem("timeout_id"); // Clear timeout_id after execution
//         ihelp_chatbot_card_close_icon.click();
//     }, 3600000);

//     //3600000

//     // Store the new timeout ID on local storage
//     localStorage.setItem("timeout_id", timeout_id);
// }

//default on load call
//local_storage_remove();

//close the chat all
// function chat_close() {
//     ihelp_chatbot_urge_for_container.classList.add("shown");
//     ihelp_chatbot_urge_for_container.classList.remove("hidden");
//     ihelp_chatbot_phone_container.classList.add("shown");
//     ihelp_chatbot_phone_container.classList.remove("hidden");
//     ihelp_chatbot_card.classList.add("hidden");
//     ihelp_chatbot_card.classList.remove("shown");
//     ihelp_chatbot_appear_id.classList.add("shown");
//     ihelp_chatbot_appear_id.classList.remove("hidden");
//     localStorage.removeItem("phone");
//     localStorage.removeItem("conversation_type");
//     localStorage.removeItem("timeout_id");
//     ihelp_chatbot_question_input.value = "";
//     ihelp_chatbot_phone_input.value = "";
// }

// $(document).ready(function()
// {
//     $(window).bind("beforeunload", function() {
//         localStorage.removeItem('phone');
//         localStorage.removeItem('conversation_type');
//         localStorage.removeItem('timeout_id');
//     });
// });

// $(document).ready(function()
// {
//     let existing_token = localStorage.getItem('token');
//     let existing_conversation_type = localStorage.getItem('conversation_type');
//     if (existing_token !== "") {
//         Echo.leave(existing_token);
//     }

//     if((existing_token !== "") && (existing_conversation_type !== "")){
//         chatbot_echo_listener(existing_token);
//     }

// });

function chatbot_echo_listener(token) {
    $(document).ready(function () {
        let channel_broadcast = token;

        Echo.channel(channel_broadcast).listen("MessageSendEvent", (e) => {
            //console.log(e.message);
            var htmlReplyString =
                '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                e.message +
                '</span><span class="ihelp_chatbot_date">' +
                getCurrentTime() +
                "</span></li>";
            ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                "beforeend",
                htmlReplyString
            );
            ihelp_chatbot_card_message_body.scrollTop =
                ihelp_chatbot_card_message_body.scrollHeight;
        });
    });
}

function handleLoader() {
    document.getElementById("loader").style.display = "block";

    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
    }, 3000);
}

//existing conversation fetch
function getExistingConversation() {
    let apiUrl = commonUrl + "api/all-conversation-by-phone";
    let local_storage_phone = localStorage.getItem("phone");
    let token = localStorage.getItem("token");

    //handleLoader();

    let requestData = {
        phone: local_storage_phone,
        token: token,
    };

    if (local_storage_phone != null && token != null) {
        // Make a POST request

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                let array = data.data;

                //all data entry to the chat body
                array.forEach((element) => {
                    //console.log(element);
                    if (element.receive_status == 1) {
                        //question insert from user
                        let htmlQuestionString =
                            '<li class="ihelp_chatbot_user"><span class="ihelp_chatbot_user_chat">' +
                            element.message_body +
                            '</span><span class="ihelp_chatbot_user_date">' +
                            _time_format(element.date) +
                            "</span></li>";
                        ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                            "beforeend",
                            htmlQuestionString
                        );
                    }

                    if (element.receive_status == 2) {
                        //faq fetch
                        if (element.conversation_type_id == 1) {
                            //reply insert to the dom chatbot
                            if (element.reply.file == null) {
                                var htmlReplyString =
                                    '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                                    element.message_body +
                                    '</span><span class="ihelp_chatbot_date">' +
                                    _time_format(element.date) +
                                    "</span></li>";
                                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                                    "beforeend",
                                    htmlReplyString
                                );
                            }
                            if (element.reply.file != null) {
                                let htmlReplyStringAndImage =
                                    '<li class="ihelp_chatbot">' +
                                    '<span class="ihelp_chatbot_chat">' +
                                    element.reply.reply +
                                    "</span>" +
                                    '<span class="ihelp_chatbot_chat_image">' +
                                    '<img src="' +
                                    element.reply.file +
                                    '" alt="">' +
                                    "</span>" +
                                    '<span class="ihelp_chatbot_date">' +
                                    _time_format(element.date) +
                                    "</span>" +
                                    "</li>";
                                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                                    "beforeend",
                                    htmlReplyStringAndImage
                                );
                            }
                            //reply insert to the dom chatbot
                            if (element.reply.tags != null) {
                                // Split the comma-separated string into an array of tags
                                const tags = element.reply.tags
                                    ? element.reply.tags.split(",")
                                    : [];
                                let htmlTagString =
                                    '<li class="ihelp_chatbot_tag">';

                                for (const tag of tags) {
                                    htmlTagString += `<span class="ihelp_chatbot_tag_item" onclick="handleTagClick('${tag}')">${tag}</span>`;
                                }

                                htmlTagString += `</li>`;
                                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                                    "beforeend",
                                    htmlTagString
                                );
                            }
                        }

                        //product fetch
                        if (element.conversation_type_id == 2) {
                            //reply insert to the dom chatbot

                            if (element.reply.file != null) {
                                var htmlReplyStringAndImage =
                                    '<li class="ihelp_chatbot">' +
                                    '<span class="ihelp_chatbot_chat">' +
                                    element.message_body +
                                    "</span>" +
                                    '<span class="ihelp_chatbot_chat_image">' +
                                    '<img src="' +
                                    element.reply.file +
                                    '" alt="">' +
                                    "</span>" +
                                    '<span class="ihelp_chatbot_date">' +
                                    _time_format(element.date) +
                                    "</span>" +
                                    "</li>";
                                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                                    "beforeend",
                                    htmlReplyStringAndImage
                                );
                            }

                            if (element.reply.product) {
                                let products = element.reply.product;

                                //
                                let listCounter = 1; // Initialize the counter

                                // Find the highest number used in existing IDs
                                document
                                    .querySelectorAll(
                                        '[id^="ihelp_chatbot_chat_card_list_"]'
                                    )
                                    .forEach(function (element) {
                                        let idNumber = parseInt(
                                            element.id.split("_").pop()
                                        );
                                        if (idNumber >= listCounter) {
                                            listCounter = idNumber + 1;
                                        }
                                    });

                                function generateUniqueListID() {
                                    let listID = listCounter;
                                    // listCounter++; // Increment the counter for the next list
                                    return listID;
                                }

                                ///
                                let htmlReplyCardStringAndImage =
                                    '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, odit.</span>' +
                                    '<div class="ihelp_chatbot_chat_card_list_container">' +
                                    '<div id="left_arrow_container_' +
                                    generateUniqueListID() +
                                    '" class="hidden" onclick="select_card_list(\'left_arrow_container_' +
                                    generateUniqueListID() +
                                    "')\">" +
                                    '<span class="ihelp_chatbot_chat_card_arrow left_arrow" id="chatting_card_left_arrow_' +
                                    generateUniqueListID() +
                                    '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-left" viewBox="0 0 16 16">' +
                                    '<path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"/>' +
                                    "</svg></span>" +
                                    "</div>" +
                                    '<div id="right_arrow_container_' +
                                    generateUniqueListID() +
                                    '" class="shown" onclick="select_card_list(\'right_arrow_container_' +
                                    generateUniqueListID() +
                                    "')\">" +
                                    '<span class="ihelp_chatbot_chat_card_arrow right_arrow" id="chatting_card_right_arrow_' +
                                    generateUniqueListID() +
                                    '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">' +
                                    '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>' +
                                    "</svg></span>" +
                                    "</div>" +
                                    // '<ul class="ihelp_chatbot_chat_card_list" id="ihelp_chatbot_chat_card_list">';
                                    '<ul class="ihelp_chatbot_chat_card_list" id="ihelp_chatbot_chat_card_list_' +
                                    generateUniqueListID() +
                                    '">'; // Use the generated unique ID

                                products.forEach(function (item) {
                                    htmlReplyCardStringAndImage +=
                                        '<li class="ihelp_chatbot_chat_single_card">' +
                                        '<div class="ihelp_chatbot_chat_single_card_image">' +
                                        '<img src="' +
                                        item.thumbnail +
                                        '" alt="">' +
                                        "</div>" +
                                        '<div class="ihelp_chatbot_chat_single_card_content">' +
                                        "<h3>" +
                                        item.title +
                                        "</h3>" +
                                        "<p>" +
                                        item.description +
                                        "</p>";
                                    if (item.link) {
                                        htmlReplyCardStringAndImage +=
                                            '<a href="' +
                                            item.link +
                                            '" class="ihelp_chatbot_chat_single_card_button" target="_blank">Find out more</a>';
                                    }
                                    htmlReplyCardStringAndImage +=
                                        "</div>" + "</li>";
                                });

                                htmlReplyCardStringAndImage +=
                                    "</ul>" +
                                    "</div>" +
                                    '<span class="ihelp_chatbot_date">' +
                                    _time_format(element.date) +
                                    "</span>" +
                                    "</li>";

                                ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                                    "beforeend",
                                    htmlReplyCardStringAndImage
                                );

                                initial_card_list(
                                    "initial_card_list_" +
                                        generateUniqueListID()
                                );
                            }
                        }

                        //live chat reply
                        if (element.conversation_type_id == 3) {
                            let htmlReplyString =
                                '<li class="ihelp_chatbot"><span class="ihelp_chatbot_chat">' +
                                element.message_body +
                                '</span><span class="ihelp_chatbot_date">' +
                                _time_format(element.date) +
                                "</span></li>";
                            ihelp_chatbot_card_message_chatlist.insertAdjacentHTML(
                                "beforeend",
                                htmlReplyString
                            );
                        }
                    }
                });
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }
}

function clearTicketContainer() {
    //let contact_name = documentgetElementById()
}

var code;
function createCaptcha() {
    //clear the contents of captcha div first
    document.getElementById("captcha").innerHTML = "";
    var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}

// function validateCaptcha() {
//     event.preventDefault();
//     if (document.getElementById("cpatchaTextBox").value == code) {
//         alert("Valid Captcha");
//     } else {
//         alert("Invalid Captcha. try Again");
//         createCaptcha();
//     }
// }

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     e.returnValue = '';
// });
// console.log(window)

// let isLeavingPage = false;

// Listen for visibility change
// document.addEventListener("visibilitychange", function () {
//     if (document.visibilityState === "hidden") {
//         isLeavingPage = true;
//     } else {
//         isLeavingPage = false;
//     }
// });

// // Handle the beforeunload event
// window.addEventListener("beforeunload", function (e) {
//     if (isLeavingPage) {
//         // Most browsers will show a generic message here, you can't customize it much
//         e.preventDefault();
//         e.returnValue = ""; // This might not work in all browsers
//     }
// });

// console.log(window)

// window.addEventListener('onunload', function (e) {
//     // Prompt the user before they close the browser
//     e.preventDefault();

//     let token = localStorage.getItem("token");

//         const apiCloseUrl = commonUrl + "api/chatbot-close-conversation";
//         if (token) {
//             Echo.leave(token);
//             let closeData = {
//                 token: token,
//             };
//             fetch(apiCloseUrl, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(closeData),
//             })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch((error) => {
//                 alert("few issue from system");
//                 console.error(
//                     "There was a problem with the fetch operation:",
//                     error
//                 );
//             });
//         }

//         // Add your other actions here

//         // Ensure that localStorage cleanup and other actions are performed
//         localStorage.removeItem("phone");
//         localStorage.removeItem("conversation_type");
//         localStorage.removeItem("timeout_id");
//         localStorage.removeItem("token");
// });

//ticket form validation
function validateFormFields() {
    const nameInput = document.getElementById("ihelp_contact_name");
    const errorDiv = document.getElementById("ihelp_contact_name_error");

    const emailInput = document.getElementById("ihelp_email");
    const emailerrorDiv = document.getElementById("ihelp_contact_email_error");

    const subjectInput = document.getElementById("ihelp_subject_name");
    const subjecterrorDiv = document.getElementById(
        "ihelp_contact_subject_error"
    );

    const agencySelect = document.getElementById("ihelp_agent_type");
    const agencyErrorDiv = document.getElementById(
        "ihelp_contact_agency_error"
    );

    const clpSelect = document.getElementById("ihelp_type_of_clp");
    const clpErrorDiv = document.getElementById(
        "ihelp_contact_type_of_clp_error"
    );

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === "") {
        nameInput.classList.add("input-error");
        errorDiv.innerText = "Contact name is required";
        isValid = false;
    } else {
        nameInput.classList.remove("input-error");
        errorDiv.innerText = "";
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
        emailInput.classList.add("input-error");
        emailerrorDiv.innerText = "Email is required";
        isValid = false;
    } else {
        emailInput.classList.remove("input-error");
        emailerrorDiv.innerText = "";
    }

    // Validate Subject
    if (subjectInput.value.trim() === "") {
        subjectInput.classList.add("input-error");
        subjecterrorDiv.innerText = "Subject is required";
        isValid = false;
    } else {
        subjectInput.classList.remove("input-error");
        subjecterrorDiv.innerText = "";
    }

    // Validate Agency Type
    if (agencySelect.value.trim() === "") {
        agencySelect.classList.add("input-error");
        agencyErrorDiv.innerText = "Agency type is required";
        isValid = false;
    } else {
        agencySelect.classList.remove("input-error");
        agencyErrorDiv.innerText = "";
    }

    // Validate Type of CLP (multi-select)
    const selectedCLPs = Array.from(clpSelect.options).filter(
        (option) => option.selected
    );
    if (selectedCLPs.length === 0) {
        clpSelect.classList.add("input-error");
        clpErrorDiv.innerText = "Please select at least one Type of CLP";
        isValid = false;
    } else {
        clpSelect.classList.remove("input-error");
        clpErrorDiv.innerText = "";
    }

    return isValid;
}


// function clearTicketAllField(){
//     document.getElementById("ihelp_contact_name").value = "";
//     document.getElementById("ihelp_email").value = "";
//     document.getElementById("ihelp_subject_name").value = "";
//     document.getElementById("ihelp_description").value = "";
//     document.getElementById("cpatchaTextBox").value = "";
//     document.getElementById("attachment").value = "";
//     $('#ihelp_agent_type').val(null).trigger('change');
//     $('#ihelp_type_of_clp').val(null).trigger('change');
// }