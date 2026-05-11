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
    close_chatbot_ar.classList.add("close_chatbot_ar");
    close_chatbot_ar.innerHTML = "✕";

    /*==================== 1.1.2 Header logo ====================*/
    let header_logo_ar = document.createElement("img");
    header_logo_ar.classList.add("header_logo_ar");
    header_logo_ar.src = "spider.jpg";
    header_logo_ar.alt = "";

    /*==================== 1.1.3 Back button ====================*/
    let tab_back_btn_ar = document.createElement("i");
    tab_back_btn_ar.className = "fa-solid fa-arrow-left tab_back_btn_ar_";
    tab_back_btn_ar.id = "tab_back_btn_ar";

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
        tab_back_btn_ar,
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

    /* contact_name_ar input */
    let contact_name_input_ar = document.createElement("input");
    contact_name_input_ar.type = "text";
    contact_name_input_ar.id = "contact_name_ar";
    contact_name_input_ar.required = true;

    /* contact_name_ar label */
    let contact_name_label_ar = document.createElement("label");
    contact_name_label_ar.setAttribute("for", "contact_name_ar");
    contact_name_label_ar.setAttribute("data-i18n", "contact_name");

    /* contact_name_ar label text */
    let contact_name_label_text_ar = document.createTextNode("Contact Name ");

    /* contact_name_ar required asterisk */
    let contact_name_asterisk_ar = document.createElement("span");
    contact_name_asterisk_ar.classList.add("gl_form_asterisk_ar");
    contact_name_asterisk_ar.innerText = "*";

    /* assemble contact_name_ar label */
    contact_name_label_ar.appendChild(contact_name_label_text_ar);
    contact_name_label_ar.appendChild(contact_name_asterisk_ar);

    /* append input & label */
    fg_contact_name_ar.appendChild(contact_name_input_ar);
    fg_contact_name_ar.appendChild(contact_name_label_ar);

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

    /* assemble email_ar label */
    email_label_ar.appendChild(email_label_text_ar);
    email_label_ar.appendChild(email_asterisk_ar);

    /* append input & label */
    fg_email_ar.appendChild(email_input_ar);
    fg_email_ar.appendChild(email_label_ar);

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

    /*-------------------- select_display_ar --------------------*/
    let select_display_ar = document.createElement("div");
    select_display_ar.classList.add("select_display_ar");

    /* selected value */
    let selected_value_ar = document.createElement("span");
    selected_value_ar.classList.add("selected_value_ar");
    selected_value_ar.innerText = "Private";

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

    /* option items */
    let sector_options_ar = [
        "Private",
        "Public",
        "Traders",
        "Declarant",
        "Government",
    ];

    sector_options_ar.forEach((option, index) => {
        let li_ar = document.createElement("li");
        li_ar.innerText = option;
        li_ar.setAttribute("value", option);

        if (index === 0) {
            li_ar.classList.add("active_ar");
        }

        options_ul_ar.appendChild(li_ar);
    });

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

    /* assemble subject_ar label */
    subject_label_ar.appendChild(subject_label_text_ar);
    subject_label_ar.appendChild(subject_asterisk_ar);

    /* append input & label to form group */
    fg_subject_ar.appendChild(subject_input_ar);
    fg_subject_ar.appendChild(subject_label_ar);

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

    /* select_display_ar */
    let bsw_select_display_ar = document.createElement("div");
    bsw_select_display_ar.classList.add("select_display_ar");

    let bsw_selected_value_ar = document.createElement("span");
    bsw_selected_value_ar.classList.add("selected_value_ar");
    bsw_selected_value_ar.innerText = "Steakholder Registration";

    let bsw_chevron_ar = document.createElement("span");
    bsw_chevron_ar.classList.add("chevron_ar");

    let bsw_chevron_icon_ar = document.createElement("i");
    bsw_chevron_icon_ar.classList.add("fa-solid", "fa-sort-down");

    bsw_chevron_ar.appendChild(bsw_chevron_icon_ar);
    bsw_select_display_ar.appendChild(bsw_selected_value_ar);
    bsw_select_display_ar.appendChild(bsw_chevron_ar);

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

    let bsw_options_ar = [
        "Steakholder Registration",
        "Trade Portal",
        "Tariff or AI Tariff",
        "CLP",
    ];

    bsw_options_ar.forEach((option, index) => {
        let li_ar = document.createElement("li");
        li_ar.setAttribute("value", option);
        li_ar.innerText = option;

        if (index === 0) {
            li_ar.classList.add("active_ar"); // keep exactly like HTML
        }

        bsw_options_ul_ar.appendChild(li_ar);
    });

    /* assemble dropdown_ar */
    bsw_dropdown_ar.appendChild(bsw_search_input_ar);
    bsw_dropdown_ar.appendChild(bsw_options_ul_ar);

    /* assemble custom_select_ar */
    bsw_custom_select_ar.appendChild(bsw_select_display_ar);
    bsw_custom_select_ar.appendChild(bsw_dropdown_ar);

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

    /* select_display_ar */
    let agency_select_display_ar = document.createElement("div");
    agency_select_display_ar.classList.add("select_display_ar");

    let agency_selected_value_ar = document.createElement("span");
    agency_selected_value_ar.classList.add("selected_value_ar");
    agency_selected_value_ar.innerText = "DOE : Department Of Environment";

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

    let agency_options_ar = [
        "DOE : Department Of Environment",
        "DOE : Department Of Environment",
        "DOF : Department Of Fisheries",
    ];

    agency_options_ar.forEach((option, index) => {
        let li_ar = document.createElement("li");
        li_ar.setAttribute("value", option);
        li_ar.innerText = option;

        if (index === 0) {
            li_ar.classList.add("active_ar"); // keep exactly like HTML
        }

        agency_options_ul_ar.appendChild(li_ar);
    });

    /* assemble dropdown_ar */
    agency_dropdown_ar.appendChild(agency_search_input_ar);
    agency_dropdown_ar.appendChild(agency_options_ul_ar);

    /* assemble custom_select_ar */
    agency_custom_select_ar.appendChild(agency_select_display_ar);
    agency_custom_select_ar.appendChild(agency_dropdown_ar);

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

    let clp_options_ar = [
        {
            value: "4601",
            text: "4601 DoE Clearance Certificate for Import of Hazardous Substances",
        },
        {
            value: "4602",
            text: "4602 DoE Clearance Certificate for Export of Hazardous Substances",
        },
        {
            value: "4603",
            text: "4603 DoE License for Import of Ozone Depleting Substance ODS",
        },
        {
            value: "4604",
            text: "4604 DoE License to import of Hydrofluorocarbons HFC",
        },
    ];

    clp_options_ar.forEach((option) => {
        let li_ar = document.createElement("li");
        li_ar.setAttribute("data-value", option.value);
        li_ar.innerText = option.text;
        clp_options_ul_ar.appendChild(li_ar);
    });

    /* assemble multi_dropdown_ar */
    clp_multi_dropdown_ar.appendChild(clp_multi_search_ar);
    clp_multi_dropdown_ar.appendChild(clp_options_ul_ar);

    /* assemble multi_select_ar */
    clp_multi_select_ar.appendChild(clp_multi_display_ar);
    clp_multi_select_ar.appendChild(clp_multi_dropdown_ar);

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

    /* select_display_ar */
    let issue_select_display_ar = document.createElement("div");
    issue_select_display_ar.classList.add("select_display_ar");

    let issue_selected_value_ar = document.createElement("span");
    issue_selected_value_ar.classList.add("selected_value_ar");
    issue_selected_value_ar.innerText = "Activation Email";

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

    let issue_options_ar = ["Activation Email"];

    issue_options_ar.forEach((option, index) => {
        let li_ar = document.createElement("li");
        li_ar.setAttribute("value", option);
        li_ar.innerText = option;
        if (index === 0) {
            li_ar.classList.add("active_ar"); // keep exactly like HTML
        }
        issue_options_ul_ar.appendChild(li_ar);
    });

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
    fg_captcha_verify_ar.classList.add("form_group_ar", "form_group_unique_input_ar");
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
    ticket_attachment_input_ar.multiple = true;
    ticket_attachment_input_ar.style.display = "none";

    /* ticket_footer_ar attachment list */
    let ticket_attachment_list_ar = document.createElement("div");
    ticket_attachment_list_ar.classList.add("attachment_list_ar");

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
    ticket_reset_btn_ar.innerText = "Reset";

    /* ticket_footer_ar submit button */
    let ticket_submit_btn_ar = document.createElement("button");
    ticket_submit_btn_ar.classList.add("btn_ar", "submit_ar");
    ticket_submit_btn_ar.setAttribute("data-i18n", "submit");
    ticket_submit_btn_ar.innerText = "Submit";

    /* append ticket_footer_ar buttons */
    ticket_button_wrapper_ar.appendChild(ticket_reset_btn_ar);
    ticket_button_wrapper_ar.appendChild(ticket_submit_btn_ar);

    /*==================== 1.3.4 append ticket_footer_ar attachment & button section     ====================*/
    ticket_footer_container_ar.appendChild(ticket_attachment_wrapper_ar);
    ticket_footer_container_ar.appendChild(ticket_button_wrapper_ar);

    /*==================== 1.3.5 ticket_footer_ar watermark section    ====================*/
    let ticket_watermark_ar = document.createElement("p");
    ticket_watermark_ar.classList.add("watermark_ar");
    ticket_watermark_ar.setAttribute("data-i18n", "powered_by");
    ticket_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.3.6 append ticket_footer_ar container & watermark   ====================*/
    ticket_footer_ar.appendChild(ticket_footer_container_ar);
    ticket_footer_ar.appendChild(ticket_watermark_ar);

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
    chat_agent_text_ar.innerText = "Chat with our agent directly";

    /* append live chat icon and text */
    chat_with_agent_ar.appendChild(chat_agent_icon_ar);
    chat_with_agent_ar.appendChild(chat_agent_text_ar);

    /*==================== 1.4.3 chat_footer_ar watermark section    ====================*/
    let chat_watermark_ar = document.createElement("p");
    chat_watermark_ar.classList.add("watermark_ar");
    chat_watermark_ar.setAttribute("data-i18n", "powered_by");
    chat_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.4.4 append chat_footer_ar sections   ====================*/
    chat_footer_container_ar.appendChild(chat_with_agent_ar);
    chat_footer_container_ar.appendChild(chat_watermark_ar);

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
    let direct_chat_footer_ar = document.createElement("div");
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
    let direct_chat_watermark_ar = document.createElement("p");
    direct_chat_watermark_ar.classList.add("watermark_ar");
    direct_chat_watermark_ar.setAttribute("data-i18n", "powered_by");
    direct_chat_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.5.5 append all sections to direct_chat_footer_ar   ====================*/
    direct_chat_footer_ar.appendChild(chat_with_agent_wrapper_ar);
    direct_chat_footer_ar.appendChild(direct_chat_watermark_ar);

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
    let knowledge_watermark_ar = document.createElement("p");
    knowledge_watermark_ar.classList.add("watermark_ar");
    knowledge_watermark_ar.setAttribute("data-i18n", "powered_by");
    knowledge_watermark_ar.innerText = "Powered by iHelpBD";

    /*==================== 1.6.2 append watermark to knowledge_footer_ar   ====================*/
    knowledge_footer_ar.appendChild(knowledge_watermark_ar);

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
// document.addEventListener("DOMContentLoaded", () => {
//   const carousel = document.getElementById("carousel_ar");
//   const prevBtn = document.querySelector(".prev_ar");
//   const nextBtn = document.querySelector(".next_ar");

