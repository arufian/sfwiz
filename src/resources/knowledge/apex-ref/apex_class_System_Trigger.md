# Trigger Class

Security Class Contains methods to securely implement Apex applications. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage In the context of the current user’s create, read, update, or upsert access permission, use the Security class methods to:
            * Strip fields that aren’t visible from query and subquery results
            * Remove inaccessible fields before a DML operation without causing an exception
            * Sanitize SObjects that have been deserialized from an untrusted source
            * **[Security Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#apex_System_Security_methods)**  

Security Methods The following are methods for Security.
            * **[stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#apex_System_Security_stripInaccessible)**  
Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user. The method also provides an option to enforce an object-level access check.
            * **[stripInaccessible(accessCheckType, sourceRecords)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#apex_System_Security_stripInaccessible_2)**  
Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user.
            * **[stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD, permissionSetId)(Developer Preview)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#unique_59817277)**  
Creates a list of sObjects from the source records, which are stripped of fields that fail field-level and object-level access checks. Apex enforces field-level security (FLS) and object permissions as per the specified permission set, in addition to the running user’s permissions. 
stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD) Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user. The method also provides an option to enforce an object-level access check. Signature public static System.SObjectAccessDecision stripInaccessible(System.AccessType accessCheckType, List<SObject> sourceRecords, Boolean enforceRootObjectCRUD) Parameters

accessCheckType
    Type: [System.AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title)
    Uses values from the [AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title) enum. This parameter determines the type of field-level access check to be performed. To check the current user's field-level access, use the [Schema.DescribeFieldResult](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fields_describe.htm#topic-title) methods —isCreatable(), isAccessible(), or isUpdatable().
sourceRecords
    Type: [List<SObject>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)
    A list of sObjects to be checked for fields that aren’t accessible in the context of the current user’s operation.
enforceRootObjectCRUD
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Indicates whether an object-level access check is performed. If this parameter is set to true and the access check fails, the method throws an exception. The default value of this optional parameter is true.
Return Value Type: [System.SObjectAccessDecision](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#topic-title) Example In this example, the user doesn’t have permission to create the Probability field of an Opportunity.
[code] List<Opportunity> opportunities = new List<Opportunity>{
        new Opportunity(Name='Opportunity1'),
        new Opportunity(Name='Opportunity2', Probability=95)
    };
    
    // Strip fields that are not creatable
    SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.CREATABLE,
        opportunities);
    
    // Print stripped records
    for (SObject strippedOpportunity : decision.getRecords()) {
        System.debug(strippedOpportunity);
    }
    
    // Print modified indexes
    System.debug(decision.getModifiedIndexes());
    
    // Print removed fields
    System.debug(decision.getRemovedFields());
    
    //Lines from output log
    //|DEBUG|Opportunity:{Name=Opportunity1}
    //|DEBUG|Opportunity:{Name=Opportunity2}
    //|DEBUG|{1}
    //|DEBUG|{Opportunity={Probability}}
    
[/code]

stripInaccessible(accessCheckType, sourceRecords) Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user. Signature public static System.SObjectAccessDecision stripInaccessible(System.AccessType accessCheckType, List<SObject> sourceRecords) Parameters

accessCheckType
    Type: [System.AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title)
    Uses values from the [AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title) enum. This parameter determines the type of field-level access check to be performed. To check the current user's field-level access, use the [Schema.DescribeFieldResult](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fields_describe.htm#topic-title) methods —isCreatable(), isAccessible(), or isUpdatable().
sourceRecords
    Type: [List<SObject>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)
    A list of sObjects to be checked for fields that aren’t accessible in the context of the current user’s operation.
Return Value Type: [System.SObjectAccessDecision](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#topic-title) Example In this example, the user doesn’t have permission to read the ActualCost field of a Campaign.
[code] List<Campaign> campaigns = new List<Campaign>{
        new Campaign(Name='Campaign1', BudgetedCost=1000, ActualCost=2000),
        new Campaign(Name='Campaign2', BudgetedCost=4000, ActualCost=1500)
    };
    insert campaigns;
            
    // Strip fields that are not readable
    SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.READABLE,
        [SELECT Name, BudgetedCost, ActualCost from Campaign]);
            
    // Print stripped records
    for (SObject strippedCampaign : decision.getRecords()) {
        System.debug(strippedCampaign); // Does not display ActualCost
    }
    
    // Print modified indexes
    System.debug(decision.getModifiedIndexes());
    
    // Print removed fields
    System.debug(decision.getRemovedFields());
    
    //Lines from output log
    //|DEBUG|Campaign:{Name=Campaign1, BudgetedCost=1000, Id=701xx00000011nhAAA}
    //|DEBUG|Campaign:{Name=Campaign2, BudgetedCost=4000, Id=701xx00000011niAAA}
    //|DEBUG|{0, 1}
    //|DEBUG|{Campaign={ActualCost}}
[/code]

stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD, permissionSetId)(Developer Preview) Creates a list of sObjects from the source records, which are stripped of fields that fail field-level and object-level access checks. Apex enforces field-level security (FLS) and object permissions as per the specified permission set, in addition to the running user’s permissions.  Signature Note Feature is available as a developer preview. Feature isn’t generally available unless or until Salesforce announces its general availability in documentation or in press releases or public statements. All commands, parameters, and other features are subject to change or deprecation at any time, with or without notice. Don’t implement functionality developed with these commands or tools in a production environment. You can provide feedback and suggestions for the “Permission Sets with User Mode” feature in the [Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/groups/0F94S000000GvrW "HTML \(New Window\)"). This feature is available in scratch orgs where the ApexUserModeWithPermset feature is enabled. If the feature isn’t enabled, Apex code with this feature can be compiled but not executed. public static System.SObjectAccessDecision stripInaccessible(System.AccessType accessCheckType, List<SObject> sourceRecords, BooleanSecurity Class Contains methods to securely implement Apex applications. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage In the context of the current user’s create, read, update, or upsert access permission, use the Security class methods to:
            * Strip fields that aren’t visible from query and subquery results
            * Remove inaccessible fields before a DML operation without causing an exception
            * Sanitize SObjects that have been deserialized from an untrusted source
            * **[Security Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#apex_System_Security_methods)**  

Security Methods The following are methods for Security.
            * **[stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#apex_System_Security_stripInaccessible)**  
Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user. The method also provides an option to enforce an object-level access check.
            * **[stripInaccessible(accessCheckType, sourceRecords)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#apex_System_Security_stripInaccessible_2)**  
Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user.
            * **[stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD, permissionSetId)(Developer Preview)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#unique_59817277)**  
Creates a list of sObjects from the source records, which are stripped of fields that fail field-level and object-level access checks. Apex enforces field-level security (FLS) and object permissions as per the specified permission set, in addition to the running user’s permissions. 
stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD) Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user. The method also provides an option to enforce an object-level access check. Signature public static System.SObjectAccessDecision stripInaccessible(System.AccessType accessCheckType, List<SObject> sourceRecords, Boolean enforceRootObjectCRUD) Parameters

accessCheckType
    Type: [System.AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title)
    Uses values from the [AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title) enum. This parameter determines the type of field-level access check to be performed. To check the current user's field-level access, use the [Schema.DescribeFieldResult](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fields_describe.htm#topic-title) methods —isCreatable(), isAccessible(), or isUpdatable().
sourceRecords
    Type: [List<SObject>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)
    A list of sObjects to be checked for fields that aren’t accessible in the context of the current user’s operation.
enforceRootObjectCRUD
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Indicates whether an object-level access check is performed. If this parameter is set to true and the access check fails, the method throws an exception. The default value of this optional parameter is true.
Return Value Type: [System.SObjectAccessDecision](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#topic-title) Example In this example, the user doesn’t have permission to create the Probability field of an Opportunity.
[code] List<Opportunity> opportunities = new List<Opportunity>{
        new Opportunity(Name='Opportunity1'),
        new Opportunity(Name='Opportunity2', Probability=95)
    };
    
    // Strip fields that are not creatable
    SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.CREATABLE,
        opportunities);
    
    // Print stripped records
    for (SObject strippedOpportunity : decision.getRecords()) {
        System.debug(strippedOpportunity);
    }
    
    // Print modified indexes
    System.debug(decision.getModifiedIndexes());
    
    // Print removed fields
    System.debug(decision.getRemovedFields());
    
    //Lines from output log
    //|DEBUG|Opportunity:{Name=Opportunity1}
    //|DEBUG|Opportunity:{Name=Opportunity2}
    //|DEBUG|{1}
    //|DEBUG|{Opportunity={Probability}}
    
[/code]

stripInaccessible(accessCheckType, sourceRecords) Creates a list of sObjects from the source records, which are stripped of fields that fail the field-level security checks for the current user. Signature public static System.SObjectAccessDecision stripInaccessible(System.AccessType accessCheckType, List<SObject> sourceRecords) Parameters

accessCheckType
    Type: [System.AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title)
    Uses values from the [AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title) enum. This parameter determines the type of field-level access check to be performed. To check the current user's field-level access, use the [Schema.DescribeFieldResult](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fields_describe.htm#topic-title) methods —isCreatable(), isAccessible(), or isUpdatable().
sourceRecords
    Type: [List<SObject>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)
    A list of sObjects to be checked for fields that aren’t accessible in the context of the current user’s operation.
Return Value Type: [System.SObjectAccessDecision](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#topic-title) Example In this example, the user doesn’t have permission to read the ActualCost field of a Campaign.
[code] List<Campaign> campaigns = new List<Campaign>{
        new Campaign(Name='Campaign1', BudgetedCost=1000, ActualCost=2000),
        new Campaign(Name='Campaign2', BudgetedCost=4000, ActualCost=1500)
    };
    insert campaigns;
            
    // Strip fields that are not readable
    SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.READABLE,
        [SELECT Name, BudgetedCost, ActualCost from Campaign]);
            
    // Print stripped records
    for (SObject strippedCampaign : decision.getRecords()) {
        System.debug(strippedCampaign); // Does not display ActualCost
    }
    
    // Print modified indexes
    System.debug(decision.getModifiedIndexes());
    
    // Print removed fields
    System.debug(decision.getRemovedFields());
    
    //Lines from output log
    //|DEBUG|Campaign:{Name=Campaign1, BudgetedCost=1000, Id=701xx00000011nhAAA}
    //|DEBUG|Campaign:{Name=Campaign2, BudgetedCost=4000, Id=701xx00000011niAAA}
    //|DEBUG|{0, 1}
    //|DEBUG|{Campaign={ActualCost}}
[/code]

stripInaccessible(accessCheckType, sourceRecords, enforceRootObjectCRUD, permissionSetId)(Developer Preview) Creates a list of sObjects from the source records, which are stripped of fields that fail field-level and object-level access checks. Apex enforces field-level security (FLS) and object permissions as per the specified permission set, in addition to the running user’s permissions.  Signature Note Feature is available as a developer preview. Feature isn’t generally available unless or until Salesforce announces its general availability in documentation or in press releases or public statements. All commands, parameters, and other features are subject to change or deprecation at any time, with or without notice. Don’t implement functionality developed with these commands or tools in a production environment. You can provide feedback and suggestions for the “Permission Sets with User Mode” feature in the [Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/groups/0F94S000000GvrW "HTML \(New Window\)"). This feature is available in scratch orgs where the ApexUserModeWithPermset feature is enabled. If the feature isn’t enabled, Apex code with this feature can be compiled but not executed. public static System.SObjectAccessDecision stripInaccessible(System.AccessType accessCheckType, List<SObject> sourceRecords, Boolean enforceRootObjectCRUD, Id permissionSetId) Parameters

accessCheckType
    Type: [System.AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title)
    Uses values from the [AccessType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_System_AccessType.htm#topic-title) enum. This parameter determines the type of field-level access check to be performed. To check the current user's field-level access, use the [Schema.DescribeFieldResult](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fields_describe.htm#topic-title) methods —isCreatable(), isAccessible(), or isUpdatable().
sourceRecords
    Type: [List<SObject>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)
    A list of sObjects to be checked for fields that aren’t accessible in the context of the current user’s operation.
enforceRootObjectCRUD
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Indicates whether an object-level access check is performed. If this parameter is set to true and the access check fails, the method throws an exception. The default value of this optional parameter is true.
permissionSetId
    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
    Permissions in the specified permission set are enforced in additon to the running user’s permissions.
Return Value Type: [System.SObjectAccessDecision](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#topic-title) Trigger Class Use the Trigger class to access run-time context information in a trigger, such as the type of trigger or the list of sObject records that the trigger operates on. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Trigger Context Variables The Trigger class provides the following context variables.  Variable | Usage  
---|---  
isExecuting | Returns true if the current context for the Apex code is a trigger, not a Visualforce page, a Web service, or an executeanonymous() API call.  
isInsert | Returns true if this trigger was fired due to an insert operation, from the Salesforce user interface, Apex, or the API.  
isUpdate | Returns true if this trigger was fired due to an update operation, from the Salesforce user interface, Apex, or the API.  
isDelete | Returns true if this trigger was fired due to a delete operation, from the Salesforce user interface, Apex, or the API.  
isBefore | Returns true if this trigger was fired before any record was saved.  
isAfter | Returns true if this trigger was fired after all records were saved.  
isUndelete | Returns true if this trigger was fired after a record is recovered from the Recycle Bin. This recovery can occur after an undelete operation from the Salesforce user interface, Apex, or the API.  
new | Returns a list of the new versions of the sObject records.This sObject list is only available in insert, update, and undelete triggers, and the records can only be modified in before triggers.  
newMap | A map of IDs to the new versions of the sObject records.This map is only available in before update, after insert, after update, and after undelete triggers.   
old | Returns a list of the old versions of the sObject records.This sObject list is only available in update and delete triggers.  
oldMap | A map of IDs to the old versions of the sObject records.This map is only available in update and delete triggers.   
operationType | Returns an enum of type System.TriggerOperation corresponding to the current operation.Possible values of the System.TriggerOperation enum are: BEFORE_INSERT, BEFORE_UPDATE, BEFORE_DELETE,AFTER_INSERT, AFTER_UPDATE, AFTER_DELETE, and AFTER_UNDELETE. If you vary your programming logic based on different trigger types, consider using the switch statement with different permutations of unique trigger execution enum states.  
size | The number of records processed in a trigger invocation. DML operations that include over 200 records are processed in batches, and the trigger is invoked for each batch. Trigger.size includes only the number of records in the current batch, not the total number of records in the DML operation.  
Note The record firing a trigger can include an invalid field value, such as a formula that divides by zero. In this case, the field value is set to null in these variables: 
            * new
            * newMap
            * old
            * oldMap
Example For example, in this simple trigger, Trigger.new is a list of sObjects and can be iterated over in a for loop. It can also be used as a bind variable in the IN clause of a SOQL query.
[code] Trigger simpleTrigger on Account (after insert) {
        for (Account a : Trigger.new) {
            // Iterate over each sObject
        }
    
        // This single query finds every contact that is associated with any of the
        // triggering accounts. Note that although Trigger.new is a collection of  
        // records, when used as a bind variable in a SOQL query, Apex automatically
        // transforms the list of records into a list of corresponding Ids.
        Contact[] cons = [SELECT LastName FROM Contact
                          WHERE AccountId IN :Trigger.new];
    }
[/code]

This trigger uses Boolean context variables like Trigger.isBefore and Trigger.isDelete to define code that only executes for specific trigger conditions:
[code] trigger myAccountTrigger on Account(before delete, before insert, before update, 
                                        after delete, after insert, after update) {
    if (Trigger.isBefore) {
        if (Trigger.isDelete) {
    
            // In a before delete trigger, the trigger accesses the records that will be
            // deleted with the Trigger.old list.
            for (Account a : Trigger.old) {
                if (a.name != 'okToDelete') {
                    a.addError('You can\'t delete this record!');
                } 
            }
        } else {
    
        // In before insert or before update triggers, the trigger accesses the new records
        // with the Trigger.new list.
            for (Account a : Trigger.new) {
                if (a.name == 'bad') {
                    a.name.addError('Bad name');
                }
        }
        if (Trigger.isInsert) {
            for (Account a : Trigger.new) {
                System.assertEquals('xxx', a.accountNumber); 
                System.assertEquals('industry', a.industry); 
                System.assertEquals(100, a.numberofemployees);
                System.assertEquals(100.0, a.annualrevenue);
                a.accountNumber = 'yyy';
            }
    
    // If the trigger is not a before trigger, it must be an after trigger.
    } else {
        if (Trigger.isInsert) {
            List<Contact> contacts = new List<Contact>();
            for (Account a : Trigger.new) {        
                if(a.Name == 'makeContact') {
                    contacts.add(new Contact (LastName = a.Name,
                                              AccountId = a.Id));
                }
            } 
          insert contacts;
        }
      }
    }}}
    
[/code]
