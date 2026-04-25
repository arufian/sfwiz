# SObject Class

SObject Class Contains methods for the sObject data type. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage SObject methods are all instance methods: they are called by and operate on an sObject instance such as an account or contact. The following are the instance methods for sObjects. For more information on sObjects, see [Working with sObjects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_SObjects.htm). SObject Methods The following are methods for SObject. All are instance methods.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_2)**  
Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(exceptionError)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_3)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(exceptionError, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_4)**  
Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError)**  
Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError_2)**  
Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring.
                                * **[addError(fieldName, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1537693639)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_332940202)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[addError(fieldName, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_225848019)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1531323614)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[clear()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clear)**  
Clears all field values
                                * **[clone(preserveId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clone)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_382779921)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_577484397)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_580956910)**  
Creates a copy of the SObject record. 
                                * **[get(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get)**  
Returns the value for the field specified by fieldName, such as AccountNumber. 
                                * **[get(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber.
                                * **[getCloneSourceId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getCloneSourceId)**  
Returns the ID of the entity from which an object was cloned. You can use it for objects cloned through the Salesforce user interface. You can also use it for objects created using the System.SObject.clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) method, provided that the preserveId parameter wasn’t used or was set to false. The getCloneSourceId() method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[getErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getErrors)**  
Returns a list of Database.Error objects for an SObject instance. If the SObject has no errors, an empty list is returned.
                                * **[getOptions()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getOptions)**  
Returns the database.DMLOptions object for the SObject. 
                                * **[getPopulatedFieldsAsMap()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getPopulatedFieldsAsMap)**  
Returns a map of populated field names and their corresponding values. The map contains only the fields that have been populated in memory for the SObject instance.
                                * **[getSObject(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject)**  
Returns the value for the specified field. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObject(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.MyObj.MyExternalId. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects)**  
Returns the values for the specified field. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects_2)**  
Returns the value for the field specified by the field token Schema.fieldName, such as, Schema.Account.Contact. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjectType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjectType)**  
Returns the token for this SObject. This method is primarily used with describe information.
                                * **[getQuickActionName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getQuickActionName)**  
Retrieves the name of a quick action associated with this SObject. Typically used in triggers.
                                * **[hasErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_hasErrors)**  
Returns true if an SObject instance has associated errors. The error message can be associated to the SObject instance by using SObject.addError(), validation rules, or by other means.
                                * **[isClone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isClone)**  
Returns true if an entity is cloned from something, even if the entity hasn’t been saved. The method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[isSet(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[isSet(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet_2)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[put(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put)**  
Sets the value for the specified field and returns the previous value for the field.
                                * **[put(field, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put_2)**  
Sets the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber and returns the previous value for the field.
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject)**  
Sets the value for the specified field. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject_2)**  
Sets the value for the field specified by the token Schema.SObjectType. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[recalculateFormulas()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_recalculateFormulas)**  
**Deprecated as of API version 57.0. Use the recalculateFormulas() method in the System.Formula class instead.**
                                * **[setOptions(DMLOptions)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_setOptions)**  
Sets the DMLOptions object for the SObject.
addError(errorMsg) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on SObject Class Contains methods for the sObject data type. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage SObject methods are all instance methods: they are called by and operate on an sObject instance such as an account or contact. The following are the instance methods for sObjects. For more information on sObjects, see [Working with sObjects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_SObjects.htm). SObject Methods The following are methods for SObject. All are instance methods.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_2)**  
Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(exceptionError)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_3)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(exceptionError, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_4)**  
Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError)**  
Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError_2)**  
Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring.
                                * **[addError(fieldName, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1537693639)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_332940202)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[addError(fieldName, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_225848019)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1531323614)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[clear()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clear)**  
Clears all field values
                                * **[clone(preserveId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clone)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_382779921)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_577484397)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_580956910)**  
Creates a copy of the SObject record. 
                                * **[get(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get)**  
Returns the value for the field specified by fieldName, such as AccountNumber. 
                                * **[get(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber.
                                * **[getCloneSourceId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getCloneSourceId)**  
Returns the ID of the entity from which an object was cloned. You can use it for objects cloned through the Salesforce user interface. You can also use it for objects created using the System.SObject.clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) method, provided that the preserveId parameter wasn’t used or was set to false. The getCloneSourceId() method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[getErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getErrors)**  
Returns a list of Database.Error objects for an SObject instance. If the SObject has no errors, an empty list is returned.
                                * **[getOptions()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getOptions)**  
Returns the database.DMLOptions object for the SObject. 
                                * **[getPopulatedFieldsAsMap()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getPopulatedFieldsAsMap)**  
Returns a map of populated field names and their corresponding values. The map contains only the fields that have been populated in memory for the SObject instance.
                                * **[getSObject(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject)**  
Returns the value for the specified field. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObject(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.MyObj.MyExternalId. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects)**  
Returns the values for the specified field. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects_2)**  
Returns the value for the field specified by the field token Schema.fieldName, such as, Schema.Account.Contact. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjectType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjectType)**  
Returns the token for this SObject. This method is primarily used with describe information.
                                * **[getQuickActionName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getQuickActionName)**  
Retrieves the name of a quick action associated with this SObject. Typically used in triggers.
                                * **[hasErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_hasErrors)**  
Returns true if an SObject instance has associated errors. The error message can be associated to the SObject instance by using SObject.addError(), validation rules, or by other means.
                                * **[isClone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isClone)**  
Returns true if an entity is cloned from something, even if the entity hasn’t been saved. The method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[isSet(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[isSet(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet_2)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[put(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put)**  
Sets the value for the specified field and returns the previous value for the field.
                                * **[put(field, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put_2)**  
Sets the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber and returns the previous value for the field.
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject)**  
Sets the value for the specified field. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject_2)**  
Sets the value for the field specified by the token Schema.SObjectType. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[recalculateFormulas()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_recalculateFormulas)**  
**Deprecated as of API version 57.0. Use the recalculateFormulas() method in the System.Formula class instead.**
                                * **[setOptions(DMLOptions)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_setOptions)**  
Sets the DMLOptions object for the SObject.
Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Example
[code] Trigger.new[0].addError('bad');
[/code]

addError(errorMsg, escape) Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String errorMsg) instead. Example
[code] Trigger.new[0].addError('Fix & resubmit', false);
[/code]

addError(exceptionError) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Example
[code] public class MyException extends Exception {}
    Trigger.new[0].addError(new myException('Invalid Id'));
[/code]

addError(exceptionError, escape) Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError, Boolean escape) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(Exception e) instead. Example
[code] public class MyException extends Exception {}
    Trigger.new[0].addError(new myException('Invalid Id & other issues', false));
[/code]

addError(errorMsg) Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void Usage Note:
                                  * When used on Trigger.new in before insert and before update triggers, and on Trigger.old in before delete  addError(errorMsg) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Example
[code] Trigger.new[0].addError('bad');
[/code]

addError(errorMsg, escape) Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String errorMsg) instead. Example
[code] Trigger.new[0].addError('Fix & resubmit', false);
[/code]

addError(exceptionError) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Example
[code] public class MyException extends Exception {}
                                        Trigger.new[0].addError(new myException('Invalid Id'));
[/code]

addError(exceptionError, escape) Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError, Boolean escape) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(Exception e) instead. Example
[code] public class MyException extends Exception {}
                                        Trigger.new[0].addError(new myException('Invalid Id & other issues', false));
[/code]triggers, the error appears in the application interface.

                                * When used in Visualforce controllers, if there is an inputField component bound to field, the message is attached to the component. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std_validation_rules.htm "HTML \(New Window\)") in the Visualforce Developer's Guide.
                                * This method is highly specialized because the field identifier is not actually the invoking object—the sObject record is the invoker. The field is simply used to identify the field that should be used to display the error. 
See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Example
[code] Trigger.new[0].myField__c.addError('bad');
[/code]

addError(errorMsg, escape) Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type:  Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call _field_.addError(String errorMsg) instead. Example
[code] Trigger.new[0].myField__c.addError('Fix & resubmit', false);
[/code]

addError(fieldName, errorMsg) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to a field of an SObject instance using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    Schema.DescribeFieldResult nameDesc = Account.name.getDescribe();
    Schema.sObjectField nameField = nameDesc.getSObjectField();
    acct.addError(nameField, 'error is name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldName, errorMsg, escape) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg, Boolean escape) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: void Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String fieldName, String errorMsg) instead.
addError(errorMsg) Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void Usage Note:
                                * When used on Trigger.new in before insert and before update triggers, and on Trigger.old in before delete triggers, the error appears in the application interface.
                                * When used in Visualforce controllers, if there is an inputField component bound to field, the message is attached to the component. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std_validation_rules.htm "HTML \(New Window\)") in the Visualforce Developer's Guide.
                                * This method is highly specialized because the field identifier is not actually the invoking object—the sObject record is the invoker. The field is simply used to identify the field that should be used to display the error. 
See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Example
[code] Trigger.new[0].myField__c.addError('bad');
[/code]

addError(errorMsg, escape) Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type:  Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call _field_.addError(String errorMsg) instead. Example
[code] Trigger.new[0].myField__c.addError('Fix & resubmit', false);
[/code]

addError(fieldName, errorMsg) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to a field of an SObject instance using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    Schema.DescribeFieldResult nameDesc = Account.name.getDescribe();
    Schema.sObjectField nameField = nameDesc.getSObjectField();
    acct.addError(nameField, 'error is name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldName, errorMsg, escape) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg, Boolean escape) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: voidSObject Class Contains methods for the sObject data type. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage SObject methods are all instance methods: they are called by and operate on an sObject instance such as an account or contact. The following are the instance methods for sObjects. For more information on sObjects, see [Working with sObjects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_SObjects.htm). SObject Methods The following are methods for SObject. All are instance methods.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_2)**  
Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(exceptionError)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_3)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(exceptionError, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_4)**  
Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError)**  
Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError_2)**  
Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring.
                                * **[addError(fieldName, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1537693639)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_332940202)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[addError(fieldName, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_225848019)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1531323614)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[clear()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clear)**  
Clears all field values
                                * **[clone(preserveId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clone)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_382779921)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_577484397)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_580956910)**  
Creates a copy of the SObject record. 
                                * **[get(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get)**  
Returns the value for the field specified by fieldName, such as AccountNumber. 
                                * **[get(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber.
                                * **[getCloneSourceId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getCloneSourceId)**  
Returns the ID of the entity from which an object was cloned. You can use it for objects cloned through the Salesforce user interface. You can also use it for objects created using the System.SObject.clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) method, provided that the preserveId parameter wasn’t used or was set to false. The getCloneSourceId() method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[getErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getErrors)**  
Returns a list of Database.Error objects for an SObject instance. If the SObject has no errors, an empty list is returned.
                                * **[getOptions()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getOptions)**  
Returns the database.DMLOptions object for the SObject. 
                                * **[getPopulatedFieldsAsMap()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getPopulatedFieldsAsMap)**  
Returns a map of populated field names and their corresponding values. The map contains only the fields that have been populated in memory for the SObject instance.
                                * **[getSObject(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject)**  
Returns the value for the specified field. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObject(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.MyObj.MyExternalId. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects)**  
Returns the values for the specified field. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects_2)**  
Returns the value for the field specified by the field token Schema.fieldName, such as, Schema.Account.Contact. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjectType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjectType)**  
Returns the token for this SObject. This method is primarily used with describe information.
                                * **[getQuickActionName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getQuickActionName)**  
Retrieves the name of a quick action associated with this SObject. Typically used in triggers.
                                * **[hasErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_hasErrors)**  
Returns true if an SObject instance has associated errors. The error message can be associated to the SObject instance by using SObject.addError(), validation rules, or by other means.
                                * **[isClone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isClone)**  
Returns true if an entity is cloned from something, even if the entity hasn’t been saved. The method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[isSet(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[isSet(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet_2)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[put(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put)**  
Sets the value for the specified field and returns the previous value for the field.
                                * **[put(field, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put_2)**  
Sets the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber and returns the previous value for the field.
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject)**  
Sets the value for the specified field. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject_2)**  
Sets the value for the field specified by the token Schema.SObjectType. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[recalculateFormulas()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_recalculateFormulas)**  
**Deprecated as of API version 57.0. Use the recalculateFormulas() method in the System.Formula class instead.**
                                * **[setOptions(DMLOptions)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_setOptions)**  
Sets the DMLOptions object for the SObject.
addError(errorMsg) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String fieldName, String errorMsg) instead.
Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field', false);
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg, escape) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg, Boolean escape) Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(Schema.SObjectField fieldToken, String errorMsg) instead.
Example
[code] // Add an error to a field of an SObject instance using the addError() method. 
    Account acct = new Account(name = 'TestAccount');
    Schema.DescribeFieldResult nameDesc = Account.name.getDescribe();
    Schema.sObjectField nameField = nameDesc.getSObjectField();
    acct.addError(nameField, 'error is name field', false);
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

clear() Clears all field values Signature public Void clear() Return Value Type: Void Example
[code] Account acc = new account(Name = 'Acme');
    acc.clear();
    Account expected = new Account();
    system.assertEquals(expected, acc);
[/code]

clone(preserveId) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone, preserveReadonlyTimestamps) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone, Boolean preserveReadonlyTimestamps) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is  Example
[code] Trigger.new[0].addError('bad');
[/code]

