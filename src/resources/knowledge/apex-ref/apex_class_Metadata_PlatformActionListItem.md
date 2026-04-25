# PlatformActionListItem Class

PlatformActionListItem Class Represents an action in the platform action list for a layout. Namespace [Metadata](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Metadata.htm "The Metadata namespace provides classes and methods for working with custom metadata in Salesforce") Usage Use this class when accessing [Metadata.Layout](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_Layout.htm#apex_class_Metadata_Layout "Represents the metadata associated with a page layout.") metadata components. For more information, see “PlatformActionListItem” in the [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.api_meta.meta/api_meta/meta_intro.htm).
            * **[PlatformActionListItem Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_PlatformActionListItem.htm#apex_Metadata_PlatformActionListItem_properties)**  

            * **[PlatformActionListItem Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_PlatformActionListItem.htm#apex_Metadata_PlatformActionListItem_methods)**  

PlatformActionListItem Properties The following are properties for PlatformActionListItem.
            * **[actionName](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_PlatformActionListItem.htm#apex_Metadata_PlatformActionListItem_actionName)**  
The API name for the action in the list.
            * **[actionType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_PlatformActionListItem.htm#apex_Metadata_PlatformActionListItem_actionType)**  
The type of action.
            * **[sortOrder](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_PlatformActionListItem.htm#apex_Metadata_PlatformActionListItem_sortOrder)**  
The placement of the action in the list.
            * **[subtype](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_PlatformActionListItem.htm#apex_Metadata_PlatformActionListItem_subtype)**  
The subtype of the action.
actionName The API name for the action in the list. Signature public String actionName {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") actionType The type of action. Signature public Metadata.PlatformActionTypeEnum actionType {get; set;} Property Value Type: [Metadata.PlatformActionTypeEnum](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_Metadata_PlatformActionTypeEnum.htm#apex_enum_Metadata_PlatformActionTypeEnum "The type of action for a PlatformActionListItem.") sortOrder The placement of the action in the list. Signature public Integer sortOrder {get; set;} Property Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") subtype The subtype of the action. Signature public String subtype {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") PlatformActionListItem Methods The following are methods for PlatformActionListItem.
            * **[clone()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_PlatformActionListItem.htm#apex_Metadata_PlatformActionListItem_clone)**  
Makes a duplicate copy of the Metadata.PlatformActionListItem.
clone() Makes a duplicate copy of the Metadata.PlatformActionListItem. Signature public Object clone() Return Value Type: Object
