# ReportScopeValue Class

Type: voidReportScopeValue Class Contains information about a possible scope value. Scope values depend on the report type. For example, you can set the scope for opportunity reports to All opportunities, My team’s opportunities, or My opportunities. Namespace [Reports](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Reports.htm "The Reports namespace provides classes for accessing the same data as is available in the Salesforce Reports and Dashboards REST API.")
                * **[ReportScopeValue Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportScopeValue.htm#apex_reports_ReportScopeValue_methods)**  

ReportScopeValue Methods The following are methods for ReportScopeValue.
                * **[getAllowsDivision()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportScopeValue.htm#apex_reports_ReportScopeValue_getAllowsDivision)**  
Returns a boolean value that indicates whether you can segment the report by this scope.
                * **[getLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportScopeValue.htm#apex_reports_ReportScopeValue_getLabel)**  
Returns the display name of the scope of the report.
                * **[getValue()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportScopeValue.htm#apex_reports_ReportScopeValue_getValue)**  
Returns the scope value for the report.
getAllowsDivision() Returns a boolean value that indicates whether you can segment the report by this scope. Signature public Boolean getAllowsDivision() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") getLabel() Returns the display name of the scope of the report. Signature public String getLabel() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getValue() Returns the scope value for the report. Signature public String getValue() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
