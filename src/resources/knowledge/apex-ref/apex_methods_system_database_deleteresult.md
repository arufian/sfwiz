# DeleteResult Class

DeleteResult Class Represents the result of a delete DML operation returned by the Database.delete method. Namespace [Database](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Database.htm "The Database namespace provides classes used with DML operations.") Usage An array of Database.DeleteResult objects is returned with the delete database method. Each element in the DeleteResult array corresponds to the sObject array passed as the sObject[] parameter in the delete Database method; that is, the first element in the DeleteResult array matches the first element passed in the sObject array, the second element corresponds with the second element, and so on. If only one sObject is passed in, the DeleteResult array contains a single element.  Example The following example shows how to obtain and iterate through the returned Database.DeleteResult objects. It deletes some queried accounts using Database.delete with a false second parameter to allow partial processing of records on failure. Next, it iterates through the results to determine whether the operation was successful or not for each record. It writes the ID of every record that was processed successfully to the debug log, or error messages and fields of the failed records.
[code] // Query the accounts to delete
    Account[] accts = [SELECT Id from Account WHERE Name LIKE 'Acme%'];
    // Delete the accounts
    Database.DeleteResult[] drList = Database.delete(accts, false);
    
    // Iterate through each returned result
    for(Database.DeleteResult dr : drList) {
        if (dr.isSuccess()) {
            // Operation was successful, so get the ID of the record that was processed
            System.debug('Successfully deleted account with ID: ' + dr.getId());
        }
        else {
            // Operation failed, so get all errors                
            for(Database.Error err : dr.getErrors()) {
                System.debug('The following error has occurred.');                    
                System.debug(err.getStatusCode() + ': ' + err.getMessage());
                System.debug('Account fields that affected this error: ' + err.getFields());
            }
        }
    }
[/code]

DeleteResult Methods The following are methods for DeleteResult. All are instance methods.
                              * **[getErrors()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_deleteresult.htm#apex_Database_DeleteResult_getErrors)**  
If an error occurred, returns an array of one or more database error objects providing the error code and description. If no error occurred, returns an empty set.
                              * **[getId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_deleteresult.htm#apex_Database_DeleteResult_getId)**  
Returns the ID of the sObject you were trying to delete.
                              * **[isSuccess()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_deleteresult.htm#apex_Database_DeleteResult_isSuccess)**  
A Boolean value that is set to true if the DML operation was successful for this object, false otherwise.
getErrors() If an error occurred, returns an array of one or more database error objects providing the error code and description. If no error occurred, returns an empty set. Signature public Database.Error[] getErrors() Return Value Type: [Database.Error](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_database_error.htm#apex_methods_system_database_error "Represents information about an error that occurred during a DML operation when using a Database method.")[] getId() Returns the ID of the sObject you were trying to delete. Signature public ID getId() Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.") isSuccess() A Boolean value that is set to true if the DML operation was successful for this object, false otherwise. Signature public Boolean isSuccess() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
