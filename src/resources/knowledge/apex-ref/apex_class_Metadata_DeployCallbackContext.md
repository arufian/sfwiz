# DeployCallbackContext Class

DeployCallbackContext Class Represents context information for a deployment job. Namespace [Metadata](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Metadata.htm "The Metadata namespace provides classes and methods for working with custom metadata in Salesforce") Usage After an asynchronous metadata deployment finishes, Salesforce provides an instance ofMetadata.DeployCallbackContext in an asynchronous call to your implementation of handleResult() in your [Metadata.DeployCallback](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_Metadata_DeployCallback.htm#apex_interface_Metadata_DeployCallback "An interface for metadata deployment callback classes.") class. Example
[code] public void handleResult(Metadata.DeployResult result,
                             Metadata.DeployCallbackContext context) {
      // Check the callback job ID for the deployment
      Id jobId = context.getCallbackJobId();
      // ...process the results...
    }
    
[/code]

            * **[DeployCallbackContext Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployCallbackContext.htm#apex_Metadata_DeployCallbackContext_methods)**  

DeployCallbackContext Methods The following are methods for DeployCallbackContext.
            * **[clone()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployCallbackContext.htm#apex_Metadata_DeployCallbackContext_clone)**  
Makes a duplicate copy of the Metadata.DeployCallbackContext.
            * **[getCallbackJobId()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployCallbackContext.htm#apex_Metadata_DeployCallbackContext_getCallbackJobId)**  
Gets the asynchronous Apex job ID for the callback job.
clone() Makes a duplicate copy of the Metadata.DeployCallbackContext. Signature public Object clone() Return Value Type: Object getCallbackJobId() Gets the asynchronous Apex job ID for the callback job. Signature public Id getCallbackJobId() Return Value Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
