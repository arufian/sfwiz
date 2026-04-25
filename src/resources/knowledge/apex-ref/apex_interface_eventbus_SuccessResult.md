# SuccessResult Interface

SuccessResult Interface Contains the result of an Apex publish callback when the event publishing succeeded. This interface is used as a parameter in the onSuccess method of the EventPublishSuccessCallback interface. Namespace [EventBus](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_eventbus.htm "The EventBus namespace provides classes and methods for platform events and Change Data Capture events.")
                              * **[SuccessResult Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_eventbus_SuccessResult.htm#apex_eventbus_SuccessResult_methods)**  

SuccessResult Methods The following are methods for SuccessResult.
                              * **[getEventUuids()](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_eventbus_SuccessResult.htm#apex_eventbus_SuccessResult_getEventUuids)**  
Returns a list of EventUuid field values of each platform event that is included in the EventBus.EventPublishSuccessCallback.
getEventUuids() Returns a list of EventUuid field values of each platform event that is included in the EventBus.EventPublishSuccessCallback. Signature public List<String> getEventUuids() Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")>
