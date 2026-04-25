# ProjectionNode Class

ProjectionNode Class Add aggregate functions to the query, or define an alias. Namespace [wave](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_wave.htm#apex_namespace_wave "The classes in the Wave namespace are part of the CRM Analytics Analytics SDK, designed to facilitate querying CRM Analytics data from Apex code.") Usage Refer to the QueryBuilder example.
                  * **[ProjectionNode Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_methods)**  

ProjectionNode Methods The following are methods for ProjectionNode.
                  * **[sum()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_sum)**  
Returns the sum of a numeric field.
                  * **[avg()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_avg)**  
Returns the average value of a numeric field.
                  * **[min()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_min)**  
Returns the minimum value of a field.
                  * **[max()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_max)**  
Returns the maximum value of a field.
                  * **[count()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_count)**  
Returns the number of rows that match the query criteria.
                  * **[unique()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_unique)**  
Returns the count of unique values.
                  * **[alias(name)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_wave_ProjectionNode.htm#apex_wave_ProjectionNode_alias)**  
Define output column names.
sum() Returns the sum of a numeric field. Signature public wave.ProjectionNode sum() Return Value Type: wave.ProjectionNode avg() Returns the average value of a numeric field. Signature public wave.ProjectionNode avg() Return Value Type: wave.ProjectionNode min() Returns the minimum value of a field. Signature public wave.ProjectionNode min() Return Value Type: wave.ProjectionNode max() Returns the maximum value of a field. Signature public wave.ProjectionNode max() Return Value Type: wave.ProjectionNode count() Returns the number of rows that match the query criteria. Signature public wave.ProjectionNode count() Return Value Type: wave.ProjectionNode unique() Returns the count of unique values. Signature public wave.ProjectionNode unique() Return Value Type: wave.ProjectionNode alias(name) Define output column names. Signature public wave.ProjectionNode alias(String name) Parameters

name
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The name to use for this column. For example, this code defines the alias c: 
[code]Wave.ProjectionNode[] projs = new Wave.ProjectionNode[]{Wave.QueryBuilder.count().alias('c')};
[/code]

Return Value Type: wave.ProjectionNode
