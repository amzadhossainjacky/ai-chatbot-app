<?php

namespace App\Services;

use App\Models\Lead;

/**
 * LeadService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class LeadService {

    /**
     * get_leads_lists method returns list of leads
     * @return collection
     */
    public function get_lead_lists() {
        return Lead::orderBy('id', 'DESC');
    }


}