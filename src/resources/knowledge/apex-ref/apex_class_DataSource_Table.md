# Table Class

Table Class Describes a table on an external system that the Salesforce Connect custom adapter connects to. This class extends the DataSourceUtil class and inherits its methods. Namespace [DataSource](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_DataSource.htm "The DataSource namespace provides the classes for the Apex Connector Framework. Use the Apex Connector Framework to develop a custom adapter for Salesforce Connect. Then connect your Salesforce organization to any data anywhere via the Salesforce Connect custom adapter.") Usage A list of table metadata is provided by the DataSource.Connection class when the sync() method is invoked. Each table can become an external object in Salesforce.The metadata is stored in Salesforce. Updating the Apex code to return new or updated values for the table metadata doesn’t automatically update the stored metadata in Salesforce.
            * **[Table Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_properties)**  

            * **[Table Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_methods)**  

Table Properties The following are properties for Table.
            * **[columns](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_columns)**  
List of table columns.
            * **[description](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_description)**  
Description of what the table represents.
            * **[labelPlural](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_labelPlural)**  
Plural form of the user-friendly name for the table. The labelPlural becomes the object’s plural label in the Salesforce user interface.
            * **[labelSingular](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_labelSingular)**  
Singular form of the user-friendly name for the table. The labelSingular becomes the object label in the Salesforce user interface. We recommend that you make object labels unique across all standard, custom, and external objects in the org.
            * **[name](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_name)**  
Name of the table on the external system.
            * **[nameColumn](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_nameColumn)**  
Name of the table column that becomes the name field of the external object when the administrator syncs the table.
columns List of table columns. Signature public List<DataSource.Column> columns {get; set;} Property Value Type: List<[DataSource.Column](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Column.htm#apex_class_DataSource_Column "Describes a column on a DataSource.Table. This class extends the DataSourceUtil class and inherits its methods.")> description Description of what the table represents. Signature public String description {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") labelPlural Plural form of the user-friendly name for the table. The labelPlural becomes the object’s plural label in the Salesforce user interface. Signature public String labelPlural {get; set;} DataSource.Table, labelPlural
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") labelSingular Singular form of the user-friendly name for the table. The labelSingular becomes the object label in the Salesforce user interface. We recommend that you make object labels unique across all standard, custom, and external objects in the org. Signature public String labelSingular {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") name Name of the table on the external system. Signature public String name {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") nameColumn Name of the table column that becomes the name field of the external object when the administrator syncs the table. Signature public String nameColumn {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Table Methods The following are methods for Table.
            * **[get(name, labelSingular, labelPlural, description, nameColumn, columns)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_get)**  
Returns the table metadata with the specified parameter values.
            * **[get(name, nameColumn, columns)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Table.htm#apex_DataSource_Table_get_2)**  
Returns the table metadata with the specified parameter values, using the name for the labels and description.
get(name, labelSingular, labelPlural, description, nameColumn, columns) Returns the table metadata with the specified parameter values. Signature public static DataSource.Table get(String name, String labelSingular, String labelPlural, String description, String nameColumn, List<DataSource.Column> columns) Parameters

name
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Name of the external table.
labelSingular
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Singular form of the user-friendly name for the table. The labelSingular becomes the object label in the Salesforce user interface.
labelPlural
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Plural form of the user-friendly name for the table. The labelPlural becomes the object’s plural label in the Salesforce user interface.
description
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Description of the external table.
nameColumn
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Name of the table column that becomes the name field of the external object when the administrator syncs the table.
columns
    Type: List<[DataSource.Column](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Column.htm#apex_class_DataSource_Column "Describes a column on a DataSource.Table. This class extends the DataSourceUtil class and inherits its methods.")>
    List of table columns.
Return Value Type: DataSource.Table get(name, nameColumn, columns) Returns the table metadata with the specified parameter values, using the name for the labels and description. Signature public static DataSource.Table get(String name, String nameColumn, List<DataSource.Column> columns) DataSource.Table, get, [String, String, List<DataSource.Column>], DataSource.Table
[/code]

Parameters

name
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Name of the external table.
nameColumn
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Name of the table column that becomes the name field of the external object when the administrator syncs the table.
columns
    Type: List<[DataSource.Column](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Column.htm#apex_class_DataSource_Column "Describes a column on a DataSource.Table. This class extends the DataSourceUtil class and inherits its methods.")>
    List of table columns.
Return Value Type: DataSource.Table The returned table metadata has these property values.  Property | Value  
---|---  
name | name  
labelSingular | name  
labelPlural | name  
description | name  
nameColumn | nameColumn  
columns | columns
