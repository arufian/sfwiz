# FieldDiff Class

FieldDiff Class Represents the name of a matching rule field and how the values of the field compare for the duplicate and its matching record. Namespace [Datacloud](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_datacloud.htm#apex_namespace_datacloud "The Datacloud namespace provides classes and methods for retrieving information about duplicate rules. Duplicate rules let you control whether and when users can save duplicate records within Salesforce.")
            * **[FieldDiff Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Datacloud_FieldDiff.htm#apex_Datacloud_FieldDiff_methods)**  

FieldDiff Methods The following are methods for FieldDiff.
            * **[getDifference()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Datacloud_FieldDiff.htm#apex_Datacloud_FieldDiff_getDifference)**  
Returns how the field values compare for the duplicate and its matching record.
            * **[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Datacloud_FieldDiff.htm#apex_Datacloud_FieldDiff_getName)**  
Returns the name of a field on a matching rule that detected duplicates.
getDifference() Returns how the field values compare for the duplicate and its matching record. Signature public String getDifference() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Possible values include:
            * SAME: Indicates the field values match exactly.
            * DIFFERENT: Indicates that the field values do not match.
            * NULL: Indicates that the field values are a match because both values are blank.
getName() Returns the name of a field on a matching rule that detected duplicates. Signature public String getName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
