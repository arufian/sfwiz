# QuickActionRequest Class

QuickActionRequest Class Use the QuickAction.QuickActionRequest class for providing action information for quick actions to be performed by QuickAction class methods. Action information includes the action name, context record ID, and record. Namespace [QuickAction](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_QuickAction.htm "The QuickAction namespace provides classes and methods for quick actions.") Usage For Apex saved using Salesforce API version 28.0, a parent ID is associated with the QuickActionRequest instead of the context ID. The constructor of this class takes no arguments: 
[code]QuickAction.QuickActionRequest qar = new QuickAction.QuickActionRequest();
    
[/code]

Example In this sample, a new quick action is created to create a contact and assign a record to it.
[code] QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
    // Some quick action name
    req.quickActionName = Schema.Account.QuickAction.AccountCreateContact; 
    
    // Define a record for the quick action to create
    Contact c = new Contact(); 
    c.lastname = 'last name';
    req.record = c; 
    
    // Provide the context ID (or parent ID). In this case, it is an Account record.
    req.contextid = '001xx000003DGcO'; 
    
    QuickAction.QuickActionResult res = QuickAction.performQuickAction(req);
    
[/code]

              * **[QuickActionRequest Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_constructors)**  

              * **[QuickActionRequest Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_methods)**  

See Also
              * [QuickAction Class](atlas.en-us.258.0.apexref.meta/apexref/apex_class_system_quickaction.htm#apex_class_system_quickaction "Use Apex to request and process actions on objects that allow custom fields, on objects that appear in a Chatter feed, or on objects that are available globally.")
QuickActionRequest Constructors The following are constructors for QuickActionRequest.
              * **[QuickActionRequest()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_ctor)**  
Creates a new instance of the QuickAction.QuickActionRequest class.
QuickActionRequest() Creates a new instance of the QuickAction.QuickActionRequest class. Signature public QuickActionRequest() QuickActionRequest Methods The following are methods for QuickActionRequest. All are instance methods.
              * **[getContextId()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_getContextId)**  
Returns this QuickAction’s context record ID.
              * **[getQuickActionName()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_getQuickActionName)**  
Returns this QuickAction’s name.
              * **[getRecord()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_getRecord)**  
Returns the QuickAction’s associated record.
              * **[setContextId(contextId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_setContextId)**  
Sets this QuickAction’s context ID. Returned by getContextId. 
              * **[setQuickActionName(name)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_setQuickActionName)**  
Sets this QuickAction’s name. Returned by getQuickActionName.
              * **[setRecord(record)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_quickaction_quickactionrequest.htm#apex_QuickAction_QuickActionRequest_setRecord)**  
Sets a record for this QuickAction. Returned by getRecord.
getContextId() Returns this QuickAction’s context record ID. Signature public Id getContextId() Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.") getQuickActionName() Returns this QuickAction’s name. Signature public String getQuickActionName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getRecord() Returns the QuickAction’s associated record. Signature public SObject getRecord() Return Value Type: [sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.") setContextId(contextId) Sets this QuickAction’s context ID. Returned by getContextId.  Signature public Void setContextId(Id contextId) Parameters

contextId
    Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
Return Value Type: Void Usage For Apex saved using Salesforce API version 28.0, sets this QuickAction’s parent ID and is returned by getParentId. setQuickActionName(name) Sets this QuickAction’s name. Returned by getQuickActionName. Signature public Void setQuickActionName(String name) Parameters

name
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void setRecord(record) Sets a record for this QuickAction. Returned by getRecord. Signature public Void setRecord(SObject record) Parameters

record
    Type: [sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.")
Return Value Type: Void
