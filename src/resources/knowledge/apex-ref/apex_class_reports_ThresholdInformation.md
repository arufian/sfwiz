# ThresholdInformation Class

ThresholdInformation Class Contains a list of evaluated conditions for a report notification. Namespace [Reports](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Reports.htm "The Reports namespace provides classes for accessing the same data as is available in the Salesforce Reports and Dashboards REST API.")
                  * **[ThresholdInformation Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ThresholdInformation.htm#apex_reports_ThresholdInformation_constructors)**  

                  * **[ThresholdInformation Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ThresholdInformation.htm#apex_reports_ThresholdInformation_methods)**  

ThresholdInformation Constructors The following are constructors for ThresholdInformation.
                  * **[ThresholdInformation(evaluatedConditions)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ThresholdInformation.htm#apex_reports_ThresholdInformation_ctor)**  
Creates a new instance of the Reports.EvaluatedCondition class.
ThresholdInformation(evaluatedConditions) Creates a new instance of the Reports.EvaluatedCondition class. Signature public ThresholdInformation(List<Reports.EvaluatedCondition> evaluatedConditions) Parameters

evaluatedConditions
    Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Reports.EvaluatedCondition](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_class_reports_EvaluatedCondition "Contains the individual components of an evaluated condition for a report notification, such as the aggregate name and label, the operator, and the value that the aggregate is compared to.")>
    A list of Reports.EvaluatedCondition objects.
ThresholdInformation Methods The following are methods for ThresholdInformation.
                  * **[getEvaluatedConditions()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ThresholdInformation.htm#apex_reports_ThresholdInformation_getEvaluatedConditions)**  
Returns a list of evaluated conditions for a report notification.
getEvaluatedConditions() Returns a list of evaluated conditions for a report notification. Signature public List<Reports.EvaluatedCondition> getEvaluatedConditions() Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Reports.EvaluatedCondition](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_class_reports_EvaluatedCondition "Contains the individual components of an evaluated condition for a report notification, such as the aggregate name and label, the operator, and the value that the aggregate is compared to.")>
