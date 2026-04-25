# ServiceResourceSchedule Class

ServiceResourceSchedule Class Use this class to pass results from your implemented Apex class to the ServiceResourceScheduleHandler interface methods. Namespace [LxScheduler](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_lxscheduler.htm "The LxScheduler namespace provides an interface and classes for integrating Salesforce Scheduler with external calendars.")
              * **[ServiceResourceSchedule Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_ServiceResourceSchedule.htm#apex_lxscheduler_ServiceResourceSchedule_constructors)**  

              * **[ServiceResourceSchedule Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_ServiceResourceSchedule.htm#apex_lxscheduler_ServiceResourceSchedule_properties)**  

ServiceResourceSchedule Constructors The following are constructors for ServiceResourceSchedule.
              * **[ServiceResourceSchedule(serviceResourceId, unavailableTimeslots)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_ServiceResourceSchedule.htm#apex_lxscheduler_ServiceResourceSchedule_ctor)**  
Creates a new instance of lxscheduler.ServiceResourceSchedule class.
ServiceResourceSchedule(serviceResourceId, unavailableTimeslots) Creates a new instance of lxscheduler.ServiceResourceSchedule class. Signature public ServiceResourceSchedule(String serviceResourceId, Set<lxscheduler.UnavailableTimeslot> unavailableTimeslots) Parameters

serviceResourceId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Record ID of the service resource.
unavailableTimeslots
    Type: Set<lxscheduler.UnavailableTimeslot>
    An instance of lxscheduler.UnavailableTimeslot class.
ServiceResourceSchedule Properties The following are properties for ServiceResourceSchedule.
              * **[serviceResourceId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_ServiceResourceSchedule.htm#apex_lxscheduler_ServiceResourceSchedule_serviceResourceId)**  
Record ID of the service resource.
              * **[unavailableTimeslots](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_ServiceResourceSchedule.htm#apex_lxscheduler_ServiceResourceSchedule_unavailableTimeslots)**  
An instance of lxscheduler.UnavailableTimeslot class.
serviceResourceId Record ID of the service resource. Signature public String serviceResourceId {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") unavailableTimeslots An instance of lxscheduler.UnavailableTimeslot class. Signature public Set<lxscheduler.UnavailableTimeslot> unavailableTimeslots {get; set;} Property Value Type: Set<lxscheduler.UnavailableTimeslot>