addError(errorMsg, escape) Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String errorMsg) instead. Example
[code] Trigger.new[0].addError('Fix & resubmit', false);
[/code]

addError(exceptionError) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Example
[code] public class MyException extends Exception {}
    Trigger.new[0].addError(new myException('Invalid Id'));
[/code]

addError(exceptionError, escape) Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError, Boolean escape) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(Exception e) instead. Example
[code] public class MyException extends Exception {}
    Trigger.new[0].addError(new myException('Invalid Id & other issues', false));
[/code]

addError(errorMsg) Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void Usage Note:
                                * When used on Trigger.new in before insert and before update triggers, and on Trigger.old in before delete triggers, the error appears in the application interface.
                                * When used in Visualforce controllers, if there is an inputField component bound to field, the message is attached to the component. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std_validation_rules.htm "HTML \(New Window\)") in the Visualforce Developer's Guide.
                                * This method is highly specialized because the field identifier is not actually the invoking object—the sObject record is the invoker. The field is simply used to identify the field that should be used to display the error. 
See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, < Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field', false);
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg, escape) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg, Boolean escape) Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(Schema.SObjectField fieldToken, String errorMsg) instead.
Example
[code] // Add an error to a field of an SObject instance using the addError() method. 
    Account acct = new Account(name = 'TestAccount');
    Schema.DescribeFieldResult nameDesc = Account.name.getDescribe();
    Schema.sObjectField nameField = nameDesc.getSObjectField();
    acct.addError(nameField, 'error is name field', false);
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

clear() Clears all field values Signature public Void clear() Return Value Type: Void Example
[code] Account acc = new account(Name = 'Acme');
    acc.clear();
    Account expected = new Account();
    system.assertEquals(expected, acc);
[/code]

clone(preserveId) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone, preserveReadonlyTimestamps) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone, Boolean preserveReadonlyTimestamps) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
preserveReadonlyTimestamps
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the read-only timestamp fields are preserved or cleared in the duplicate. If set to true, the read-only fields CreatedById, CreatedDate, LastModifiedById, and LastModifiedDate are copied to the duplicate. The default is false, that is, the values are cleared. Note Audit field values won’t be persisted to the database via DML on the cloned SObject instance.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone, Boolean preserveReadonlyTimestamps, Boolean preserveAutonumber) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
preserveReadonlyTimestamps
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the read-only timestamp fields are preserved or cleared in the duplicate. If set to true, the read-only fields CreatedById, CreatedDate, LastModifiedById, and LastModifiedDate are copied to the duplicate. The default is false, that is, the values are cleared. Note Audit field values won’t be persisted to the database via DML on the cloned SObject instance.
preserveAutonumber
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether auto number fields of the original object are preserved or cleared in the duplicate. If set to true, auto number fields are copied to the cloned object. The default is false, that is, auto number fields are cleared.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    Account clonedAcc = acc.clone(false, false, false, false);
    System.assertEquals(acc, clonedAcc);
[/code]

get(fieldName) Returns the value for the field specified by fieldName, such as AccountNumber.  Signature public Object get(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Object Usage For more information, see [Dynamic SOQL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_soql.htm). Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    String description = (String)acc.get('Description');
    System.assertEquals('Acme Account', description);
[/code]

Versioned Behavior Changes In API version 34.0 and later, you must include the namespace name to retrieve a field from a field Map using this method. For example, to get the account__c field in the MyNamespace namespace from a fields field Map, use: fields.get(‘MyNamespace__account__c’). get(field) Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber. Signature public Object get(Schema.sObjectField field) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: Object Usage For more information, see [Dynamic SOQL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_soql.htm). Note Field tokens aren't available for person accounts. If you access Schema.Account.fieldname, you get an exception error. Instead, specify the field name as a string. Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    String description = (String)acc.get(Schema.Account.Description);
    System.assertEquals('Acme Account', description);
[/code]

getCloneSourceId() Returns the ID of the entity from which an object was cloned. You can use it for objects cloned through the Salesforce user interface. You can also use it for objects created using the System.SObject.clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) method, provided that the preserveId parameter wasn’t used or was set to false. The getCloneSourceId() method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions. Signature public Id getCloneSourceId() Return Value Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.") Usage If A is cloned to B, B is cloned to C, and C is cloned to D, then B, C, and D all point back to A as their clone source. Example
[code] Account acc0 = new Account(Name = 'Acme');
    insert acc0;
    Account acc1 = acc0.clone();
    Account acc2 = acc1.clone();
    Account acc3 = acc2.clone();
    Account acc4 = acc3.clone();
    System.assert(acc0.Id != null);
    System.assertEquals(acc0.Id, acc1.getCloneSourceId());
    System.assertEquals(acc0.Id, acc2.getCloneSourceId());
    System.assertEquals(acc0.Id, acc3.getCloneSourceId());
    System.assertEquals(acc0.Id, acc4.getCloneSourceId());
    System.assertEquals(null, acc0.getCloneSourceId());
[/code]

getErrors() Returns a list of Database.Error objects for an SObject instance. If the SObject has no errors, an empty list is returned. Signature public List<Database.Error> getErrors() Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Database.Error](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_error.htm#apex_methods_system_database_error "Represents information about an error that occurred during a DML operation when using a Database method.")> getOptions() Returns the database.DMLOptions object for the SObject.  Signature public Database.DMLOptions getOptions() Return Value Type: [Database.DMLOptions](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_dmloptions.htm#apex_methods_system_database_dmloptions "Enables you to set options related to DML operations.") Example
[code] Database.DMLOptions dmo = new Database.dmlOptions();
    dmo.assignmentRuleHeader.useDefaultRule = true;
    
    Account acc = new Account(Name = 'Acme');
    acc.setOptions(dmo);
    Database.DMLOptions accDmo = acc.getOptions();
[/code]

false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
preserveReadonlyTimestamps
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the read-only timestamp fields are preserved or cleared in the duplicate. If set to true, the read-only fields CreatedById, CreatedDate, LastModifiedById, and LastModifiedDate are copied to the duplicate. The default is false, that is, the values are cleared. Note Audit field values won’t be persisted to the database via DML on the cloned SObject instance.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone, Boolean preserveReadonlyTimestamps, Boolean preserveAutonumber) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
preserveReadonlyTimestamps
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the read-only timestamp fields are preserved or cleared in the duplicate. If set to true, the read-only fields CreatedById, CreatedDate, LastModifiedById, and LastModifiedDate are copied to the duplicate. The default is false, that is, the values are cleared. Note Audit field values won’t be persisted to the database via DML on the cloned SObject instance.
preserveAutonumber
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether auto number fields of the original object are preserved or cleared in the duplicate. If set to true, auto number fields are copied to the cloned object. The default is false, that is, auto number fields are cleared.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    Account clonedAcc = acc.clone(false, false, false, false);
    System.assertEquals(acc, clonedAcc);
[/code]

get(fieldName) Returns the value for the field specified by fieldName, such as AccountNumber.  Signature public Object get(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Object Usage For more information, see [Dynamic SOQL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_soql.htm). Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    String description = (String)acc.get('Description');
    System.assertEquals('Acme Account', description);
[/code]

Versioned Behavior Changes In API version 34.0 and later, you must include the namespace name to retrieve a field from a field Map using this method. For example, to get the account__c field in the MyNamespace namespace from a fields field Map, use: fields.get(‘MyNamespace__account__c’). get(field) Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber. Signature public Object get(Schema.sObjectField field) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: Object Usage For more information, see [Dynamic SOQL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_soql.htm). Note Field tokens aren't available for person accounts. If you access Schema.Account.fieldname, you get an exception error. Instead, specify the field name as a string. Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    String description = (String)acc.get(Schema.Account.Description);
    System.assertEquals('Acme Account', description);
[/code]

getCloneSourceId() Returns the ID of the entity from which an object was cloned. You can use it for objects cloned through the Salesforce user interface. You can also use it for objects created using the System.SObject.clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) method, provided that the preserveId parameter wasn’t used or was set to false. The getCloneSourceId() method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions. Signature public Id getCloneSourceId() Return Value Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.") Usage If A is cloned to B, B is cloned to C, and C is cloned to D, then B, C, and D all point back to A as their clone source. Example, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Example
[code] Trigger.new[0].myField__c.addError('bad');
[/code]

addError(errorMsg, escape) Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type:  Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call _field_.addError(String errorMsg) instead. Example
[code] Trigger.new[0].myField__c.addError('Fix & resubmit', false);
[/code]

addError(fieldName, errorMsg) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to a field of an SObject instance using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    Schema.DescribeFieldResult nameDesc = Account.name.getDescribe();
    Schema.sObjectField nameField = nameDesc.getSObjectField();
    acct.addError(nameField, 'error is name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldName, errorMsg, escape) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg, Boolean escape) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: void Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String fieldName, String errorMsg) instead.
Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field', false);
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg, escape) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg, Boolean escape) Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(Schema.SObjectField fieldToken, String errorMsg) instead.
Example
[code] // Add an error to a field of an SObject instance using the addError() method. 
    Account acct = new Account(name = 'TestAccount');
    Schema.DescribeFieldResult nameDesc = Account.name.getDescribe();
    Schema.sObjectField nameField = nameDesc.getSObjectField();
    acct.addError(nameField, 'error is name field', false);
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

clear() Clears all field values Signature public Void clear() Return Value Type: Void Example
[code] Account acc = new account(Name = 'Acme');
    acc.clear();
    Account expected = new Account();
    system.assertEquals(expected, acc);
[/code]

