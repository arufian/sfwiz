# AccessType Enum

AccessType Enum Specifies the access check type for the fields of an sObject. Usage Use these enum values for the accessCheckType parameter of the [stripInaccessible](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#topic-title) method. Enum Values The following are the values of the System.AccessType enum. Value | Description  
---|---  
CREATABLE | Check the fields of an sObject for create access.  
READABLE | Check the fields of an sObject for read access.  
UPDATABLE | Check the fields of an sObject for update access.  
UPSERTABLE | Check the fields of an sObject for both insert and update access.
