# DeployDetails Class

DeployDetails Class Contains detailed information on deployed components. Namespace [Metadata](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Metadata.htm "The Metadata namespace provides classes and methods for working with custom metadata in Salesforce") Usage Use this class to obtain a list of the successfully and unsuccessfully deployed components after a completed deployment by Salesforce in your  Metadata.DeployCallback results.
            * **[DeployDetails Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployDetails.htm#apex_Metadata_DeployDetails_properties)**  

            * **[DeployDetails Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployDetails.htm#apex_Metadata_DeployDetails_methods)**  

DeployDetails Properties The following are properties for DeployDetails.
            * **[componentFailures](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployDetails.htm#apex_Metadata_DeployDetails_componentFailures)**  
Contains a list of information about components that failed to deploy.
            * **[componentSuccesses](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployDetails.htm#apex_Metadata_DeployDetails_componentSuccesses)**  
Contains a list of information about components that deployed successfully.
componentFailures Contains a list of information about components that failed to deploy. Signature public List<Metadata.DeployMessage> componentFailures {get; set;} Property Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Metadata.DeployMessage](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployMessage.htm#apex_class_Metadata_DeployMessage "Represents result information for the deployment of a metadata component.")> componentSuccesses Contains a list of information about components that deployed successfully. Signature public List<Metadata.DeployMessage> componentSuccesses {get; set;} Property Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Metadata.DeployMessage](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployMessage.htm#apex_class_Metadata_DeployMessage "Represents result information for the deployment of a metadata component.")> DeployDetails Methods The following are methods for DeployDetails.
            * **[clone()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_DeployDetails.htm#apex_Metadata_DeployDetails_clone)**  
Makes a duplicate copy of the Metadata.DeployDetails.
clone() Makes a duplicate copy of the Metadata.DeployDetails. Signature public Object clone() Return Value Type: Object
