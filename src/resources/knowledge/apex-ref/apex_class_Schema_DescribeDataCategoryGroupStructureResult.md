# Describe​DataCategoryGroupStructureResult Class

Describe​DataCategoryGroupStructureResult Class Contains the category groups and categories associated with KnowledgeArticleVersion and Question. Namespace [Schema](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Schema.htm "The Schema namespace provides classes and methods for schema metadata information.") Usage The describeDataCategoryGroupStructures method returns a list of Schema.Describe​DataCategoryGroupStructureResult objects containing the category groups and categories associated with the specified object. For additional information and code examples, see [Accessing All Data Categories Associated with an sObject](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_data_categories.htm). Example The following is an example of how to instantiate a data category group structure describe result object:
[code]List <DataCategoryGroupSobjectTypePair> pairs = 
          new List<DataCategoryGroupSobjectTypePair>();
    
    DataCategoryGroupSobjectTypePair pair1 = 
          new DataCategoryGroupSobjectTypePair();
    pair1.setSobject('KnowledgeArticleVersion');
    pair1.setDataCategoryGroupName('Regions');
    
    DataCategoryGroupSobjectTypePair pair2 = 
          new DataCategoryGroupSobjectTypePair();
    pair2.setSobject('Questions');
    pair2.setDataCategoryGroupName('Regions');
    
    pairs.add(pair1);
    pairs.add(pair2);
    
    List<Schema.DescribeDataCategoryGroupStructureResult>results = 
          Schema.describeDataCategoryGroupStructures(pairs, true);
[/code]

DescribeDataCategoryGroupStructureResult Methods The following are methods for DescribeDataCategoryGroupStructureResult. All are instance methods.
            * **[getDescription()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_DescribeDataCategoryGroupStructureResult.htm#apex_Schema_DescribeDataCategoryGroupStructureResult_getDescription)**  
Returns the description of the data category group.
            * **[getLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_DescribeDataCategoryGroupStructureResult.htm#apex_Schema_DescribeDataCategoryGroupStructureResult_getLabel)**  
Returns the label for the data category group used in the Salesforce user interface.
            * **[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_DescribeDataCategoryGroupStructureResult.htm#apex_Schema_DescribeDataCategoryGroupStructureResult_getName)**  
Returns the unique name used by the API to access to the data category group.
            * **[getSobject()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_DescribeDataCategoryGroupStructureResult.htm#apex_Schema_DescribeDataCategoryGroupStructureResult_getSobject)**  
Returns the name of object associated with the data category group.
            * **[getTopCategories()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_DescribeDataCategoryGroupStructureResult.htm#apex_Schema_DescribeDataCategoryGroupStructureResult_getTopCategories)**  
Returns a Schema.DataCategory object, that contains the top categories visible depending on the user's data category group visibility settings.
getDescription() Returns the description of the data category group. Signature public String getDescription() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLabel() Returns the label for the data category group used in the Salesforce user interface. Signature public String getLabel() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getName() Returns the unique name used by the API to access to the data category group. Signature public String getName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSobject() Returns the name of object associated with the data category group. Signature public String getSobject() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getTopCategories() Returns a Schema.DataCategory object, that contains the top categories visible depending on the user's data category group visibility settings. Signature public List<Schema.DataCategory> getTopCategories() Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Schema.DataCategory](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_DataCategory.htm#apex_class_Schema_DataCategory "Represents the categories within a category group.")> Usage For more information on data category group visibility, see “Data Category Visibility” in the Salesforce online help.