//   const totalItems = carousel.children.length;
//   const cardWidth = 350;
//   let index = 0;

//   function updateCarousel() {
//     carousel.style.transform = `translateX(-${index * cardWidth}px)`;

//     prevBtn.classList.toggle("hidden", index === 0);
//     nextBtn.classList.toggle("hidden", index === totalItems - 1);
//   }

//   nextBtn.addEventListener("click", () => {
//     if (index < totalItems - 1) {
//       index++;
//       updateCarousel();
//     }
//   });

//   prevBtn.addEventListener("click", () => {
//     if (index > 0) {
//       index--;
//       updateCarousel();
//     }
//   });

//   updateCarousel();

//   const attachBtn = document.getElementById("attachBtn_ar");
//   const attachmentInput = document.getElementById("attachmentInput_ar");
//   const attachmentList = document.querySelector(".attachment_list_ar");

//   let attachments = []; // store selected files

//   // Open file selector
//   attachBtn.addEventListener("click", () => {
//     attachmentInput.click();
//   });

//   // Handle file selection
//   attachmentInput.addEventListener("change", (e) => {
//     const files = Array.from(e.target.files);

//     files.forEach((file) => {
//       // Avoid duplicates
//       if (
//         !attachments.find((f) => f.name === file.name && f.size === file.size)
//       ) {
//         attachments.push(file);
//         renderAttachment(file);
//       }
//     });

