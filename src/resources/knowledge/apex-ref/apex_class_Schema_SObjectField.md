# SObjectField Class

SObjectField Class A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods. Namespace [Schema](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Schema.htm "The Schema namespace provides classes and methods for schema metadata information.") Example
[code] Schema.DescribeFieldResult F = Account.Industry.getDescribe();
    Schema.sObjectField T = F.getSObjectField();
[/code]

sObjectField Methods The following are instance methods for sObjectField.
            * **[getDescribe()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_Schema_SObjectField_getDescribe)**  
Returns the describe field result for this field.
            * **[getDescribe(options)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_Schema_SObjectField_getDescribe_2)**  
Returns the describe field result for this field. This method also provides an option to get all the describe field results for an object.
getDescribe() Returns the describe field result for this field. Signature public Schema.DescribeFieldResult getDescribe() Return Value Type: [Schema.DescribeFieldResult](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fields_describe.htm#apex_methods_system_fields_describe "Contains methods for describing sObject fields.") getDescribe(options) Returns the describe field result for this field. This method also provides an option to get all the describe field results for an object. Signature public Schema.DescribeFieldResult getDescribe(Object options) Parameters

options
    Type: Object
    Use this parameter to pass FieldDescribeOptions.FULL_DESCRIBE when a subset of system objects could have different results for picklist values based on the context they're invoked in. This parameter computes all aspects of describe field results. For example, AIConversationContext.PersonType field is a picklist that contains a list of accessible object types.
Return Value Type: [Schema.DescribeFieldResult](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fields_describe.htm#apex_methods_system_fields_describe "Contains methods for describing sObject fields.")
