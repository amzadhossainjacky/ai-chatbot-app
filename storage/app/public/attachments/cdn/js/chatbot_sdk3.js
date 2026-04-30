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
//var commonTicketUrl = "https://43.229.13.253/";
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

function create_chatbot_card_css_ar() {
    //favicon css link
    var font_awesome_link_ar = document.createElement("link");
    font_awesome_link_ar.rel = "stylesheet";
    font_awesome_link_ar.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";

    // Create a link element
    var create_chatbot_card_css_ar = document.createElement("link");

    // Set attributes for the link element
    create_chatbot_card_css_ar.rel = "stylesheet";
    create_chatbot_card_css_ar.type = "text/css";
    create_chatbot_card_css_ar.href =
        commonUrl + "storage/attachments/cdn/css/chatbot_sdk.css"; // URL to your CSS file

    // Append the link element to the document's head
    document.head.appendChild(create_chatbot_card_css_ar);
    document.head.appendChild(font_awesome_link_ar);
    create_chatbot_card_css_ar.onload = function () {
        var chatbot_card_layout_ar = create_chatbot_card_layout_ar();
        var chatbot_appear_layout_ar = create_chatbot_appear_layout_ar();

        document.body.appendChild(chatbot_card_layout_ar);
        document.body.appendChild(chatbot_appear_layout_ar);
    };
}

/* ==========================================================================
                            create_chatbot_card_layout_ar function
========================================================================== */

