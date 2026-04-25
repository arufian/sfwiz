# TriggerContext Class

ChangeEventHeader Class Contains header fields of Change Data Capture events. Namespace [EventBus](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_eventbus.htm "The EventBus namespace provides classes and methods for platform events and Change Data Capture events.")
              * **[ChangeEventHeader Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_properties)**  

See Also
              * [_Change Data Capture Developer Guide_ ](https://developer.salesforce.com/docs/atlas.en-us.258.0.change_data_capture.meta/change_data_capture/cdc_intro.htm "Change Data Capture Developer Guide
             - HTML \(New Window\)")
ChangeEventHeader Properties The following are properties for ChangeEventHeader.
              * **[changedfields](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_changedfields)**  
A list of the fields that were changed in an update operation, including the LastModifiedDate system field. This field is empty for other operations, including record creation. This property is available in Apex saved using API version 47.0 or later.
              * **[changeorigin](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_changeorigin)**  
Only populated for changes done by API apps or from Lightning Experience; empty otherwise. The Salesforce API and the API client ID that initiated the change, if set by the client. Use this field to detect whether your app initiated the change to not process the change again and potentially avoid a deep cycle of changes.
              * **[changetype](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_changetype)**  
The operation that caused the change.
              * **[commitnumber](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_commitnumber)**  
The system change number (SCN) of a committed transaction, which increases sequentially. This field is provided for diagnostic purposes. The field value is not guaranteed to be unique in Salesforce—it is unique only in a single database instance. If your Salesforce org migrates to another database instance, the commit number might not be unique or sequential.
              * **[committimestamp](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_committimestamp)**  
The date and time when the change occurred, represented as the number of milliseconds since January 1, 1970 00:00:00 GMT.
              * **[commituser](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_commituser)**  
The ID of the user that ran the change operation.
              * **[difffields](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_difffields)**  
Contains the names of fields whose values are sent as a unified diff because they contain large text values.
              * **[entityname](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_entityname)**  
The API name of the standard or custom object that the change pertains to. For example, Account or MyObject__c.
              * **[nulledfields](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_nulledfields)**  
Contains the names of fields whose values were changed to null in an update operation. Use this field in Apex change event messages to determine if a field was changed to null in an update and isn’t an unchanged field.
              * **[recordids](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_recordids)**  
One or more record IDs for the changed records. Typically, this field contains one record ID. If in one transaction the same change occurred in multiple records of the same object type during one second, Salesforce merges the change notifications. In this case, Salesforce sends one change event for all affected records and the recordIds field contains the IDs for all records that have the same change.
              * **[sequencenumber](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_sequencenumber)**  
The sequence of the change within a transaction. The sequence number starts from 1.
              * **[transactionkey](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_transactionkey)**  
A string that uniquely identifies each Salesforce transaction. You can use this key to identify and group all changes that were made in the same transaction.
changedfields A list of the fields that were changed in an update operation, including the LastModifiedDate system field. This field is empty for other operations, including record creation. This property is available in Apex saved using API version 47.0 or later. Signature public List<String> changedfields {get; set;} Property Value Type: List<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")> changeorigin Only populated for changes done by API apps or from Lightning Experience; empty otherwise. The Salesforce API and the API client ID that initiated the change, if set by the client. Use this field to detect whether your app initiated the change to not process the change again and potentially avoid a deep cycle of changes. Signature public String changeorigin {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The format of the changeOrigin field value is:
[code]com/salesforce/api/<API_Name>/<API_Version>;client=<Client_ID>
[/code]

              * <API_Name> is the name of the Salesforce API used to make the data change. It can take one of these values: soap, rest, bulkapi, xmlrpc, oldsoap, toolingsoap, toolingrest, apex, apexdebuggerrest.
              * <API_Version> is the version of the API call that made the change and is in the format XX.X.
              * <Client_ID> is a string that contains the client ID of the app that initiated the change. If the client ID is not set in the API call, client=<Client_ID> is not appended to the changeOrigin field.
**Example:**
[code]com/salesforce/api/soap/49.0;client=Astro
[/code]

The client ID is set in the Call Options header of an API call. For an example on how to set the Call Options header, see:
              * REST API: [Sforce-Call-Options Header](https://developer.salesforce.com/docs/atlas.en-us.258.0.api_rest.meta/api_rest/headers_calloptions.htm "HTML \(New Window\)"). (Bulk API also uses the Sforce-Call-Options header. )
              * SOAP API: [CallOptions Header](https://developer.salesforce.com/docs/atlas.en-us.258.0.api.meta/api/sforce_api_header_calloptions.htm "HTML \(New Window\)"). (Apex API also uses the CallOptions element.)
changetype The operation that caused the change. Signature public String changetype {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Can be one of the following values:
              * CREATE
              * UPDATE
              * DELETE
              * UNDELETE
              * SNAPSHOT (reserved for future use)
For gap events, the change type starts with the GAP_ prefix.
              * GAP_CREATE
              * GAP_UPDATE
              * GAP_DELETE
              * GAP_UNDELETE
For overflow events, the change type is GAP_OVERFLOW. commitnumber The system change number (SCN) of a committed transaction, which increases sequentially. This field is provided for diagnostic purposes. The field value is not guaranteed to be unique in Salesforce—it is unique only in a single database instance. If your Salesforce org migrates to another database instance, the commit number might not be unique or sequential. Signature public Long commitnumber {get; set;} Property Value Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.") committimestamp The date and time when the change occurred, represented as the number of milliseconds since January 1, 1970 00:00:00 GMT. Signature public Long committimestamp {get; set;} Property Value Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.") commituser The ID of the user that ran the change operation. Signature public String commituser {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") difffieldsChangeEventHeader Class Contains header fields of Change Data Capture events. Namespace [EventBus](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_eventbus.htm "The EventBus namespace provides classes and methods for platform events and Change Data Capture events.")
              * **[ChangeEventHeader Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_properties)**  

See Also
              * [_Change Data Capture Developer Guide_ ](https://developer.salesforce.com/docs/atlas.en-us.258.0.change_data_capture.meta/change_data_capture/cdc_intro.htm "Change Data Capture Developer Guide
             - HTML \(New Window\)")
ChangeEventHeader Properties The following are properties for ChangeEventHeader.
              * **[changedfields](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_changedfields)**  
A list of the fields that were changed in an update operation, including the LastModifiedDate system field. This field is empty for other operations, including record creation. This property is available in Apex saved using API version 47.0 or later.
              * **[changeorigin](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_changeorigin)**  
Only populated for changes done by API apps or from Lightning Experience; empty otherwise. The Salesforce API and the API client ID that initiated the change, if set by the client. Use this field to detect whether your app initiated the change to not process the change again and potentially avoid a deep cycle of changes.
              * **[changetype](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_changetype)**  
The operation that caused the change.
              * **[commitnumber](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_commitnumber)**  
The system change number (SCN) of a committed transaction, which increases sequentially. This field is provided for diagnostic purposes. The field value is not guaranteed to be unique in Salesforce—it is unique only in a single database instance. If your Salesforce org migrates to another database instance, the commit number might not be unique or sequential.
              * **[committimestamp](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_committimestamp)**  
The date and time when the change occurred, represented as the number of milliseconds since January 1, 1970 00:00:00 GMT.
              * **[commituser](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_commituser)**  
The ID of the user that ran the change operation.
              * **[difffields](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_difffields)**  
Contains the names of fields whose values are sent as a unified diff because they contain large text values.
              * **[entityname](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_entityname)**  
The API name of the standard or custom object that the change pertains to. For example, Account or MyObject__c.
              * **[nulledfields](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_nulledfields)**  
Contains the names of fields whose values were changed to null in an update operation. Use this field in Apex change event messages to determine if a field was changed to null in an update and isn’t an unchanged field.
              * **[recordids](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_recordids)**  
One or more record IDs for the changed records. Typically, this field contains one record ID. If in one transaction the same change occurred in multiple records of the same object type during one second, Salesforce merges the change notifications. In this case, Salesforce sends one change event for all affected records and the recordIds field contains the IDs for all records that have the same change.
              * **[sequencenumber](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_sequencenumber)**  
The sequence of the change within a transaction. The sequence number starts from 1.
              * **[transactionkey](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_ChangeEventHeader.htm#apex_eventbus_ChangeEventHeader_transactionkey)**  
A string that uniquely identifies each Salesforce transaction. You can use this key to identify and group all changes that were made in the same transaction.
changedfields A list of the fields that were changed in an update operation, including the LastModifiedDate system field. This field is empty for other operations, including record creation. This property is available in Apex saved using API version 47.0 or later. Signature public List<String> changedfields {get; set;} Property Value Type: List<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")> changeorigin Only populated for changes done by API apps or from Lightning Experience; empty otherwise. The Salesforce API and the API client ID that initiated the change, if set by the client. Use this field to detect whether your app initiated the change to not process the change again and potentially avoid a deep cycle of changes. Signature public String changeorigin {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The format of the changeOrigin field value is:
[code]com/salesforce/api/<API_Name>/<API_Version>;client=<Client_ID>
[/code]

              * <API_Name> is the name of the Salesforce API used to make the data change. It can take one of these values: soap, rest, bulkapi, xmlrpc, oldsoap, toolingsoap, toolingrest, apex, apexdebuggerrest.
              * <API_Version> is the version of the API call that made the change and is in the format XX.X.
              * <Client_ID> is a string that contains the client ID of the app that initiated the change. If the client ID is not set in the API call, client=<Client_ID> is not appended to the changeOrigin field.
**Example:**
[code]com/salesforce/api/soap/49.0;client=Astro
[/code]

The client ID is set in the Call Options header of an API call. For an example on how to set the Call Options header, see:
              * REST API: [Sforce-Call-Options Header](https://developer.salesforce.com/docs/atlas.en-us.258.0.api_rest.meta/api_rest/headers_calloptions.htm "HTML \(New Window\)"). (Bulk API also uses the Sforce-Call-Options header. )
              * SOAP API: [CallOptions Header](https://developer.salesforce.com/docs/atlas.en-us.258.0.api.meta/api/sforce_api_header_calloptions.htm "HTML \(New Window\)"). (Apex API also uses the CallOptions element.)
changetype The operation that caused the change. Signature public String changetype {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Can be one of the following values:
              * CREATE
              * UPDATE
              * DELETE
              * UNDELETE
              * SNAPSHOT (reserved for future use)
For gap events, the change type starts with the GAP_ prefix.
              * GAP_CREATE
              * GAP_UPDATE
              * GAP_DELETE
              * GAP_UNDELETE
For overflow events, the change type is GAP_OVERFLOW. commitnumber The system change number (SCN) of a committed transaction, which increases sequentially. This field is provided for diagnostic purposes. The field value is not guaranteed to be unique in Salesforce—it is unique only in a single database instance. If your Salesforce org migrates to another database instance, the commit number might not be unique or sequential. Signature public Long commitnumber {get; set;} Property Value Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.") committimestamp The date and time when the change occurred, represented as the number of milliseconds since January 1, 1970 00:00:00 GMT. Signature public Long committimestamp {get; set;} Property Value Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.") commituser The ID of the user that ran the change operation. Signature public String commituser {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") difffields Contains the names of fields whose values are sent as a unified diff because they contain large text values. Signature public List<String> difffields {get; set;} Property Value Type: List<String> See Also
              * [ _Change Data Capture Developer Guide_ : Sending Data Differences for Fields of Updated Records](https://developer.salesforce.com/docs/atlas.en-us.258.0.change_data_capture.meta/change_data_capture/cdc_data_diff.htm "
              Change Data Capture Developer Guide: Sending Data Differences for Fields of
              Updated Records - HTML \(New Window\)")
entityname The API name of the standard or custom object that the change pertains to. For example, Account or MyObject__c. Signature public String entityname {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") nulledfields Contains the names of fields whose values were changed to null in an update operation. Use this field in Apex change event messages to determine if a field was changed to null in an update and isn’t an unchanged field. Signature public List<String> nulledfields {get; set;} Property Value Type: List<String> recordids One or more record IDs for the changed records. Typically, this field contains one record ID. If in one transaction the same change occurred in multiple records of the same object type during one second, Salesforce merges the change notifications. In this case, Salesforce sends one change event for all affected records and the recordIds field contains the IDs for all records that have the same change. Signature public List<String> recordids {get; set;} Property Value Type: List<String> Examples of operations with same changes are:
              * Update of fieldA to valueA in Account records.
              * Deletion of Account records.
              * Renaming or replacing a picklist value that results in updating the field value in all affected records.
The recordIds field can contain a wildcard value when a change event message is generated for custom field type conversions that cause data loss. In this case, the recordIds value is the three-character prefix of the object, followed by the wildcard character *. For example, for accounts, the value is 001*. sequencenumber The sequence of the change within a transaction. The sequence number starts from 1. Signature public Integer sequencenumber {get; set;} Property Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") A lead conversion is an example of a transaction that can have multiple changes. A lead conversion results in the following sequence of changes, all within the same transaction.
              1. Create an account
              2. Create a contact
              3. Create an opportunity
              4. Update a lead
transactionkey A string that uniquely identifies each Salesforce transaction. You can use this key to identify and group all changes that were made in the same transaction. Signature public String transactionkey {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") TriggerContext Class Provides information about the platform event or change event trigger that’s currently executing, such as how many times the trigger was retried due to the EventBus.RetryableException. Also, provides a method to resume trigger executions. Namespace [EventBus](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_eventbus.htm "The EventBus namespace provides classes and methods for platform events and Change Data Capture events.")
              * **[TriggerContext Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TriggerContext.htm#apex_eventbus_TriggerContext_properties)**  

              * **[TriggerContext Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TriggerContext.htm#apex_eventbus_TriggerContext_methods)**  

TriggerContext Properties The following are properties for TriggerContext.
              * **[lastError](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TriggerContext.htm#apex_eventbus_TriggerContext_lastError)**  
Read-only. The error message that the last thrown EventBus.RetryableException contains.
              * **[retries](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TriggerContext.htm#apex_eventbus_TriggerContext_retries)**  
Read-only. The number of times the trigger was retried due to throwing the EventBus.RetryableException.
lastError Read-only. The error message that the last thrown EventBus.RetryableException contains. Signature public String lastError {get;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage The error message that this property returns is the message that was passed in when creating the EventBus.RetryableException exception, as follows.
[code] throw new EventBus.RetryableException(
                 'Condition is not met, so retrying the trigger again.');
[/code]

retries Read-only. The number of times the trigger was retried due to throwing the EventBus.RetryableException. Signature public Integer retries {get;} Property Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") TriggerContext Methods The following are methods for TriggerContext.
              * **[currentContext()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TriggerContext.htm#apex_eventbus_TriggerContext_currentContext)**  
Returns an instance of the EventBus.TriggerContext class containing information about the currently executing trigger.
              * **[getResumeCheckpoint()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TriggerContext.htm#apex_eventbus_TriggerContext_getResumeCheckpoint)**  
Returns the replay ID that was set by setResumeCheckpoint(). The returned value is the replay ID of the event message after which trigger processing resumes in a new trigger invocation.
              * **[setResumeCheckpoint(resumeReplayId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TriggerContext.htm#apex_eventbus_TriggerContext_setResumeCheckpoint)**  
Sets a checkpoint in the event stream where the platform event trigger resumes execution in a new invocation. Use this method to recover from limit and uncaught exceptions, or to control the number of events processed in one trigger execution. When calling this method, pass in the replay ID of the last successfully processed event message. When the trigger stops execution before all events in Trigger.New are processed, either because of an uncaught exception or intentionally, the trigger is invoked again. The new execution starts with the event message in the stream after the one with the checkpointed Replay ID.
currentContext() Returns an instance of the EventBus.TriggerContext class containing information about the currently executing trigger. Signature public static eventbus.TriggerContext currentContext() Return Value Type: EventBus.TriggerContext Information about the currently executing trigger. getResumeCheckpoint() Returns the replay ID that was set by setResumeCheckpoint(). The returned value is the replay ID of the event message after which trigger processing resumes in a new trigger invocation. Signature public String getResumeCheckpoint() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") setResumeCheckpoint(resumeReplayId) Sets a checkpoint in the event stream where the platform event trigger resumes execution in a new invocation. Use this method to recover from limit and uncaught exceptions, or to control the number of events processed in one trigger execution. When calling this method, pass in the replay ID of the last successfully processed event message. When the trigger stops execution before all events in Trigger.New are processed, either because of an uncaught exception or intentionally, the trigger is invoked again. The new execution starts with the event message in the stream after the one with the checkpointed Replay ID. Signature public void setResumeCheckpoint(String resumeReplayId) Parameters

resumeReplayId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The replay ID of the last successfully processed platform event message, after which to resume processing in a new trigger execution context.
Return Value Type: void Usage The method throws an EventBus.InvalidReplayIdException if the supplied Replay ID is not valid—the replay ID is not in the current trigger batch of events, in the Trigger.new list. Example This snippet shows how to call the method and pass in the replayId property of an event instance.
[code] EventBus.TriggerContext.currentContext().setResumeCheckpoint(event.replayId);
[/code]
