# FeedLayoutFilter Class

FeedLayoutFilter Class Represents a feed filter option in the feed view of a feed-based page layout. A filter can have only standardFilter or feedItemType set.  Namespace [Metadata](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Metadata.htm "The Metadata namespace provides classes and methods for working with custom metadata in Salesforce") Usage Use this class when accessing [Metadata.Layout](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_Layout.htm#apex_class_Metadata_Layout "Represents the metadata associated with a page layout.") metadata components. For more information, see “FeedLayoutFilter” in the [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.api_meta.meta/api_meta/meta_intro.htm).
            * **[FeedLayoutFilter Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_FeedLayoutFilter.htm#apex_Metadata_FeedLayoutFilter_properties)**  

            * **[FeedLayoutFilter Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_FeedLayoutFilter.htm#apex_Metadata_FeedLayoutFilter_methods)**  

FeedLayoutFilter Properties The following are properties for FeedLayoutFilter.
            * **[feedFilterName](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_FeedLayoutFilter.htm#apex_Metadata_FeedLayoutFilter_feedFilterName)**  
The name of a CustomFeedFilter component. Names are prefixed with the name of the parent object. For example, Case.MyCustomFeedFilter.
            * **[feedFilterType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_FeedLayoutFilter.htm#apex_Metadata_FeedLayoutFilter_feedFilterType)**  
The type of filter.
            * **[feedItemType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_FeedLayoutFilter.htm#apex_Metadata_FeedLayoutFilter_feedItemType)**  
The type of feed item to display.
feedFilterName The name of a CustomFeedFilter component. Names are prefixed with the name of the parent object. For example, Case.MyCustomFeedFilter. Signature public String feedFilterName {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") feedFilterType The type of filter. Signature public Metadata.FeedLayoutFilterType feedFilterType {get; set;} Property Value Type: [FeedLayoutFilterType Enum](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_Metadata_FeedLayoutFilterType.htm#apex_enum_Metadata_FeedLayoutFilterType "The type of feed layout filter.") feedItemType The type of feed item to display. Signature public Metadata.FeedItemTypeEnum feedItemType {get; set;} Property Value Type: [FeedItemTypeEnum Enum](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_Metadata_FeedItemTypeEnum.htm#apex_enum_Metadata_FeedItemTypeEnum "The type of feed item in a feed-based page layout.") FeedLayoutFilter Methods The following are methods for FeedLayoutFilter.
            * **[clone()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Metadata_FeedLayoutFilter.htm#apex_Metadata_FeedLayoutFilter_clone)**  
Makes a duplicate copy of the Metadata.FeedLayoutFilter.
clone() Makes a duplicate copy of the Metadata.FeedLayoutFilter. Signature public Object clone() Return Value Type: Object