function create_chatbot_card_layout_ar() {
    /*#########################################################################################           
        1 Chatbot card container start         
    #########################################################################################*/

    let chatbot_layout_ar = document.createElement("div");
    chatbot_layout_ar.id = "chatbot_layout_ar";
    chatbot_layout_ar.classList.add("chatbot_layout_ar");

    /*#########################################################################################           
        1.1 Chatbot card header container start         
    #########################################################################################*/
    let chatbot_header_ar = document.createElement("div");
    chatbot_header_ar.classList.add("chatbot_header_ar");

    /*==================== 1.1.1 Close chatbot button ====================*/
    let close_chatbot_ar = document.createElement("div");
    close_chatbot_ar.id = "close_chatbot_ar";
    close_chatbot_ar.classList.add("close_chatbot_ar");
    close_chatbot_ar.innerHTML = "✕";

    /*==================== 1.1.2 Header logo ====================*/
    let header_logo_ar = document.createElement("img");
    header_logo_ar.classList.add("header_logo_ar");
    header_logo_ar.src =
        "http://127.0.0.1:8000/backend/assets/images/logo-icon.jpg";
    header_logo_ar.alt = "";

    /*==================== 1.1.3 Back button ====================*/
    /* let tab_back_btn_ar = document.createElement("i");
    tab_back_btn_ar.className = "fa-solid fa-arrow-left tab_back_btn_ar_";
    tab_back_btn_ar.id = "tab_back_btn_ar"; */

    /*==================== 1.1.4 Header title ====================*/
    let header_title_ar = document.createElement("span");
    header_title_ar.id = "header_title_ar";
    header_title_ar.innerText = "Add Ticket";

    /*==================== 1.1.5 Language dropdown wrapper ====================*/
    let header_dropdown_ar = document.createElement("div");
    header_dropdown_ar.classList.add("header_dropdown_ar");
    header_dropdown_ar.id = "langDropdown_ar";

    /*-------------------- 1.1.5.1 Dropdown trigger --------------------*/
    let dropdown_trigger_ar = document.createElement("div");
    dropdown_trigger_ar.classList.add("header_right_ar");
    dropdown_trigger_ar.id = "dropdownTrigger_ar";
    dropdown_trigger_ar.innerHTML = `
        <i class="fa-solid fa-globe"></i> English 
        <i class="fa-solid fa-caret-down"></i>
    `;

    /*-------------------- 1.1.5.2 Dropdown menu --------------------*/
    let dropdown_menu_ar = document.createElement("div");
    dropdown_menu_ar.classList.add("dropdown_content_ar");
    dropdown_menu_ar.id = "dropdownMenu_ar";

    /*-------------------- 1.1.5.2.1 Dropdown header --------------------*/
    let dropdown_header_ar = document.createElement("div");
    dropdown_header_ar.classList.add("dropdown_header_ar");
    dropdown_header_ar.innerText = "Languages";

    /*-------------------- 1.1.5.2.2 Language list --------------------*/
    let language_list_ar = document.createElement("ul");
    language_list_ar.classList.add("language_list_ar");

    let lang_bn = document.createElement("li");
    lang_bn.innerHTML = `<a href="#" data-lang="bn">বাংলা</a>`;

    let lang_en = document.createElement("li");
    lang_en.classList.add("active_ar");
    lang_en.innerHTML = `<a href="#" data-lang="en">English</a>`;

    language_list_ar.append(lang_bn, lang_en);

    /*-------------------- 1.1.5.2.3 Dropdown footer --------------------*/
    let dropdown_footer_ar = document.createElement("div");
    dropdown_footer_ar.classList.add("dropdown_footer_ar");
    dropdown_footer_ar.innerHTML = `Default: <strong>English</strong>`;

    /*==================== 1.1.6 Assemble dropdown ====================*/
    dropdown_menu_ar.append(
        dropdown_header_ar,
        language_list_ar,
        dropdown_footer_ar
    );

    header_dropdown_ar.append(dropdown_trigger_ar, dropdown_menu_ar);

    /*==================== 1.1.7 Assemble header ====================*/
    chatbot_header_ar.append(
        close_chatbot_ar,
        header_logo_ar,
        //tab_back_btn_ar,
        header_title_ar,
        header_dropdown_ar
    );
    chatbot_layout_ar.appendChild(chatbot_header_ar);
    /*#########################################################################################           
        1.1 Chatbot card header container end         
    #########################################################################################*/

    /*#########################################################################################           
        1.2 ihelp chatbot body wrapper container start         
    #########################################################################################*/
    let chatbot_body_wrapper_ar = document.createElement("div");
    chatbot_body_wrapper_ar.classList.add("chatbot_body_wrapper_ar");

    /*&&&&&&&&&&&&&&&&&&&& 1.2.1 tab_loader_ar wrapper container start   &&&&&&&&&&&&&&&&&&&&*/
    let tab_loader_ar = document.createElement("div");
    tab_loader_ar.id = "tab_loader_ar";
    tab_loader_ar.classList.add("loader_overlay_ar");

    /*==================== 1.2.1.1 tab_loader_ar loader section    ====================*/
    let loader_ar = document.createElement("div");
    loader_ar.classList.add("loader_ar");

    /*==================== 1.2.1.2 append loader to tab_loader_ar   ====================*/
    tab_loader_ar.appendChild(loader_ar);

    /* append tab_loader_ar to chatbot_body_wrapper_ar */
    chatbot_body_wrapper_ar.appendChild(tab_loader_ar);
    /*&&&&&&&&&&&&&&&&&&&& 1.2.1 tab_loader_ar wrapper container end    &&&&&&&&&&&&&&&&&&&&*/

    /*&&&&&&&&&&&&&&&&&&&& 1.2.2 tab_tickets_ar wrapper container start   &&&&&&&&&&&&&&&&&&&&*/
    let tab_tickets_ar = document.createElement("div");
    tab_tickets_ar.classList.add("tab_content_ar", "active_ar");
    tab_tickets_ar.id = "tab_tickets_ar";

    /*==================== 1.2.2.1 tab_tickets_ar heading section    ====================*/
    let ticket_form_heading_ar = document.createElement("h4");
    ticket_form_heading_ar.classList.add("ticket_form_heading_ar");
    ticket_form_heading_ar.setAttribute("data-i18n", "case_information");
    ticket_form_heading_ar.innerText = "Case Information";

    /*==================== 1.2.2.2 ticket_form_ar wrapper section    ====================*/
    let ticket_form_ar = document.createElement("div");
    ticket_form_ar.classList.add("ticket_form_ar");

    /*append heading & form to tab_tickets_ar*/
    tab_tickets_ar.appendChild(ticket_form_heading_ar);
    tab_tickets_ar.appendChild(ticket_form_ar);

    /*==================== 1.2.2.2.1 contact_name_ar form group start ====================*/
    let fg_contact_name_ar = document.createElement("div");
    fg_contact_name_ar.classList.add("form_group_ar", "floating_ar");

    /* contact_name_ar label */
    let contact_name_label_ar = document.createElement("label");
    contact_name_label_ar.setAttribute("for", "contact_name_ar");
    contact_name_label_ar.setAttribute("data-i18n", "contact_name");

    /* contact_name_ar input */
    let contact_name_input_ar = document.createElement("input");
    contact_name_input_ar.type = "text";
    contact_name_input_ar.id = "contact_name_ar";
    contact_name_input_ar.required = true;
    /* contact_name_ar label text */
    let contact_name_label_text_ar = document.createTextNode("Contact Name");

    /* contact_name_ar required asterisk */
    let contact_name_asterisk_ar = document.createElement("span");
    contact_name_asterisk_ar.classList.add("gl_form_asterisk_ar");
    contact_name_asterisk_ar.innerText = "*";

    //contact validation
    let contactErrorDiv = document.createElement("div");
    contactErrorDiv.id = "contact_name_error";
    contactErrorDiv.className = "error-message";

    /* assemble contact_name_ar label */
    contact_name_label_ar.appendChild(contact_name_label_text_ar);
    contact_name_label_ar.appendChild(contact_name_asterisk_ar);

    /* append input & label */
    fg_contact_name_ar.appendChild(contact_name_input_ar);
    fg_contact_name_ar.appendChild(contact_name_label_ar);
    fg_contact_name_ar.appendChild(contactErrorDiv);

    /* append contact_name_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_contact_name_ar);
    /*==================== 1.2.2.2.1 contact_name_ar form group end ====================*/

    /*==================== 1.2.2.2.2 email_ar form group start ====================*/
    let fg_email_ar = document.createElement("div");
    fg_email_ar.classList.add("form_group_ar", "floating_ar");

    /* email_ar input */
    let email_input_ar = document.createElement("input");
    email_input_ar.type = "email";
    email_input_ar.id = "email_ar";
    email_input_ar.required = true;

    /* email_ar label */
    let email_label_ar = document.createElement("label");
    email_label_ar.setAttribute("for", "email");
    email_label_ar.setAttribute("data-i18n", "email");

    /* email_ar label text */
    let email_label_text_ar = document.createTextNode("Email ");

    /* email_ar required asterisk */
    let email_asterisk_ar = document.createElement("span");
    email_asterisk_ar.classList.add("gl_form_asterisk_ar");
    email_asterisk_ar.innerText = "*";

    //email validation
    let emailErrorDiv = document.createElement("div");
    emailErrorDiv.id = "email_error";
    emailErrorDiv.className = "error-message";

    /* assemble email_ar label */
    email_label_ar.appendChild(email_label_text_ar);
    email_label_ar.appendChild(email_asterisk_ar);

    /* append input & label */
    fg_email_ar.appendChild(email_input_ar);
    fg_email_ar.appendChild(email_label_ar);
    fg_email_ar.appendChild(emailErrorDiv);

    /* append email_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_email_ar);
    /*==================== 1.2.2.2.2 email_ar form group end ====================*/

    /*==================== 1.2.2.2.3 sector_user_ar form group start ====================*/
    let fg_sector_user_ar = document.createElement("div");
    fg_sector_user_ar.classList.add("form_group_ar");

    /*==================== 1.2.2.2.3.1 sector_user_ar label section ====================*/
    let sector_label_ar = document.createElement("label");
    sector_label_ar.classList.add("field_label_ar");

    /* sector_user_ar label text */
    let sector_label_text_ar = document.createElement("span");
    sector_label_text_ar.setAttribute("data-i18n", "sector_user");
    sector_label_text_ar.innerText = "Sector of user reporting issues";

    /* sector_user_ar tooltip */
    let sector_tooltip_ar = document.createElement("span");
    sector_tooltip_ar.classList.add("info_tooltip_ar");
    sector_tooltip_ar.setAttribute(
        "data-tooltip",
        "Provide the details of the user who reported the issue"
    );
    sector_tooltip_ar.innerText = " i";

    /* append text & tooltip to label */
    sector_label_ar.appendChild(sector_label_text_ar);
    sector_label_ar.appendChild(sector_tooltip_ar);

    /*==================== 1.2.2.2.3.2 custom_select_ar wrapper ====================*/
    let custom_select_ar = document.createElement("div");
    custom_select_ar.classList.add("custom_select_ar");
    custom_select_ar.id = "report_custom_select_ar";

    /*-------------------- select_display_ar --------------------*/
    let select_display_ar = document.createElement("div");
    select_display_ar.classList.add("select_display_ar");

    /* selected value */
    let selected_value_ar = document.createElement("span");
    selected_value_ar.classList.add("selected_value_ar");
    selected_value_ar.id = "report_select_value_ar";
    selected_value_ar.setAttribute("data-id", "0");
    //selected_value_ar.innerText = "Private";

    /* chevron icon */
    let chevron_ar = document.createElement("span");
    chevron_ar.classList.add("chevron_ar");

    let chevron_icon_ar = document.createElement("i");
    chevron_icon_ar.classList.add("fa-solid", "fa-sort-down");

    chevron_ar.appendChild(chevron_icon_ar);

    /* append selected value & chevron */
    select_display_ar.appendChild(selected_value_ar);
    select_display_ar.appendChild(chevron_ar);

    /*-------------------- dropdown_ar --------------------*/
    let dropdown_ar = document.createElement("div");
    dropdown_ar.classList.add("dropdown_ar");

    /* search input */
    let search_input_ar = document.createElement("input");
    search_input_ar.type = "text";
    search_input_ar.placeholder = "Search...";
    search_input_ar.classList.add("search_input_ar");

    /* options list */
    let options_ul_ar = document.createElement("ul");
    options_ul_ar.classList.add("options_ar");
    options_ul_ar.id = "reporting_options_ar";

    /* option items */
    // let sector_options_ar = [
    //     "Private",
    //     "Public",
    //     "Traders",
    //     "Declarant",
    //     "Government",
    // ];

    // sector_options_ar.forEach((option, index) => {
    //     let li_ar = document.createElement("li");
    //     li_ar.innerText = option;
    //     li_ar.setAttribute("value", option);

    //     if (index === 0) {
    //         li_ar.classList.add("active_ar");
    //     }

    //     options_ul_ar.appendChild(li_ar);
    // });

    /* append search & options */
    dropdown_ar.appendChild(search_input_ar);
    dropdown_ar.appendChild(options_ul_ar);

    /*==================== assemble custom_select_ar ====================*/
    custom_select_ar.appendChild(select_display_ar);
    custom_select_ar.appendChild(dropdown_ar);

    /*==================== assemble sector_user_ar form group ====================*/
    fg_sector_user_ar.appendChild(sector_label_ar);
    fg_sector_user_ar.appendChild(custom_select_ar);

    /* append sector_user_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_sector_user_ar);
    /*==================== 1.2.2.2.3 sector_user_ar form group end ====================*/

    /*==================== 1.2.2.2.4 subject_ar form group start ====================*/
    let fg_subject_ar = document.createElement("div");
    fg_subject_ar.classList.add("form_group_ar", "floating_ar");

    /* subject_ar input */
    let subject_input_ar = document.createElement("input");
    subject_input_ar.type = "text";
    subject_input_ar.id = "subject_ar";
    subject_input_ar.required = true;

    /* subject_ar label */
    let subject_label_ar = document.createElement("label");
    subject_label_ar.setAttribute("for", "subject_ar");
    subject_label_ar.setAttribute("data-i18n", "subject");

    /* subject_ar label text */
    let subject_label_text_ar = document.createTextNode("Subject ");

    /* subject_ar required asterisk */
    let subject_asterisk_ar = document.createElement("span");
    subject_asterisk_ar.classList.add("gl_form_asterisk_ar");
    subject_asterisk_ar.innerText = "*";

    //subject validation
    let subjectErrorDiv = document.createElement("div");
    subjectErrorDiv.id = "subject_error";
    subjectErrorDiv.className = "error-message";

    /* assemble subject_ar label */
    subject_label_ar.appendChild(subject_label_text_ar);
    subject_label_ar.appendChild(subject_asterisk_ar);

    /* append input & label to form group */
    fg_subject_ar.appendChild(subject_input_ar);
    fg_subject_ar.appendChild(subject_label_ar);
    fg_subject_ar.appendChild(subjectErrorDiv);

    /* append subject_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_subject_ar);
    /*==================== 1.2.2.2.4 subject_ar form group end ====================*/

    /*==================== 1.2.2.2.5 description_ar form group start ====================*/
    let fg_description_ar = document.createElement("div");
    fg_description_ar.classList.add("form_group_ar", "floating_ar");

    /* description_ar textarea */
    let description_textarea_ar = document.createElement("textarea");
    description_textarea_ar.id = "description_ar";
    description_textarea_ar.required = true;

    /* description_ar label */
    let description_label_ar = document.createElement("label");
    description_label_ar.setAttribute("for", "message");
    description_label_ar.setAttribute("data-i18n", "description");
    description_label_ar.innerText = "Description";

    /* append textarea and label to form group */
    fg_description_ar.appendChild(description_textarea_ar);
    fg_description_ar.appendChild(description_label_ar);

    /* append description_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_description_ar);
    /*==================== 1.2.2.2.5 description_ar form group end ====================*/

    /*==================== 1.2.2.2.6 bsw_application_ar form group start ====================*/
    let fg_bsw_application_ar = document.createElement("div");
    fg_bsw_application_ar.classList.add("form_group_ar");

    /*==================== 1.2.2.2.6.1 bsw_application_ar label ====================*/
    let bsw_label_ar = document.createElement("label");
    bsw_label_ar.classList.add("field_label_ar");

    /* label text */
    let bsw_label_text_ar = document.createElement("span");
    bsw_label_text_ar.setAttribute("data-i18n", "bsw_application");
    bsw_label_text_ar.innerText = "BSW Application";

    /* info tooltip */
    let bsw_tooltip_ar = document.createElement("span");
    bsw_tooltip_ar.classList.add("info_tooltip_ar");
    bsw_tooltip_ar.setAttribute(
        "data-tooltip",
        "Please Provide the related BSW Services for Issue Handling"
    );
    bsw_tooltip_ar.innerText = " i";

    /* append label text & tooltip */
    bsw_label_ar.appendChild(bsw_label_text_ar);
    bsw_label_ar.appendChild(bsw_tooltip_ar);

    /*==================== 1.2.2.2.6.2 custom_select_ar ====================*/
    let bsw_custom_select_ar = document.createElement("div");
    bsw_custom_select_ar.classList.add("custom_select_ar");
    bsw_custom_select_ar.id = "bsw_custom_select_ar";

    /* select_display_ar */
    let bsw_select_display_ar = document.createElement("div");
    bsw_select_display_ar.classList.add("select_display_ar");

    let bsw_selected_value_ar = document.createElement("span");
    bsw_selected_value_ar.classList.add("selected_value_ar");
    bsw_selected_value_ar.id = "bsw_selected_value_ar";
    bsw_selected_value_ar.setAttribute("data-id", "0");
    //bsw_selected_value_ar.innerText = "Steakholder Registration";

    let bsw_chevron_ar = document.createElement("span");
    bsw_chevron_ar.classList.add("chevron_ar");

    let bsw_chevron_icon_ar = document.createElement("i");
    bsw_chevron_icon_ar.classList.add("fa-solid", "fa-sort-down");

    bsw_chevron_ar.appendChild(bsw_chevron_icon_ar);
    bsw_select_display_ar.appendChild(bsw_selected_value_ar);
    bsw_select_display_ar.appendChild(bsw_chevron_ar);

    //bsw validation
    let bswErrorDiv = document.createElement("div");
    bswErrorDiv.id = "bsw_error";
    bswErrorDiv.className = "error-message";

    /* dropdown_ar */
    let bsw_dropdown_ar = document.createElement("div");
    bsw_dropdown_ar.classList.add("dropdown_ar");

    /* search input */
    let bsw_search_input_ar = document.createElement("input");
    bsw_search_input_ar.type = "text";
    bsw_search_input_ar.placeholder = "Search...";
    bsw_search_input_ar.classList.add("search_input_ar");

    /* options list */
    let bsw_options_ul_ar = document.createElement("ul");
    bsw_options_ul_ar.classList.add("options_ar");
    bsw_options_ul_ar.id = "bsw_options_ar";

    // let bsw_options_ar = [
    //     "Steakholder Registration",
    //     "Trade Portal",
    //     "Tariff or AI Tariff",
    //     "CLP",
    // ];

    // bsw_options_ar.forEach((option, index) => {
    //     let li_ar = document.createElement("li");
    //     li_ar.setAttribute("value", option);
    //     li_ar.innerText = option;

    //     if (index === 0) {
    //         li_ar.classList.add("active_ar"); // keep exactly like HTML
    //     }

    //     bsw_options_ul_ar.appendChild(li_ar);
    // });

    /* assemble dropdown_ar */
    bsw_dropdown_ar.appendChild(bsw_search_input_ar);
    bsw_dropdown_ar.appendChild(bsw_options_ul_ar);

    /* assemble custom_select_ar */
    bsw_custom_select_ar.appendChild(bsw_select_display_ar);
    bsw_custom_select_ar.appendChild(bsw_dropdown_ar);
    bsw_custom_select_ar.appendChild(bswErrorDiv);

    /*==================== assemble bsw_application_ar form group ====================*/
    fg_bsw_application_ar.appendChild(bsw_label_ar);
    fg_bsw_application_ar.appendChild(bsw_custom_select_ar);

    /* append bsw_application_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_bsw_application_ar);
    /*==================== 1.2.2.2.6 bsw_application_ar form group end ====================*/

    /*==================== 1.2.2.2.7 agency_type_ar form group start ====================*/
    let fg_agency_type_ar = document.createElement("div");
    fg_agency_type_ar.classList.add("form_group_ar");

    /*==================== 1.2.2.2.7.1 agency_type_ar label ====================*/
    let agency_label_ar = document.createElement("label");
    agency_label_ar.classList.add("field_label_ar");

    /* label text */
    let agency_label_text_ar = document.createElement("span");
    agency_label_text_ar.setAttribute("data-i18n", "agency_type");
    agency_label_text_ar.innerText = "Agency Type";

    /* info tooltip */
    let agency_tooltip_ar = document.createElement("span");
    agency_tooltip_ar.classList.add("info_tooltip_ar");
    agency_tooltip_ar.setAttribute(
        "data-tooltip",
        "Type of BSW Application Agency"
    );
    agency_tooltip_ar.innerText = " i";

    /* append label text & tooltip */
    agency_label_ar.appendChild(agency_label_text_ar);
    agency_label_ar.appendChild(agency_tooltip_ar);

    /*==================== 1.2.2.2.7.2 custom_select_ar ====================*/
    let agency_custom_select_ar = document.createElement("div");
    agency_custom_select_ar.classList.add("custom_select_ar");
    agency_custom_select_ar.id = "agency_custom_select_ar";

    /* select_display_ar */
    let agency_select_display_ar = document.createElement("div");
    agency_select_display_ar.classList.add("select_display_ar");

    let agency_selected_value_ar = document.createElement("span");
    agency_selected_value_ar.classList.add("selected_value_ar");
    agency_selected_value_ar.id = "agency_selected_value_ar";
    agency_selected_value_ar.setAttribute("data-id", "0");
    // agency_selected_value_ar.innerText = "DOE : Department Of Environment";

    let agency_chevron_ar = document.createElement("span");
    agency_chevron_ar.classList.add("chevron_ar");

    let agency_chevron_icon_ar = document.createElement("i");
    agency_chevron_icon_ar.classList.add("fa-solid", "fa-sort-down");

    agency_chevron_ar.appendChild(agency_chevron_icon_ar);
    agency_select_display_ar.appendChild(agency_selected_value_ar);
    agency_select_display_ar.appendChild(agency_chevron_ar);

    /* dropdown_ar */
    let agency_dropdown_ar = document.createElement("div");
    agency_dropdown_ar.classList.add("dropdown_ar");

    /* search input */
    let agency_search_input_ar = document.createElement("input");
    agency_search_input_ar.type = "text";
    agency_search_input_ar.placeholder = "Search...";
    agency_search_input_ar.classList.add("search_input_ar");

    /* options list */
    let agency_options_ul_ar = document.createElement("ul");
    agency_options_ul_ar.classList.add("options_ar");
    agency_options_ul_ar.id = "agency_options_ar";

    //agency validation
    let agencyErrorDiv = document.createElement("div");
    agencyErrorDiv.id = "agency_error";
    agencyErrorDiv.className = "error-message";

    // let agency_options_ar = [
    //     "DOE : Department Of Environment",
    //     "DOE : Department Of Environment",
    //     "DOF : Department Of Fisheries",
    // ];

    // agency_options_ar.forEach((option, index) => {
    //     let li_ar = document.createElement("li");
    //     li_ar.setAttribute("value", option);
    //     li_ar.innerText = option;

    //     if (index === 0) {
    //         li_ar.classList.add("active_ar"); // keep exactly like HTML
    //     }

    //     agency_options_ul_ar.appendChild(li_ar);
    // });

    /* assemble dropdown_ar */
    agency_dropdown_ar.appendChild(agency_search_input_ar);
    agency_dropdown_ar.appendChild(agency_options_ul_ar);

    /* assemble custom_select_ar */
    agency_custom_select_ar.appendChild(agency_select_display_ar);
    agency_custom_select_ar.appendChild(agency_dropdown_ar);
    agency_custom_select_ar.appendChild(agencyErrorDiv);

    /*==================== assemble agency_type_ar form group ====================*/
    fg_agency_type_ar.appendChild(agency_label_ar);
    fg_agency_type_ar.appendChild(agency_custom_select_ar);

    /* append agency_type_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_agency_type_ar);
    /*==================== 1.2.2.2.7 agency_type_ar form group end ====================*/

    /*==================== 1.2.2.2.8 clp_type_ar form group start ====================*/
    let fg_clp_type_ar = document.createElement("div");
    fg_clp_type_ar.classList.add("form_group_ar");

    /*==================== 1.2.2.2.8.1 clp_type_ar label ====================*/
    let clp_label_ar = document.createElement("label");
    clp_label_ar.classList.add("field_label_ar");

    /* label text */
    let clp_label_text_ar = document.createElement("span");
    clp_label_text_ar.setAttribute("data-i18n", "type_of_clp");
    clp_label_text_ar.innerText = "Type of CLP";

    /* info tooltip */
    let clp_tooltip_ar = document.createElement("span");
    clp_tooltip_ar.classList.add("info_tooltip_ar");
    clp_tooltip_ar.setAttribute(
        "data-tooltip",
        "Type of BSW Application Submission CLPIA"
    );
    clp_tooltip_ar.innerText = " i";

    /* append label text & tooltip */
    clp_label_ar.appendChild(clp_label_text_ar);
    clp_label_ar.appendChild(clp_tooltip_ar);

    /*==================== 1.2.2.2.8.2 multi_select_ar ====================*/
    let clp_multi_select_ar = document.createElement("div");
    clp_multi_select_ar.classList.add("multi_select_ar");
    clp_multi_select_ar.id = "clpSelect_ar";

    /* multi_display_ar */
    let clp_multi_display_ar = document.createElement("div");
    clp_multi_display_ar.classList.add("multi_display_ar");

    /* multi_tags_ar */
    let clp_multi_tags_ar = document.createElement("div");
    clp_multi_tags_ar.classList.add("multi_tags_ar");

    /* placeholder */
    let clp_placeholder_ar = document.createElement("span");
    clp_placeholder_ar.classList.add("multi_placeholder_ar");
    clp_placeholder_ar.innerText = "Select type of CLP";

    /* assemble multi_tags_ar */
    clp_multi_tags_ar.appendChild(clp_placeholder_ar);
    clp_multi_display_ar.appendChild(clp_multi_tags_ar);

    /* chevron */
    let clp_chevron_ar = document.createElement("span");
    clp_chevron_ar.classList.add("chevron_ar");

    let clp_chevron_icon_ar = document.createElement("i");
    clp_chevron_icon_ar.classList.add("fa-solid", "fa-sort-down");

    clp_chevron_ar.appendChild(clp_chevron_icon_ar);
    clp_multi_display_ar.appendChild(clp_chevron_ar);

    /* multi_dropdown_ar */
    let clp_multi_dropdown_ar = document.createElement("div");
    clp_multi_dropdown_ar.classList.add("multi_dropdown_ar");

    /* search input */
    let clp_multi_search_ar = document.createElement("input");
    clp_multi_search_ar.type = "text";
    clp_multi_search_ar.placeholder = "Search...";
    clp_multi_search_ar.classList.add("multi_search_ar");

    /* options list */
    let clp_options_ul_ar = document.createElement("ul");
    clp_options_ul_ar.classList.add("multi_options_ar");
    clp_options_ul_ar.id = "clp_multi_options_ar";

    //clp validation
    let clpErrorDiv = document.createElement("div");
    clpErrorDiv.id = "clp_error";
    clpErrorDiv.className = "error-message";

    // let clp_options_ar = [
    //     {
    //         value: "4601",
    //         text: "4601 DoE Clearance Certificate for Import of Hazardous Substances",
    //     },
    //     {
    //         value: "4602",
    //         text: "4602 DoE Clearance Certificate for Export of Hazardous Substances",
    //     },
    //     {
    //         value: "4603",
    //         text: "4603 DoE License for Import of Ozone Depleting Substance ODS",
    //     },
    //     {
    //         value: "4604",
    //         text: "4604 DoE License to import of Hydrofluorocarbons HFC",
    //     },
    // ];

    // clp_options_ar.forEach((option) => {
    //     let li_ar = document.createElement("li");
    //     li_ar.setAttribute("data-value", option.value);
    //     li_ar.innerText = option.text;
    //     clp_options_ul_ar.appendChild(li_ar);
    // });

    /* assemble multi_dropdown_ar */
    clp_multi_dropdown_ar.appendChild(clp_multi_search_ar);
    clp_multi_dropdown_ar.appendChild(clp_options_ul_ar);

    /* assemble multi_select_ar */
    clp_multi_select_ar.appendChild(clp_multi_display_ar);
    clp_multi_select_ar.appendChild(clp_multi_dropdown_ar);
    clp_multi_select_ar.appendChild(clpErrorDiv);

    /*==================== assemble clp_type_ar form group ====================*/
    fg_clp_type_ar.appendChild(clp_label_ar);
    fg_clp_type_ar.appendChild(clp_multi_select_ar);

    /* append clp_type_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_clp_type_ar);
    /*==================== 1.2.2.2.8 clp_type_ar form group end ====================*/

    /*==================== 1.2.2.2.9 issue_category_ar form group start ====================*/
    let fg_issue_category_ar = document.createElement("div");
    fg_issue_category_ar.classList.add("form_group_ar");
    fg_issue_category_ar.style.marginTop = "30px";

    /*==================== 1.2.2.2.9.1 issue_category_ar label ====================*/
    let issue_label_ar = document.createElement("label");
    issue_label_ar.classList.add("field_label_ar");

    /* label text */
    let issue_label_text_ar = document.createElement("span");
    issue_label_text_ar.setAttribute("data-i18n", "issue_category");
    issue_label_text_ar.innerText = "Issue Category";

    /* info tooltip */
    let issue_tooltip_ar = document.createElement("span");
    issue_tooltip_ar.classList.add("info_tooltip_ar");
    issue_tooltip_ar.setAttribute("data-tooltip", "Issue Category");
    issue_tooltip_ar.innerText = " i";

    /* append label text & tooltip */
    issue_label_ar.appendChild(issue_label_text_ar);
    issue_label_ar.appendChild(issue_tooltip_ar);

    /*==================== 1.2.2.2.9.2 custom_select_ar ====================*/
    let issue_custom_select_ar = document.createElement("div");
    issue_custom_select_ar.classList.add("custom_select_ar");
    issue_custom_select_ar.id = "issue_custom_select_ar";

    /* select_display_ar */
    let issue_select_display_ar = document.createElement("div");
    issue_select_display_ar.classList.add("select_display_ar");

    let issue_selected_value_ar = document.createElement("span");
    issue_selected_value_ar.classList.add("selected_value_ar");
    issue_selected_value_ar.id = "issue_select_value_ar";
    issue_selected_value_ar.setAttribute("data-id", "0");
    // issue_selected_value_ar.innerText = "Activation Email";

    let issue_chevron_ar = document.createElement("span");
    issue_chevron_ar.classList.add("chevron_ar");

    let issue_chevron_icon_ar = document.createElement("i");
    issue_chevron_icon_ar.classList.add("fa-solid", "fa-sort-down");

    issue_chevron_ar.appendChild(issue_chevron_icon_ar);
    issue_select_display_ar.appendChild(issue_selected_value_ar);
    issue_select_display_ar.appendChild(issue_chevron_ar);

    /* dropdown_ar */
    let issue_dropdown_ar = document.createElement("div");
    issue_dropdown_ar.classList.add("dropdown_ar");

    /* search input */
    let issue_search_input_ar = document.createElement("input");
    issue_search_input_ar.type = "text";
    issue_search_input_ar.placeholder = "Search...";
    issue_search_input_ar.classList.add("search_input_ar");

    /* options list */
    let issue_options_ul_ar = document.createElement("ul");
    issue_options_ul_ar.classList.add("options_ar");
    issue_options_ul_ar.id = "issue_options_ar";

    // let issue_options_ar = ["Activation Email"];

    // issue_options_ar.forEach((option, index) => {
    //     let li_ar = document.createElement("li");
    //     li_ar.setAttribute("value", option);
    //     li_ar.innerText = option;
    //     if (index === 0) {
    //         li_ar.classList.add("active_ar"); // keep exactly like HTML
    //     }
    //     issue_options_ul_ar.appendChild(li_ar);
    // });

    /* assemble dropdown_ar */
    issue_dropdown_ar.appendChild(issue_search_input_ar);
    issue_dropdown_ar.appendChild(issue_options_ul_ar);

    /* assemble custom_select_ar */
    issue_custom_select_ar.appendChild(issue_select_display_ar);
    issue_custom_select_ar.appendChild(issue_dropdown_ar);

    /*==================== assemble issue_category_ar form group ====================*/
    fg_issue_category_ar.appendChild(issue_label_ar);
    fg_issue_category_ar.appendChild(issue_custom_select_ar);

    /* append issue_category_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_issue_category_ar);
    /*==================== 1.2.2.2.9 issue_category_ar form group end ====================*/

    /*==================== 1.2.2.2.10 captcha_verify_ar form group start ====================*/
    let fg_captcha_verify_ar = document.createElement("div");
    fg_captcha_verify_ar.classList.add(
        "form_group_ar",
        "form_group_unique_input_ar"
    );
    fg_captcha_verify_ar.style.marginTop = "30px";

    /*==================== 1.2.2.2.10.1 captcha_box_ar ====================*/
    let captcha_box_ar = document.createElement("div");
    captcha_box_ar.classList.add("captcha_box_ar");

    /* canvas element */
    let captcha_canvas_ar = document.createElement("canvas");
    captcha_canvas_ar.id = "captchaCanvas_ar";
    captcha_canvas_ar.width = 130;
    captcha_canvas_ar.height = 50;

    /* refresh button */
    let captcha_refresh_ar = document.createElement("button");
    captcha_refresh_ar.type = "button";
    captcha_refresh_ar.id = "refreshCaptcha_ar";
    captcha_refresh_ar.innerText = "↻";

    /* append canvas and button to captcha_box */
    captcha_box_ar.appendChild(captcha_canvas_ar);
    captcha_box_ar.appendChild(captcha_refresh_ar);

    /*==================== 1.2.2.2.10.2 verify label and input ====================*/
    let verify_label_ar = document.createElement("label");
    verify_label_ar.classList.add("field_label_ar");
    verify_label_ar.setAttribute("data-i18n", "verify_proceed");
    verify_label_ar.innerText = "Verify To Proceed";

    let verify_input_ar = document.createElement("input");
    verify_input_ar.type = "text";
    verify_input_ar.id = "verify_ar";
    verify_input_ar.required = true;

    /* optional hidden label commented out in original HTML */
    // let optional_label_ar = document.createElement("label");
    // optional_label_ar.setAttribute("for", "contact_name_1");
    // optional_label_ar.setAttribute("data-i18n", "verify_proceed");
    // optional_label_ar.innerHTML = 'Please verify to proceed <span class="gl_form_asterisk_ar">*</span>';

    let captcha_msg_ar = document.createElement("span");
    captcha_msg_ar.id = "captchaMsg_ar";

    /*==================== assemble captcha_verify_ar form group ====================*/
    fg_captcha_verify_ar.appendChild(captcha_box_ar);
    fg_captcha_verify_ar.appendChild(verify_label_ar);
    fg_captcha_verify_ar.appendChild(verify_input_ar);
    // fg_captcha_verify_ar.appendChild(optional_label_ar); // optional
    fg_captcha_verify_ar.appendChild(captcha_msg_ar);

    /* append captcha_verify_ar form group to ticket_form_ar */
    ticket_form_ar.appendChild(fg_captcha_verify_ar);
    /*==================== 1.2.2.2.10 captcha_verify_ar form group end ====================*/

    /*==================== 1.2.2.2.11 hidden_input_clp_ar start ====================*/
    let hidden_clp_input_ar = document.createElement("input");
    hidden_clp_input_ar.type = "hidden";
    hidden_clp_input_ar.name = "clp_types";
    hidden_clp_input_ar.id = "clpValues_ar";

    /* append hidden input to ticket_form_ar */
    ticket_form_ar.appendChild(hidden_clp_input_ar);
    /*==================== 1.2.2.2.11 hidden_input_clp_ar end ====================*/

    /* append tab_tickets_ar to chatbot_body_wrapper_ar */
    chatbot_body_wrapper_ar.appendChild(tab_tickets_ar);
    /*&&&&&&&&&&&&&&&&&&&& 1.2.2 tab_tickets_ar wrapper container end    &&&&&&&&&&&&&&&&&&&&*/

    /*&&&&&&&&&&&&&&&&&&&& 1.2.3 tab_chat_ar wrapper container start &&&&&&&&&&&&&&&&&&&&*/
    let tab_chat_ar = document.createElement("div");
    tab_chat_ar.classList.add("tab_content_ar");
    tab_chat_ar.id = "tab_chat_ar";

    /*==================== 1.2.3.1 phone_number_log_ar start ====================*/
    let phone_number_log_ar = document.createElement("div");
    phone_number_log_ar.id = "phone_number_log_ar";
    phone_number_log_ar.classList.add("phone_number_log_ar");

    let phone_number_log_container_ar = document.createElement("form");
    phone_number_log_container_ar.id = "phone_number_log_container_ar";
    phone_number_log_container_ar.classList.add(
        "phone_number_log_container_ar"
    );

    /* title */
    let phone_title_ar = document.createElement("h3");
    phone_title_ar.setAttribute("data-i18n", "start_with_phone");
    phone_title_ar.innerText = "Start With Phone Number";

    /* input */
    let phone_input_ar = document.createElement("input");
    phone_input_ar.type = "number";
    phone_input_ar.name = "phone";
    phone_input_ar.value = "";

    /* submit button */
    let phone_submit_ar = document.createElement("button");
    phone_submit_ar.id = "phone_number_log_submit_ar";
    phone_submit_ar.classList.add("submit_ar");
    phone_submit_ar.setAttribute("data-i18n", "submit");
    // phone_submit_ar.setAttribute("onclick", "toggleNumberAr()");
    phone_submit_ar.innerText = "Submit";

    /* assemble phone number container */
    phone_number_log_container_ar.appendChild(phone_title_ar);
    phone_number_log_container_ar.appendChild(phone_input_ar);
    phone_number_log_container_ar.appendChild(phone_submit_ar);
    phone_number_log_ar.appendChild(phone_number_log_container_ar);

    /* append to tab_content_ar */
    tab_chat_ar.appendChild(phone_number_log_ar);
    /*==================== 1.2.3.2 phone_number_log_ar end ====================*/

    /*==================== 1.2.3.4 FAQ CHAT start ====================*/
    let faq_chat_ar = document.createElement("div");
    faq_chat_ar.id = "faq_chat_ar";
    faq_chat_ar.classList.add("faq_chat");

    // /* faq options wrapper */
    // let faq_options_ar = document.createElement("div");
    // faq_options_ar.classList.add("faq_options_ar");

    // let chat_row_ar = document.createElement("div");
    // chat_row_ar.classList.add("chat_row_ar");

    // /* bot icon */
    // let bot_icon_ar = document.createElement("div");
    // bot_icon_ar.classList.add("bot_icon_ar");
    // bot_icon_ar.innerText = "🤖";

    // /* faq buttons container */
    // let faq_buttons_ar = document.createElement("div");
    // faq_buttons_ar.classList.add("faq_buttons_ar");

    // /* title */
    // let faq_title_ar = document.createElement("p");
    // faq_title_ar.classList.add("faq_title_ar");
    // faq_title_ar.innerText =
    //     "Please select from the following options for detailed assistance:";

    // /* buttons */
    // let faq_btns = [
    //     "About BSW",
    //     "User Registration",
    //     "Licenses and Institutions",
    //     "General inquiries",
    //     "Message us on whatsapp",
    // ];

    // faq_btns.forEach((text, index) => {
    //     let btn = document.createElement("button");
    //     btn.classList.add("faq_btn_ar");
    //     btn.innerText = text;

    //     if (text === "General inquiries") btn.classList.add("active_ar");
    //     if (text.includes("whatsapp")) btn.classList.add("whatsapp_ar");

    //     faq_buttons_ar.appendChild(btn);
    // });

    // /* chat time */
    // let faq_time_wrap_ar = document.createElement("div");
    // let faq_time_ar = document.createElement("span");
    // faq_time_ar.classList.add("chat_time_ar");
    // faq_time_ar.innerText = "11:11 AM";
    // faq_time_wrap_ar.appendChild(faq_time_ar);
    // faq_buttons_ar.appendChild(faq_time_wrap_ar);

    // /* assemble faq row */
    // chat_row_ar.appendChild(bot_icon_ar);
    // chat_row_ar.appendChild(faq_buttons_ar);
    // faq_options_ar.appendChild(chat_row_ar);
    // faq_chat_ar.appendChild(faq_options_ar);

    /* user reply */
    // let user_reply_ar = document.createElement("div");
    // user_reply_ar.classList.add("user_reply_ar");
    // user_reply_ar.innerText = "General inquiries";

    // let reply_time_ar = document.createElement("span");
    // reply_time_ar.classList.add("reply_time_ar");
    // reply_time_ar.innerText = "03:56 PM";
    // user_reply_ar.appendChild(reply_time_ar);

    // faq_chat_ar.appendChild(user_reply_ar);

    /* image response */
    // let faq_img_wrap_ar = document.createElement("div");
    // faq_img_wrap_ar.classList.add("faq_options_ar");

    // let faq_img_row_ar = document.createElement("div");
    // faq_img_row_ar.classList.add("chat_row_ar");

    // let faq_img_bot_ar = document.createElement("div");
    // faq_img_bot_ar.classList.add("bot_icon_ar");
    // faq_img_bot_ar.innerText = "🤖";

    // let faq_img_ar = document.createElement("div");
    // faq_img_ar.classList.add("faq_img_ar");

    // let faq_img_title_ar = document.createElement("p");
    // faq_img_title_ar.classList.add("faq_title_ar");
    // faq_img_title_ar.innerText = "Image :";

    // let faq_image_ar = document.createElement("img");
    // faq_image_ar.classList.add("faq_chat_img_ar");
    // faq_image_ar.src =
    //     "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    // let faq_img_time_wrap_ar = document.createElement("div");
    // let faq_img_time_ar = document.createElement("span");
    // faq_img_time_ar.classList.add("chat_time_ar");
    // faq_img_time_ar.innerText = "11:11 AM";

    // faq_img_time_wrap_ar.appendChild(faq_img_time_ar);

    // /* assemble image response */
    // faq_img_ar.appendChild(faq_img_title_ar);
    // faq_img_ar.appendChild(faq_image_ar);
    // faq_img_ar.appendChild(faq_img_time_wrap_ar);

    // faq_img_row_ar.appendChild(faq_img_bot_ar);
    // faq_img_row_ar.appendChild(faq_img_ar);
    // faq_img_wrap_ar.appendChild(faq_img_row_ar);

    // faq_chat_ar.appendChild(faq_img_wrap_ar);

    /* append faq chat */
    tab_chat_ar.appendChild(faq_chat_ar);
    /*==================== 1.2.3.4 FAQ CHAT end ====================*/

    /*==================== 1.2.3.5 LIVE CHAT start ====================*/
    let live_chat_ar = document.createElement("div");
    live_chat_ar.id = "live_chat_ar";
    live_chat_ar.classList.add("live_chat_ar");
    live_chat_ar.style.display = "none";

    /* leave message wrapper */
    let leave_message_ar = document.createElement("div");
    leave_message_ar.classList.add("leave_message_ar");

    /* header */
    let leave_header_ar = document.createElement("div");
    leave_header_ar.classList.add("leave_header_ar");

    /* back button */
    let back_btn_ar = document.createElement("button");
    back_btn_ar.classList.add("back_btn_ar");

    let end_chat_ar = document.createElement("button");
    end_chat_ar.id = "end_chat_ar";
    end_chat_ar.classList.add("end_button_ar");
    end_chat_ar.innerHTML = `<i class="fa-solid fa-angles-left"></i>`;

    back_btn_ar.appendChild(end_chat_ar);

    /* brand circle */
    let brand_circle_ar = document.createElement("div");
    brand_circle_ar.classList.add("brand_circle_ar");

    let brand_text_ar = document.createElement("span");
    brand_text_ar.innerText = "BSW Desk";
    brand_circle_ar.appendChild(brand_text_ar);

    /* title */
    let leave_title_ar = document.createElement("h3");
    leave_title_ar.innerText = "Leave a message";

    /* assemble header */
    leave_header_ar.appendChild(back_btn_ar);
    leave_header_ar.appendChild(brand_circle_ar);
    leave_header_ar.appendChild(leave_title_ar);
    leave_message_ar.appendChild(leave_header_ar);

    /*==================== LIVE MESSAGES ====================*/
    let live_messages_ar = document.createElement("div");
    live_messages_ar.classList.add("live_messages_ar");
    live_messages_ar.id = "live_messages_ar";

    /* agent message */
    /* let agent_msg_ar1 = document.createElement("div");
    agent_msg_ar1.classList.add("agent_msg_ar");

    let agent_name_ar1 = document.createElement("span");
    agent_name_ar1.classList.add("agentname_ar");
    agent_name_ar1.innerText = "Operator";

    let agent_chat_ar1 = document.createElement("div");
    agent_chat_ar1.classList.add("chat_message_ar", "bot_ar");
    agent_chat_ar1.innerText = "vfjjdhhdh";

    let agent_img_ar = document.createElement("img");
    agent_img_ar.src =
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    agent_img_ar.classList.add("image_text_ar");
    agent_img_ar.id = "image_text_ar";

    let agent_time_ar1 = document.createElement("span");
    agent_time_ar1.classList.add("reply_time_live_chat_agent_ar");
    agent_time_ar1.innerText = "03:56 PM";

    agent_msg_ar1.appendChild(agent_name_ar1);
    agent_msg_ar1.appendChild(agent_chat_ar1);
    agent_msg_ar1.appendChild(agent_img_ar);
    agent_msg_ar1.appendChild(agent_time_ar1); */

    /* user message */
    /* let user_msg_ar1 = document.createElement("div");
    user_msg_ar1.classList.add("user_msg_ar");

    let user_name_ar1 = document.createElement("span");
    user_name_ar1.classList.add("username_ar");
    user_name_ar1.innerText = "You";

    let user_chat_ar1 = document.createElement("div");
    user_chat_ar1.classList.add("chat_message_ar", "user_ar");
    user_chat_ar1.innerText = "I need help with my account";

    let user_time_ar1 = document.createElement("span");
    user_time_ar1.classList.add("reply_time_live_chat_user_ar");
    user_time_ar1.innerText = "03:56 PM"; 

    user_msg_ar1.appendChild(user_name_ar1);
    user_msg_ar1.appendChild(user_chat_ar1);
    user_msg_ar1.appendChild(user_time_ar1);*/

    /* agent reply */
    // let agent_msg_ar2 = document.createElement("div");
    // agent_msg_ar2.classList.add("agent_msg_ar");

    // let agent_name_ar2 = document.createElement("span");
    // agent_name_ar2.classList.add("agentname_ar");
    // agent_name_ar2.innerText = "Operator";

    // let agent_chat_ar2 = document.createElement("div");
    // agent_chat_ar2.classList.add("chat_message_ar", "bot_ar");
    // agent_chat_ar2.innerText = "Hello 👋 I’m an agent. How can I help?";

    // let agent_time_ar2 = document.createElement("span");
    // agent_time_ar2.classList.add("reply_time_live_chat_agent_ar");
    // agent_time_ar2.innerText = "03:56 PM";

    // agent_msg_ar2.appendChild(agent_name_ar2);
    // agent_msg_ar2.appendChild(agent_chat_ar2);
    // agent_msg_ar2.appendChild(agent_time_ar2);

    /* assemble messages */
    // live_messages_ar.appendChild(agent_msg_ar1);
    // live_messages_ar.appendChild(user_msg_ar1);
    // live_messages_ar.appendChild(agent_msg_ar2);

    /* assemble live chat */
    live_chat_ar.appendChild(leave_message_ar);
    live_chat_ar.appendChild(live_messages_ar);

    /* append to tab_chat_ar */
    tab_chat_ar.appendChild(live_chat_ar);
    /*==================== 1.2.3.5 LIVE CHAT end ====================*/

    /* append tab_chat_ar to chatbot_body_wrapper_ar */
    chatbot_body_wrapper_ar.appendChild(tab_chat_ar);
    /*&&&&&&&&&&&&&&&&&&&& 1.2.3 tab_chat_ar wrapper container end &&&&&&&&&&&&&&&&&&&&*/

    /*&&&&&&&&&&&&&&&&&&&& 1.2.3 tab_kb_ar wrapper container start &&&&&&&&&&&&&&&&&&&&*/
    let tab_kb_ar = document.createElement("div");
    tab_kb_ar.classList.add("tab_content_ar");
    tab_kb_ar.id = "tab_kb_ar";

    /*==================== Knowledge Base Items ====================*/
    /* let kb_items_ar = [
        {
            title: "How to create a ticket?",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos non perferendis provident quas quam. Corrupti laboriosam libero, fuga, molestiae dignissimos ullam dolorum sapiente atque blanditiis soluta quidem. Numquam, totam rem?",
        },
        {
            title: "How to reset password?",
            html: `
                <p class="sty_k13su9cls">
                    The Certificate, License, Permit (CLP) is a framework commonly used in
                    trade and regulatory environments to manage the necessary authorizations
                    and documents required for various business activities.
                </p>
                <h3 class="stykl01bkcls">Key Components of CLP</h3>
                <div>
                    <h3>testtt</h3>
                </div>
            `,
        },
        {
            title: "How to contact support?",
            content: "h",
        },
        {
            title: "How to contact support?",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos non perferendis provident quas quam. Corrupti laboriosam libero, fuga, molestiae dignissimos ullam dolorum sapiente atque blanditiis soluta quidem. Numquam, totam rem?",
        },
        {
            title: "How to contact support?",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos non perferendis provident quas quam. Corrupti laboriosam libero, fuga, molestiae dignissimos ullam dolorum sapiente atque blanditiis soluta quidem. Numquam, totam rem?",
        },
        {
            title: "How to contact support?",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos non perferendis provident quas quam. Corrupti laboriosam libero, fuga, molestiae dignissimos ullam dolorum sapiente atque blanditiis soluta quidem. Numquam, totam rem?",
        },
    ]; */

    /*==================== create kb items ====================*/
    /* kb_items_ar.forEach((item) => {
        let kb_item_ar = document.createElement("div");
        kb_item_ar.classList.add("kb_item_ar");

        let kb_title_ar = document.createElement("h5");
        kb_title_ar.innerText = item.title;

        let kb_content_ar = document.createElement("div");

        if (item.html) {
            kb_content_ar.innerHTML = item.html; // keep inner HTML formatting
        } else {
            kb_content_ar.innerText = item.content;
        }

        kb_item_ar.appendChild(kb_title_ar);
        kb_item_ar.appendChild(kb_content_ar);
        tab_kb_ar.appendChild(kb_item_ar);
    }); */

    /* append tab_kb_ar to chatbot_body_wrapper_ar */
    chatbot_body_wrapper_ar.appendChild(tab_kb_ar);
    /*&&&&&&&&&&&&&&&&&&&& 1.2.3 tab_kb_ar wrapper container end &&&&&&&&&&&&&&&&&&&&*/

    chatbot_layout_ar.appendChild(chatbot_body_wrapper_ar);
    /*#########################################################################################           
        1.2 Append chatbot body wrapper container end        
    #########################################################################################*/

    /*#########################################################################################           
        1.3 ticket_footer_ar wrapper container start         
    #########################################################################################*/
    let ticket_footer_ar = document.createElement("div");
    ticket_footer_ar.classList.add("chatbot_footer_ar");
    ticket_footer_ar.id = "ticket_footer_ar";

    /*==================== 1.3.1 ticket_footer_ar main container   ====================*/
    let ticket_footer_container_ar = document.createElement("div");
    ticket_footer_container_ar.classList.add("ticket_footer_container_ar");

    /*==================== 1.3.2 ticket_footer_ar attachment wrapper section  ====================*/
    let ticket_attachment_wrapper_ar = document.createElement("div");
    ticket_attachment_wrapper_ar.classList.add("attachment_wrapper_ar");

    /* ticket_footer_ar attachment icon */
    let ticket_attach_icon_ar = document.createElement("i");
    ticket_attach_icon_ar.classList.add(
        "fa-solid",
        "fa-paperclip",
        "attach_icon_ar"
    );
    ticket_attach_icon_ar.id = "attachBtn_ar";

    /* ticket_footer_ar attachment input */
    let ticket_attachment_input_ar = document.createElement("input");
    ticket_attachment_input_ar.type = "file";
    ticket_attachment_input_ar.id = "attachmentInput_ar";
    ticket_attachment_input_ar.name = "file[]";
    ticket_attachment_input_ar.multiple = true;
    ticket_attachment_input_ar.style.display = "none";

    /* ticket_footer_ar attachment list */
    let ticket_attachment_list_ar = document.createElement("div");
    ticket_attachment_list_ar.classList.add("attachment_list_ar");
    ticket_attachment_list_ar.id = "attachment_list_ar";

    /* append ticket_footer_ar attachment elements */
    ticket_attachment_wrapper_ar.appendChild(ticket_attach_icon_ar);
    ticket_attachment_wrapper_ar.appendChild(ticket_attachment_input_ar);
    ticket_attachment_wrapper_ar.appendChild(ticket_attachment_list_ar);

    /*==================== 1.3.3 ticket_footer_ar button wrapper section    ====================*/
    let ticket_button_wrapper_ar = document.createElement("div");
    ticket_button_wrapper_ar.classList.add("button_wrapper_ar");

    /* ticket_footer_ar reset button */
    let ticket_reset_btn_ar = document.createElement("button");
    ticket_reset_btn_ar.classList.add("btn_ar", "reset_ar");
    ticket_reset_btn_ar.setAttribute("data-i18n", "reset");
    ticket_reset_btn_ar.id = "ticket_reset_btn_ar";
    ticket_reset_btn_ar.innerText = "Reset";

    /* ticket_footer_ar submit button */
    let ticket_submit_btn_ar = document.createElement("button");
    ticket_submit_btn_ar.classList.add("btn_ar", "submit_ar");
    ticket_submit_btn_ar.setAttribute("data-i18n", "submit");
    ticket_submit_btn_ar.id = "ticket_submit_btn_ar";
    ticket_submit_btn_ar.innerText = "Submit";

    /* append ticket_footer_ar buttons */
    ticket_button_wrapper_ar.appendChild(ticket_reset_btn_ar);
    ticket_button_wrapper_ar.appendChild(ticket_submit_btn_ar);

    /*==================== 1.3.4 append ticket_footer_ar attachment & button section     ====================*/
    ticket_footer_container_ar.appendChild(ticket_attachment_wrapper_ar);
    ticket_footer_container_ar.appendChild(ticket_button_wrapper_ar);

    /*==================== 1.3.5 ticket_footer_ar watermark section    ====================*/
    // let ticket_watermark_ar = document.createElement("p");
    // ticket_watermark_ar.classList.add("watermark_ar");
    // ticket_watermark_ar.setAttribute("data-i18n", "powered_by");
    // ticket_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.3.6 append ticket_footer_ar container & watermark   ====================*/
    ticket_footer_ar.appendChild(ticket_footer_container_ar);
    // ticket_footer_ar.appendChild(ticket_watermark_ar);

    chatbot_layout_ar.appendChild(ticket_footer_ar);
    /*#########################################################################################           
        1.3 ticket_footer_ar wrapper container end          
    #########################################################################################*/

    /*#########################################################################################           
        1.4 chat_footer_ar wrapper container start         
    #########################################################################################*/
    let chat_footer_ar = document.createElement("div");
    chat_footer_ar.classList.add("chatbot_footer_ar");
    chat_footer_ar.id = "chat_footer_ar";

    /*==================== 1.4.1 chat_footer_ar main container   ====================*/
    let chat_footer_container_ar = document.createElement("div"); // empty class in HTML, can keep empty or add class if needed

    /*==================== 1.4.2 chat_footer_ar live chat section  ====================*/
    let chat_with_agent_ar = document.createElement("div");
    chat_with_agent_ar.classList.add("chat_with_agent_ar");
    chat_with_agent_ar.id = "start_live_chat_ar";

    /* chat_footer_ar live chat icon */
    let chat_agent_icon_ar = document.createElement("i");
    chat_agent_icon_ar.classList.add("fa-regular", "fa-comment-dots");

    /* chat_footer_ar live chat text */
    let chat_agent_text_ar = document.createElement("span");
    chat_agent_text_ar.setAttribute("data-i18n", "live_chat_agent");
    chat_agent_text_ar.classList.add("live_chat_agent");
    chat_agent_text_ar.innerText = "Chat with our agent directly";

    /* append live chat icon and text */
    chat_with_agent_ar.appendChild(chat_agent_icon_ar);
    chat_with_agent_ar.appendChild(chat_agent_text_ar);

    /*==================== 1.4.3 chat_footer_ar watermark section    ====================*/
    // let chat_watermark_ar = document.createElement("p");
    // chat_watermark_ar.classList.add("watermark_ar");
    // chat_watermark_ar.setAttribute("data-i18n", "powered_by");
    // chat_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.4.3 general chat_footer_ar submit section    ====================*/
    let general_faq_chat_with_agent_wrapper_ar = document.createElement("div");
    general_faq_chat_with_agent_wrapper_ar.classList.add(
        "chat_with_faq_agent_wrapper_ar"
    );

    /*==================== 1.5.2 direct_chat_footer_ar chat div section  ====================*/
    let general_chat_with_agent_div_ar = document.createElement("div");
    general_chat_with_agent_div_ar.classList.add("chat_with_agent_div_ar");
    general_chat_with_agent_div_ar.id = "live_chat_div_ar";

    /*==================== 1.5.3 direct_chat_footer_ar live chat footer section  ====================*/
    let general_chat_footer_ar = document.createElement("form");
    general_chat_footer_ar.classList.add("live_chat_footer_ar");
    general_chat_footer_ar.id = "general_chat_footer_ar";

    /* direct_chat_footer_ar textarea input */
    let general_chat_input_ar = document.createElement("textarea");
    general_chat_input_ar.classList.add("input_like_textarea_ar");
    general_chat_input_ar.id = "general_input_like_textarea_ar";
    general_chat_input_ar.name = "question";
    general_chat_input_ar.setAttribute("placeholder", "Type your message...");

    /* direct_chat_footer_ar submit button */
    let submit_general_chat_ar = document.createElement("button");
    submit_general_chat_ar.id = "submit_general_chat_ar";
    submit_general_chat_ar.classList.add("submit_button_ar");

    /* submit button icon */
    let submit_general_chat_icon_ar = document.createElement("i");
    submit_general_chat_icon_ar.classList.add("fa-solid", "fa-paper-plane");

    /* append icon to submit button */
    submit_general_chat_ar.appendChild(submit_general_chat_icon_ar);

    /* append textarea and submit button to live chat footer */
    general_chat_footer_ar.appendChild(general_chat_input_ar);
    general_chat_footer_ar.appendChild(submit_general_chat_ar);
    /* append live chat footer to chat div */
    general_chat_with_agent_div_ar.appendChild(general_chat_footer_ar);

    /* append chat div to wrapper */

    /*==================== 1.4.4 append chat_footer_ar sections   ====================*/
    chat_footer_container_ar.appendChild(chat_with_agent_ar);
    //chat_footer_container_ar.appendChild(chat_watermark_ar);
    chat_footer_container_ar.appendChild(general_chat_with_agent_div_ar);

    /* append main container to footer wrapper */
    chat_footer_ar.appendChild(chat_footer_container_ar);

    /* append chat_footer_ar to chatbot layout */
    chatbot_layout_ar.appendChild(chat_footer_ar);

    /*#########################################################################################           
        1.4 chat_footer_ar wrapper container end          
    #########################################################################################*/

    /*#########################################################################################           
        1.5 direct_chat_footer_ar wrapper container start         
    #########################################################################################*/
    let direct_chat_footer_ar = document.createElement("form");
    direct_chat_footer_ar.classList.add("chatbot_footer_ar");
    direct_chat_footer_ar.id = "direct_chat_footer_ar";

    /*==================== 1.5.1 direct_chat_footer_ar main container   ====================*/
    let chat_with_agent_wrapper_ar = document.createElement("div");
    chat_with_agent_wrapper_ar.classList.add("chat_with_agent_wrapper_ar");

    /*==================== 1.5.2 direct_chat_footer_ar chat div section  ====================*/
    let chat_with_agent_div_ar = document.createElement("div");
    chat_with_agent_div_ar.classList.add("chat_with_agent_div_ar");
    chat_with_agent_div_ar.id = "live_chat_div_ar";

    /*==================== 1.5.3 direct_chat_footer_ar live chat footer section  ====================*/
    let live_chat_footer_ar = document.createElement("div");
    live_chat_footer_ar.classList.add("live_chat_footer_ar");

    /* direct_chat_footer_ar textarea input */
    let live_chat_input_ar = document.createElement("textarea");
    live_chat_input_ar.classList.add("input_like_textarea_ar");
    live_chat_input_ar.id = "live_input_like_textarea_ar";
    live_chat_input_ar.name = "live_question";
    live_chat_input_ar.setAttribute("placeholder", "Type your message...");

    /* direct_chat_footer_ar submit button */
    let submit_live_chat_ar = document.createElement("button");
    submit_live_chat_ar.id = "submit_live_chat_ar";
    submit_live_chat_ar.classList.add("submit_button_ar");

    /* submit button icon */
    let submit_live_chat_icon_ar = document.createElement("i");
    submit_live_chat_icon_ar.classList.add("fa-solid", "fa-paper-plane");

    /* append icon to submit button */
    submit_live_chat_ar.appendChild(submit_live_chat_icon_ar);

    /* append textarea and submit button to live chat footer */
    live_chat_footer_ar.appendChild(live_chat_input_ar);
    live_chat_footer_ar.appendChild(submit_live_chat_ar);

    /* append live chat footer to chat div */
    chat_with_agent_div_ar.appendChild(live_chat_footer_ar);

    /* append chat div to wrapper */
    chat_with_agent_wrapper_ar.appendChild(chat_with_agent_div_ar);

    /*==================== 1.5.4 direct_chat_footer_ar watermark section    ====================*/
    // let direct_chat_watermark_ar = document.createElement("p");
    // direct_chat_watermark_ar.classList.add("watermark_ar");
    // direct_chat_watermark_ar.setAttribute("data-i18n", "powered_by");
    // direct_chat_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.5.5 append all sections to direct_chat_footer_ar   ====================*/
    direct_chat_footer_ar.appendChild(chat_with_agent_wrapper_ar);
    // direct_chat_footer_ar.appendChild(direct_chat_watermark_ar);

    /* append direct_chat_footer_ar to chatbot layout */
    chatbot_layout_ar.appendChild(direct_chat_footer_ar);

    /*#########################################################################################           
        1.5 direct_chat_footer_ar wrapper container end          
    #########################################################################################*/

    /*#########################################################################################           
        1.6 knowledge_footer_ar wrapper container start         
    #########################################################################################*/
    let knowledge_footer_ar = document.createElement("div");
    knowledge_footer_ar.classList.add("chatbot_footer_ar");
    knowledge_footer_ar.id = "knowledge_footer_ar";

    /*==================== 1.6.1 knowledge_footer_ar watermark section    ====================*/
    // let knowledge_watermark_ar = document.createElement("p");
    // knowledge_watermark_ar.classList.add("watermark_ar");
    // knowledge_watermark_ar.setAttribute("data-i18n", "powered_by");
    // knowledge_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.6.2 append watermark to knowledge_footer_ar   ====================*/
    // knowledge_footer_ar.appendChild(knowledge_watermark_ar);

    /* append knowledge_footer_ar to chatbot layout */
    chatbot_layout_ar.appendChild(knowledge_footer_ar);

    /*#########################################################################################           
        1.6 knowledge_footer_ar wrapper container end          
    #########################################################################################*/

    /*#########################################################################################           
        1.7 chatbot_tabs_ar wrapper container start         
    #########################################################################################*/
    let chatbot_tabs_ar = document.createElement("div");
    chatbot_tabs_ar.classList.add("chatbot_tabs_ar");

    /*==================== 1.7.1 tickets tab section    ====================*/
    let tickets_tab_ar = document.createElement("div");
    tickets_tab_ar.classList.add("tab_ar", "active_ar");
    tickets_tab_ar.setAttribute("data-tab", "tickets_ar");

    /* tickets tab icon */
    let tickets_icon_ar = document.createElement("i");
    tickets_icon_ar.classList.add("fa-solid", "fa-ticket");

    /* tickets tab text */
    let tickets_text_ar = document.createElement("span");
    tickets_text_ar.setAttribute("data-i18n", "tickets");
    tickets_text_ar.innerText = "Tickets";

    /* append icon and text to tickets tab */
    tickets_tab_ar.appendChild(tickets_icon_ar);
    tickets_tab_ar.appendChild(tickets_text_ar);

    /*==================== 1.7.2 chat tab section    ====================*/
    let chat_tab_ar = document.createElement("div");
    chat_tab_ar.classList.add("tab_ar");
    chat_tab_ar.setAttribute("data-tab", "chat_ar");

    /* chat tab icon */
    let chat_icon_ar = document.createElement("i");
    chat_icon_ar.classList.add("fa-solid", "fa-comment");

    /* chat tab text */
    let chat_text_ar = document.createElement("span");
    chat_text_ar.setAttribute("data-i18n", "chat");
    chat_text_ar.innerText = "Chat";

    /* append icon and text to chat tab */
    chat_tab_ar.appendChild(chat_icon_ar);
    chat_tab_ar.appendChild(chat_text_ar);

    /*==================== 1.7.3 knowledge tab section    ====================*/
    let kb_tab_ar = document.createElement("div");
    kb_tab_ar.classList.add("tab_ar");
    kb_tab_ar.setAttribute("data-tab", "kb_ar");

    /* knowledge tab icon */
    let kb_icon_ar = document.createElement("i");
    kb_icon_ar.classList.add("fa-solid", "fa-book");

    /* knowledge tab text */
    let kb_text_ar = document.createElement("span");
    kb_text_ar.setAttribute("data-i18n", "knowledge");
    kb_text_ar.innerText = "Knowledge";

    /* append icon and text to knowledge tab */
    kb_tab_ar.appendChild(kb_icon_ar);
    kb_tab_ar.appendChild(kb_text_ar);

    /*==================== 1.7.4 append all tabs to chatbot_tabs_ar   ====================*/
    chatbot_tabs_ar.appendChild(tickets_tab_ar);
    chatbot_tabs_ar.appendChild(chat_tab_ar);
    chatbot_tabs_ar.appendChild(kb_tab_ar);

    /* append chatbot_tabs_ar to chatbot layout */
    chatbot_layout_ar.appendChild(chatbot_tabs_ar);

    /*#########################################################################################           
        1.7 chatbot_tabs_ar wrapper container end          
    #########################################################################################*/

    /*#########################################################################################           
        1 Chatbot card container end, and  Return full layout         
    #########################################################################################*/
    return chatbot_layout_ar;
}

