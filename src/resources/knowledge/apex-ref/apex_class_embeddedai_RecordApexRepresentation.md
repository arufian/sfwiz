# RecordApexRepresentation Class

RecordApexRepresentation Class Contains properties and a method to create a serializable representation of a record and its associated data for AI service integration and data processing. Namespace [embeddedai](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_embeddedai.htm "The embeddedai namespace provides classes and methods to manage and represent records and data in Apex to support embedded AI features.")
              * **[RecordApexRepresentation Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_embeddedai_RecordApexRepresentation.htm#apex_embeddedai_RecordApexRepresentation_properties)**  

              * **[RecordApexRepresentation Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_embeddedai_RecordApexRepresentation.htm#apex_embeddedai_RecordApexRepresentation_methods)**  
Create detailed, hierarchical record objects and convert them to a custom JSON string for structured AI input.
RecordApexRepresentation Properties The following are properties for RecordApexRepresentation.
              * **[objectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_embeddedai_RecordApexRepresentation.htm#apex_embeddedai_RecordApexRepresentation_objectType)**  
Stores the type of the object.
              * **[recordData](atlas.en-us.258.0.apexref.meta/apexref/apex_class_embeddedai_RecordApexRepresentation.htm#apex_embeddedai_RecordApexRepresentation_recordData)**  
Stores a list of objects, where each object holds a key-value pair.
              * **[relatedRecordData](atlas.en-us.258.0.apexref.meta/apexref/apex_class_embeddedai_RecordApexRepresentation.htm#apex_embeddedai_RecordApexRepresentation_relatedRecordData)**  
Stores a list that contains a child or related records associated with the record data.
objectType Stores the type of the object. Signature public String objectType {get; set;}
[code] embeddedai.RecordApexRepresentation, objectType
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") recordData Stores a list of objects, where each object holds a key-value pair. Signature public List<embeddedai.ApexMap> recordData {get; set;}
[code] embeddedai.RecordApexRepresentation, recordData
[/code]

Property Value Type: [List<embeddedai.ApexMap>](atlas.en-us.258.0.apexref.meta/apexref/apex_class_embeddedai_ApexMap.htm#apex_class_embeddedai_ApexMap "Create, clone, and convert string based key-value pairs to a JSON string format.") relatedRecordData Stores a list that contains a child or related records associated with the record data. Signature public List<embeddedai.RecordApexRepresentation> relatedRecordData {get; set;}
[code] embeddedai.RecordApexRepresentation, relatedRecordData
[/code]

Property Value Type: List<embeddedai.RecordApexRepresentation> RecordApexRepresentation Methods Create detailed, hierarchical record objects and convert them to a custom JSON string for structured AI input. The following are methods for RecordApexRepresentation.
              * **[toString()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_embeddedai_RecordApexRepresentation.htm#apex_embeddedai_RecordApexRepresentation_toString)**  
Returns a structured JSON string representation of the RecordApexRepresentation object and its nested related records.
toString() Returns a structured JSON string representation of the RecordApexRepresentation object and its nested related records. Signature public String toString()
[code] embeddedai.RecordApexRepresentation, toString, [], String
[/code]

Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
