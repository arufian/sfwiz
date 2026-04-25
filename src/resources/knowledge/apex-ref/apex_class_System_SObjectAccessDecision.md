# SObjectAccessDecision Class

SObjectAccessDecision Class Contains the results of a call to the [Security.stripInaccessible](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#topic-title) method and methods to retrieve those results.  Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.")
            * **[SObjectAccessDecision Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#apex_System_SObjectAccessDecision_methods)**  

SObjectAccessDecision Methods The following are methods for SObjectAccessDecision.
            * **[getModifiedIndexes()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#apex_System_SObjectAccessDecision_getModifiedIndexes)**  
Returns the indexes of sObjects that are modified by the stripInaccessible method.
            * **[getRecords()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#apex_System_SObjectAccessDecision_getRecords)**  
Returns a list of new sObjects that are identical to the source records, except that they are stripped of fields that fail the field-level security check for the current user.
            * **[getRemovedFields()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SObjectAccessDecision.htm#apex_System_SObjectAccessDecision_getRemovedFields)**  
Returns a map of sObject types to their corresponding inaccessible fields. The map key is a string representation of the sObject type. The map value is a set of strings, which denote the fields names that are inaccessible.
getModifiedIndexes() Returns the indexes of sObjects that are modified by the [stripInaccessible](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#topic-title) method. Signature public Set<Integer> getModifiedIndexes() Return Value Type: [Set<Integer>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_set.htm#topic-title) A set of unsigned integers that represent the row indexes of the modified sObjects. Example In this example, the user doesn’t have permission to update the AnnualRevenue field of an Account.
[code] List<Account> accounts = new List<Account>{
        new Account(Name='Account1', AnnualRevenue=1000),
        new Account(Name='Account2')
    };
    
    // Strip fields that are not updatable
    SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.UPDATABLE,
        accounts);
    
    // Print stripped records
    for (SObject strippedAccount : decision.getRecords()) {
        System.debug(strippedAccount);
    }
    
    // Print modified indexes
    System.debug(decision.getModifiedIndexes());
[/code]

getRecords() Returns a list of new sObjects that are identical to the source records, except that they are stripped of fields that fail the field-level security check for the current user. Usage The [stripInaccessible](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Security.htm#topic-title) method performs field-level access check for the source records in the context of the current user’s operation. The getRecords() method returns the new records that contain only the fields that the current user has access to. Signature public List<SObject> getRecords() Return Value Type: [List<SObject>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title) Even if the result list contains only one sObject, the return type is still a list (of size one). Example In this example, the user doesn’t have permission to update the AnnualRevenue field of an Account.
[code] List<Account> accounts = new List<Account>{
        new Account(Name='Account1', AnnualRevenue=1000),
        new Account(Name='Account2')
    };
    
    // Strip fields that are not updatable
    SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.UPDATABLE,
        accounts);
    
    // Print stripped records
    for (SObject strippedAccount : decision.getRecords()) {
        System.debug(strippedAccount);
    }
[/code]

getRemovedFields() Returns a map of sObject types to their corresponding inaccessible fields. The map key is a string representation of the sObject type. The map value is a set of strings, which denote the fields names that are inaccessible. Signature public Map<String,Set<String>> getRemovedFields() Return Value Type: [Map<String,Set<String>>](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#topic-title) Example In this example, the user doesn’t have permission to update the AnnualRevenue field of an Account.
[code] List<Account> accounts = new List<Account>{
        new Account(Name='Account1', AnnualRevenue=1000),
        new Account(Name='Account2')
    };
    
    // Strip fields that are not updatable
    SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.UPDATABLE,
        accounts);
    
    // Print stripped records
    for (SObject strippedAccount : decision.getRecords()) {
        System.debug(strippedAccount);
    }
    // Print removed fields
    System.debug(decision.getRemovedFields());
[/code]
