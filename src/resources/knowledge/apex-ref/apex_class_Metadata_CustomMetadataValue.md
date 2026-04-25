# CustomMetadataValue Class

CustomMetadataValue Class Represents custom metadata values for a custom metadata component. Namespace [Metadata](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Metadata.htm "The Metadata namespace provides classes and methods for working with custom metadata in Salesforce") Usage Use Metadata.CustomMetadataValue to access values for custom fields of custom metadata records. Supported Apex primitive types are:
            * Boolean
            * Date
            * DateTime
            * Decimal
            * Double
            * Integer
            * Long
            * String
Example
[code] // Set a custom field value for a custom metadata record
    Metadata.CustomMetadataValue customField = new Metadata.CustomMetadataValue();
    customField.field = 'CustomField1__c';
    customField.value = 'New Value';
    customMetadata.values.add(customField);
[/code]

            * **[CustomMetadataValue Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_CustomMetadataValue.htm#apex_Metadata_CustomMetadataValue_properties)**  

            * **[CustomMetadataValue Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_CustomMetadataValue.htm#apex_Metadata_CustomMetadataValue_methods)**  

CustomMetadataValue Properties The following are properties for CustomMetadataValue.
            * **[field](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_CustomMetadataValue.htm#apex_Metadata_CustomMetadataValue_field)**  
The field name for the custom metadata value.
            * **[value](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_CustomMetadataValue.htm#apex_Metadata_CustomMetadataValue_value)**  
The field value for the custom metadata value.
field The field name for the custom metadata value. Signature public String field {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") value The field value for the custom metadata value. Signature public Object value {get; set;} Property Value Type: Object Supported Apex primitive types are:
            * Boolean
            * Date
            * DateTime
            * Decimal
            * Double
            * Integer
            * Long
            * String
When setting the value for relationship fields, use the qualified API name of the related metadata, not the ID. For more information, see [Primitive Data Types](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_primitives.htm). CustomMetadataValue Methods The following are methods for CustomMetadataValue.
            * **[clone()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_CustomMetadataValue.htm#apex_Metadata_CustomMetadataValue_clone)**  
Makes a duplicate copy of the Metadata.CustomMetadataValue.
clone() Makes a duplicate copy of the Metadata.CustomMetadataValue. Signature public Object clone() Return Value Type: Object
