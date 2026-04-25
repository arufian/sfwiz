# SchedulableContext Interface

SchedulableContext Interface Represents the parameter type of a method in a class that implements the Schedulable interface and contains the scheduled job ID. This interface is implemented internally by Apex. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") See Also
                              * [Schedulable Interface](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_system_schedulable.htm#apex_interface_system_schedulable "The class that implements this interface can be scheduled to run at different intervals.")
SchedulableContext Methods The following are methods for SchedulableContext.
                              * **[getTriggerId()](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_system_schedulablecontext.htm#apex_System_SchedulableContext_getTriggerId)**  
Returns the ID of the CronTrigger scheduled job.
getTriggerId() Returns the ID of the CronTrigger scheduled job. Signature public Id getTriggerId() Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