//     // Clear input for next selection
//     attachmentInput.value = "";
//   });

//   // Render attachment tag
//   function renderAttachment(file) {
//     const tag = document.createElement("div");
//     tag.className = "attachment_tag_ar";
//     tag.textContent = file.name;

//     const removeBtn = document.createElement("span");
//     removeBtn.innerHTML = "&times;";
//     removeBtn.addEventListener("click", () => {
//       attachments = attachments.filter((f) => f !== file);
//       tag.remove();
//     });

//     tag.appendChild(removeBtn);
//     attachmentList.appendChild(tag);
//   }

//   //Tooltip functionality
//   const tooltip = document.createElement("div");
//   tooltip.className = "global_tooltip_ar";
//   document.body.appendChild(tooltip);

//   document.addEventListener("mouseover", (e) => {
//     const target = e.target.closest(".info_tooltip_ar");
//     if (!target) return;

//     tooltip.textContent = target.dataset.tooltip;
//     const rect = target.getBoundingClientRect();

//     tooltip.style.left = rect.left + rect.width / 2 + "px";
//     tooltip.style.top = rect.top - 8 + "px";
//     tooltip.style.transform = "translate(-50%, -100%)";
//     tooltip.style.opacity = "1";
//   });

//   document.addEventListener("mouseout", (e) => {
//     if (e.target.closest(".info_tooltip_ar")) {
//       tooltip.style.opacity = "0";
//     }
//   });

