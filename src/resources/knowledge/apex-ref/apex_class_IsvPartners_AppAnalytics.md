# AppAnalytics Class

AppAnalytics Class Contains methods to help with AppExchange App Analytics use cases, such as minimizing subscriber attrition and obtaining product insights. Namespace [IsvPartners](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_IsvPartners.htm "The IsvPartners namespace provides a class associated with Salesforce ISV partner use cases, such as optimizing code, providing great customer trial experiences, and driving feature adoption.") Usage Use AppAnalytics and its methods to log App Analytics custom interactions. Example public void submitClicked() { Id jobId = System.enqueueJob(new MyQueueable(colorValue)); IsvPartners.AppAnalytics.logCustomInteraction( MyPageInteractions.SUBMIT_CLICKED, jobId); 
[/code]

            * **[AppAnalytics Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_IsvPartners_AppAnalytics.htm#apex_IsvPartners_AppAnalytics_methods)**  

AppAnalytics Methods These are methods for AppAnalytics.
            * **[logCustomInteraction(interactionLabel, interactionId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_IsvPartners_AppAnalytics.htm#apex_IsvPartners_AppAnalytics_logCustomInteraction)**  
Logs the custom interaction using a label that you provide as an enum value and an interaction ID.
            * **[logCustomInteraction(interactionLabel, interactionUuid)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_IsvPartners_AppAnalytics.htm#apex_IsvPartners_AppAnalytics_logCustomInteraction_2)**  
Logs the custom interaction using a label that you provide as an enum value and an interaction ID that you provide as an Apex UUID.
            * **[logCustomInteraction(interactionLabel)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_IsvPartners_AppAnalytics.htm#apex_IsvPartners_AppAnalytics_logCustomInteraction_3)**  
Logs the custom interaction using a label that you provide as an enum value.
logCustomInteraction(interactionLabel, interactionId) Logs the custom interaction using a label that you provide as an enum value and an interaction ID. Signature public static void logCustomInteraction(Object interactionLabel, Id interactionId) Parameters

interactionLabel
    Type: Object
    A value used to label the custom interaction. The value of interactionLabel must be an enum with the same namespace as the code that calls the logCustomInteraction method.
interactionId
    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
    An Apex ID that is associated with the custom interaction. The interactionId that you provide is hashed and tokenized before it’s included in AppExchange App Analytics package usage logs.
Return Value Type: Void logCustomInteraction(interactionLabel, interactionUuid) Logs the custom interaction using a label that you provide as an enum value and an interaction ID that you provide as an Apex UUID. Signature public static void logCustomInteraction(Object interactionLabel, System.UUID interactionUuid) Parameters

interactionLabel
    Type: Object
    A value used to label the custom interaction. The value of interactionLabel must be an enum with the same namespace as the code that calls the logCustomInteraction method.
interactionUuid
    Type: System.UUID
    An Apex UUID that is associated with the custom interaction. The interactionId that you provide is hashed and tokenized before being included in AppExchange App Analytics package usage logs.
Return Value Type: Void logCustomInteraction(interactionLabel) Logs the custom interaction using a label that you provide as an enum value. Signature public static void logCustomInteraction(Object interactionLabel) Parameters

interactionLabel
    Type: Object
    A value used to label the custom interaction. The value of interactionLabel must be an enum with the same namespace as the code that calls the logCustomInteraction method.
Return Value Type: Void
