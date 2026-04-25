# DeferredTiming Class

DeferredTiming Class Represents timing for a transaction that occurs in the future. Namespace [RichMessaging](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_RichMessaging.htm "Provides objects and methods for handling content in enhanced Messaging channels.")
            * **[DeferredTiming Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_DeferredTiming.htm#apex_RichMessaging_DeferredTiming_constructors)**  

            * **[DeferredTiming Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_DeferredTiming.htm#apex_RichMessaging_DeferredTiming_properties)**  

DeferredTiming Constructors The following are constructors for DeferredTiming.
            * **[DeferredTiming(deferredDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_DeferredTiming.htm#apex_RichMessaging_DeferredTiming_ctor)**  
Creates a new instance of the RichMessaging.DeferredTiming class.
            * **[DeferredTiming()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_DeferredTiming.htm#apex_RichMessaging_DeferredTiming_ctor_2)**  
Creates a new instance of the RichMessaging.DeferredTiming class.
DeferredTiming(deferredDate) Creates a new instance of the RichMessaging.DeferredTiming class. Signature public DeferredTiming(Datetime deferredDate) Parameters

deferredDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    The deferred date.
DeferredTiming() Creates a new instance of the RichMessaging.DeferredTiming class. Signature public DeferredTiming() DeferredTiming Properties The following are properties for DeferredTiming.
            * **[deferredDate](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_DeferredTiming.htm#apex_RichMessaging_DeferredTiming_deferredDate)**  
The deferred date. Invocable variable.
            * **[deferredDateValue](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_DeferredTiming.htm#apex_RichMessaging_DeferredTiming_deferredDateValue)**  
The deferred date. Enabled for Lightning components.
            * **[timingType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_DeferredTiming.htm#apex_RichMessaging_DeferredTiming_timingType)**  
Always returns “DeferredTiming”.
deferredDate The deferred date. Invocable variable. Signature public Datetime deferredDate {get; set;} Property Value Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.") deferredDateValue The deferred date. Enabled for Lightning components. Signature public Datetime deferredDateValue {get; set;} Property Value Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.") timingType Always returns “DeferredTiming”. Signature public String timingType {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