//   // Optional: get attachments before sending form
//   window.getAttachments = () => attachments; // returns array of File objects

//   /* ===============================
//       LANGUAGE DICTIONARY
//    =============================== */
//   const translations = {
//     en: {
//       add_ticket: "Add Ticket",
//       tickets: "Tickets",
//       issue_category: "Issue Category",
//       chat: "Chat",
//       subject: "subject",
//       product: "Product",
//       knowledge: "Knowledge",
//       case_information: "Case Information",
//       contact_name: "Contact Name",
//       email: "Email",
//       description: "Description",
//       sector_user: "Sector of user reporting issues",
//       bsw_application: "BSW Application",
//       agency_type: "Agency Type",
//       type_of_clp: "Type of CLP",
//       verify_proceed: "Please verify to proceed",
//       submit: "Submit",
//       reset: "Reset",
//       powered_by: "Powered by iHelpBD",
//       start_with_phone: "Start With Phone Number",
//       live_chat_agent: "Chat with our agent directly",
//       getting_started: "Getting Started",
//       knowledge_base: "Knowledge Base",
//     },

//     bn: {
//       add_ticket: "টিকিট যোগ করুন",
//       tickets: "টিকিট",
//       issue_category: "সমস্যার ধরন ",
//       chat: "চ্যাট",
//       subject: "বিষয়",
//       product: "প্রোডাক্ট",
//       knowledge: "জ্ঞানভাণ্ডার",
//       case_information: "কেস তথ্য",
//       contact_name: "যোগাযোগের নাম",
//       email: "ইমেইল",
//       description: "বিবরণ",
//       sector_user: "সমস্যা রিপোর্টকারী ব্যবহারকারীর খাত",
//       bsw_application: "বিএসডব্লিউ অ্যাপ্লিকেশন",
//       agency_type: "সংস্থার ধরন",
//       type_of_clp: "CLP এর ধরন",
//       verify_proceed: "এগিয়ে যেতে যাচাই করুন",
//       submit: "জমা দিন",
//       reset: "রিসেট",
//       powered_by: "iHelpBD দ্বারা চালিত",
//       start_with_phone: "ফোন নম্বর দিয়ে শুরু করুন",
//       live_chat_agent: "সরাসরি আমাদের এজেন্টের সাথে চ্যাট করুন",
//       getting_started: "শুরু করুন",
//       knowledge_base: "জ্ঞানভাণ্ডার",
//     },
//   };

