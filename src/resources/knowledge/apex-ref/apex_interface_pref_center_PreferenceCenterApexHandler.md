# PreferenceCenterApexHandler Interface

PreferenceCenterApexHandler Interface Pass data between your organization and a form in Preference Manager. Namespace [Pref_center](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_pref_center.htm "The Pref_center namespace provides an interface, classes, and methods to create and retrieve data in forms in Preference Manager. Preference Manager, previously called Preference Center, is a feature within the Privacy Center app.")
                              * **[PreferenceCenterApexHandler Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_pref_center_PreferenceCenterApexHandler.htm#apex_pref_center_PreferenceCenterApexHandler_methods)**  

PreferenceCenterApexHandler Methods The following are methods for PreferenceCenterApexHandler.
                              * **[load(loadParams, formData, validationResult)](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_pref_center_PreferenceCenterApexHandler.htm#apex_pref_center_PreferenceCenterApexHandler_load)**  
Retrieve the record IDs and initial values from a preference form before it is edited and submitted.
                              * **[submit(loadParams, formData, validationResult)](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_pref_center_PreferenceCenterApexHandler.htm#apex_pref_center_PreferenceCenterApexHandler_submit)**  
Updates the changed values of fields when the preference form is submitted.
load(loadParams, formData, validationResult) Retrieve the record IDs and initial values from a preference form before it is edited and submitted. Signature public pref_center.LoadFormData load(pref_center.LoadParameters loadParams, pref_center.LoadFormData formData, pref_center.ValidationResult validationResult) Parameters

loadParams
    Type: [pref_center.LoadParameters](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_LoadParameters.htm#apex_class_pref_center_LoadParameters "Contains methods to retrieve record Id information for parameters passed into the load-form handler.")
    Retrieve the tokenized record ID.
formData
    Type: [pref_center.LoadFormData](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_LoadFormData.htm#apex_class_pref_center_LoadFormData "Retrieve records related to the tokenized record id, and populate the values of a preference form.")
    Set the initial values of fields in a form before they are edited.
validationResult
    Type: [pref_center.ValidationResult](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_ValidationResult.htm#apex_class_pref_center_ValidationResult "This class is reserved for future use with Preference Manager.")
    Reserved for future use.
Return Value Type: [pref_center.LoadFormData](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_LoadFormData.htm#apex_class_pref_center_LoadFormData "Retrieve records related to the tokenized record id, and populate the values of a preference form.") submit(loadParams, formData, validationResult) Updates the changed values of fields when the preference form is submitted. Signature public void submit(pref_center.SubmitParameters submitParams, pref_center.SubmitFormData formData, pref_center.ValidationResult validationResult) Parameters

submitParams
    Type: [pref_center.SubmitParameters](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_SubmitParameters.htm#apex_class_pref_center_SubmitParameters "Retrieve record ID information to use with your submit-form handler.")
    Retrieve the tokenized record Id.
formData
    Type: [pref_center.SubmitFormData](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_SubmitFormData.htm#apex_class_pref_center_SubmitFormData "Contains methods to retrieve information on buttons and options selected in a preference form.")
    Retrieve the values of fields in a submitted form.
validationResult
    Type: [pref_center.ValidationResult](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_ValidationResult.htm#apex_class_pref_center_ValidationResult "This class is reserved for future use with Preference Manager.")
    Reserved for future use.
Return Value Type: void
