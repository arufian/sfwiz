# SubmitParameters Class

SubmitParameters Class Retrieve record ID information to use with your submit-form handler. Namespace [Pref_center](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_pref_center.htm "The Pref_center namespace provides an interface, classes, and methods to create and retrieve data in forms in Preference Manager. Preference Manager, previously called Preference Center, is a feature within the Privacy Center app.") Example
[code] String userId = submitParams.getRecordId();
    
    User user = [select id, AboutMe from User where id=:userId];
[/code]

              * **[SubmitParameters Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_SubmitParameters.htm#apex_pref_center_SubmitParameters_methods)**  

SubmitParameters Methods The following are methods for SubmitParameters.
              * **[getRecordId()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_pref_center_SubmitParameters.htm#apex_pref_center_SubmitParameters_getRecordId)**  
Returns the untokenized version of the record ID.
getRecordId() Returns the untokenized version of the record ID. Signature public String getRecordId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