//   /* ===============================
//        UPDATE HEADER TITLE BASED ON ACTIVE TAB & LANGUAGE
//     =============================== */
//   function updateHeaderTitle() {
//     const lang = localStorage.getItem("chatbot_lang") || "en";
//     const activeTab = document.querySelector(".tab_ar.active_ar");
//     const headerTitle = document.getElementById("header_title_ar");

//     if (!activeTab || !headerTitle) return;

//     const target = activeTab.dataset.tab;

//     switch (target) {
//       case "tickets_ar":
//         headerTitle.innerText = translations[lang].add_ticket;
//         break;

//       case "chat_ar":
//         headerTitle.innerText = translations[lang].getting_started;
//         break;

//       case "product_ar":
//         headerTitle.innerText = translations[lang].product;
//         break;

//       case "kb_ar":
//         headerTitle.innerText = translations[lang].knowledge_base;
//         break;
//     }
//   }

//   /* ===============================
//        LANGUAGE SWITCH FUNCTION
//     =============================== */
//   function setLanguage(lang) {
//     // Update all text nodes
//     document.querySelectorAll("[data-i18n]").forEach((el) => {
//       const key = el.dataset.i18n;
//       if (translations[lang][key]) {
//         el.innerText = translations[lang][key];
//       }
//     });

//     // Update dropdown header label
//     const dropdownTrigger = document.getElementById("dropdownTrigger_ar");
//     dropdownTrigger.innerHTML = `<i class="fa-solid fa-globe"></i> ${lang === "en" ? "English" : "বাংলা"} <i class="fa-solid fa-caret-down"></i>`;

//     // Update active language UI
//     document
//       .querySelectorAll(".language_list_ar li")
//       .forEach((li) => li.classList.remove("active_ar"));

//     document
//       .querySelector(`.language_list_ar a[data-lang="${lang}"]`)
//       ?.parentElement.classList.add("active_ar");

//     // Save preference
//     localStorage.setItem("chatbot_lang", lang);

//     // Update header title for current active tab
//     updateHeaderTitle();
//   }

//   /* ===============================
//        LANGUAGE CLICK EVENTS
//     =============================== */
//   document.querySelectorAll(".language_list_ar a").forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const lang = link.dataset.lang;
//       setLanguage(lang);
//     });
//   });

//   /* ===============================
//        LOAD SAVED LANGUAGE
//     =============================== */
//   const savedLang = localStorage.getItem("chatbot_lang") || "en";
//   setLanguage(savedLang);

//   let isPhoneStep = true;

//   /* ===== CHAT OPEN / CLOSE ===== */
//   const chatBtn = document.querySelector(".chatbot_show_button_ar");
//   const chatBox = document.querySelector(".chatbot_layout_ar");
//   const closeBtn = document.querySelector(".close_chatbot_ar");

//   chatBtn.addEventListener("click", () => {
//     chatBox.style.display = "flex";
//     chatBox.classList.add("slide_up");
//     chatBtn.style.display = "none";
//   });

//   closeBtn.addEventListener("click", () => {
//     chatBox.classList.remove("slide_up");
//     chatBox.classList.add("fade_out");

//     setTimeout(() => {
//       chatBox.style.display = "none";
//       chatBox.classList.remove("fade_out");
//       chatBtn.style.display = "flex";
//     }, 250);
//   });

//   /* ===== Tabs ===== */
//   const tabs = document.querySelectorAll(".tab_ar");
//   const contents = document.querySelectorAll(".tab_content_ar");

//   const ticket_footer_ar = document.getElementById("ticket_footer_ar");
//   const chat_footer = document.getElementById("chat_footer_ar");
//   const knowledge_footer = document.getElementById("knowledge_footer_ar");
//   const product_footer = document.getElementById("product_footer_ar");
//   const direct_chat_footer = document.getElementById("direct_chat_footer_ar");

//   const headerTitle = document.getElementById("header_title_ar");

