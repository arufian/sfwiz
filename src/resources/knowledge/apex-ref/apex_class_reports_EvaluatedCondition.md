# EvaluatedCondition Class

Creates a new instance of the EvaluatedCondition Class Contains the individual components of an evaluated condition for a report notification, such as the aggregate name and label, the operator, and the value that the aggregate is compared to. Namespace [Reports](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Reports.htm "The Reports namespace provides classes for accessing the same data as is available in the Salesforce Reports and Dashboards REST API.")
                * **[EvaluatedCondition Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_constructors)**  

                * **[EvaluatedCondition Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_methods)**  

EvaluatedCondition Constructors The following are constructors for EvaluatedCondition.
                * **[EvaluatedCondition(aggregateName, aggregateLabel, compareToValue, aggregateValue, displayCompareTo, displayValue, operator)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_ctor)**  
Creates a new instance of the Reports.EvaluatedConditions class using the specified parameters.
EvaluatedCondition(aggregateName, aggregateLabel, compareToValue, aggregateValue, displayCompareTo, displayValue, operator) Creates a new instance of the Reports.EvaluatedConditions class using the specified parameters. Signature public EvaluatedCondition(String aggregateName, String aggregateLabel, Double compareToValue, Double aggregateValue, String displayCompareTo, String displayValue, Reports.EvaluatedConditionOperator operator) Parameters

aggregateName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The unique API name of the aggregate.
aggregateLabel
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The localized display name of the aggregate.
compareToValue
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The value that the aggregate is compared to in the condition.
aggregateValue
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The actual value of the aggregate when the report is run.
displayCompareTo
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The value that the aggregate is compared to in the condition, formatted for display. For example, a display value for a currency is $20.00 or USD20.00 instead of 20.00.
displayValue
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The value of the aggregate when the report is run, formatted for display. For example, a display value for a currency is $20.00 or USD20.00 instead of 20.00.
operator
    Type: [Reports.EvaluatedConditionOperator](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_evaluatedconditionoperator.htm "The Reports.EvaluatedConditionOperator enum describes the type of operator used to compare an aggregate to a value. It is returned by the getOperator method.")
    The operator used in the condition.
EvaluatedCondition Methods The following are methods for EvaluatedCondition.
                * **[getAggregateLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_getAggregateLabel)**  
Returns the localized display name of the aggregate.
                * **[getAggregateName()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_getAggregateName)**  
Returns the unique API name of the aggregate.
                * **[getCompareTo()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_getCompareTo)**  
Returns the value that the aggregate is compared to in the condition.
                * **[getDisplayCompareTo()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_getDisplayCompareTo)**  
Returns the value that the aggregate is compared to in the condition, formatted for display. For example, a display value for a currency is $20.00 or USD20.00 instead of 20.00.
                * **[getDisplayValue()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_getDisplayValue)**  
Returns the value of the aggregate when the report is run, formatted for display. For example, a display value for a currency is $20.00 or USD20.00 instead of 20.00.
                * **[getOperator()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_getOperator)**  
Returns the operator used in the condition.
                * **[getValue()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_getValue)**  
Returns the actual value of the aggregate when the report is run.
getAggregateLabel() Returns the localized display name of the aggregate. Signature public String getAggregateLabel() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getAggregateName() Returns the unique API name of the aggregate. Signature public String getAggregateName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getCompareTo() Returns the value that the aggregate is compared to in the condition. Signature public Double getCompareTo() Return Value Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.") getDisplayCompareTo() Returns the value that the aggregate is compared to in the condition, formatted for display. For example, a display value for a currency is $20.00 or USD20.00 instead of 20.00. Signature public String getDisplayCompareTo() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getDisplayValue() Returns the value of the aggregate when the report is run, formatted for display. For example, a display value for a currency is $20.00 or USD20.00 instead of 20.00. Signature public String getDisplayValue() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getOperator() Returns the operator used in the condition. Signature public Reports.EvaluatedConditionOperator getOperator() Return ValueEvaluatedCondition Class Contains the individual components of an evaluated condition for a report notification, such as the aggregate name and label, the operator, and the value that the aggregate is compared to. Namespace [Reports](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Reports.htm "The Reports namespace provides classes for accessing the same data as is available in the Salesforce Reports and Dashboards REST API.")
                * **[EvaluatedCondition Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_constructors)**  

                * **[EvaluatedCondition Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_methods)**  

EvaluatedCondition Constructors The following are constructors for EvaluatedCondition.
                * **[EvaluatedCondition(aggregateName, aggregateLabel, compareToValue, aggregateValue, displayCompareTo, displayValue, operator)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_EvaluatedCondition.htm#apex_reports_EvaluatedCondition_ctor)**  
Creates a new instance of the Reports.EvaluatedConditions class using the specified parameters.
EvaluatedCondition(aggregateName, aggregateLabel, compareToValue, aggregateValue, displayCompareTo, displayValue, operator) Creates a new instance of the Reports.EvaluatedConditions class using the specified parameters. Signature public EvaluatedCondition(String aggregateName, String aggregateLabel, DoubleType: [Reports.EvaluatedConditionOperator](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_evaluatedconditionoperator.htm "The Reports.EvaluatedConditionOperator enum describes the type of operator used to compare an aggregate to a value. It is returned by the getOperator method.") getValue() Returns the actual value of the aggregate when the report is run. Signature public Double getValue() Return Value Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