clone(preserveId) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone, preserveReadonlyTimestamps) Creates a copy of the SObject record.  Signature public SObject clone(Boolean preserveId, Boolean isDeepClone, Boolean preserveReadonlyTimestamps) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
preserveReadonlyTimestamps
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the read-only timestamp fields are preserved or cleared in the duplicate. If set to true, the read-only fields CreatedById, CreatedDate, LastModifiedById, and LastModifiedDate are copied to the duplicate. The default is false, that is, the values are cleared. Note Audit field values won’t be persisted to the database via DML on the cloned SObject instance.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) Creates a copy of the SObject record.  Signature public SObject clone(BooleanSObject Class Contains methods for the sObject data type. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage SObject methods are all instance methods: they are called by and operate on an sObject instance such as an account or contact. The following are the instance methods for sObjects. For more information on sObjects, see [Working with sObjects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_SObjects.htm). SObject Methods The following are methods for SObject. All are instance methods.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_2)**  
Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(exceptionError)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_3)**  
Marks a trigger record with a custom error message and prevents any DML operation from occurring.
                                * **[addError(exceptionError, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_addError_4)**  
Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring.
                                * **[addError(errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError)**  
Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring.
                                * **[addError(errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_field_addError_2)**  
Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring.
                                * **[addError(fieldName, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1537693639)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_332940202)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[addError(fieldName, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_225848019)**  
Dynamically add errors to fields of an SObject associated with the specified field name.
                                * **[addError(fieldToken, errorMsg, escape)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_1531323614)**  
Dynamically add errors to an SObject instance associated with the specified field.
                                * **[clear()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clear)**  
Clears all field values
                                * **[clone(preserveId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_clone)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_382779921)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_577484397)**  
Creates a copy of the SObject record. 
                                * **[clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#unique_580956910)**  
Creates a copy of the SObject record. 
                                * **[get(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get)**  
Returns the value for the field specified by fieldName, such as AccountNumber. 
                                * **[get(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_get_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber.
                                * **[getCloneSourceId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getCloneSourceId)**  
Returns the ID of the entity from which an object was cloned. You can use it for objects cloned through the Salesforce user interface. You can also use it for objects created using the System.SObject.clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) method, provided that the preserveId parameter wasn’t used or was set to false. The getCloneSourceId() method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[getErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getErrors)**  
Returns a list of Database.Error objects for an SObject instance. If the SObject has no errors, an empty list is returned.
                                * **[getOptions()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getOptions)**  
Returns the database.DMLOptions object for the SObject. 
                                * **[getPopulatedFieldsAsMap()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getPopulatedFieldsAsMap)**  
Returns a map of populated field names and their corresponding values. The map contains only the fields that have been populated in memory for the SObject instance.
                                * **[getSObject(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject)**  
Returns the value for the specified field. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObject(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObject_2)**  
Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.MyObj.MyExternalId. This method is primarily used with dynamic DML to access values for external IDs.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects)**  
Returns the values for the specified field. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjects(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjects_2)**  
Returns the value for the field specified by the field token Schema.fieldName, such as, Schema.Account.Contact. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships.
                                * **[getSObjectType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getSObjectType)**  
Returns the token for this SObject. This method is primarily used with describe information.
                                * **[getQuickActionName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_getQuickActionName)**  
Retrieves the name of a quick action associated with this SObject. Typically used in triggers.
                                * **[hasErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_hasErrors)**  
Returns true if an SObject instance has associated errors. The error message can be associated to the SObject instance by using SObject.addError(), validation rules, or by other means.
                                * **[isClone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isClone)**  
Returns true if an entity is cloned from something, even if the entity hasn’t been saved. The method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions.
                                * **[isSet(fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[isSet(field)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_isSet_2)**  
Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown.
                                * **[put(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put)**  
Sets the value for the specified field and returns the previous value for the field.
                                * **[put(field, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_put_2)**  
Sets the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber and returns the previous value for the field.
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject)**  
Sets the value for the specified field. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[putSObject(fieldName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_putSObject_2)**  
Sets the value for the field specified by the token Schema.SObjectType. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field. 
                                * **[recalculateFormulas()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_recalculateFormulas)**  
**Deprecated as of API version 57.0. Use the recalculateFormulas() method in the System.Formula class instead.**
                                * **[setOptions(DMLOptions)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_System_SObject_setOptions)**  
Sets the DMLOptions object for the SObject.
addError(errorMsg) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >
[code] Account acc0 = new Account(Name = 'Acme');
    insert acc0;
    Account acc1 = acc0.clone();
    Account acc2 = acc1.clone();
    Account acc3 = acc2.clone();
    Account acc4 = acc3.clone();
    System.assert(acc0.Id != null);
    System.assertEquals(acc0.Id, acc1.getCloneSourceId());
    System.assertEquals(acc0.Id, acc2.getCloneSourceId());
    System.assertEquals(acc0.Id, acc3.getCloneSourceId());
    System.assertEquals(acc0.Id, acc4.getCloneSourceId());
    System.assertEquals(null, acc0.getCloneSourceId());
[/code]

getErrors() Returns a list of Database.Error objects for an SObject instance. If the SObject has no errors, an empty list is returned. Signature public List<Database.Error> getErrors() Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Database.Error](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_error.htm#apex_methods_system_database_error "Represents information about an error that occurred during a DML operation when using a Database method.")> getOptions() Returns the database.DMLOptions object for the SObject.  Signature public Database.DMLOptions getOptions() Return Value Type: [Database.DMLOptions](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_dmloptions.htm#apex_methods_system_database_dmloptions "Enables you to set options related to DML operations.") Example
[code] Database.DMLOptions dmo = new Database.dmlOptions();
    dmo.assignmentRuleHeader.useDefaultRule = true;
    
    Account acc = new Account(Name = 'Acme');
    acc.setOptions(dmo);
    Database.DMLOptions accDmo = acc.getOptions();
[/code]

getPopulatedFieldsAsMap() Returns a map of populated field names and their corresponding values. The map contains only the fields that have been populated in memory for the SObject instance. Signature public Map<String,Object> getPopulatedFieldsAsMap() Return Value Type: Map<String,Object> A map of field names and their corresponding values. Usage The returned map contains only the fields that have been populated in memory for the SObject instance, which makes it easy to iterate over those fields. A field is populated in memory in the following cases. 
                                * The field has been queried by a SOQL statement.
                                * The field has been explicitly set before the call to the getPopulatedFieldsAsMap() method.
Fields on related objects that are queried or set are also returned in the map. The following example iterates over the map returned by the getPopulatedFieldsAsMap() method after a SOQL query.
[code] Account a = new Account();
    a.name = 'TestMapAccount1';
    insert a;
    a = [select Id,Name from Account where id=:a.Id];
    Map<String, Object> fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()){
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Id, value is 001R0000003EPPkIAO
    // DEBUG|field name is Name, value is TestMapAccount1
    
[/code]

This example iterates over the map returned by the getPopulatedFieldsAsMap() method after fields on the SObject are explicitly set.
[code] Account a = new Account();
    a.name = 'TestMapAccount2';
    a.phone = '123-4567';
    insert a;
    Map<String, Object> fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()) {
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Name, value is TestMapAccount2
    // DEBUG|field name is Phone, value is 123-4567
    // DEBUG|field name is Id, value is 001R0000003EPPpIAO
[/code]

The following example shows how to use the getPopulatedFieldsAsMap() method with related objects.
[code] Account a = new Account();
    a.name='TestMapAccount3';
    insert a;
    Contact c = new Contact();
    c.firstname='TestContactFirstName';
    c.lastName ='TestContactLastName';
    c.accountid = a.id;
    insert c;
    
    c = [SELECT id, Contact.Firstname, Contact.Account.Name FROM Contact 
            where id=:c.id limit 1];
    Map<String, Object> fieldsToValue = c.getPopulatedFieldsAsMap();
    
    // To get the fields on Account, get the Account object 
    // and call getMapPopulatedFieldsAsMap() on that object.
    
    a = (Account)fieldsToValue.get('Account');
    fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()) {
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Id, value is 001R0000003EPPuIAO
    // DEBUG|field name is Name, value is TestMapAccount3
[/code]

Versioned Behavior Changes In API version 39.0 and later, getPopulatedFieldsAsMap returns all values set on the SObject, even if values were set after the record was queried. This behavior is dependent on the version of the apex class calling this method and not on the version of the class that generated the SObject. If you query an SObject at API version 20.0, and then call this method in a class with API version 40.0, you will get the full set of fields. getSObject(fieldName) Returns the value for the specified field. This method is primarily used with dynamic DML to access values for external IDs. Signature public SObject getSObject(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: SObject Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    insert acc;
    Contact con = new Contact(Lastname = 'AcmeCon', AccountId = acc.id);
    insert con;
    
    SObject contactDB = 
        [SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.getSObject('Account');
    System.assertEquals('Acme', a.name);
[/code]

getSObject(field) Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.MyObj.MyExternalId. This method is primarily used with dynamic DML to access values for external IDs. Signature public SObject getSObject(Schema.SObjectField field) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: SObject Usage If the method references polymorphic fields, a [Name object](https://developer.salesforce.com/docs/atlas.en-us.258.0.object_reference.meta/object_reference/sforce_api_objects_name.htm) is returned. Use the TYPEOF clause in the SOQL SELECT statement to directly get results that depend on the runtime object type referenced by the polymorphic field. See [Working with Polymorphic Relationships in SOQL Queries](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_SOQL_polymorphic_relationships.htm). Example
[code] Account acc = new account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    
    Schema.DescribeFieldResult fieldResult = Contact.AccountId.getDescribe();
    Schema.SObjectField field = fieldResult.getSObjectField();
    
    SObject contactDB = 
        [SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.getSObject(field);
    System.assertEquals('Acme', a.name);
[/code]

getSObjects(fieldName) Returns the values for the specified field. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships. Signature public SObject[] getSObjects(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: SObject[] Usage For more information, see [Dynamic DML](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_dml.htm). Example
[code] Account acc = new account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    
    SObject[] a = [SELECT id, (SELECT Name FROM Contacts LIMIT 1) FROM Account WHERE id = :acc.id];
    SObject[] contactsDB = a.get(0).getSObjects('Contacts');
    String fieldValue = (String)contactsDB.get(0).get('Name');
    System.assertEquals('AcmeCon', fieldValue);
[/code]

getSObjects(fieldName) Returns the value for the field specified by the field token Schema.fieldName, such as, Schema.Account.Contact. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships. Signature public SObject[] getSObjects(Schema.SObjectType fieldName) Parameters

fieldName
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
Return Value Type: SObject[] getSObjectType() Returns the token for this SObject. This method is primarily used with describe information. Signature , &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Example
[code] Trigger.new[0].addError('bad');
[/code]

addError(errorMsg, escape) Marks a trigger record with a custom error message, specifies if the error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String errorMsg) instead. Example
[code] Trigger.new[0].addError('Fix & resubmit', false);
[/code]

addError(exceptionError) Marks a trigger record with a custom error message and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
Return Value Type: Void Usage When used on Trigger.new in insert and update triggers, and on Trigger.old in delete triggers, the error message is displayed in the application interface.  See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. When used in Visualforce controllers, the generated message is added to the collection of errors for the page. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm "HTML \(New Window\)") in the Visualforce Developer's Guide. Example
[code] public class MyException extends Exception {}
    Trigger.new[0].addError(new myException('Invalid Id'));
[/code]

addError(exceptionError, escape) Marks a trigger record with a custom exception error message, specifies whether or not the exception error message should be escaped, and prevents any DML operation from occurring. Signature public Void addError(Exception exceptionError, Boolean escape) Parameters

exceptionError
    Type: [System.Exception](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods.")
     An Exception object or a custom exception object that contains the error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: Void Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(Exception e) instead. Example
[code] public class MyException extends Exception {}
    Trigger.new[0].addError(new myException('Invalid Id & other issues', false));
[/code]

addError(errorMsg) Places the specified error message on a trigger record field in the Salesforce user interface and prevents any DML operation from occurring. Signature public Void addError(String errorMsg) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void Usage Note:
                                * When used on Trigger.new in before insert and before update triggers, and on Trigger.old in before delete triggers, the error appears in the application interface.
                                * When used in Visualforce controllers, if there is an inputField component bound to field, the message is attached to the component. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std_validation_rules.htm "HTML \(New Window\)") in the Visualforce Developer's Guide.
                                * This method is highly specialized because the field identifier is not actually the invoking object—the sObject record is the invoker. The field is simply used to identify the field that should be used to display the error. 
See [Triggers](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers.htm) and [Trigger Exceptions](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_triggers_exceptions.htm). getPopulatedFieldsAsMap() Returns a map of populated field names and their corresponding values. The map contains only the fields that have been populated in memory for the SObject instance. Signature public Map<String,Object> getPopulatedFieldsAsMap() Return Value Type: Map<String,Object> A map of field names and their corresponding values. Usage The returned map contains only the fields that have been populated in memory for the SObject instance, which makes it easy to iterate over those fields. A field is populated in memory in the following cases. 
                                * The field has been queried by a SOQL statement.
                                * The field has been explicitly set before the call to the getPopulatedFieldsAsMap() method.
Fields on related objects that are queried or set are also returned in the map. The following example iterates over the map returned by the getPopulatedFieldsAsMap() method after a SOQL query.
[code] Account a = new Account();
    a.name = 'TestMapAccount1';
    insert a;
    a = [select Id,Name from Account where id=:a.Id];
    Map<String, Object> fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()){
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Id, value is 001R0000003EPPkIAO
    // DEBUG|field name is Name, value is TestMapAccount1
    
[/code]

This example iterates over the map returned by the getPopulatedFieldsAsMap() method after fields on the SObject are explicitly set.
[code] Account a = new Account();
    a.name = 'TestMapAccount2';
    a.phone = '123-4567';
    insert a;
    Map<String, Object> fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()) {
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Name, value is TestMapAccount2
    // DEBUG|field name is Phone, value is 123-4567
    // DEBUG|field name is Id, value is 001R0000003EPPpIAO
[/code]

The following example shows how to use the getPopulatedFieldsAsMap() method with related objects.
[code] Account a = new Account();
    a.name='TestMapAccount3';
    insert a;
    Contact c = new Contact();
    c.firstname='TestContactFirstName';
    c.lastName ='TestContactLastName';
    c.accountid = a.id;
    insert c;
    
    c = [SELECT id, Contact.Firstname, Contact.Account.Name FROM Contact 
            where id=:c.id limit 1];
    Map<String, Object> fieldsToValue = c.getPopulatedFieldsAsMap();
    
    // To get the fields on Account, get the Account object 
    // and call getMapPopulatedFieldsAsMap() on that object.
    
    a = (Account)fieldsToValue.get('Account');
    fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()) {
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Id, value is 001R0000003EPPuIAO
    // DEBUG|field name is Name, value is TestMapAccount3
[/code]

Versioned Behavior Changes In API version 39.0 and later, getPopulatedFieldsAsMap returns all values set on the SObject, even if values were set after the record was queried. This behavior is dependent on the version of the apex class calling this method and not on the version of the class that generated the SObject. If you query an SObject at API version 20.0, and then call this method in a class with API version 40.0, you will get the full set of fields. getSObject(fieldName) Returns the value for the specified field. This method is primarily used with dynamic DML to access values for external IDs. Signature public SObject getSObject(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: SObject Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    insert acc;
    Contact con = new Contact(Lastname = 'AcmeCon', AccountId = acc.id);
    insert con;
    
    SObject contactDB = 
        [SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.getSObject('Account');
    System.assertEquals('Acme', a.name);
[/code]

getSObject(field) Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.MyObj.MyExternalId. This method is primarily used with dynamic DML to access values for external IDs. Signature public SObject getSObject(Schema.SObjectField field) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: SObject Usage If the method references polymorphic fields, a [Name object](https://developer.salesforce.com/docs/atlas.en-us.258.0.object_reference.meta/object_reference/sforce_api_objects_name.htm) is returned. Use the TYPEOF clause in the SOQL SELECT statement to directly get results that depend on the runtime object type referenced by the polymorphic field. See [Working with Polymorphic Relationships in SOQL Queries](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_SOQL_polymorphic_relationships.htm). Example
[code] Account acc = new account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    
    Schema.DescribeFieldResult fieldResult = Contact.AccountId.getDescribe();
    Schema.SObjectField field = fieldResult.getSObjectField();
    
    SObject contactDB = 
        [SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.getSObject(field);
    System.assertEquals('Acme', a.name);
[/code]

getSObjects(fieldName) Returns the values for the specified field. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships. Signature public SObject[] getSObjects(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: SObject[] Usage For more information, see [Dynamic DML](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_dml.htm). Example
[code] Account acc = new account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    
    SObject[] a = [SELECT id, (SELECT Name FROM Contacts LIMIT 1) FROM Account WHERE id = :acc.id];
    SObject[] contactsDB = a.get(0).getSObjects('Contacts');
    String fieldValue = (String)contactsDB.get(0).get('Name');
    System.assertEquals('AcmeCon', fieldValue);
[/code]

getSObjects(fieldName) Returns the value for the field specified by the field token Schema.fieldName, such as, Schema.Account.Contact. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships. Signature public SObject[] getSObjects(Schema.SObjectType fieldName) Parameters

fieldName
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
Return Value Type: SObject[] getSObjectType() Returns the token for this SObject. This method is primarily used with describe information. Signature public Schema.SObjectType getSObjectType() Return Value Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.") Usage For more information, see apex_dynamic_describe_objects_understanding. Example
[code] Account acc = new Account(name = 'Acme', description = 'Acme Account');
    Schema.SObjectType expected = Schema.Account.getSObjectType();
    System.assertEquals(expected, acc.getSObjectType());
[/code]

getQuickActionName() Retrieves the name of a quick action associated with this SObject. Typically used in triggers. Signature public String getQuickActionName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] trigger accTrig2 on Contact (before insert) {
        for (Contact c : Trigger.new) {
            if (c.getQuickActionName() == QuickAction.CreateContact) {
                c.WhereFrom__c = 'GlobaActionl';
            } else if (c.getQuickActionName() == Schema.Account.QuickAction.CreateContact) {
                c.WhereFrom__c = 'AccountAction';
            } else if (c.getQuickActionName() == null) {
                c.WhereFrom__c = 'NoAction';
            } else {
                System.assert(false);
            }
        }
    }
    
[/code]

hasErrors() Returns true if an SObject instance has associated errors. The error message can be associated to the SObject instance by using SObject.addError(), validation rules, or by other means. preserveId, Boolean isDeepClone, Boolean preserveReadonlyTimestamps, Boolean preserveAutonumber) Parameters

preserveId
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the ID of the original object is preserved or cleared in the duplicate. If set to true, the ID is copied to the duplicate. The default is false, that is, the ID is cleared.
isDeepClone
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the method creates a full copy of the SObject field or just a reference:
                                * If set to true, the method creates a full copy of the SObject. All fields on the SObject are duplicated in memory, including relationship fields. Consequently, if you change a field on the cloned SObject, the original SObject isn’t affected.
                                * If set to false, the method performs a shallow copy of the SObject fields. All copied relationship fields reference the original SObjects. Consequently, if you change a relationship field on the cloned SObject, the corresponding field on the original SObject is also affected, and vice versa. The default is false.
preserveReadonlyTimestamps
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether the read-only timestamp fields are preserved or cleared in the duplicate. If set to true, the read-only fields CreatedById, CreatedDate, LastModifiedById, and LastModifiedDate are copied to the duplicate. The default is false, that is, the values are cleared. Note Audit field values won’t be persisted to the database via DML on the cloned SObject instance.
preserveAutonumber
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Determines whether auto number fields of the original object are preserved or cleared in the duplicate. If set to true, auto number fields are copied to the cloned object. The default is false, that is, auto number fields are cleared.
Return Value Type: SObject (of the same type) Usage Note For Apex saved using Salesforce API version 22.0 or earlier, the default value for the preserveId argument is true, that is, the ID is preserved. Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    Account clonedAcc = acc.clone(false, false, false, false);
    System.assertEquals(acc, clonedAcc);
[/code]

get(fieldName) Returns the value for the field specified by fieldName, such as AccountNumber.  Signature public Object get(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Object Usage For more information, see [Dynamic SOQL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_soql.htm). Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    String description = (String)acc.get('Description');
    System.assertEquals('Acme Account', description);
[/code]

Versioned Behavior Changes In API version 34.0 and later, you must include the namespace name to retrieve a field from a field Map using this method. For example, to get the account__c field in the MyNamespace namespace from a fields field Map, use: fields.get(‘MyNamespace__account__c’). get(field) Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber. Signature public Object get(Schema.sObjectField field) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: Object Usage For more information, see [Dynamic SOQL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_soql.htm). Note Field tokens aren't available for person accounts. If you access Schema.Account.fieldname, you get an exception error. Instead, specify the field name as a string. Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    String description = (String)acc.get(Schema.Account.Description);
    System.assertEquals('Acme Account', description);
[/code]

getCloneSourceId() Returns the ID of the entity from which an object was cloned. You can use it for objects cloned through the Salesforce user interface. You can also use it for objects created using the System.SObject.clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber) method, provided that the preserveId parameter wasn’t used or was set to false. The getCloneSourceId() method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions. Signature public Id getCloneSourceId() Return Value Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.") Usage If A is cloned to B, B is cloned to C, and C is cloned to D, then B, C, and D all point back to A as their clone source. Example
[code] Account acc0 = new Account(Name = 'Acme');
    insert acc0;
    Account acc1 = acc0.clone();
    Account acc2 = acc1.clone();
    Account acc3 = acc2.clone();
    Account acc4 = acc3.clone();
    System.assert(acc0.Id != null);
    System.assertEquals(acc0.Id, acc1.getCloneSourceId());
    System.assertEquals(acc0.Id, acc2.getCloneSourceId());
    System.assertEquals(acc0.Id, acc3.getCloneSourceId());
    System.assertEquals(acc0.Id, acc4.getCloneSourceId());
    System.assertEquals(null, acc0.getCloneSourceId());
[/code]

getErrors() Returns a list of Database.Error objects for an SObject instance. If the SObject has no errors, an empty list is returned. Signature public List<Database.Error> getErrors() Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Database.Error](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_error.htm#apex_methods_system_database_error "Represents information about an error that occurred during a DML operation when using a Database method.")> getOptions() Returns the database.DMLOptions object for the SObject.  Signature public Database.DMLOptions getOptions() Return Value Type: [Database.DMLOptions](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_dmloptions.htm#apex_methods_system_database_dmloptions "Enables you to set options related to DML operations.") Example
[code] Database.DMLOptions dmo = new Database.dmlOptions();
    dmo.assignmentRuleHeader.useDefaultRule = true;
    
    Account acc = new Account(Name = 'Acme');
    acc.setOptions(dmo);
    Database.DMLOptions accDmo = acc.getOptions();
[/code]

getPopulatedFieldsAsMap() Returns a map of populated field names and their corresponding values. The map contains only the fields that have been populated in memory for the SObject instance. Signature public Map<String,Object> getPopulatedFieldsAsMap() Return Value Type: Map<String,Object> A map of field names and their corresponding values. Usage The returned map contains only the fields that have been populated in memory for the SObject instance, which makes it easy to iterate over those fields. A field is populated in memory in the following cases. 
                                * public Schema.SObjectType getSObjectType() Return Value Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.") Usage For more information, see apex_dynamic_describe_objects_understanding. Example
[code] Account acc = new Account(name = 'Acme', description = 'Acme Account');
                                      Schema.SObjectType expected = Schema.Account.getSObjectType();
                                      System.assertEquals(expected, acc.getSObjectType());
[/code]

getQuickActionName() Retrieves the name of a quick action associated with this SObject. Typically used in triggers. Signature public String getQuickActionName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] trigger accTrig2 on Contact (before insert) {
                                          for (Contact c : Trigger.new) {
                                              if (c.getQuickActionName() == QuickAction.CreateContact) {
                                                  c.WhereFrom__c = 'GlobaActionl';
                                              } else if (c.getQuickActionName() == Schema.Account.QuickAction.CreateContact) {
                                                  c.WhereFrom__c = 'AccountAction';
                                              } else if (c.getQuickActionName() == null) {
                                                  c.WhereFrom__c = 'NoAction';
                                              } else {
                                                  System.assert(false);
                                              }
                                          }
                                      }
                                      
[/code]

hasErrors() Returns true if an SObject instance has associated errors. The error message can be associated to the SObject instance by using SObject.addError(), validation rules, or by other means. Signature public Boolean hasErrors() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") isClone() Returns true if an entity is cloned from something, even if the entity hasn’t been saved. The method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions. Signature public Boolean isClone() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Example
[code] Account acc = new Account(Name = 'Acme');
                                      insert acc;
                                      Account acc2 = acc.clone();
                                      // Test before saving
                                      System.assertEquals(true, acc2.isClone());
                                      insert acc2;
                                      // Test after saving
                                      System.assertEquals(true, acc2.isClone());
[/code]

isSet(fieldName) Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown. Signature public Boolean isSet(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage The isSet method doesn’t check if a field is accessible to a specific user via org permissions or other specialized access permissions.  Example
[code] Contact  c = new Contact(LastName = 'Joyce');
                                      System.assertEquals(true, c.isSet('LastName'));
                                      System.assertEquals(false, c.isSet('FirstName')); // FirstName field is not written to
                                      c.firstName = null;
                                      System.assertEquals(true, c.isSet('FirstName')); //FirstName field is written to
                                      
[/code]

isSet(field) Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown. Signature public Boolean isSet(Schema.SObjectField field) Parameters

field
    Type:[SObjectField Class](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage The isSet method doesn’t check if a field is accessible to a specific user via org permissions or other specialized access permissions.  Example
[code] Contact  newContact = new Contact(LastName = 'Joyce');
                                      insert(newContact); //Insert a new contact with last name Joyce
                                      Contact c = [SELECT FirstName FROM Contact WHERE Id = :newContact.Id];
                                      System.assertEquals(true, c.isSet(Contact.FirstName)); //FirstName field in query
                                      System.assertEquals(false, c.isSet(Contact.LastName)); //LastName field not in query
[/code]

put(fieldName, value) Sets the value for the specified field and returns the previous value for the field. Signature public Object put(String fieldName, Object value) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
value
    Type: Object
Return Value Type: Object Example
[code] Account acc = new Account(name = 'test', description = 'old desc');
                                      String oldDesc = (String)acc.put('description', 'new desc');
                                      System.assertEquals('old desc', oldDesc);
                                      System.assertEquals('new desc', acc.description);
[/code]

put(field, value) Sets the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber and returns the previous value for the field. Signature public Object put(Schema.SObjectField field, Object value) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
value
    Type: Object
Return Value Type: Object Example
[code] Account acc = new Account(name = 'test', description = 'old desc');
                                      String oldDesc = (String)acc.put(Schema.Account.Description, 'new desc');
                                      System.assertEquals('old desc', oldDesc);
                                      System.assertEquals('new desc', acc.description);
[/code]

Note Field tokens aren't available for person accounts. If you access Schema.Account.fieldname, you get an exception error. Instead, specify the field name as a string. putSObject(fieldName, value) Sets the value for the specified field. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field.  Signature public SObject putSObject(String fieldName, SObject value) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
value
    Type: SObject
Return Value Type: SObject Example
[code] Account acc = new Account(name = 'Acme', description = 'Acme Account');
                                      insert acc;
                                      Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
                                      insert con;
                                      Account acc2 = new account(name = 'Not Acme');
                                      
                                      Contact contactDB = 
                                          (Contact)[SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
                                      Account a = (Account)contactDB.putSObject('Account', acc2);
                                      System.assertEquals('Acme', a.name);
                                      System.assertEquals('Not Acme', contactDB.Account.name);
[/code]

putSObject(fieldName, value) Sets the value for the field specified by the token Schema.SObjectType. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field.  Signature public SObject putSObject(Schema.SObjectType fieldName, SObject value) Parameters

fieldName
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
value
    Type: SObject
Return Value Type: SObject recalculateFormulas() **Deprecated as of API version 57.0. Use the recalculateFormulas() method in the System.Formula class instead.** Signature public Void recalculateFormulas() Return Value Type: Void Usage This method doesn’t recalculate cross-object formulas. If you call this method on objects that have both cross-object and non-cross-object formula fields, only the non-cross-object formula fields are recalculated. Each recalculateFormulas call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). See Also
                                  * [recalculateFormulas(sobjects)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Formula.htm#apex_System_Formula_recalculateFormulas "Updates \(recalculates\) all formula fields on the input SObjects.")
                                  * [What Is a Cross-Object Formula?](https://help.salesforce.com/HTViewHelpDoc?id=customize_cross_object.htm&language=en_US "What Is a Cross-Object Formula? - HTML \(New Window\)")
setOptions(DMLOptions) Sets the DMLOptions object for the SObject. Signature public Void setOptions(database.DMLOptions DMLOptions) Parameters

DMLOptions
    Type: [Database.DMLOptions](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_dmloptions.htm#apex_methods_system_database_dmloptions "Enables you to set options related to DML operations.")
Return Value Type: Void Example
[code] Database.DMLOptions dmo = new Database.dmlOptions();
    dmo.assignmentRuleHeader.useDefaultRule = true;
    
    Account acc = new Account(Name = 'Acme');
    acc.setOptions(dmo);
[/code]

Test Class Contains methods related to Apex tests. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Test Methods The following are methods for Test. All methods are static.
                                  * **[calculatePermissionSetGroup(psgIds)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_calculatePermissionSetGroup)**  
Calculates aggregate permissions in specified permission set groups for testing.
                                  * **[calculatePermissionSetGroup(psgId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_calculatePermissionSetGroup_2)**  
Calculates aggregate permissions in a specified permission set group for testing.
                                  * **[clearApexPageMessages()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_clearApexPageMessages)**  
Clear the messages on a Visualforce page while executing Apex test methods.
                                  * **[createSoqlStub(targetType, soqlStub)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createSoqlStub)**  
Creates a stub that will respond to SOQL queries against the specified SObject type you can use during testing.
                                  * **[createStub(parentType, stubProvider)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStub)**  
Creates a stubbed version of an Apex class that you can use for testing. This method is part of the Apex stub API. You can use it with the System.StubProvider interface to create a mocking framework.
                                  * **[createStubQueryRow(targetType, fieldMapWithRelationshipKeys)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStubQueryRow)**  
Creates an instance of a stubbed SObject type that you can use to provide testing results in the extended System.SoqlStubProvider class.
                                  * **[createStubQueryRows(targetType, fieldMapWithRelationshipKeysForMultipleRows)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStubQueryRows)**  
Creates instances of stubbed SObject types that you can use to provide testing results in the extended System.SoqlStubProvider class.
                                  * **[enableChangeDataCapture()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_enableChangeDataCapture)**  
Use this method in an Apex test so that change event notifications are generated for all supported Change Data Capture entities. Call this method at the beginning of your test before performing DML operations and calling Test.getEventBus().deliver();.
                                  * **[enqueueBatchJobs(numberOfJobs)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_enqueueBatchJobs)**  
Adds the specified number of jobs with no-operation contents to the test-context queue. It first fills the test batch queue, up to the maximum 5 jobs, and then places jobs in the test flex queue. It throws a limit exception when the number of jobs in the test flex queue exceeds the allowed limit of 100 jobs.
                                  * **[getEventBus()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getEventBus)**  
Returns an instance of the test event bus broker, which lets you operate on platform event or change event messages in an Apex test. For example, you can call Test.getEventBus().deliver() to deliver event messages.
                                  * **[getFlexQueueOrder()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getFlexQueueOrder)**  
Returns an ordered list of job IDs for jobs in the test-context flex queue. The job at index 0 is the next job slated to run. This method returns only test-context results, even if it’s annotated with @IsTest(SeeAllData=true).
                                  * **[getStandardPricebookId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getStandardPricebookId)**  
Returns the ID of the standard price book in the organization.
                                  * **[invokeContinuationMethod(controller, request)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_invokeContinuationMethod)**  
Invokes the callback method for the specified controller and continuation in a test method.
                                  * **[isRunningTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_isRunningTest)**  
Returns true if the currently executing code was called by code contained in a test method, false otherwise. Use this method if you need to run different code depending on whether it was being called from a test.
                                  * **[isSoqlStubDefined(targetType)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_isSoqlStubDefined)**  
Returns true if a SOQL stub is defined for an SObject type; otherwise returns false.
                                  * **[loadData(sObjectToken, resourceName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_loadData)**  
Inserts test records from the specified static resource .csv file and for the specified sObject type, and returns a list of the inserted sObjects.
                                  * **[newSendEmailQuickActionDefaults(contextId, replyToId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_newSendEmailQuickActionDefaults)**  
Creates a new QuickAction.SendEmailQuickActionDefaults instance for testing a class implementing the QuickAction.QuickActionDefaultsHandler interface.
                                  * **[setContinuationResponse(requestLabel, mockResponse)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setContinuationResponse)**  
Sets a mock response for a continuation HTTP request in a test method.
                                  * **[setCreatedDate(recordId, createdDatetime)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCreatedDate)**  
Sets CreatedDate for a test-context sObject.
                                  * **[setCurrentPage(page)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCurrentPage)**  
A Visualforce test method that sets the current PageReference for the controller.
                                  * **[setCurrentPageReference(page)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCurrentPageReference)**  
A Visualforce test method that sets the current PageReference for the controller.
                                  * **[setFixedSearchResults(fixedSearchResults)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setFixedSearchResults)**  
Defines a list of fixed search results to be returned by all subsequent SOSL statements in a test method.
                                  * **[setMock(interfaceType, instance)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setMock)**  
Sets the response mock mode and instructs the Apex runtime to send a mock response whenever a callout is made through the HTTP classes or the auto-generated code from WSDLs.
                                  * **[setReadOnlyApplicationMode(applicationMode)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setReadOnlyApplicationMode)**  
Sets the application mode for an organization to read-only in an Apex test to simulate read-only mode during Salesforce upgrades and downtimes. The application mode is reset to the default mode at the end of each Apex test run.
                                  * **[startTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_startTest)**  
Marks the point in your test code when your test actually begins. Use this method when you are testing governor limits.
                                  * **[stopTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_stopTest)**  
Marks the point in your test code when your test ends. Use this method in conjunction with the startTest method.
                                  * **[testInstall(installImplementation, version, isPush)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testInstall)**  
Tests the implementation of the InstallHandler interface, which is used for specifying a post install script in packages. Tests run as the test initiator in the development environment.
                                  * **[testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testSandboxPostCopyScript)**  
Tests the implementation of the SandboxPostCopy Interface, which is used for specifying a script to run at the completion of a Sandbox copy. Tests run as the test initiator in the development environment.
                                  * **[testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName, RunAsAutoProcUser)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testSandboxPostCopyScript_2)**  
Tests the implementation of the SandboxPostCopy Interface, which is used for specifying a script to run at the completion of a Sandbox copy. When RunAsAutoProcUser is true, tests run as Automated Process user in the development environment.
                                  * **[testUninstall(uninstallImplementation)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testUninstall)**  
Tests the implementation of the UninstallHandler interface, which is used for specifying an uninstall script in packages. Tests run as the test initiator in the development environment.
calculatePermissionSetGroup(psgIds) Calculates aggregate permissions in specified permission set groups for testing. Signature public static void calculatePermissionSetGroup(List<String> psgIds) The field has been queried by a SOQL statement.
                                * The field has been explicitly set before the call to the getPopulatedFieldsAsMap() method.
Fields on related objects that are queried or set are also returned in the map. The following example iterates over the map returned by the getPopulatedFieldsAsMap() method after a SOQL query.
[code] Account a = new Account();
    a.name = 'TestMapAccount1';
    insert a;
    a = [select Id,Name from Account where id=:a.Id];
    Map<String, Object> fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()){
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Id, value is 001R0000003EPPkIAO
    // DEBUG|field name is Name, value is TestMapAccount1
    
[/code]

This example iterates over the map returned by the getPopulatedFieldsAsMap() method after fields on the SObject are explicitly set.
[code] Account a = new Account();
    a.name = 'TestMapAccount2';
    a.phone = '123-4567';
    insert a;
    Map<String, Object> fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()) {
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Name, value is TestMapAccount2
    // DEBUG|field name is Phone, value is 123-4567
    // DEBUG|field name is Id, value is 001R0000003EPPpIAO
[/code]

The following example shows how to use the getPopulatedFieldsAsMap() method with related objects.
[code] Account a = new Account();
    a.name='TestMapAccount3';
    insert a;
    Contact c = new Contact();
    c.firstname='TestContactFirstName';
    c.lastName ='TestContactLastName';
    c.accountid = a.id;
    insert c;
    
    c = [SELECT id, Contact.Firstname, Contact.Account.Name FROM Contact 
            where id=:c.id limit 1];
    Map<String, Object> fieldsToValue = c.getPopulatedFieldsAsMap();
    
    // To get the fields on Account, get the Account object 
    // and call getMapPopulatedFieldsAsMap() on that object.
    
    a = (Account)fieldsToValue.get('Account');
    fieldsToValue = a.getPopulatedFieldsAsMap();
    
    for (String fieldName : fieldsToValue.keySet()) {
        System.debug('field name is ' + fieldName + ', value is ' + 
            fieldsToValue.get(fieldName));
    }
    
    // Example debug statement output:
    // DEBUG|field name is Id, value is 001R0000003EPPuIAO
    // DEBUG|field name is Name, value is TestMapAccount3
[/code]

Versioned Behavior Changes In API version 39.0 and later, getPopulatedFieldsAsMap returns all values set on the SObject, even if values were set after the record was queried. This behavior is dependent on the version of the apex class calling this method and not on the version of the class that generated the SObject. If you query an SObject at API version 20.0, and then call this method in a class with API version 40.0, you will get the full set of fields. getSObject(fieldName) Returns the value for the specified field. This method is primarily used with dynamic DML to access values for external IDs. Signature public SObject getSObject(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: SObject Example
[code] Account acc = new account(Name = 'Acme', Description = 'Acme Account');
    insert acc;
    Contact con = new Contact(Lastname = 'AcmeCon', AccountId = acc.id);
    insert con;
    
    SObject contactDB = 
        [SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.getSObject('Account');
    System.assertEquals('Acme', a.name);
[/code]

getSObject(field) Returns the value for the field specified by the field token Schema.sObjectField, such as, Schema.MyObj.MyExternalId. This method is primarily used with dynamic DML to access values for external IDs. Signature public SObject getSObject(Schema.SObjectField field) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: SObject Usage If the method references polymorphic fields, a [Name object](https://developer.salesforce.com/docs/atlas.en-us.258.0.object_reference.meta/object_reference/sforce_api_objects_name.htm) is returned. Use the TYPEOF clause in the SOQL SELECT statement to directly get results that depend on the runtime object type referenced by the polymorphic field. See [Working with Polymorphic Relationships in SOQL Queries](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_SOQL_polymorphic_relationships.htm). Example
[code] Account acc = new account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    
    Schema.DescribeFieldResult fieldResult = Contact.AccountId.getDescribe();
    Schema.SObjectField field = fieldResult.getSObjectField();
    
    SObject contactDB = 
        [SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.getSObject(field);
    System.assertEquals('Acme', a.name);
[/code]

getSObjects(fieldName) Returns the values for the specified field. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships. Signature public SObject[] getSObjects(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: SObject[] Usage For more information, see [Dynamic DML](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_dml.htm). Example
[code] Account acc = new account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    
    SObject[] a = [SELECT id, (SELECT Name FROM Contacts LIMIT 1) FROM Account WHERE id = :acc.id];
    SObject[] contactsDB = a.get(0).getSObjects('Contacts');
    String fieldValue = (String)contactsDB.get(0).get('Name');
    System.assertEquals('AcmeCon', fieldValue);
[/code]

getSObjects(fieldName) Returns the value for the field specified by the field token Schema.fieldName, such as, Schema.Account.Contact. This method is primarily used with dynamic DML to access values for associated objects, such as child relationships. Signature public SObject[] getSObjects(Schema.SObjectType fieldName) Parameters

fieldName
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
Return Value Type: SObject[] getSObjectType() Returns the token for this SObject. This method is primarily used with describe information. Signature public Schema.SObjectType getSObjectType() Return Value Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.") Usage For more information, see apex_dynamic_describe_objects_understanding. Example
[code] Account acc = new Account(name = 'Acme', description = 'Acme Account');
    Schema.SObjectType expected = Schema.Account.getSObjectType();
    System.assertEquals(expected, acc.getSObjectType());
[/code]

getQuickActionName() Retrieves the name of a quick action associated with this SObject. Typically used in triggers. Signature public String getQuickActionName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] trigger accTrig2 on Contact (before insert) {
        for (Contact c : Trigger.new) {
            if (c.getQuickActionName() == QuickAction.CreateContact) {
                c.WhereFrom__c = 'GlobaActionl';
            } else if (c.getQuickActionName() == Schema.Account.QuickAction.CreateContact) {
                c.WhereFrom__c = 'AccountAction';
            } else if (c.getQuickActionName() == null) {
                c.WhereFrom__c = 'NoAction';
            } else {
                System.assert(false);
            }
        }
    }
    
[/code]

hasErrors() Returns true if an SObject instance has associated errors. The error message can be associated to the SObject instance by using SObject.addError(), validation rules, or by other means. Signature public Boolean hasErrors() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") isClone() Returns true if an entity is cloned from something, even if the entity hasn’t been saved. The method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions. Signature public Boolean isClone() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Example
[code] Account acc = new Account(Name = 'Acme');
    insert acc;
    Account acc2 = acc.clone();
    // Test before saving
    System.assertEquals(true, acc2.isClone());
    insert acc2;
    // Test after saving
    System.assertEquals(true, acc2.isClone());
[/code]

isSet(fieldName) Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown. Signature public Boolean isSet(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage The isSet method doesn’t check if a field is accessible to a specific user via org permissions or other specialized access permissions.  Example
[code] Contact  c = new Contact(LastName = 'Joyce');
    System.assertEquals(true, c.isSet('LastName'));
    System.assertEquals(false, c.isSet('FirstName')); // FirstName field is not written to
    c.firstName = null;
    System.assertEquals(true, c.isSet('FirstName')); //FirstName field is written to
    
[/code]

isSet(field) Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown. Signature public Boolean isSet(Schema.SObjectField field) Parameters

field
    Type:[SObjectField Class](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage The isSet method doesn’t check if a field is accessible to a specific user via org permissions or other specialized access permissions.  Example
[code] Contact  newContact = new Contact(LastName = 'Joyce');
    insert(newContact); //Insert a new contact with last name Joyce
    Contact c = [SELECT FirstName FROM Contact WHERE Id = :newContact.Id];
    System.assertEquals(true, c.isSet(Contact.FirstName)); //FirstName field in query
    System.assertEquals(false, c.isSet(Contact.LastName)); //LastName field not in query
[/code]

put(fieldName, value) Sets the value for the specified field and returns the previous value for the field. Signature public Object put(String fieldName, Object value) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
value
    Type: Object
Return Value Type: Object Example
[code] Account acc = new Account(name = 'test', description = 'old desc');
    String oldDesc = (String)acc.put('description', 'new desc');
    System.assertEquals('old desc', oldDesc);
    System.assertEquals('new desc', acc.description);
[/code]

put(field, value) Sets the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber and returns the previous value for the field. Signature public Object put(Schema.SObjectField field, Object value) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
value
    Type: Object
Return Value Type: Object Example
[code] Account acc = new Account(name = 'test', description = 'old desc');
    String oldDesc = (String)acc.put(Schema.Account.Description, 'new desc');
    System.assertEquals('old desc', oldDesc);
    System.assertEquals('new desc', acc.description);
[/code]

Note Field tokens aren't available for person accounts. If you access Schema.Account.fieldname, you get an exception error. Instead, specify the field name as a string. putSObject(fieldName, value) Sets the value for the specified field. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field.  Signature public SObject putSObject(String fieldName, SObject value) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
value
    Type: SObject
Return Value Type: SObject Example
[code] Account acc = new Account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    Account acc2 = new account(name = 'Not Acme');
    
    Contact contactDB = 
        (Contact)[SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.putSObject('Account', acc2);
    System.assertEquals('Acme', a.name);
    System.assertEquals('Not Acme', contactDB.Account.name);
[/code]

putSObject(fieldName, value) Sets the value for the field specified by the token Schema.SObjectType. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field.  Signature public SObject putSObject(Schema.SObjectType fieldName, SObject value) Parameters

fieldName
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
value
    Type: SObject
Return Value Type: SObject recalculateFormulas() **Deprecated as of API version 57.0. Use the recalculateFormulas() method in the System.Formula class instead.** Signature public Void recalculateFormulas() Return Value Type: Void Usage This method doesn’t recalculate cross-object formulas. If you call this method on objects that have both cross-object and non-cross-object formula fields, only the non-cross-object formula fields are recalculated. Each recalculateFormulas call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). Parameters

psgIds
    Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")>
    A list of IDs for permission set groups.
Return Value Type: void calculatePermissionSetGroup(psgId) Calculates aggregate permissions in a specified permission set group for testing. Signature public static void calculatePermissionSetGroup(String psgId) Parameters

psgId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A single ID for a specified permission set group.
Return Value Type: void clearApexPageMessages() Clear the messages on a Visualforce page while executing Apex test methods. Signature public static void clearApexPageMessages() Return Value Type: void Usage This method may only be used in tests. Example
[code] @isTest
        static void clearMessagesTest() {
            Test.setCurrentPage(new PageReference('/'));
            ApexPages.addMessage(
                new ApexPages.Message(ApexPages.Severity.WARNING, 'Sample Warning')
            );
            System.assertEquals(1, ApexPages.getMessages().size());
            Test.clearApexPageMessages();
            System.assertEquals(0, ApexPages.getMessages().size());
        }
    
[/code]

createSoqlStub(targetType, soqlStub) Creates a stub that will respond to SOQL queries against the specified SObject type you can use during testing. Signature public static void createSoqlStub(Schema.SObjectType targetType, System.SoqlStubProvider soqlStub) Parameters

targetType
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)
    The SObject type to be stubbed. This parameter can’t be null.
soqlStub
    Type: [System.SoqlStubProvider](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SoqlStubProvider.htm#apex_class_System_SoqlStubProvider "Contains a method to create a mock test class for handling SOQL query responses for Data Cloud data model objects \(DMOs\).")
    An implementation of the SoqlStubProvider abstract class.
Return Value Type: void See Also
                                * [_Apex Developer Guide_ : Mock SOQL Tests for Data Cloud Data Model Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm "Apex Developer Guide: Mock SOQL Tests for Data Cloud Data Model
                     Objects - HTML \(New Window\)")
createStub(parentType, stubProvider) Creates a stubbed version of an Apex class that you can use for testing. This method is part of the Apex stub API. You can use it with the System.StubProvider interface to create a mocking framework. Signature public static Object createStub(System.Type parentType, System.StubProvider stubProvider) Parameters

parentType
    Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#apex_methods_system_type "Contains methods for getting the Apex type that corresponds to an Apex class and for instantiating new types.")
    The type of the Apex class to be stubbed.
stubProvider
    [System.StubProvider](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_System_StubProvider.htm#apex_interface_System_StubProvider "StubProvider is a callback interface that you can use as part of the Apex stub API to implement a mocking framework. Use this interface with the Test.createStub\(\) method to create stubbed Apex objects for testing.")
    An implementation of the StubProvider interface.
Return Value Type: Object Returns the stubbed object to use in testing. Usage The createStub() method works together with the System.StubProvider interface. You define the behavior of the stubbed object by implementing the StubProvider interface. Then you create a stubbed object using the createStub() method. When you invoke methods on the stubbed object, the handleMethodCall() method of the StubProvider interface is called to perform the behavior of the stubbed method. See Also
                                * [_Apex Developer Guide_ : Build a Mocking Framework with the Stub API](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_testing_stub_api.htm "Apex Developer Guide: Build a Mocking Framework with the Stub
                     API - HTML \(New Window\)")
createStubQueryRow(targetType, fieldMapWithRelationshipKeys) Creates an instance of a stubbed SObject type that you can use to provide testing results in the extended System.SoqlStubProvider class. Signature public static SObject createStubQueryRow(Schema.SObjectType targetType, Map<String,Object> fieldMapWithRelationshipKeys) Parameters

targetType
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)
    The SObject type to be stubbed. This parameter can’t be null.
fieldMapWithRelationshipKeys
    Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#topic-title)<String,Object>
    The map contains the fields for a parent entity, keyed by the field name with a value for each field. Key and value pairs can also be used for an aggregate relationship. The key holds the name of the aggregate relationship and the value is a list of SObjects.
Return Value Type: [SObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.") Returns the stubbed SObject to use in testing. Example ssot__EmailEngagement__dlm engagement = (ssot__EmailEngagement__dlm)Test.createStubQueryRow(ssot__EmailEngagement__dlm.SObjectType, new Map<string, object> { 'ssot__Name__c' => 'My Email Engagement', 'ssot__CityName__c' => 'San Francisco' } );
[/code]

See Also
                                * [_Apex Developer Guide_ : Mock SOQL Tests for Data Cloud Data Model Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm "Apex Developer Guide: Mock SOQL Tests for Data Cloud Data Model
                     Objects - HTML \(New Window\)")
createStubQueryRows(targetType, fieldMapWithRelationshipKeysForMultipleRows) Creates instances of stubbed SObject types that you can use to provide testing results in the extended System.SoqlStubProvider class. Signature public static List<SObject> createStubQueryRows(Schema.SObjectType targetType, List<Map<String,Object>> fieldMapWithRelationshipKeysForMultipleRows) Parameters

targetType
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)
    The SObject type to be stubbed. This parameter can’t be null.
fieldMapWithRelationshipKeysForMultipleRows
    Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#topic-title)<[Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#topic-title)<String,Object>>
    The list of maps containing the fields for a parent entity, keyed by the field name with a value for each field. Key and value pairs can also be used for an aggregate relationship used in the query. The key holds the name of the aggregate relationship and the value is a list of SObjects.
Return Value Type: List<[SObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)> Returns a list of stubbed SObject types to use in testing. Example List<Map<String, Object>> engagementMaps = new List<Map<String, Object>>(); Map<String, Object> engagement = new Map<String, Object> { 'ssot__Name__c' => 'My Email Engagement', 'ssot__CityName__c' => 'San Francisco' }; Map<String, Object> engagement2 = new Map<String, Object> { 'ssot__Name__c' => 'My Other Email Engagement', 'ssot__CityName__c' => 'New York' }; engagementMaps.add(engagement); engagementMaps.add(engagement2); List<ssot__EmailEngagement__dlm> engagements = (List<ssot__EmailEngagement__dlm>)Test.createStubQueryRows(ssot__EmailEngagement__dlm.SObjectType, engagementMaps); 
[/code]

See Also
                                * [_Apex Developer Guide_ : Mock SOQL Tests for Data Cloud Data Model Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm "Apex Developer Guide: Mock SOQL Tests for Data Cloud Data Model
                     Objects - HTML \(New Window\)")
enableChangeDataCapture() Use this method in an Apex test so that change event notifications are generated for all supported Change Data Capture entities. Call this method at the beginning of your test before performing DML operations and calling Test.getEventBus().deliver();. Signature public static void enableChangeDataCapture() Return Value Type: void Usage The enableChangeDataCapture() method ensures that Apex tests can fire change event triggers regardless of the entities selected in Setup in the Change Data Capture page. The enableChangeDataCapture() method doesn’t affect the entities selected in Setup. See Also
                                * [_Change Data Capture Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.258.0.change_data_capture.meta/change_data_capture/cdc_intro.htm "Change Data Capture Developer Guide - HTML \(New Window\)")
enqueueBatchJobs(numberOfJobs) Adds the specified number of jobs with no-operation contents to the test-context queue. It first fills the test batch queue, up to the maximum 5 jobs, and then places jobs in the test flex queue. It throws a limit exception when the number of jobs in the test flex queue exceeds the allowed limit of 100 jobs. Signature public static List<Id> enqueueBatchJobs(Integer numberOfJobs) Parameters

numberOfJobs
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Number of test jobs to enqueue.
Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")> A list of IDs of enqueued test jobs. Usage Use this method to reduce testing time. Instead of using your org's real batch jobs for testing, you can use this method to simulate batch-job enqueueing. Using enqueueBatchJobs(numberOfJobs) is faster than enqueuing real batch jobs. getEventBus() Returns an instance of the test event bus broker, which lets you operate on platform event or change event messages in an Apex test. For example, you can call Test.getEventBus().deliver() to deliver event messages. Signature public static EventBus.TestBroker getEventBus() Return Value Type: [EventBus.TestBroker](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TestBroker.htm#apex_class_eventbus_TestBroker "Contains methods that simulate the successful delivery or failed publishing of platform event or change event messages in an Apex test.") A broker for the test event bus. Usage Enclose Test.getEventBus().deliver() within the Test.startTest() and Test.stopTest() statement block.
[code] Test.startTest();
    // Create test events
    // ...
    // Publish test events with EventBus.publish()
    // ...
    // Deliver test events
    Test.getEventBus().deliver();
    // Perform validation 
    // ...
    Test.stopTest();
    
[/code]

See Also
                                * [_Platform Events Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.258.0.platform_events.meta/platform_events/platform_events_intro.htm "Platform Events Developer Guide - HTML \(New Window\)")
getFlexQueueOrder() Returns an ordered list of job IDs for jobs in the test-context flex queue. The job at index 0 is the next job slated to run. This method returns only test-context results, even if it’s annotated with @IsTest(SeeAllData=true). Signature public static List<Id> getFlexQueueOrder() Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")> An ordered list of IDs of the jobs in the test’s flex queue. getStandardPricebookId() Returns the ID of the standard price book in the organization. Signature public static Id getStandardPricebookId() Return Value Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.") The ID of the standard price book. Usage This method returns the ID of the standard price book in your organization regardless of whether the test can query organization data. By default, tests can’t query organization data unless they’re annotated with @isTest(SeeAllData=true). Creating price book entries with a standard price requires the ID of the standard price book. Use this method to get the standard price book ID so that you can create price book entries in your tests. Example This example creates some test data for price book entries. The test method in this example gets the standard price book ID and uses this ID to create a price book entry for a product with a standard price. Next, the test creates a custom price book and uses the ID of this custom price book to add a price book entry with a custom price.
[code] @isTest
    public class PriceBookTest {
        // Utility method that can be called by Apex tests to create price book entries.
        static testmethod void addPricebookEntries() {
            // First, set up test price book entries.
            // Insert a test product.
            Product2 prod = new Product2(Name = 'Laptop X200', 
                Family = 'Hardware');
            insert prod;
            
            // Get standard price book ID.
            // This is available irrespective of the state of SeeAllData.
            Id pricebookId = Test.getStandardPricebookId();
            
            // 1. Insert a price book entry for the standard price book.
            // Standard price book entries require the standard price book ID we got earlier.
            PricebookEntry standardPrice = new PricebookEntry(
                Pricebook2Id = pricebookId, Product2Id = prod.Id,
                UnitPrice = 10000, IsActive = true);
            insert standardPrice;
            
            // Create a custom price book
            Pricebook2 customPB = new Pricebook2(Name='Custom Pricebook', isActive=true);
            insert customPB;
            
            // 2. Insert a price book entry with a custom price.
            PricebookEntry customPrice = new PricebookEntry(
                Pricebook2Id = customPB.Id, Product2Id = prod.Id,
                UnitPrice = 12000, IsActive = true);
            insert customPrice;
            
            // Next, perform some tests with your test price book entries.
        }
    }
[/code]

invokeContinuationMethod(controller, request) Invokes the callback method for the specified controller and continuation in a test method. Signature public static Object invokeContinuationMethod(Object controller, Continuation request) Parameters

controller
    Type: Object
    An instance of the controller class that invokes the continuation request.
request
    Type: Continuation
    The continuation that is returned by an action method in the controller class.
Return Value Type: Object The response of the continuation callback method. Usage Use the Test.setContinuationResponse and Test.invokeContinuationMethod methods to test continuations. In test context, callouts of continuations aren’t sent to the external service. By using these methods, you can set a mock response and cause the runtime to call the continuation callback method to process the mock response. Call Test.setContinuationResponse before you call Test.invokeContinuationMethod. When you call Test.invokeContinuationMethod, the runtime executes the callback method that is associated with the continuation. The callback method processes the mock response that is set by Test.setContinuationResponse. isRunningTest() Returns true if the currently executing code was called by code contained in a test method, false otherwise. Use this method if you need to run different code depending on whether it was being called from a test. Signature public static Boolean isRunningTest() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") isSoqlStubDefined(targetType) Returns  Note This method escapes any HTML markup in the specified error message. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Example
[code] Trigger.new[0].myField__c.addError('bad');
[/code]

addError(errorMsg, escape) Places the specified error message, which can be escaped or unescaped, on a trigger record field in the Salesforce user interface, and prevents any DML operation from occurring. Signature public Void addError(String errorMsg, Boolean escape) Parameters

errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     The error message to mark the record with.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type:  Usage The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call _field_.addError(String errorMsg) instead. Example
[code] Trigger.new[0].myField__c.addError('Fix & resubmit', false);
[/code]

addError(fieldName, errorMsg) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added. HTML special characters in the error message string are always escaped.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. Example
[code] // Add an error to a field of an SObject instance using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    Schema.DescribeFieldResult nameDesc = Account.name.getDescribe();
    Schema.sObjectField nameField = nameDesc.getSObjectField();
    acct.addError(nameField, 'error is name field');
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldName, errorMsg, escape) Dynamically add errors to fields of an SObject associated with the specified field name. Signature public void addError(String fieldName, String errorMsg, Boolean escape) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The field name of the SObject .
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: void Usage If the field name is an empty string or null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * Be cautious if you specify false for the escape argument. Unescaped strings displayed in the Salesforce user interface can represent a vulnerability in the system because these strings might contain harmful code. If you want to include HTML markup in the error message, call this method with a false escape argument. Make sure that you escape any dynamic content, such as input field values. Otherwise, specify true for the escape argument or call addError(String fieldName, String errorMsg) instead.
Example
[code] // Add an error to an SObject field using the addError() method.
    Account acct = new Account(name = 'TestAccount');
    acct.addError('name', 'error in name field', false);
    // Use the hasErrors() method to verify that the error is added, and then the getErrors() method to validate the error.
    System.Assert(acct.hasErrors());
    List<Database.Error> errors = acct.getErrors();
    System.AssertEquals(1, errors.size());
[/code]

addError(fieldToken, errorMsg, escape) Dynamically add errors to an SObject instance associated with the specified field. Signature public void addError(Schema.SObjectField fieldToken, String errorMsg, Boolean escape) Parameters

fieldToken
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
    The field of the SObject instance.
errorMsg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message to be added.
escape
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
     Indicates whether any HTML markup in the custom error message should be escaped (true) or not (false). This parameter is ignored in both Lightning Experience and the Salesforce mobile app, and the HTML is always escaped. The escape parameter only applies in Salesforce Classic.
Return Value Type: void Usage Use this method to add errors to the specified field token of a standard or custom object. If fieldTokenis null, the error is associated with the SObject and not with a specific field. The escaped characters are: \n, <, >, &, ", \, \u2028, \u2029, and \u00a9. As a result, HTML markup is not rendered; instead, it is displayed as text in the Salesforce user interface. Warning
                                * The escape parameter cannot be disabled in Lightning Experience and in the Salesforce mobile app, and will be ignored.
                                * See Also
                                  * [recalculateFormulas(sobjects)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Formula.htm#apex_System_Formula_recalculateFormulas "Updates \(recalculates\) all formula fields on the input SObjects.")
                                  * [What Is a Cross-Object Formula?](https://help.salesforce.com/HTViewHelpDoc?id=customize_cross_object.htm&language=en_US "What Is a Cross-Object Formula? - HTML \(New Window\)")
setOptions(DMLOptions) Sets the DMLOptions object for the SObject. Signature public Void setOptions(database.DMLOptions DMLOptions) Parameters

DMLOptions
    Type: [Database.DMLOptions](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_dmloptions.htm#apex_methods_system_database_dmloptions "Enables you to set options related to DML operations.")
Return Value Type: Void Example
[code] Database.DMLOptions dmo = new Database.dmlOptions();
    dmo.assignmentRuleHeader.useDefaultRule = true;
    
    Account acc = new Account(Name = 'Acme');
    acc.setOptions(dmo);
[/code]

Test Class Contains methods related to Apex tests. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Test Methods The following are methods for Test. All methods are static.
                                  * **[calculatePermissionSetGroup(psgIds)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_calculatePermissionSetGroup)**  
Calculates aggregate permissions in specified permission set groups for testing.
                                  * **[calculatePermissionSetGroup(psgId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_calculatePermissionSetGroup_2)**  
Calculates aggregate permissions in a specified permission set group for testing.
                                  * **[clearApexPageMessages()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_clearApexPageMessages)**  
Clear the messages on a Visualforce page while executing Apex test methods.
                                  * **[createSoqlStub(targetType, soqlStub)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createSoqlStub)**  
Creates a stub that will respond to SOQL queries against the specified SObject type you can use during testing.
                                  * **[createStub(parentType, stubProvider)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStub)**  
Creates a stubbed version of an Apex class that you can use for testing. This method is part of the Apex stub API. You can use it with the System.StubProvider interface to create a mocking framework.
                                  * **[createStubQueryRow(targetType, fieldMapWithRelationshipKeys)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStubQueryRow)**  
Creates an instance of a stubbed SObject type that you can use to provide testing results in the extended System.SoqlStubProvider class.
                                  * **[createStubQueryRows(targetType, fieldMapWithRelationshipKeysForMultipleRows)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStubQueryRows)**  
Creates instances of stubbed SObject types that you can use to provide testing results in the extended System.SoqlStubProvider class.
                                  * **[enableChangeDataCapture()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_enableChangeDataCapture)**  
Use this method in an Apex test so that change event notifications are generated for all supported Change Data Capture entities. Call this method at the beginning of your test before performing DML operations and calling Test.getEventBus().deliver();.
                                  * **[enqueueBatchJobs(numberOfJobs)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_enqueueBatchJobs)**  
Adds the specified number of jobs with no-operation contents to the test-context queue. It first fills the test batch queue, up to the maximum 5 jobs, and then places jobs in the test flex queue. It throws a limit exception when the number of jobs in the test flex queue exceeds the allowed limit of 100 jobs.
                                  * **[getEventBus()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getEventBus)**  
Returns an instance of the test event bus broker, which lets you operate on platform event or change event messages in an Apex test. For example, you can call Test.getEventBus().deliver() to deliver event messages.
                                  * **[getFlexQueueOrder()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getFlexQueueOrder)**  
Returns an ordered list of job IDs for jobs in the test-context flex queue. The job at index 0 is the next job slated to run. This method returns only test-context results, even if it’s annotated with @IsTest(SeeAllData=true).
                                  * **[getStandardPricebookId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getStandardPricebookId)**  
Returns the ID of the standard price book in the organization.
                                  * **[invokeContinuationMethod(controller, request)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_invokeContinuationMethod)**  
Invokes the callback method for the specified controller and continuation in a test method.
                                  * **[isRunningTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_isRunningTest)**  
Returns true if the currently executing code was called by code contained in a test method, false otherwise. Use this method if you need to run different code depending on whether it was being called from a test.
                                  * **[isSoqlStubDefined(targetType)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_isSoqlStubDefined)**  
Returns true if a SOQL stub is defined for an SObject type; otherwise returns false.
                                  * **[loadData(sObjectToken, resourceName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_loadData)**  
Inserts test records from the specified static resource .csv file and for the specified sObject type, and returns a list of the inserted sObjects.
                                  * **[newSendEmailQuickActionDefaults(contextId, replyToId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_newSendEmailQuickActionDefaults)**  
Creates a new QuickAction.SendEmailQuickActionDefaults instance for testing a class implementing the QuickAction.QuickActionDefaultsHandler interface.
                                  * **[setContinuationResponse(requestLabel, mockResponse)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setContinuationResponse)**  
Sets a mock response for a continuation HTTP request in a test method.
                                  * **[setCreatedDate(recordId, createdDatetime)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCreatedDate)**  
Sets CreatedDate for a test-context sObject.
                                  * **[setCurrentPage(page)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCurrentPage)**  
A Visualforce test method that sets the current PageReference for the controller.
                                  * **[setCurrentPageReference(page)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCurrentPageReference)**  
A Visualforce test method that sets the current PageReference for the controller.
                                  * **[setFixedSearchResults(fixedSearchResults)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setFixedSearchResults)**  
Defines a list of fixed search results to be returned by all subsequent SOSL statements in a test method.
                                  * **[setMock(interfaceType, instance)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setMock)**  
Sets the response mock mode and instructs the Apex runtime to send a mock response whenever a callout is made through the HTTP classes or the auto-generated code from WSDLs.
                                  * **[setReadOnlyApplicationMode(applicationMode)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setReadOnlyApplicationMode)**  
Sets the application mode for an organization to read-only in an Apex test to simulate read-only mode during Salesforce upgrades and downtimes. The application mode is reset to the default mode at the end of each Apex test run.
                                  * **[startTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_startTest)**  
Marks the point in your test code when your test actually begins. Use this method when you are testing governor limits.
                                  * **[stopTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_stopTest)**  
Marks the point in your test code when your test ends. Use this method in conjunction with the startTest method.
                                  * **[testInstall(installImplementation, version, isPush)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testInstall)**  
Tests the implementation of the InstallHandler interface, which is used for specifying a post install script in packages. Tests run as the test initiator in the development environment.
                                  * **[testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testSandboxPostCopyScript)**  
Tests the implementation of the SandboxPostCopy Interface, which is used for specifying a script to run at the completion of a Sandbox copy. Tests run as the test initiator in the development environment.
                                  * **[testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName, RunAsAutoProcUser)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testSandboxPostCopyScript_2)**  
Tests the implementation of the SandboxPostCopy Interface, which is used for specifying a script to run at the completion of a Sandbox copy. When RunAsAutoProcUser is true, tests run as Automated Process user in the development environment.
                                  * **[testUninstall(uninstallImplementation)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testUninstall)**  
Tests the implementation of the UninstallHandler interface, which is used for specifying an uninstall script in packages. Tests run as the test initiator in the development environment.
calculatePermissionSetGroup(psgIds) Calculates aggregate permissions in specified permission set groups for testing. Signature public static void calculatePermissionSetGroup(List<String> psgIds) Parameters

psgIds
    Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")>
    A list of IDs for permission set groups.
Return Value Type: void calculatePermissionSetGroup(psgId) Calculates aggregate permissions in a specified permission set group for testing. Signature public static void calculatePermissionSetGroup(String psgId) Parameters

psgId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A single ID for a specified permission set group.
Return Value Type: void clearApexPageMessages() Clear the messages on a Visualforce page while executing Apex test methods. Signature public static void clearApexPageMessages() Return Value Type: void Usage This method may only be used in tests. Example
[code] @isTest
        static void clearMessagesTest() {
            Test.setCurrentPage(new PageReference('/'));
            ApexPages.addMessage(
                new ApexPages.Message(ApexPages.Severity.WARNING, 'Sample Warning')
            );
            System.assertEquals(1, ApexPages.getMessages().size());
            Test.clearApexPageMessages();
            System.assertEquals(0, ApexPages.getMessages().size());
        }
    
[/code]

createSoqlStub(targetType, soqlStub) Creates a stub that will respond to SOQL queries against the specified SObject type you can use during testing. Signature public static void createSoqlStub(Schema.SObjectType targetType, System.SoqlStubProvider soqlStub) Parameters

targetType
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)
    The SObject type to be stubbed. This parameter can’t be null.
soqlStub
     Signature public Boolean hasErrors() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") isClone() Returns true if an entity is cloned from something, even if the entity hasn’t been saved. The method can only be used within the transaction where the entity is cloned, as clone information doesn’t persist in subsequent transactions. Signature public Boolean isClone() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Example
[code] Account acc = new Account(Name = 'Acme');
    insert acc;
    Account acc2 = acc.clone();
    // Test before saving
    System.assertEquals(true, acc2.isClone());
    insert acc2;
    // Test after saving
    System.assertEquals(true, acc2.isClone());
[/code]

isSet(fieldName) Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown. Signature public Boolean isSet(String fieldName) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage The isSet method doesn’t check if a field is accessible to a specific user via org permissions or other specialized access permissions.  Example
[code] Contact  c = new Contact(LastName = 'Joyce');
    System.assertEquals(true, c.isSet('LastName'));
    System.assertEquals(false, c.isSet('FirstName')); // FirstName field is not written to
    c.firstName = null;
    System.assertEquals(true, c.isSet('FirstName')); //FirstName field is written to
    
[/code]

isSet(field) Returns information about the queried sObject field. Returns true if the sObject field is populated, either by direct assignment or by inclusion in a SOQL query. Returns false if the sObject field isn’t set. If an invalid field is specified, an SObjectException is thrown. Signature public Boolean isSet(Schema.SObjectField field) Parameters

field
    Type:[SObjectField Class](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage The isSet method doesn’t check if a field is accessible to a specific user via org permissions or other specialized access permissions.  Example
[code] Contact  newContact = new Contact(LastName = 'Joyce');
    insert(newContact); //Insert a new contact with last name Joyce
    Contact c = [SELECT FirstName FROM Contact WHERE Id = :newContact.Id];
    System.assertEquals(true, c.isSet(Contact.FirstName)); //FirstName field in query
    System.assertEquals(false, c.isSet(Contact.LastName)); //LastName field not in query
[/code]

put(fieldName, value) Sets the value for the specified field and returns the previous value for the field. Signature public Object put(String fieldName, Object value) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
value
    Type: Object
Return Value Type: Object Example
[code] Account acc = new Account(name = 'test', description = 'old desc');
    String oldDesc = (String)acc.put('description', 'new desc');
    System.assertEquals('old desc', oldDesc);
    System.assertEquals('new desc', acc.description);
[/code]

put(field, value) Sets the value for the field specified by the field token Schema.sObjectField, such as, Schema.Account.AccountNumber and returns the previous value for the field. Signature public Object put(Schema.SObjectField field, Object value) Parameters

field
    Type: [Schema.SObjectField](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectField.htm#apex_class_Schema_SObjectField "A Schema.sObjectField object is returned from the field describe result using the getController and getSObjectField methods.")
value
    Type: Object
Return Value Type: Object Example
[code] Account acc = new Account(name = 'test', description = 'old desc');
    String oldDesc = (String)acc.put(Schema.Account.Description, 'new desc');
    System.assertEquals('old desc', oldDesc);
    System.assertEquals('new desc', acc.description);
[/code]

Note Field tokens aren't available for person accounts. If you access Schema.Account.fieldname, you get an exception error. Instead, specify the field name as a string. putSObject(fieldName, value) Sets the value for the specified field. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field.  Signature public SObject putSObject(String fieldName, SObject value) Parameters

fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
value
    Type: SObject
Return Value Type: SObject Example
[code] Account acc = new Account(name = 'Acme', description = 'Acme Account');
    insert acc;
    Contact con = new contact(lastname = 'AcmeCon', accountid = acc.id);
    insert con;
    Account acc2 = new account(name = 'Not Acme');
    
    Contact contactDB = 
        (Contact)[SELECT Id, AccountId, Account.Name FROM Contact WHERE id = :con.id LIMIT 1];
    Account a = (Account)contactDB.putSObject('Account', acc2);
    System.assertEquals('Acme', a.name);
    System.assertEquals('Not Acme', contactDB.Account.name);
[/code]

putSObject(fieldName, value) Sets the value for the field specified by the token Schema.SObjectType. This method is primarily used with dynamic DML for setting external IDs. The method returns the previous value of the field.  Signature public SObject putSObject(Schema.SObjectType fieldName, SObject value) Parameters

fieldName
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
value
    Type: SObject
Return Value Type: SObject recalculateFormulas() **Deprecated as of API version 57.0. Use the recalculateFormulas() method in the System.Formula class instead.** Signature public Void recalculateFormulas() Return Value Type: Void Usage This method doesn’t recalculate cross-object formulas. If you call this method on objects that have both cross-object and non-cross-object formula fields, only the non-cross-object formula fields are recalculated. Each recalculateFormulas call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). See Also
                                  * [recalculateFormulas(sobjects)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Formula.htm#apex_System_Formula_recalculateFormulas "Updates \(recalculates\) all formula fields on the input SObjects.")
                                  * [What Is a Cross-Object Formula?](https://help.salesforce.com/HTViewHelpDoc?id=customize_cross_object.htm&language=en_US "What Is a Cross-Object Formula? - HTML \(New Window\)")
setOptions(DMLOptions) Sets the DMLOptions object for the SObject. Signature public Void setOptions(database.DMLOptions DMLOptions) Parameters

DMLOptions
    Type: [Database.DMLOptions](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_dmloptions.htm#apex_methods_system_database_dmloptions "Enables you to set options related to DML operations.")
Return Value Type: Void Example
[code] Database.DMLOptions dmo = new Database.dmlOptions();
    dmo.assignmentRuleHeader.useDefaultRule = true;
    
    Account acc = new Account(Name = 'Acme');
    acc.setOptions(dmo);
[/code]
