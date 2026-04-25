# QuickActionList Class

QuickActionList Class Represents the list of actions associated with the page layout. Namespace [Metadata](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Metadata.htm "The Metadata namespace provides classes and methods for working with custom metadata in Salesforce") Usage Use this class when accessing [Metadata.Layout](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_Layout.htm#apex_class_Metadata_Layout "Represents the metadata associated with a page layout.") metadata components. For more information, see “QuickActionList” in the [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.api_meta.meta/api_meta/meta_intro.htm).
            * **[QuickActionList Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_QuickActionList.htm#apex_Metadata_QuickActionList_properties)**  

            * **[QuickActionList Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_QuickActionList.htm#apex_Metadata_QuickActionList_methods)**  

QuickActionList Properties The following are properties for QuickActionList.
            * **[quickActionListItems](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_QuickActionList.htm#apex_Metadata_QuickActionList_quickActionListItems)**  
List of QuickActionList objects.
quickActionListItems List of QuickActionList objects. Signature public List<Metadata.QuickActionListItem> quickActionListItems {get; set;} Property Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[Metadata.QuickActionListItem](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_QuickActionListItem.htm#apex_class_Metadata_QuickActionListItem "Represents an action in the QuickActionList.")> QuickActionList Methods The following are methods for QuickActionList.
            * **[clone()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_QuickActionList.htm#apex_Metadata_QuickActionList_clone)**  
Makes a duplicate copy of the Metadata.QuickActionList.
clone() Makes a duplicate copy of the Metadata.QuickActionList. Signature public Object clone() Return Value Type: Object
