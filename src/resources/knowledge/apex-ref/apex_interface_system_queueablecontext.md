# QueueableContext Interface

QueueableContext Interface Represents the parameter type of the execute() method in a class that implements the Queueable interface and contains the job ID. This interface is implemented internally by Apex. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") QueueableContext Methods The following are methods for QueueableContext.
                              * **[getJobId()](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_system_queueablecontext.htm#apex_System_QueueableContext_getJobId)**  
Returns the ID of the submitted job that uses the Queueable interface.
getJobId() Returns the ID of the submitted job that uses the Queueable interface. Signature public ID getJobId() Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.") The ID of the submitted job. See Also
                              * [_Apex Developer Guide_ : Queueable Apex](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_queueing_jobs.htm "Apex Developer Guide: Queueable Apex - HTML \(New Window\)")