//initial apear icon created
function create_chatbot_appear_layout_ar() {
    // create the chatbot apear layout
    let chatbot_show_button_ar = document.createElement("div");
    chatbot_show_button_ar.id = "chatbot_show_button_ar";
    chatbot_show_button_ar.classList.add("chatbot_show_button_ar");

    let chatbot_show_button_ar_icon = document.createElement("i");
    chatbot_show_button_ar_icon.classList.add("fa-solid", "fa-comments");

    // append the icon to the chatbot apear layout
    chatbot_show_button_ar.appendChild(chatbot_show_button_ar_icon);

    return chatbot_show_button_ar;
}

//ihelp chatbot card css
var ihelp_chatbot_card_css = create_chatbot_card_css_ar();

/* ==========================================================================
                            All default functions
========================================================================== */

/* ===============================
ATTACHMENT CAROUSEL & FILE ATTACHMENT
=============================== */

//document.addEventListener("DOMContentLoaded", () => {
window.onload = function () {
    /* const carousel = document.getElementById("carousel_ar");
    const prevBtn = document.querySelector(".prev_ar");
    const nextBtn = document.querySelector(".next_ar");

    const totalItems = carousel.children.length;
    const cardWidth = 350;
    let index = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * cardWidth}px)`;

        prevBtn.classList.toggle("hidden", index === 0);
        nextBtn.classList.toggle("hidden", index === totalItems - 1);
    }

    nextBtn.addEventListener("click", () => {
        if (index < totalItems - 1) {
        index++;
        updateCarousel();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
        index--;
        updateCarousel();
        }
    });

    updateCarousel();
    */

    //all id fetch called here
    //other var for chatbot question submit
    let phone_number_log_submit_ar = document.getElementById(
        "phone_number_log_submit_ar"
    );
    let general_chat_footer_ar = document.getElementById(
        "general_chat_footer_ar"
    );
    let faq_chat_ar = document.getElementById("faq_chat_ar");

    //all id fetch

    const attachBtn = document.getElementById("attachBtn_ar");
    const attachmentInput = document.getElementById("attachmentInput_ar");
    const attachmentList = document.querySelector(".attachment_list_ar");
    const general_input_like_textarea_ar = document.getElementById(
        "general_input_like_textarea_ar"
    );
    const start_live_chat_ar = document.getElementById("start_live_chat_ar");

    let attachments = []; // store selected files

    // Open file selector
    attachBtn.addEventListener("click", () => {
        attachmentInput.click();
    });

    // Handle file selection
    attachmentInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            // Avoid duplicates
            if (
                !attachments.find(
                    (f) => f.name === file.name && f.size === file.size
                )
            ) {
                attachments.push(file);
                renderAttachment(file);
            }
        });

        // Clear input for next selection
        attachmentInput.value = "";
    });

    // Render attachment tag
    function renderAttachment(file) {
        const tag = document.createElement("div");
        tag.className = "attachment_tag_ar";
        tag.textContent = file.name;

        const removeBtn = document.createElement("span");
        removeBtn.innerHTML = "&times;";
        removeBtn.addEventListener("click", () => {
            attachments = attachments.filter((f) => f !== file);
            tag.remove();
        });

        tag.appendChild(removeBtn);
        attachmentList.appendChild(tag);
    }

    //Tooltip functionality
    const tooltip = document.createElement("div");
    tooltip.className = "global_tooltip_ar";
    document.body.appendChild(tooltip);

    document.addEventListener("mouseover", (e) => {
        const target = e.target.closest(".info_tooltip_ar");
        if (!target) return;

        tooltip.textContent = target.dataset.tooltip;
        const rect = target.getBoundingClientRect();

        tooltip.style.left = rect.left + rect.width / 2 + "px";
        tooltip.style.top = rect.top - 8 + "px";
        tooltip.style.transform = "translate(-50%, -100%)";
        tooltip.style.opacity = "1";
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(".info_tooltip_ar")) {
            tooltip.style.opacity = "0";
        }
    });

    // Optional: get attachments before sending form
    window.getAttachments = () => attachments; // returns array of File objects

    /* ===============================
      LANGUAGE DICTIONARY
   =============================== */
    const translations = {
        en: {
            add_ticket: "Add Ticket",
            tickets: "Tickets",
            issue_category: "Issue Category",
            chat: "Chat",
            subject: "subject",
            product: "Product",
            knowledge: "Knowledge",
            case_information: "Case Information",
            contact_name: "Contact Name",
            email: "Email",
            description: "Description",
            sector_user: "Sector of user reporting issues",
            bsw_application: "BSW Application",
            agency_type: "Agency Type",
            type_of_clp: "Type of CLP",
            verify_proceed: "Please verify to proceed",
            submit: "Submit",
            reset: "Reset",
            powered_by: "Powered by iHelpBD",
            start_with_phone: "Start With Phone Number",
            live_chat_agent: "Chat with our agent directly",
            getting_started: "Getting Started",
            knowledge_base: "Knowledge Base",
        },

        bn: {
            add_ticket: "টিকিট যোগ করুন",
            tickets: "টিকিট",
            issue_category: "সমস্যার ধরন ",
            chat: "চ্যাট",
            subject: "বিষয়",
            product: "প্রোডাক্ট",
            knowledge: "জ্ঞানভাণ্ডার",
            case_information: "কেস তথ্য",
            contact_name: "যোগাযোগের নাম",
            email: "ইমেইল",
            description: "বিবরণ",
            sector_user: "সমস্যা রিপোর্টকারী ব্যবহারকারীর খাত",
            bsw_application: "বিএসডব্লিউ অ্যাপ্লিকেশন",
            agency_type: "সংস্থার ধরন",
            type_of_clp: "CLP এর ধরন",
            verify_proceed: "এগিয়ে যেতে যাচাই করুন",
            submit: "জমা দিন",
            reset: "রিসেট",
            powered_by: "iHelpBD দ্বারা চালিত",
            start_with_phone: "ফোন নম্বর দিয়ে শুরু করুন",
            live_chat_agent: "সরাসরি আমাদের এজেন্টের সাথে চ্যাট করুন",
            getting_started: "শুরু করুন",
            knowledge_base: "জ্ঞানভাণ্ডার",
        },
    };

    /* ===============================
       UPDATE HEADER TITLE BASED ON ACTIVE TAB & LANGUAGE
    =============================== */
    function updateHeaderTitle() {
        const lang = localStorage.getItem("chatbot_lang") || "en";
        const activeTab = document.querySelector(".tab_ar.active_ar");
        const headerTitle = document.getElementById("header_title_ar");

        if (!activeTab || !headerTitle) return;

        const target = activeTab.dataset.tab;

        switch (target) {
            case "tickets_ar":
                headerTitle.innerText = translations[lang].add_ticket;
                break;

            case "chat_ar":
                headerTitle.innerText = translations[lang].getting_started;
                break;

            case "product_ar":
                headerTitle.innerText = translations[lang].product;
                break;

            case "kb_ar":
                headerTitle.innerText = translations[lang].knowledge_base;
                break;
        }
    }

    /* ===============================
       LANGUAGE SWITCH FUNCTION
    =============================== */
    function setLanguage(lang) {
        // Update all text nodes
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Update dropdown header label
        const dropdownTrigger = document.getElementById("dropdownTrigger_ar");
        dropdownTrigger.innerHTML = `<i class="fa-solid fa-globe"></i> ${
            lang === "en" ? "English" : "বাংলা"
        } <i class="fa-solid fa-caret-down"></i>`;

        // Update active language UI
        document
            .querySelectorAll(".language_list_ar li")
            .forEach((li) => li.classList.remove("active_ar"));

        document
            .querySelector(`.language_list_ar a[data-lang="${lang}"]`)
            ?.parentElement.classList.add("active_ar");

        // Save preference
        localStorage.setItem("chatbot_lang", lang);

        // Update header title for current active tab
        updateHeaderTitle();
    }

    /* ===============================
       LANGUAGE CLICK EVENTS
    =============================== */
    document.querySelectorAll(".language_list_ar a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const lang = link.dataset.lang;
            setLanguage(lang);
        });
    });

    /* ===============================
       LOAD SAVED LANGUAGE
    =============================== */
    const savedLang = localStorage.getItem("chatbot_lang") || "en";
    setLanguage(savedLang);

    let isPhoneStep = true;

    /* ===== CHAT OPEN / CLOSE ===== */
    const chatBtn = document.querySelector(".chatbot_show_button_ar");
    const chatBox = document.querySelector(".chatbot_layout_ar");
    const closeBtn = document.querySelector(".close_chatbot_ar");

    chatBtn.addEventListener("click", () => {
        chatBox.style.display = "flex";
        chatBox.classList.add("slide_up");
        chatBtn.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
        //this.alert('sadasd')

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, close it!",
        }).then((result) => {
            if (result.isConfirmed) {
                chatBox.classList.remove("slide_up");
                chatBox.classList.add("fade_out");

                setTimeout(() => {
                    chatBox.style.display = "none";
                    chatBox.classList.remove("fade_out");
                    chatBtn.style.display = "flex";
                }, 250);

                //existing token channel leave
                let token = localStorage.getItem("token");

                const apiCloseUrl =
                    commonUrl + "api/chatbot-close-conversation";
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
                            console.log(data);
                        })
                        .catch((error) => {
                            alert("few issue from system");
                            console.error(
                                "There was a problem with the fetch operation:",
                                error
                            );
                        });
                }
                // ihelp_chatbot_urge_for_container.classList.add("shown");
                // ihelp_chatbot_urge_for_container.classList.remove("hidden");
                // ihelp_chatbot_phone_container.classList.add("shown");
                // ihelp_chatbot_phone_container.classList.remove("hidden");
                // ihelp_chatbot_card.classList.add("hidden");
                // ihelp_chatbot_card.classList.remove("shown");
                // ihelp_chatbot_appear_id.classList.add("shown");
                // ihelp_chatbot_appear_id.classList.remove("hidden");

                localStorage.removeItem("phone");
                localStorage.removeItem("conversation_type");
                localStorage.removeItem("token");
                localStorage.removeItem("time");
                const ticketsTabOnClose = document.querySelector(
                    '.tab_ar[data-tab="tickets_ar"]'
                );
                if (ticketsTabOnClose) activateTab(ticketsTabOnClose);
                clearFaqChat();
                clearLiveChat();

                const phone_number_log_container_ar = document.getElementById(
                    "phone_number_log_container_ar"
                );
                if (phone_number_log_container_ar) {
                    const phoneInput =
                        phone_number_log_container_ar.querySelector(
                            'input[name="phone"], input'
                        );
                    if (phoneInput) phoneInput.value = "";
                }

                //Swal.fire("Closed!", "Conversation ended.", "success");

                Swal.fire({
                        icon: "success",
                        title: "Conversation ended.",
                        text: `success`,
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                    });
            }
        });
    });

    /* ===== Tabs ===== */
    const tabs = document.querySelectorAll(".tab_ar");
    const contents = document.querySelectorAll(".tab_content_ar");

    const ticket_footer_ar = document.getElementById("ticket_footer_ar");
    const chat_footer = document.getElementById("chat_footer_ar");
    const knowledge_footer = document.getElementById("knowledge_footer_ar");
    //const product_footer = document.getElementById("product_footer_ar");
    const direct_chat_footer = document.getElementById("direct_chat_footer_ar");

    const headerTitle = document.getElementById("header_title_ar");

    const faqChat = document.getElementById("faq_chat_ar");
    const liveChat = document.getElementById("live_chat_ar");
    const phone_number_log_ar = document.getElementById("phone_number_log_ar");

    const loader = document.getElementById("tab_loader_ar");

    /* ===== TAB HISTORY FOR BACK BUTTON ===== */
    let tabHistory = [];

    /* ===== Loader helper ===== */
    function showLoader(callback) {
        loader.style.display = "flex";
        setTimeout(() => {
            loader.style.display = "none";
            callback();
        }, 1000);
    }

    /* ===== Activate Tab ===== */
    function activateTab(tab) {
        if (!tab || !tab.dataset || !tab.dataset.tab) return;
        const target = tab.dataset.tab; // tickets_ar, chat_ar, etc
        const lang = localStorage.getItem("chatbot_lang") || "en";

        const currentActive = document.querySelector(".tab_ar.active_ar");
        if (currentActive && currentActive.dataset.tab !== target) {
            tabHistory.push(currentActive.dataset.tab);
            if (tabHistory.length > 10) tabHistory.shift();
        }

        showLoader(() => {
            tabs.forEach((t) => t.classList.remove("active_ar"));
            tab.classList.add("active_ar");

            contents.forEach((c) => c.classList.remove("active_ar", "fade_in"));

            const activeContent = document.getElementById(`tab_${target}`);
            if (activeContent) {
                activeContent.classList.add("active_ar", "fade_in");
            }

            switch (target) {
                case "tickets_ar":
                    headerTitle.innerText = translations[lang].add_ticket;
                    ticket_footer_ar.style.display = "block";
                    chat_footer.style.display = "none";
                    //product_footer.style.display = "none";
                    knowledge_footer.style.display = "none";
                    direct_chat_footer.style.display = "none";
                    phone_number_log_ar.style.display = "none";
                    liveChat.style.display = "none";
                    break;

                case "chat_ar":
                    headerTitle.innerText = translations[lang].getting_started;
                    ticket_footer_ar.style.display = "none";
                    //product_footer.style.display = "none";
                    knowledge_footer.style.display = "none";
                    direct_chat_footer.style.display = "none";
                    liveChat.style.display = "none";
                    // if (isPhoneStep) {
                    // if (localStorage.getItem("phone") && localStorage.getItem("conversation_type") === "Faq") {
                    //     phone_number_log_ar.style.display = "flex";
                    //     faqChat.style.display = "none";
                    //     chat_footer.style.display = "none";
                    // } else {
                    //     phone_number_log_ar.style.display = "none";
                    //     faqChat.style.display = "block";
                    //     chat_footer.style.display = "block";
                    // }
                    const phone = (localStorage.getItem("phone") || "").trim();
                    if (!phone) {
                        phone_number_log_ar.style.display = "flex";
                        faqChat.style.display = "none";
                        chat_footer.style.display = "none";
                    } else {
                        phone_number_log_ar.style.display = "none";
                        faqChat.style.display = "block";
                        chat_footer.style.display = "block";
                    }

                    if (
                        localStorage.getItem("conversation_type") ===
                        "Live-Chat"
                    ) {
                        phone_number_log_ar.style.display = "none";
                        faqChat.style.display = "none";
                        chat_footer.style.display = "none";
                        liveChat.style.display = "block";
                    }

                    break;

                // case "product_ar":
                //   headerTitle.innerText = translations[lang].product;
                //   ticket_footer_ar.style.display = "none";
                //   chat_footer.style.display = "none";
                //   //product_footer.style.display = "block";
                //   knowledge_footer.style.display = "none";
                //   direct_chat_footer.style.display = "none";
                //   phone_number_log_ar.style.display = "none";
                //   faqChat.style.display = "none";
                //   liveChat.style.display = "none";
                //   break;

                case "kb_ar":
                    headerTitle.innerText = translations[lang].knowledge_base;
                    ticket_footer_ar.style.display = "none";
                    chat_footer.style.display = "none";
                    //product_footer.style.display = "none";
                    knowledge_footer.style.display = "block";
                    direct_chat_footer.style.display = "none";
                    phone_number_log_ar.style.display = "none";
                    liveChat.style.display = "none";

                    let tab_kb_ar = document.getElementById("tab_kb_ar");
                    tab_kb_ar.innerHTML = "";

                    //knoledge base tab content load function call here
                    fetch(commonUrl + "api/knowledge", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            //console.log("Knowledge base data:", data);

                            data.data.forEach((sector, index) => {
                                tab_kb_ar.innerHTML += `
                                    <div class="kb_item_ar">
                                        <h5>${sector.title}</h5>
                                        <div>${sector.description}</div>
                                    </div>
                                `;

                                // console.log(sector)
                            });

                            KnowledgeAccordion();
                        })
                        .catch((error) => {
                            console.error("Error fetching sectors:", error);
                        });

                    break;
            }
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => activateTab(tab));
    });

    /* ===== Default Tab ===== */
    const defaultTab = document.querySelector('.tab_ar[data-tab="tickets_ar"]');
    if (defaultTab) activateTab(defaultTab);

    /* ===== Back Button Functionality ===== */
    /* const backBtn = document.getElementById("tab_back_btn_ar");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            if (!tabHistory.length) return;

            const prev = tabHistory.pop();
            const tabEl = document.querySelector(`.tab_ar[data-tab="${prev}"]`);
            if (tabEl) activateTab(tabEl);
        });
    } */

    /* ===== Start / End Live Chat ===== */
    const startChat = document.getElementById("start_live_chat_ar");
    const endChat = document.getElementById("end_chat_ar");

    if (startChat) {
        startChat.addEventListener("click", () => {
            showLoader(() => {
                faqChat.style.display = "none";
                liveChat.style.display = "block";
                liveChat.classList.add("slide_up");

                headerTitle.innerText = "BSW Service Desk";
                chat_footer.style.display = "none";
                direct_chat_footer.style.display = "block";
            });
        });
    }

    if (endChat) {
        endChat.addEventListener("click", () => {
            liveChat.classList.add("fade_out");

            setTimeout(() => {
                liveChat.style.display = "none";
                liveChat.classList.remove("fade_out");

                faqChat.style.display = "block";
                faqChat.classList.add("fade_in");
                localStorage.setItem("conversation_type", "Faq");

                const lang = localStorage.getItem("chatbot_lang") || "en";
                headerTitle.innerText = translations[lang].chat;
                chat_footer.style.display = "block";
                direct_chat_footer.style.display = "none";
            }, 250);
        });
    }

    // FAQ Accordion
    function KnowledgeAccordion() {
        const kbItems = document.querySelectorAll(".kb_item_ar");

        kbItems.forEach((item) => {
            const question = item.querySelector("h5");

            question.addEventListener("click", () => {
                // Toggle this item
                item.classList.toggle("active_ar");

                // Optional: close other items (accordion behavior)
                kbItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active_ar");
                    }
                });
            });
        });
    }

    // Get the elements
    const trigger = document.getElementById("dropdownTrigger_ar");
    const menu = document.getElementById("dropdownMenu_ar");

    // Toggle menu on click
    trigger.addEventListener("click", function (event) {
        // Prevent the click from bubbling up to the window
        event.stopPropagation();
        menu.classList.toggle("show");
    });

    // Close menu if user clicks outside of it
    window.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !trigger.contains(event.target)) {
            menu.classList.remove("show");
        }
    });

    /* ===== Multi Select (CLP) – Hide Selected Options ===== */
    // document.querySelectorAll(".multi_select_ar").forEach((select) => {
    //     const display = select.querySelector(".multi_display_ar");
    //     const dropdown = select.querySelector(".multi_dropdown_ar");
    //     const search = select.querySelector(".multi_search_ar");
    //     const options = select.querySelectorAll(".multi_options_ar li");
    //     const tagsBox = select.querySelector(".multi_tags_ar");
    //     const hiddenInp = document.getElementById("clpValues_ar");

    //     let values = [];

    //     /* Open / close */
    //     display.addEventListener("click", (e) => {
    //         e.stopPropagation();

    //         document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
    //             if (d !== dropdown) d.style.display = "none";
    //         });

    //         dropdown.style.display =
    //             dropdown.style.display === "block" ? "none" : "block";

    //         search.value = "";
    //         filter("");
    //         search.focus();
    //     });

    //     dropdown.addEventListener("click", (e) => e.stopPropagation());

    //     /* Select option */
    //     options.forEach((option) => {
    //         option.addEventListener("click", (e) => {
    //             e.stopPropagation();

    //             const val = option.dataset.value;
    //             const text = option.textContent;

    //             if (values.includes(val)) return;

    //             values.push(val);

    //             /* HIDE selected option */
    //             option.style.display = "none";

    //             const tag = document.createElement("div");
    //             tag.className = "multi_tag";
    //             tag.innerHTML = `${text} <span>&times;</span>`;

    //             tag.querySelector("span").addEventListener("click", (ev) => {
    //                 ev.stopPropagation();

    //                 values = values.filter((v) => v !== val);

    //                 /* SHOW option back */
    //                 option.style.display = "block";

    //                 tag.remove();
    //                 updatePlaceholder();
    //                 hiddenInp.value = values.join(",");
    //             });

    //             tagsBox.appendChild(tag);
    //             updatePlaceholder();
    //             hiddenInp.value = values.join(",");
    //         });
    //     });

    //     /* Search filter */
    //     search.addEventListener("keyup", () => {
    //         filter(search.value.toLowerCase());
    //     });

    //     function filter(val) {
    //         options.forEach((o) => {
    //             if (values.includes(o.dataset.value)) {
    //                 o.style.display = "none";
    //                 return;
    //             }

    //             o.style.display = o.textContent.toLowerCase().includes(val)
    //                 ? "block"
    //                 : "none";
    //         });
    //     }

    //     function updatePlaceholder() {
    //         const ph = tagsBox.querySelector(".multi_placeholder_ar");
    //         ph.style.display = values.length ? "none" : "inline";
    //     }
    // });

    let captchaText = "";

    function generateCaptcha() {
        const canvas = document.getElementById("captchaCanvas_ar");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const chars =
            "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%";
        captchaText = "";

        for (let i = 0; i < 6; i++) {
            captchaText += chars.charAt(
                Math.floor(Math.random() * chars.length)
            );
        }

        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "italic 26px Georgia";
        ctx.textBaseline = "middle";

        for (let i = 0; i < captchaText.length; i++) {
            ctx.save();

            const x = 15 + i * 18;
            const y = canvas.height / 2 + random(-6, 6);
            const angle = random(-0.5, 0.5);

            ctx.translate(x, y);
            ctx.rotate(angle);

            ctx.shadowColor = "rgba(0,0,0,0.4)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#333";
            ctx.strokeText(captchaText[i], 0, 0);

            ctx.fillStyle = "#000";
            ctx.fillText(captchaText[i], 0, 0);

            ctx.restore();
        }

        // Noise curve
        ctx.strokeStyle = "#999";
        ctx.beginPath();
        ctx.moveTo(0, random(10, 40));
        ctx.bezierCurveTo(
            30,
            random(0, 50),
            80,
            random(0, 50),
            canvas.width,
            random(10, 40)
        );
        ctx.stroke();

        // Reset message & input on refresh
        document.getElementById("verify_ar").value = "";
        document.getElementById("captchaMsg_ar").textContent = "";
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    /*  VALIDATION */
    document.getElementById("verify_ar").addEventListener("input", function () {
        const msg = document.getElementById("captchaMsg_ar");

        if (this.value.length === captchaText.length) {
            if (this.value === captchaText) {
                msg.textContent = "✔ CAPTCHA matched";
                msg.style.color = "green";
            } else {
                msg.textContent = "✖ CAPTCHA not matched";
                msg.style.color = "red";
            }
        } else {
            msg.textContent = "";
        }
    });

    /* Refresh */
    document
        .getElementById("captchaCanvas_ar")
        .addEventListener("click", generateCaptcha);
    document
        .getElementById("refreshCaptcha_ar")
        .addEventListener("click", generateCaptcha);

    /* Load */
    generateCaptcha();

    /* ===== Custom Select ===== */
    // document.querySelectorAll(".custom_select_ar").forEach((select) => {
    //     const display = select.querySelector(".select_display_ar");
    //     const dropdown = select.querySelector(".dropdown_ar");
    //     const search = select.querySelector(".search_input_ar");
    //     const options = select.querySelectorAll(".options_ar li");
    //     const selectedValue = select.querySelector(".selected_value_ar");

    //     display.addEventListener("click", (e) => {
    //         e.stopPropagation();

    //         document.querySelectorAll(".dropdown_ar").forEach((d) => {
    //             if (d !== dropdown) d.style.display = "none";
    //             //console.log(d);
    //         });

    //         dropdown.style.display =
    //             dropdown.style.display === "block" ? "none" : "block";
    //         search.value = "";
    //         filterOptions("");
    //         search.focus();
    //     });

    //     options.forEach((option) => {
    //         option.addEventListener("click", () => {
    //             selectedValue.textContent = option.textContent;
    //             options.forEach((o) => o.classList.remove("active_ar"));
    //             option.classList.add("active_ar");
    //             dropdown.style.display = "none";
    //         });
    //     });

    //     search.addEventListener("keyup", () => {
    //         filterOptions(search.value.toLowerCase());
    //     });

    //     function filterOptions(value) {
    //         options.forEach((option) => {
    //             option.style.display = option.textContent
    //                 .toLowerCase()
    //                 .includes(value)
    //                 ? "block"
    //                 : "none";
    //         });
    //     }
    // });

    document.querySelectorAll("#report_custom_select_ar").forEach((select) => {
        const display = select.querySelector(".select_display_ar");
        const dropdown = select.querySelector(".dropdown_ar");
        const search = select.querySelector(".search_input_ar");
        const options = select.querySelectorAll(".options_ar li");
        const selectedValue = select.querySelector(".selected_value_ar");
        const report_select_value_ar = document.getElementById(
            "report_select_value_ar"
        );
        let multi_dropdown = select.querySelector(".multi_dropdown_ar");

        display.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".dropdown_ar").forEach((d) => {
                if (d !== dropdown) d.style.display = "none";
                //console.log(d);
            });
            document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
                if (d !== multi_dropdown) d.style.display = "none";
            });

            dropdown.style.display =
                dropdown.style.display === "block" ? "none" : "block";
            search.value = "";
            filterOptions("");
            search.focus();
        });

        options.forEach((option) => {
            option.addEventListener("click", () => {
                selectedValue.textContent = option.textContent;
                options.forEach((o) => o.classList.remove("active_ar"));
                option.classList.add("active_ar");
                dropdown.style.display = "none";
                report_select_value_ar.dataset.id = option.value; // Update data-id attribute
            });
        });

        search.addEventListener("keyup", () => {
            filterOptions(search.value.toLowerCase());
        });

        function filterOptions(value) {
            options.forEach((option) => {
                option.style.display = option.textContent
                    .toLowerCase()
                    .includes(value)
                    ? "block"
                    : "none";
            });
        }
    });

    document.querySelectorAll("#bsw_custom_select_ar").forEach((select) => {
        const display = select.querySelector(".select_display_ar");
        const dropdown = select.querySelector(".dropdown_ar");
        const search = select.querySelector(".search_input_ar");
        const options = select.querySelectorAll(".options_ar li");
        const selectedValue = select.querySelector(".selected_value_ar");
        let bsw_selected_value_ar = document.getElementById(
            "bsw_selected_value_ar"
        );
        let multi_dropdown = select.querySelector(".multi_dropdown_ar");

        display.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".dropdown_ar").forEach((d) => {
                if (d !== dropdown) d.style.display = "none";
                //console.log(d);
            });
            document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
                if (d !== multi_dropdown) d.style.display = "none";
            });

            dropdown.style.display =
                dropdown.style.display === "block" ? "none" : "block";
            search.value = "";
            filterOptions("");
            search.focus();
        });

        options.forEach((option) => {
            option.addEventListener("click", () => {
                selectedValue.textContent = option.textContent;
                options.forEach((o) => o.classList.remove("active_ar"));
                option.classList.add("active_ar");
                dropdown.style.display = "none";
                bsw_selected_value_ar.dataset.id = option.value;
            });
        });

        search.addEventListener("keyup", () => {
            filterOptions(search.value.toLowerCase());
        });

        function filterOptions(value) {
            options.forEach((option) => {
                option.style.display = option.textContent
                    .toLowerCase()
                    .includes(value)
                    ? "block"
                    : "none";
            });
        }
    });

    document.querySelectorAll("#issue_custom_select_ar").forEach((select) => {
        const display = select.querySelector(".select_display_ar");
        const dropdown = select.querySelector(".dropdown_ar");
        const search = select.querySelector(".search_input_ar");
        const options = select.querySelectorAll(".options_ar li");
        const selectedValue = select.querySelector(".selected_value_ar");
        const issue_select_value_ar = document.getElementById(
            "issue_select_value_ar"
        );
        let multi_dropdown = select.querySelector(".multi_dropdown_ar");

        display.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".dropdown_ar").forEach((d) => {
                if (d !== dropdown) d.style.display = "none";
                //console.log(d);
            });

            document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
                if (d !== multi_dropdown) d.style.display = "none";
            });

            dropdown.style.display =
                dropdown.style.display === "block" ? "none" : "block";
            search.value = "";
            filterOptions("");
            search.focus();
        });

        options.forEach((option) => {
            option.addEventListener("click", () => {
                selectedValue.textContent = option.textContent;
                options.forEach((o) => o.classList.remove("active_ar"));
                option.classList.add("active_ar");
                dropdown.style.display = "none";
                issue_select_value_ar.dataset.id = option.value; // Update data-id attribute
            });
        });

        search.addEventListener("keyup", () => {
            filterOptions(search.value.toLowerCase());
        });

        function filterOptions(value) {
            options.forEach((option) => {
                option.style.display = option.textContent
                    .toLowerCase()
                    .includes(value)
                    ? "block"
                    : "none";
            });
        }
    });

    // document.querySelectorAll("#agency_selected_value_ar").forEach((select) => {
    //     const display = select.querySelector(".select_display_ar");
    //     const dropdown = select.querySelector(".dropdown_ar");
    //     const search = select.querySelector(".search_input_ar");
    //     const options = select.querySelectorAll(".options_ar li");
    //     const selectedValue = select.querySelector(".selected_value_ar");
    //     const bsw_selected_value_ar = document.getElementById(
    //         "bsw_selected_value_ar"
    //     );

    //     display.addEventListener("click", (e) => {
    //         e.stopPropagation();

    //         document.querySelectorAll(".dropdown_ar").forEach((d) => {
    //             if (d !== dropdown) d.style.display = "none";
    //             //console.log(d);
    //         });

    //         dropdown.style.display =
    //             dropdown.style.display === "block" ? "none" : "block";
    //         search.value = "";
    //         filterOptions("");
    //         search.focus();
    //     });

    //     options.forEach((option) => {
    //         option.addEventListener("click", () => {
    //             selectedValue.textContent = option.textContent;
    //             options.forEach((o) => o.classList.remove("active_ar"));
    //             option.classList.add("active_ar");
    //             dropdown.style.display = "none";
    //             bsw_selected_value_ar.dataset.id = option.value;
    //         });
    //     });

    //     search.addEventListener("keyup", () => {
    //         filterOptions(search.value.toLowerCase());
    //     });

    //     function filterOptions(value) {
    //         options.forEach((option) => {
    //             option.style.display = option.textContent
    //                 .toLowerCase()
    //                 .includes(value)
    //                 ? "block"
    //                 : "none";
    //         });
    //     }
    // });

    // from agent close the chat
    $(document).ready(function () {
        Echo.channel("conversation_close").listen(
            "ConversationCloseEvent",
            (e) => {
                let conversation_token = localStorage.getItem("token");
                if (conversation_token == e.conversation_token) {
                    Echo.leave(conversation_token);

                    const closeBtnEl =
                        document.getElementById("close_chatbot_ar") ||
                        document.querySelector(".close_chatbot_ar");
                    if (closeBtnEl) closeBtnEl.click();
                }
            }
        );
    });

    /* ===== Outside click close ===== */
    document.addEventListener("click", () => {
        document
            .querySelectorAll(".dropdown_ar")
            .forEach((d) => (d.style.display = "none"));

        document
            .querySelectorAll(".multi_dropdown_ar")
            .forEach((d) => (d.style.display = "none"));
    });

    /* ===============================
       Backend Integration Placeholder
    =============================== */

    const apiUrl = commonUrl + "api/question";
    const tokenApiUrl = commonUrl + "api/token";

    //API endpoint URL
    const apiConversationTypeUrl = commonUrl + "api/conversation-types";

    //phone number form submit
    const faq_chat_ja = document.getElementById("faq_chat_ar");
    const phone_number_log_ja = document.getElementById("phone_number_log_ar");
    const phone_number_log_container_ja = document.getElementById(
        "phone_number_log_container_ar"
    );
    const chat_footer_ja = document.getElementById("chat_footer_ar");
    const header_title_ja = document.getElementById("header_title_ar");
    const lang_ja = localStorage.getItem("chatbot_lang") || "en";
    const direct_chat_footer_ar = document.getElementById(
        "direct_chat_footer_ar"
    );
    // const live_messages_ja = document.getElementById("live_messages_ar");
    // const live_input_like_textarea_ar = document.getElementById(
    //     "live_input_like_textarea_ar"
    // );

    //translation for chat header
    const translations_r = {
        en: { chat: "Chat" },
        bn: { chat: "চ্যাট" },
    };

    //phone number form submit event
    phone_number_log_container_ja.addEventListener("submit", (e) => {
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
                    console.log(data);

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

                            header_title_ja.innerText =
                                translations_r[lang_ja].chat;
                            phone_number_log_ja.style.display = "none";
                            faq_chat_ja.style.display = "block";
                            chat_footer_ja.style.display = "block";

                            // chatbot_echo_listener(data.data.token)
                            /*korte hobe check
                             ihelp_chatbot_card_message_chatlist.innerHTML = ""; */

                            handleClick("Faq");
                        }
                    }

                    //storage remove after few mitues
                    // local_storage_remove();
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

    general_chat_footer_ar.addEventListener("submit", (e) => {
        e.preventDefault();

        let question = e.target.elements.question.value;

        if (e.target.elements.question.value == "") {
            alert("Ask query is empty. Please enter a valid query");

            return 0;
        }

        let local_storage_conversation_type =
            localStorage.getItem("conversation_type");
        let local_storage_phone = localStorage.getItem("phone");
        if (local_storage_conversation_type == null) {
            localStorage.setItem("conversation_type", "Faq");
            local_storage_conversation_type =
                localStorage.getItem("conversation_type");
        }

        let requestData = {
            q: question,
            phone: local_storage_phone,
            conversation_type: local_storage_conversation_type,
        };

        //korte hobe check
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
                    //change korte hobe check
                    /* ihelp_chatbot_card_message_body.scrollTop =
                        ihelp_chatbot_card_message_body.scrollHeight; */

                    //empty question input by user
                    general_input_like_textarea_ar.value = "";

                    //question insert to the dom user
                    var htmlQuestionString =
                        '<div class="user_msg_ar">' +
                        '<span class="username_ar">You</span>' +
                        '<div class="chat_message_ar user_ar">' +
                        question +
                        "</div>" +
                        '<span class="reply_time_live_chat_user_ar">' +
                        getCurrentTime() +
                        "</span>" +
                        "</div>";
                    faq_chat_ar.insertAdjacentHTML(
                        "beforeend",
                        htmlQuestionString
                    );

                    //reply insert to the dom chatbot
                    if (data.data.file == null) {
                        var htmlReplyString =
                            '<div class="agent_msg_ar">' +
                            '<span class="agentname_ar">Operator</span>' +
                            '<div class="chat_message_ar bot_ar">' +
                            data.data.reply +
                            "</div>" +
                            '<span class="reply_time_live_chat_agent_ar">' +
                            getCurrentTime() +
                            "</span>" +
                            "</div>";
                        faq_chat_ar.insertAdjacentHTML(
                            "beforeend",
                            htmlReplyString
                        );
                    }

                    if (data.data.file != null) {
                        let htmlReplyStringAndImage =
                            '<div class="agent_msg_ar">' +
                            '<span class="agentname_ar">Operator</span>' +
                            '<div class="chat_message_ar bot_ar">' +
                            data.data.reply +
                            "</div>" +
                            '<img src="' +
                            data.data.file +
                            '" class="image_text_ar" id="image_text_ar">' +
                            '<span class="reply_time_live_chat_agent_ar">' +
                            getCurrentTime() +
                            "</span>" +
                            "</div>";

                        faq_chat_ar.insertAdjacentHTML(
                            "beforeend",
                            htmlReplyStringAndImage
                        );
                    }

                    if (data?.data?.tags) {
                        // Split comma-separated tags
                        const tags = data.data.tags
                            .split(",")
                            .map((tag) => tag.trim());

                        let html = `
                            <div class="faq_buttons_ar" style="margin-top: 5px;">
                                <p class="faq_title_ar">
                                    Please select from the following options for detailed assistance:
                                </p>
                        `;

                        tags.forEach((tag, index) => {
                            // Example: make the last tag active (adjust logic as needed)

                            html += `
                                <button 
                                    class="faq_btn_ar" 
                                    onclick="handleTagClick('${tag}')">
                                    ${tag}
                                </button>
                            `;
                        });

                        // Optional WhatsApp button
                        html += `
                            <div>
                                <span class="chat_time_ar">${getCurrentTime()}</span>
                            </div>
                        </div>
                        `;

                        faq_chat_ar.insertAdjacentHTML("beforeend", html);
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
    });

    start_live_chat_ar.addEventListener("click", () => {
        handleClick("Live-Chat");
    });

    direct_chat_footer_ar.addEventListener("submit", function (e) {
        e.preventDefault();
        let token = localStorage.getItem("token");
        let question = e.target.elements.live_question.value;

        let live_messages_ja = document.getElementById("live_messages_ar");

        if (question == "") {
            alert("Ask question is empty. Please enter a valid text");
            return 0;
        }

        let local_storage_conversation_type =
            localStorage.getItem("conversation_type");
        let local_storage_phone = localStorage.getItem("phone");
        if (local_storage_conversation_type == null) {
            localStorage.setItem("conversation_type", "Live-Chat");
            local_storage_conversation_type =
                localStorage.getItem("conversation_type");
        }

        let requestData = {
            q: question,
            phone: local_storage_phone,
            conversation_type: local_storage_conversation_type,
        };

        //working ...
        if (local_storage_conversation_type == "Live-Chat") {
            //chatbot_echo_listener(token);

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
                    live_input_like_textarea_ar.value = "";

                    //question insert to the dom user
                    var htmlQuestionString =
                        '<div class="user_msg_ar">' +
                        '<span class="username_ar">You</span>' +
                        '<div class="chat_message_ar user_ar">' +
                        question +
                        "</div>" +
                        '<span class="reply_time_live_chat_user_ar">' +
                        getCurrentTime() +
                        "</span>" +
                        "</div>";
                    live_messages_ja.insertAdjacentHTML(
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

    //getAgencytype()
    let bsw_ul = document.getElementById("bsw_options_ar");
    bsw_ul.addEventListener("click", function (e) {
        let id = e.target.value;
        let url =
            commonTicketUrl +
            `web_fontainer_ticket_api/agency_type.php?bsw_application=${encodeURIComponent(
                id
            )}`;

        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${commonTicketBearerToken}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                let agency_options_ar =
                    document.getElementById("agency_options_ar");
                let agency_selected_value_ar = document.getElementById(
                    "agency_selected_value_ar"
                );

                agency_options_ar.innerHTML = "";

                if (data.status == "error") {
                    agency_options_ar.innerHTML = "";
                }

                if (data.status === "success" && Array.isArray(data.data)) {
                    data.data.forEach((sector, index) => {
                        let li_ar = document.createElement("li");

                        // Set text from API
                        li_ar.innerText = sector.name;

                        // Set value from API (use id instead of name)
                        li_ar.setAttribute("value", sector.id);

                        agency_options_ar.appendChild(li_ar);

                        // dd()
                    });
                }
                // After updating the options, reattach event listeners
                agency_custom_select_ar_by_bsw();
                empty_clp_options_ar();
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        // After updating the options, reattach event listeners
        agency_custom_select_ar_by_bsw();
        empty_clp_options_ar();
    });

    let agency_ul = document.getElementById("agency_options_ar");
    agency_ul.addEventListener("click", function (e) {
        let id = e.target.value;
        //alert(id);
        const url =
            commonTicketUrl +
            `web_fontainer_ticket_api/clp_type.php?agency_type=${encodeURIComponent(
                id
            )}`;
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

                let clp_options_ar = document.getElementById(
                    "clp_multi_options_ar"
                );
                let clp_selected_value_ar = document.getElementById(
                    "clp_selected_value_ar"
                );

                clp_options_ar.innerHTML = "";

                if (data.status == "error") {
                    clp_options_ar.innerHTML = "";
                }

                if (data.status === "success" && Array.isArray(data.data)) {
                    data.data.forEach((sector, index) => {
                        let li_ar = document.createElement("li");

                        // Set text from API
                        li_ar.innerText = sector.name;

                        // Set both data-value and value for compatibility with different handlers
                        li_ar.setAttribute("data-value", sector.id);
                        //li_ar.setAttribute("value", sector.id);

                        clp_options_ar.appendChild(li_ar);
                    });
                }
                // After updating the options, reattach event listeners
                clp_custom_select_ar_by_agency();
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        // After updating the options, reattach event listeners
        clp_custom_select_ar_by_agency();
    });

    //first time load agency type for bsw application
    agency_custom_select_ar_by_bsw();
    clp_custom_select_ar_by_agency();

    /* Outside click close */
    // document.addEventListener("click", () => {
    //     document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
    //         d.style.display = "none";
    //     });
    // });

    //ticket form submit
    let ticket_submit_btn_ar = document.getElementById("ticket_submit_btn_ar");
    ticket_submit_btn_ar.addEventListener("click", function (e) {
        e.preventDefault();

        let contact_name_ar = document
            .getElementById("contact_name_ar")
            .value.trim();
        let email_ar = document.getElementById("email_ar").value.trim();
        //let selected_file_ar = document.getElementById("selected_file_ar").files[0];
        let subject_ar = document.getElementById("subject_ar").value.trim();
        let description_ar = document
            .getElementById("description_ar")
            .value.trim();
        let report_select_value_ar = document.getElementById(
            "report_select_value_ar"
        );
        let bsw_selected_value_ar = document.getElementById(
            "bsw_selected_value_ar"
        );
        let agency_selected_value_ar = document.getElementById(
            "agency_selected_value_ar"
        );
        let issue_select_value_ar = document.getElementById(
            "issue_select_value_ar"
        );
        let report_value_ar = report_select_value_ar.dataset.id || "";
        let bsw_value_ar = bsw_selected_value_ar.dataset.id || "";
        let agency_value_ar = agency_selected_value_ar.dataset.id || "";
        let issue_value_ar = issue_select_value_ar.dataset.id || "";

        let clp_values_ar = document.getElementById("clpValues_ar").value || "";

        let converted_clp_arr = clp_values_ar
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
            .map((item) => parseInt(item));

        // console.log(
        //     "contact_name_ar: " + contact_name_ar + "\n" +
        //     "email_ar: " + email_ar + "\n" +
        //     "subject_ar: " + subject_ar + "\n" +
        //     "description_ar: " + description_ar + "\n" +
        //     "report_value_ar: " + report_value_ar + "\n" +
        //     "bsw_value_ar: " + bsw_value_ar + "\n" +
        //     "agency_value_ar: " + agency_value_ar + "\n" +
        //     "issue_value_ar: " + issue_value_ar + "\n" +
        //     "clp_values_ar: " + clp_values_ar + "\n" +
        //     "converted_clp_arr: " + JSON.stringify(converted_clp_arr)
        // );

        //validation

        //submit the form only if all fields are filled
        let inputCaptchaText = document.getElementById("verify_ar").value;

        if (captchaText == inputCaptchaText) {
            const isNameValid = validateFormFields();

            if (isNameValid === false) {
                return; // Stop further execution if validation fails
            }

            let tokenData = {
                account_name: "NULL",
                contact_name: contact_name_ar,
                customer_mail: email_ar,
                report_issue: report_value_ar,
                subject: subject_ar,
                description: description_ar,
                bsw_app: bsw_value_ar,
                agency_type: agency_value_ar,
                clp_type: converted_clp_arr,
                issue_cat: issue_value_ar,
                attachment: "NULL",
            };

            let formData = new FormData();
            formData.append("account_name", "NULL");
            formData.append("contact_name", contact_name_ar);
            formData.append("report_issue", report_value_ar);
            formData.append("customer_mail", email_ar);
            formData.append("subject", subject_ar);
            formData.append("description", description_ar);
            formData.append("bsw_app", bsw_value_ar);
            formData.append("agency_type", agency_value_ar);
            formData.append("issue_cat", issue_value_ar);
            formData.append("clp_type", JSON.stringify(converted_clp_arr));

            // Use the collected `attachments` array instead of the cleared input's .files
            if (attachments && attachments.length > 0) {
                attachments.forEach(function (file) {
                    formData.append("attachment[]", file);
                });
            } else {
                formData.append("attachment[]", "NULL");
            }
            // console.log("FormData prepared:", formData.getAll("attachment[]"));
            // return 0;

            //ticket submitted

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

                    /*  document.getElementById("ihelp_contact_name").value = "";
                    document.getElementById("ihelp_email").value = "";
                    document.getElementById("ihelp_subject_name").value = "";
                    document.getElementById("ihelp_description").value = "";
                    document.getElementById("cpatchaTextBox").value = "";
                    document.getElementById("attachment").value = "";
                    $('#ihelp_agent_type').val(null).trigger('change');
                    $('#ihelp_type_of_clp').val(null).trigger('change'); */
                    empty_form_ticket();

                    // alert(`✅ Ticket submitted successfully!\nTicket ID: ${responseData.ticket_id}`);

                    Swal.fire({
                        icon: "success",
                        title: "Ticket submitted successfully!",
                        text: `Ticket ID: ${responseData.ticket_id}`,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });

                    //createCaptcha()
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            alert(`❌ Invalid CAPTCHA. Try again.`);
        }

        // if (
        //     !report_select_value_ar.dataset.id ||
        //     !bsw_selected_value_ar.dataset.id ||
        //     converted_clp_arr.length === 0 ||
        //     !issue_select_value_ar.dataset.id ||
        //     ticket_description_ar.value.trim() === ""
        // ) {
        //     alert("Please fill in all fields before submitting the ticket.");
        //     return;
        // }
        // // Proceed with form submission (e.g., send data to server)
        // alert("Ticket submitted successfully!");
    });

    //ticket form submit
    let ticket_reset_btn_ar = document.getElementById("ticket_reset_btn_ar");
    ticket_reset_btn_ar.addEventListener("click", function (e) {
        e.preventDefault();
        empty_form_ticket();
    });
};
// });

// Outside click close
/* function toggleNumberAr(e) {
    
    const faqChat = document.getElementById("faq_chat_ar");
    const phone_number_log_ar = document.getElementById("phone_number_log_ar");
    const chat_footer = document.getElementById("chat_footer_ar");
    const headerTitle = document.getElementById("header_title_ar");
    const lang = localStorage.getItem("chatbot_lang") || "en";

    const translations = {
        en: { chat: "Chat" },
        bn: { chat: "চ্যাট" },
    };

    headerTitle.innerText = translations[lang].chat;
    phone_number_log_ar.style.display = "none";
    faqChat.style.display = "block";
    chat_footer.style.display = "block";

    //isPhoneStep = false;
} */

/* back end second  */
function handleClick($question) {
    //menu bar hide when clickable

    //storage remove after few mitues
    //local_storage_remove();

    let apiUrl = commonUrl + "api/question";

    let local_storage_conversation_type = $question;
    let local_storage_phone = localStorage.getItem("phone");
    let token = localStorage.getItem("token");
    let live_messages_ja = document.getElementById("live_messages_ar");
    let live_input_like_textarea_ar = document.getElementById(
        "live_input_like_textarea_ar"
    );
    //korte hobe check
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
                //korte hobe check
                // ihelp_chatbot_card_message_body.scrollTop =
                //     ihelp_chatbot_card_message_body.scrollHeight;

                //empty question input by user
                general_input_like_textarea_ar.value = "";

                //question insert to the dom user
                var htmlQuestionString =
                    '<div class="user_msg_ar">' +
                    '<span class="username_ar">You</span>' +
                    '<div class="chat_message_ar user_ar">' +
                    question +
                    "</div>" +
                    '<span class="reply_time_live_chat_user_ar">' +
                    getCurrentTime() +
                    "</span>" +
                    "</div>";
                faq_chat_ar.insertAdjacentHTML("beforeend", htmlQuestionString);

                //reply insert to the dom chatbot
                if (data.data.file == null) {
                    let htmlReplyString =
                        '<div class="agent_msg_ar">' +
                        '<span class="agentname_ar">Operator</span>' +
                        '<div class="chat_message_ar bot_ar">' +
                        data.data.reply +
                        "</div>" +
                        '<span class="reply_time_live_chat_agent_ar">' +
                        getCurrentTime() +
                        "</span>" +
                        "</div>";
                    faq_chat_ar.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyString
                    );
                }

                if (data.data.file != null) {
                    let htmlReplyStringAndImage =
                        '<div class="agent_msg_ar">' +
                        '<span class="agentname_ar">Operator</span>' +
                        '<div class="chat_message_ar bot_ar">' +
                        data.data.reply +
                        "</div>" +
                        '<img src="' +
                        data.data.file +
                        '" class="image_text_ar" id="image_text_ar">' +
                        '<span class="reply_time_live_chat_agent_ar">' +
                        getCurrentTime() +
                        "</span>" +
                        "</div>";

                    faq_chat_ar.insertAdjacentHTML(
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

    //working ...
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
                console.log(data);

                //empty question input by user
                live_input_like_textarea_ar.value = "";

                //question insert to the dom user
                var htmlQuestionString =
                    '<div class="user_msg_ar">' +
                    '<span class="username_ar">You</span>' +
                    '<div class="chat_message_ar user_ar">' +
                    question +
                    "</div>" +
                    '<span class="reply_time_live_chat_user_ar">' +
                    getCurrentTime() +
                    "</span>" +
                    "</div>";
                live_messages_ja.insertAdjacentHTML(
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

                //change korte hobe check
                /*  ihelp_chatbot_card_message_body.scrollTop =
                    ihelp_chatbot_card_message_body.scrollHeight; */

                //empty question input by user
                general_input_like_textarea_ar.value = "";

                //question insert to the dom user
                var htmlQuestionString =
                    '<div class="user_msg_ar">' +
                    '<span class="username_ar">You</span>' +
                    '<div class="chat_message_ar user_ar">' +
                    question +
                    "</div>" +
                    '<span class="reply_time_live_chat_user_ar">' +
                    getCurrentTime() +
                    "</span>" +
                    "</div>";
                faq_chat_ar.insertAdjacentHTML("beforeend", htmlQuestionString);

                //reply insert to the dom chatbot
                if (data.data.file == null) {
                    var htmlReplyString =
                        '<div class="agent_msg_ar">' +
                        '<span class="agentname_ar">Operator</span>' +
                        '<div class="chat_message_ar bot_ar">' +
                        data.data.reply +
                        "</div>" +
                        '<span class="reply_time_live_chat_agent_ar">' +
                        getCurrentTime() +
                        "</span>" +
                        "</div>";
                    faq_chat_ar.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyString
                    );
                }

                if (data.data.file != null) {
                    let htmlReplyStringAndImage =
                        '<div class="agent_msg_ar">' +
                        '<span class="agentname_ar">Operator</span>' +
                        '<div class="chat_message_ar bot_ar">' +
                        data.data.reply +
                        "</div>" +
                        '<img src="' +
                        data.data.file +
                        '" class="image_text_ar" id="image_text_ar">' +
                        '<span class="reply_time_live_chat_agent_ar">' +
                        getCurrentTime() +
                        "</span>" +
                        "</div>";

                    faq_chat_ar.insertAdjacentHTML(
                        "beforeend",
                        htmlReplyStringAndImage
                    );
                }

                if (data?.data?.tags) {
                    // Split comma-separated tags
                    const tags = data.data.tags
                        .split(",")
                        .map((tag) => tag.trim());

                    let html = `
                            <div class="faq_buttons_ar" style="margin-top: 5px;">
                                <p class="faq_title_ar">
                                    Please select from the following options for detailed assistance:
                                </p>
                        `;

                    tags.forEach((tag, index) => {
                        // Example: make the last tag active (adjust logic as needed)

                        html += `
                                <button 
                                    class="faq_btn_ar" 
                                    onclick="handleTagClick('${tag}')">
                                    ${tag}
                                </button>
                            `;
                    });

                    // Optional WhatsApp button
                    html += `
                            <div>
                                <span class="chat_time_ar">${getCurrentTime()}</span>
                            </div>
                        </div>
                        `;

                    faq_chat_ar.insertAdjacentHTML("beforeend", html);
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

function chatbot_echo_listener(token) {
    $(document).ready(function () {
        let channel_broadcast = token;
        let live_messages_ja = document.getElementById("live_messages_ar");

        Echo.channel(channel_broadcast).listen("MessageSendEvent", (e) => {
            //console.log(e.message);
            let htmlReplyString =
                '<div class="agent_msg_ar">' +
                '<span class="agentname_ar">Operator</span>' +
                '<div class="chat_message_ar bot_ar">' +
                e.message +
                "</div>" +
                '<span class="reply_time_live_chat_agent_ar">' +
                getCurrentTime() +
                "</span>" +
                "</div>";
            live_messages_ja.insertAdjacentHTML("beforeend", htmlReplyString);

            //kaz korte hobe check
            // ihelp_chatbot_card_message_body.scrollTop =
            //     ihelp_chatbot_card_message_body.scrollHeight;
        });
    });
}

//all ticket api implementation

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
        let reporting_options_ar = document.getElementById(
            "reporting_options_ar"
        );
        let report_select_value_ar = document.getElementById(
            "report_select_value_ar"
        );
        reporting_options_ar.innerHTML = "";

        data.data.forEach((sector, index) => {
            let li_ar = document.createElement("li");

            // Set text from API
            li_ar.innerText = sector.name;

            // Set value from API (use id instead of name)
            li_ar.setAttribute("value", sector.id);

            // Make first item active
            if (index === 0) {
                report_select_value_ar.innerText = sector.name;
                report_select_value_ar.dataset.id = sector.id; // Store id in data attribute
                li_ar.classList.add("active_ar");
            }

            reporting_options_ar.appendChild(li_ar);
        });
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
            let bsw_options_ar = document.getElementById("bsw_options_ar");
            let bsw_selected_value_ar = document.getElementById(
                "bsw_selected_value_ar"
            );
            bsw_options_ar.innerHTML = "";

            data.data.forEach((sector, index) => {
                let li_ar = document.createElement("li");

                // Set text from API
                li_ar.innerText = sector.name;

                // Set value from API (use id instead of name)
                li_ar.setAttribute("value", sector.id);

                // Make first item active
                // if (index === 2) {
                //     bsw_selected_value_ar.innerText = sector.name;
                //     bsw_selected_value_ar.dataset.id = sector.id; // Store id in data attribute
                //     li_ar.classList.add("active_ar");
                // }

                bsw_options_ar.appendChild(li_ar);
            });
        } else {
            console.error("Unexpected response format:", data);
        }
    })
    .catch((error) => {
        console.error("Error fetching sectors:", error);
    });

//Fetch issue category issue throuh api
fetch(commonTicketUrl + "web_fontainer_ticket_api/issue_type.php", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${commonTicketBearerToken}`,
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        let issue_options_ar = document.getElementById("issue_options_ar");
        let issue_select_value_ar = document.getElementById(
            "issue_select_value_ar"
        );
        issue_options_ar.innerHTML = "";

        data.data.forEach((sector, index) => {
            let li_ar = document.createElement("li");

            // Set text from API
            li_ar.innerText = sector.name;

            // Set value from API (use id instead of name)
            li_ar.setAttribute("value", sector.id);

            // Make first item active
            if (index === 0) {
                issue_select_value_ar.innerText = sector.name;
                issue_select_value_ar.dataset.id = sector.id; // Store id in data attribute
                li_ar.classList.add("active_ar");
            }

            issue_options_ar.appendChild(li_ar);
        });
    })
    .catch((error) => {
        console.error("Error fetching sectors:", error);
    });

function agency_custom_select_ar_by_bsw() {
    document.querySelectorAll("#agency_custom_select_ar").forEach((select) => {
        const display = select.querySelector(".select_display_ar");
        const dropdown = select.querySelector(".dropdown_ar");
        const search = select.querySelector(".search_input_ar");
        const options = select.querySelectorAll(".options_ar li");
        const selectedValue = select.querySelector(".selected_value_ar");
        const agency_selected_value_ar = document.getElementById(
            "agency_selected_value_ar"
        );
        let multi_dropdown = select.querySelector(".multi_dropdown_ar");

        agency_selected_value_ar.dataset.id = "0";
        agency_selected_value_ar.textContent = "";

        display.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".dropdown_ar").forEach((d) => {
                if (d !== dropdown) d.style.display = "none";
                //console.log(d);
            });

            document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
                if (d !== multi_dropdown) d.style.display = "none";
            });

            dropdown.style.display =
                dropdown.style.display === "block" ? "none" : "block";
            search.value = "";
            filterOptions("");
            search.focus();
        });

        options.forEach((option) => {
            option.addEventListener("click", () => {
                selectedValue.textContent = option.textContent;
                options.forEach((o) => o.classList.remove("active_ar"));
                option.classList.add("active_ar");
                dropdown.style.display = "none";
                agency_selected_value_ar.dataset.id = option.value;
            });
        });

        search.addEventListener("keyup", () => {
            filterOptions(search.value.toLowerCase());
        });

        function filterOptions(value) {
            options.forEach((option) => {
                option.style.display = option.textContent
                    .toLowerCase()
                    .includes(value)
                    ? "block"
                    : "none";
            });
        }
    });
}

function clp_custom_select_ar_by_agency() {
    document.querySelectorAll(".multi_select_ar").forEach((select) => {
        const display = select.querySelector(".multi_display_ar");
        const dropdown = select.querySelector(".multi_dropdown_ar");
        const search = select.querySelector(".multi_search_ar");
        const options = select.querySelectorAll(".multi_options_ar li");
        const tagsBox = select.querySelector(".multi_tags_ar");
        const hiddenInp = document.getElementById("clpValues_ar");
        hiddenInp.value = "";
        tagsBox.innerHTML =
            '<span class="multi_placeholder_ar">Select type of CLP</span>';
        const single_dropdown = select.querySelector(".dropdown_ar");

        let values = [];

        /* Open / close */
        display.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
                if (d !== dropdown) d.style.display = "none";
            });

            dropdown.style.display =
                dropdown.style.display === "block" ? "none" : "block";

            search.value = "";
            filter("");
            search.focus();

            document.querySelectorAll(".dropdown_ar").forEach((d) => {
                if (d !== single_dropdown) d.style.display = "none";
            });
        });

        dropdown.addEventListener("click", (e) => e.stopPropagation());

        /* Select option */
        options.forEach((option) => {
            option.addEventListener("click", (e) => {
                e.stopPropagation();

                const val =
                    option.dataset.value || option.getAttribute("value");
                const text = option.textContent;

                if (values.includes(val)) return;

                values.push(val);

                /* HIDE selected option */
                option.style.display = "none";

                const tag = document.createElement("div");
                tag.className = "multi_tag";
                tag.innerHTML = `${text} <span>&times;</span>`;

                tag.querySelector("span").addEventListener("click", (ev) => {
                    ev.stopPropagation();

                    values = values.filter((v) => v !== val);

                    /* SHOW option back */
                    option.style.display = "block";

                    tag.remove();
                    updatePlaceholder();
                    hiddenInp.value = values.join(",");
                });

                tagsBox.appendChild(tag);
                updatePlaceholder();
                hiddenInp.value = values.join(",");
            });
        });

        /* Search filter */
        search.addEventListener("keyup", () => {
            filter(search.value.toLowerCase());
        });

        function filter(val) {
            options.forEach((o) => {
                if (values.includes(o.dataset.value)) {
                    o.style.display = "none";
                    return;
                }

                o.style.display = o.textContent.toLowerCase().includes(val)
                    ? "block"
                    : "none";
            });
        }

        function updatePlaceholder() {
            const ph = tagsBox.querySelector(".multi_placeholder_ar");
            ph.style.display = values.length ? "none" : "inline";
        }
    });
}

//empty function for future use
function empty_clp_options_ar() {
    let clp_options_ar = document.getElementById("clp_multi_options_ar");
    clp_options_ar.innerHTML = "";
    let tagsBox = document.querySelector(".multi_tags_ar");
    tagsBox.innerHTML =
        '<span class="multi_placeholder_ar">Select type of CLP</span>';
    let hidden_inp = document.getElementById("clpValues_ar");
    hidden_inp.value = "";
}

function empty_form_ticket() {
    document.getElementById("contact_name_ar").value = "";
    document.getElementById("email_ar").value = "";
    document.getElementById("subject_ar").value = "";
    document.getElementById("description_ar").value = "";

    document.getElementById("bsw_selected_value_ar").innerText = "";
    document.getElementById("bsw_selected_value_ar").dataset.id = 0;
    document.getElementById("agency_selected_value_ar").innerText = "";
    document.getElementById("agency_selected_value_ar").dataset.id = 0;
    document.getElementById("agency_options_ar").innerHTML = "";
    document.getElementById("verify_ar").value = "";
    document.getElementById("captchaMsg_ar").textContent = "";
    // document.getElementById("attachment_ar").value = "";
    document.getElementById("attachment_list_ar").innerText = "";

    empty_clp_options_ar();

    const refreshCaptchaBtn = document.getElementById("refreshCaptcha_ar");
    if (refreshCaptchaBtn) refreshCaptchaBtn.click();
}

/*  ticket generate */

// function initial_card_list(id_number) {
//     //console.log(id_number);
//     let str = id_number;
//     let match = str.match(/_([^_]*)$/);
//     let number = match ? parseInt(match[1]) : null;

//     let left_arrow_container = document.getElementById(
//         "left_arrow_container_" + number
//     );
//     let right_arrow_container = document.getElementById(
//         "right_arrow_container_" + number
//     );
//     let ihelp_chatbot_chat_card_list = document.getElementById(
//         "ihelp_chatbot_chat_card_list_" + number
//     );

//     if (ihelp_chatbot_chat_card_list.children.length <= 1) {
//         // Check left_arrow_container
//         if (
//             left_arrow_container &&
//             left_arrow_container.classList.contains("shown")
//         ) {
//             left_arrow_container.classList.remove("shown");
//             left_arrow_container.classList.add("hidden");
//         } else {
//             left_arrow_container.classList.add("hidden");
//         }

//         // Check right_arrow_container
//         if (
//             right_arrow_container &&
//             right_arrow_container.classList.contains("shown")
//         ) {
//             right_arrow_container.classList.remove("shown");
//             right_arrow_container.classList.add("hidden");
//         } else {
//             right_arrow_container.classList.add("hidden");
//         }
//     }
// }

// function select_card_list(id_number) {
//     let str = id_number;
//     let match = str.match(/_([^_]*)$/);
//     let number = match ? parseInt(match[1]) : null;

//     let left_arrow_container = document.getElementById(
//         "left_arrow_container_" + number
//     );
//     let right_arrow_container = document.getElementById(
//         "right_arrow_container_" + number
//     );
//     let ihelp_chatbot_chat_card_list = document.getElementById(
//         "ihelp_chatbot_chat_card_list_" + number
//     );

//     ihelp_chatbot_chat_card_list &&
//         ihelp_chatbot_chat_card_list.addEventListener("scroll", () => {
//             if (ihelp_chatbot_chat_card_list.scrollLeft >= 5) {
//                 left_arrow_container &&
//                     left_arrow_container.classList.add("shown");
//                 left_arrow_container &&
//                     left_arrow_container.classList.remove("hidden");
//             } else {
//                 left_arrow_container &&
//                     left_arrow_container.classList.remove("shown");
//                 left_arrow_container &&
//                     left_arrow_container.classList.add("hidden");
//             }

//             if (
//                 Math.ceil(
//                     ihelp_chatbot_chat_card_list.scrollLeft +
//                         ihelp_chatbot_chat_card_list.clientWidth
//                 ) < Math.ceil(ihelp_chatbot_chat_card_list.scrollWidth)
//             ) {
//                 right_arrow_container &&
//                     right_arrow_container.classList.remove("hidden");
//                 right_arrow_container &&
//                     right_arrow_container.classList.add("shown");
//             } else {
//                 right_arrow_container &&
//                     right_arrow_container.classList.remove("shown");
//                 right_arrow_container &&
//                     right_arrow_container.classList.add("hidden");
//             }
//         });

//     left_arrow_container &&
//         left_arrow_container.addEventListener("click", () => {
//             ihelp_chatbot_chat_card_list.scrollLeft -= 250;
//             if (ihelp_chatbot_chat_card_list.scrollLeft <= 250) {
//                 left_arrow_container.classList.add("hidden");
//                 left_arrow_container.classList.remove("shown");
//             } else {
//                 left_arrow_container.classList.remove("hidden");
//                 left_arrow_container.classList.add("shown");
//             }
//             if (
//                 ihelp_chatbot_chat_card_list.scrollLeft +
//                     ihelp_chatbot_chat_card_list.clientWidth <=
//                 ihelp_chatbot_chat_card_list.scrollWidth
//             ) {
//                 right_arrow_container.classList.remove("hidden");
//                 right_arrow_container.classList.add("shown");
//             }
//         });

//     right_arrow_container &&
//         right_arrow_container.addEventListener("click", () => {
//             ihelp_chatbot_chat_card_list.scrollLeft += 250;
//             if (
//                 Math.ceil(
//                     ihelp_chatbot_chat_card_list.scrollLeft +
//                         ihelp_chatbot_chat_card_list.clientWidth
//                 ) == Math.ceil(ihelp_chatbot_chat_card_list.scrollWidth)
//             ) {
//                 right_arrow_container.classList.add("hidden");
//                 right_arrow_container.classList.remove("shown");
//             } else {
//                 right_arrow_container.classList.remove("hidden");
//                 right_arrow_container.classList.add("shown");
//             }
//             if (ihelp_chatbot_chat_card_list.scrollLeft >= 0) {
//                 left_arrow_container.classList.remove("hidden");
//                 left_arrow_container.classList.add("shown");
//             }
//         });
// }

function validateFormFields() {
    const nameInput = document.getElementById("contact_name_ar");
    const contactErrorDiv = document.getElementById("contact_name_error");

    const emailInput = document.getElementById("email_ar");
    const emailErrorDiv = document.getElementById("email_error");

    const subjectInput = document.getElementById("subject_ar");
    const subjectErrorDiv = document.getElementById("subject_error");

    const bswSelectedValue = document.getElementById("bsw_selected_value_ar");
    const bswErrorDiv = document.getElementById("bsw_error");

    const agencySelectedValue = document.getElementById(
        "agency_selected_value_ar"
    );
    const agencyErrorDiv = document.getElementById("agency_error");

    // const clpSelectedValue = document.getElementById("clp_selected_value_ar");
    const clpErrorDiv = document.getElementById("clp_error");
    const clpValues_ar = document.getElementById("clpValues_ar");

    const agencyList = document.getElementById("agency_options_ar");
    const agencyCount = agencyList
        ? agencyList.querySelectorAll("li").length
        : 0;

    const clpList = document.getElementById("clp_multi_options_ar");
    const clpCount = clpList ? clpList.querySelectorAll("li").length : 0;

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === "") {
        nameInput.classList.add("input-error");
        contactErrorDiv.innerText = "Contact name is required";
        isValid = false;
    } else {
        nameInput.classList.remove("input-error");
        contactErrorDiv.innerText = "";
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
        emailInput.classList.add("input-error");
        emailErrorDiv.innerText = "Email is required";
        isValid = false;
    } else {
        emailInput.classList.remove("input-error");
        emailErrorDiv.innerText = "";
    }

    if (subjectInput.value.trim() === "") {
        subjectInput.classList.add("input-error");
        subjectErrorDiv.innerText = "Subject is required";
        isValid = false;
    } else {
        subjectInput.classList.remove("input-error");
        subjectErrorDiv.innerText = "";
    }

    if (bswSelectedValue.dataset.id === "0") {
        bswSelectedValue.classList.add("input-error");
        bswErrorDiv.innerText = "Please select an application";
        isValid = false;
    } else {
        bswSelectedValue.classList.remove("input-error");
        bswErrorDiv.innerText = "";
    }

    if (agencyCount > 0) {
        if (agencySelectedValue.dataset.id === "0") {
            agencySelectedValue.classList.add("input-error");
            agencyErrorDiv.innerText = "Please select an agency";
            isValid = false;
        } else {
            agencySelectedValue.classList.remove("input-error");
            agencyErrorDiv.innerText = "";
        }
    } else {
        if (
            agencySelectedValue &&
            agencySelectedValue.classList.contains("input-error")
        ) {
            agencySelectedValue.classList.remove("input-error");
            agencyErrorDiv.innerText = "";
        }
    }

    if (clpCount > 0) {
        if (clpValues_ar.value.trim() === "") {
            clpValues_ar.classList.add("input-error");
            clpErrorDiv.innerText = "Please select a CLP";
            isValid = false;
        } else {
            clpValues_ar.classList.remove("input-error");
            clpErrorDiv.innerText = "";
        }
    } else {
        if (clpValues_ar && clpValues_ar.classList.contains("input-error")) {
            clpValues_ar.classList.remove("input-error");
            clpErrorDiv.innerText = "";
        }
    }

    return isValid;
}

function clearFaqChat() {
    const faqChatContainer = document.getElementById("faq_chat_ar");
    if (faqChatContainer) {
        faqChatContainer.innerHTML = "";
    }
}

function clearLiveChat() {
    const liveChatContainer = document.getElementById("live_messages_ar");
    if (liveChatContainer) {
        liveChatContainer.innerHTML = "";
    }
}

function closeBtn() {
    localStorage.removeItem("phone");
    localStorage.removeItem("conversation_type");
    localStorage.removeItem("token");
    localStorage.removeItem("time");
    let ticketsTabOnClose = document.querySelector(
        '.tab_ar[data-tab="tickets_ar"]'
    );
    if (ticketsTabOnClose) activateTab(ticketsTabOnClose);
    clearFaqChat();
    clearLiveChat();

    let phone_number_log_container_ar = document.getElementById(
        "phone_number_log_container_ar"
    );
    if (phone_number_log_container_ar) {
        let phoneInput = phone_number_log_container_ar.querySelector(
            'input[name="phone"], input'
        );
        if (phoneInput) phoneInput.value = "";
    }
}