//   const faqChat = document.getElementById("faq_chat_ar");
//   const liveChat = document.getElementById("live_chat_ar");
//   const phone_number_log_ar = document.getElementById("phone_number_log_ar");

//   const loader = document.getElementById("tab_loader_ar");

//   /* ===== TAB HISTORY FOR BACK BUTTON ===== */
//   let tabHistory = [];

//   /* ===== Loader helper ===== */
//   function showLoader(callback) {
//     loader.style.display = "flex";
//     setTimeout(() => {
//       loader.style.display = "none";
//       callback();
//     }, 1000);
//   }

//   /* ===== Activate Tab ===== */
//   function activateTab(tab) {
//     const target = tab.dataset.tab; // tickets_ar, chat_ar, etc
//     const lang = localStorage.getItem("chatbot_lang") || "en";

//     const currentActive = document.querySelector(".tab_ar.active_ar");
//     if (currentActive && currentActive.dataset.tab !== target) {
//       tabHistory.push(currentActive.dataset.tab);
//       if (tabHistory.length > 10) tabHistory.shift();
//     }

//     showLoader(() => {
//       tabs.forEach((t) => t.classList.remove("active_ar"));
//       tab.classList.add("active_ar");

//       contents.forEach((c) => c.classList.remove("active_ar", "fade_in"));

//       const activeContent = document.getElementById(`tab_${target}`);
//       if (activeContent) {
//         activeContent.classList.add("active_ar", "fade_in");
//       }

//       switch (target) {
//         case "tickets_ar":
//           headerTitle.innerText = translations[lang].add_ticket;
//           ticket_footer_ar.style.display = "block";
//           chat_footer.style.display = "none";
//           product_footer.style.display = "none";
//           knowledge_footer.style.display = "none";
//           direct_chat_footer.style.display = "none";
//           phone_number_log_ar.style.display = "none";
//           liveChat.style.display = "none";
//           break;

//         case "chat_ar":
//           headerTitle.innerText = translations[lang].getting_started;
//           ticket_footer_ar.style.display = "none";
//           product_footer.style.display = "none";
//           knowledge_footer.style.display = "none";
//           direct_chat_footer.style.display = "none";
//           liveChat.style.display = "none";
//           if (isPhoneStep) {
//             phone_number_log_ar.style.display = "flex";
//             faqChat.style.display = "none";
//             chat_footer.style.display = "none";
//           } else {
//             phone_number_log_ar.style.display = "none";
//             faqChat.style.display = "block";
//             chat_footer.style.display = "block";
//           }
//           break;

//         case "product_ar":
//           headerTitle.innerText = translations[lang].product;
//           ticket_footer_ar.style.display = "none";
//           chat_footer.style.display = "none";
//           product_footer.style.display = "block";
//           knowledge_footer.style.display = "none";
//           direct_chat_footer.style.display = "none";
//           phone_number_log_ar.style.display = "none";
//           faqChat.style.display = "none";
//           liveChat.style.display = "none";
//           break;

//         case "kb_ar":
//           headerTitle.innerText = translations[lang].knowledge_base;
//           ticket_footer_ar.style.display = "none";
//           chat_footer.style.display = "none";
//           product_footer.style.display = "none";
//           knowledge_footer.style.display = "block";
//           direct_chat_footer.style.display = "none";
//           phone_number_log_ar.style.display = "none";
//           liveChat.style.display = "none";
//           break;
//       }
//     });
//   }

//   tabs.forEach((tab) => {
//     tab.addEventListener("click", () => activateTab(tab));
//   });

//   /* ===== Default Tab ===== */
//   const defaultTab = document.querySelector('.tab_ar[data-tab="tickets_ar"]');
//   if (defaultTab) activateTab(defaultTab);

//   /* ===== Back Button Functionality ===== */
//   const backBtn = document.getElementById("tab_back_btn_ar");

//   if (backBtn) {
//     backBtn.addEventListener("click", () => {
//       if (!tabHistory.length) return;

//       const prev = tabHistory.pop();
//       const tabEl = document.querySelector(`.tab_ar[data-tab="${prev}"]`);
//       if (tabEl) activateTab(tabEl);
//     });
//   }

//   /* ===== Start / End Live Chat ===== */
//   const startChat = document.getElementById("start_live_chat_ar");
//   const endChat = document.getElementById("end_chat_ar");

//   if (startChat) {
//     startChat.addEventListener("click", () => {
//       showLoader(() => {
//         faqChat.style.display = "none";
//         liveChat.style.display = "block";
//         liveChat.classList.add("slide_up");

//         headerTitle.innerText = "BSW Service Desk";
//         chat_footer.style.display = "none";
//         direct_chat_footer.style.display = "block";
//       });
//     });
//   }

//   if (endChat) {
//     endChat.addEventListener("click", () => {
//       liveChat.classList.add("fade_out");

//       setTimeout(() => {
//         liveChat.style.display = "none";
//         liveChat.classList.remove("fade_out");

//         faqChat.style.display = "block";
//         faqChat.classList.add("fade_in");

//         const lang = localStorage.getItem("chatbot_lang") || "en";
//         headerTitle.innerText = translations[lang].chat;
//         chat_footer.style.display = "block";
//         direct_chat_footer.style.display = "none";
//       }, 250);
//     });
//   }

//   // FAQ Accordion
//   const kbItems = document.querySelectorAll(".kb_item_ar");

//   kbItems.forEach((item) => {
//     const question = item.querySelector("h5");

//     question.addEventListener("click", () => {
//       // Toggle this item
//       item.classList.toggle("active_ar");

//       // Optional: close other items (accordion behavior)
//       kbItems.forEach((otherItem) => {
//         if (otherItem !== item) {
//           otherItem.classList.remove("active_ar");
//         }
//       });
//     });
//   });

//   // Get the elements
//   const trigger = document.getElementById("dropdownTrigger_ar");
//   const menu = document.getElementById("dropdownMenu_ar");

//   // Toggle menu on click
//   trigger.addEventListener("click", function (event) {
//     // Prevent the click from bubbling up to the window
//     event.stopPropagation();
//     menu.classList.toggle("show");
//   });

//   // Close menu if user clicks outside of it
//   window.addEventListener("click", function (event) {
//     if (!menu.contains(event.target) && !trigger.contains(event.target)) {
//       menu.classList.remove("show");
//     }
//   });

//   /* ===== Multi Select (CLP) – Hide Selected Options ===== */
//   document.querySelectorAll(".multi_select_ar").forEach((select) => {
//     const display = select.querySelector(".multi_display_ar");
//     const dropdown = select.querySelector(".multi_dropdown_ar");
//     const search = select.querySelector(".multi_search_ar");
//     const options = select.querySelectorAll(".multi_options_ar li");
//     const tagsBox = select.querySelector(".multi_tags_ar");
//     const hiddenInp = document.getElementById("clpValues_ar");

//     let values = [];

//     /* Open / close */
//     display.addEventListener("click", (e) => {
//       e.stopPropagation();

//       document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
//         if (d !== dropdown) d.style.display = "none";
//       });

//       dropdown.style.display =
//         dropdown.style.display === "block" ? "none" : "block";

//       search.value = "";
//       filter("");
//       search.focus();
//     });

//     dropdown.addEventListener("click", (e) => e.stopPropagation());

//     /* Select option */
//     options.forEach((option) => {
//       option.addEventListener("click", (e) => {
//         e.stopPropagation();

//         const val = option.dataset.value;
//         const text = option.textContent;

//         if (values.includes(val)) return;

//         values.push(val);

//         /* HIDE selected option */
//         option.style.display = "none";

//         const tag = document.createElement("div");
//         tag.className = "multi_tag";
//         tag.innerHTML = `${text} <span>&times;</span>`;

//         tag.querySelector("span").addEventListener("click", (ev) => {
//           ev.stopPropagation();

//           values = values.filter((v) => v !== val);

//           /* SHOW option back */
//           option.style.display = "block";

//           tag.remove();
//           updatePlaceholder();
//           hiddenInp.value = values.join(",");
//         });

//         tagsBox.appendChild(tag);
//         updatePlaceholder();
//         hiddenInp.value = values.join(",");
//       });
//     });

//     /* Search filter */
//     search.addEventListener("keyup", () => {
//       filter(search.value.toLowerCase());
//     });

//     function filter(val) {
//       options.forEach((o) => {
//         if (values.includes(o.dataset.value)) {
//           o.style.display = "none";
//           return;
//         }

//         o.style.display = o.textContent.toLowerCase().includes(val)
//           ? "block"
//           : "none";
//       });
//     }

//     function updatePlaceholder() {
//       const ph = tagsBox.querySelector(".multi_placeholder_ar");
//       ph.style.display = values.length ? "none" : "inline";
//     }
//   });

//   /* Outside click close */
//   document.addEventListener("click", () => {
//     document.querySelectorAll(".multi_dropdown_ar").forEach((d) => {
//       d.style.display = "none";
//     });
//   });

//   let captchaText = "";

//   function generateCaptcha() {
//     const canvas = document.getElementById("captchaCanvas_ar");
//     const ctx = canvas.getContext("2d");

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const chars =
//       "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%";
//     captchaText = "";

//     for (let i = 0; i < 6; i++) {
//       captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
//     }

//     // Background
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.font = "italic 26px Georgia";
//     ctx.textBaseline = "middle";

//     for (let i = 0; i < captchaText.length; i++) {
//       ctx.save();

//       const x = 15 + i * 18;
//       const y = canvas.height / 2 + random(-6, 6);
//       const angle = random(-0.5, 0.5);

//       ctx.translate(x, y);
//       ctx.rotate(angle);

//       ctx.shadowColor = "rgba(0,0,0,0.4)";
//       ctx.shadowBlur = 4;
//       ctx.shadowOffsetX = 2;
//       ctx.shadowOffsetY = 2;

//       ctx.lineWidth = 1;
//       ctx.strokeStyle = "#333";
//       ctx.strokeText(captchaText[i], 0, 0);

//       ctx.fillStyle = "#000";
//       ctx.fillText(captchaText[i], 0, 0);

//       ctx.restore();
//     }

//     // Noise curve
//     ctx.strokeStyle = "#999";
//     ctx.beginPath();
//     ctx.moveTo(0, random(10, 40));
//     ctx.bezierCurveTo(
//       30,
//       random(0, 50),
//       80,
//       random(0, 50),
//       canvas.width,
//       random(10, 40),
//     );
//     ctx.stroke();

//     // Reset message & input on refresh
//     document.getElementById("verify_ar").value = "";
//     document.getElementById("captchaMsg_ar").textContent = "";
//   }

//   function random(min, max) {
//     return Math.random() * (max - min) + min;
//   }

//   /*  VALIDATION */
//   document.getElementById("verify_ar").addEventListener("input", function () {
//     const msg = document.getElementById("captchaMsg_ar");

//     if (this.value.length === captchaText.length) {
//       if (this.value === captchaText) {
//         msg.textContent = "✔ CAPTCHA matched";
//         msg.style.color = "green";
//       } else {
//         msg.textContent = "✖ CAPTCHA not matched";
//         msg.style.color = "red";
//       }
//     } else {
//       msg.textContent = "";
//     }
//   });

//   /* Refresh */
//   document
//     .getElementById("captchaCanvas_ar")
//     .addEventListener("click", generateCaptcha);
//   document
//     .getElementById("refreshCaptcha_ar")
//     .addEventListener("click", generateCaptcha);

//   /* Load */
//   generateCaptcha();
// });

/* ===== Custom Select ===== */
document.querySelectorAll(".custom_select_ar").forEach((select) => {
    const display = select.querySelector(".select_display_ar");
    const dropdown = select.querySelector(".dropdown_ar");
    const search = select.querySelector(".search_input_ar");
    const options = select.querySelectorAll(".options_ar li");
    const selectedValue = select.querySelector(".selected_value_ar");

    display.addEventListener("click", (e) => {
        e.stopPropagation();

        document.querySelectorAll(".dropdown_ar").forEach((d) => {
            if (d !== dropdown) d.style.display = "none";
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

// Outside click close
function toggleNumberAr() {
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

    isPhoneStep = false;
}

/* ===== Outside click close ===== */
document.addEventListener("click", () => {
    document
        .querySelectorAll(".dropdown_ar")
        .forEach((d) => (d.style.display = "none"));
});

