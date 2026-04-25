# DynamicMenuItem Class

DynamicMenuItem Class Contains properties to define and hold the details for a single dynamic menu item Each item contains information related to an object, such as identifiers, labels, summaries, and sorting logic. It enables bots to present context-aware and user-relevant choices dynamically during conversations. . Namespace [ise_bots_apex](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_ise_bots_apex.htm "The ise_bots_apex namespace provides classes and properties to facilitate dynamic content generation and data handling for menu-driven bot interactions. Create and manage dynamic menu items that adapt to user inputs, context, and underlying object data.")
              * **[DynamicMenuItem Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_properties)**  
Learn more about the properties available with the DynamicMenuItem class.
DynamicMenuItem Properties Learn more about the properties available with the DynamicMenuItem class. The DynamicMenuItem class includes these properties.
              * **[EntityId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_EntityId)**  
API name representing the ID field of the related Salesforce object.
              * **[EntityIdValue](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_EntityIdValue)**  
The ID value retrieved at run time for the associated object.
              * **[EntityName](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_EntityName)**  
API name or label of the object being referenced, for example Case, Contact, or a custom object such as Service__c.
              * **[EntityNameValue](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_EntityNameValue)**  
The name of the specific object instance.
              * **[Label](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_Label)**  
The label used to define how the item must be displayed in the bot menu.
              * **[LabelValue](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_LabelValue)**  
The value of the label displayed to the user for the menu item at run time.
              * **[SummaryTextWithFormula](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_SummaryTextWithFormula)**  
A formula or a string of text that defines the structure of the summary text displayed for the item. This formula is used to construct a dynamic summary for the user after they make a selection.
              * **[SummaryTextWithFormulaValue](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_SummaryTextWithFormulaValue)**  
The summary string based on the formula and object data.
              * **[sortByDate](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_sortByDate)**  
The API name of a date or date/time field on the object that's used to sort the dynamic menu items.
              * **[sortByDateValue](atlas.en-us.258.0.apexref.meta/apexref/apex_class_ise_bots_apex_DynamicMenuItem.htm#apex_ise_bots_apex_DynamicMenuItem_sortByDateValue)**  
The DateTime value used at run time to sort the menu items chronologically.
EntityId API name representing the ID field of the related Salesforce object. Signature public String EntityId {get; set;}
[code] ise_bots_apex.DynamicMenuItem, EntityId
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") EntityIdValue The ID value retrieved at run time for the associated object. Signature public String EntityIdValue {get; set;}
[code] ise_bots_apex.DynamicMenuItem, EntityIdValue
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") EntityName API name or label of the object being referenced, for example Case, Contact, or a custom object such as Service__c. Signature public String EntityName {get; set;}
[code] ise_bots_apex.DynamicMenuItem, EntityName
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") EntityNameValue The name of the specific object instance. Signature public String EntityNameValue {get; set;}
[code] ise_bots_apex.DynamicMenuItem, EntityNameValue
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Label The label used to define how the item must be displayed in the bot menu. Signature public String Label {get; set;}
[code] ise_bots_apex.DynamicMenuItem, Label
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") LabelValue The value of the label displayed to the user for the menu item at run time. Signature public String LabelValue {get; set;}
[code] ise_bots_apex.DynamicMenuItem, LabelValue
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") SummaryTextWithFormula A formula or a string of text that defines the structure of the summary text displayed for the item. This formula is used to construct a dynamic summary for the user after they make a selection. Signature public String SummaryTextWithFormula {get; set;}
[code] ise_bots_apex.DynamicMenuItem, SummaryTextWithFormula
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") SummaryTextWithFormulaValue The summary string based on the formula and object data. Signature public String SummaryTextWithFormulaValue {get; set;}
[code] ise_bots_apex.DynamicMenuItem, SummaryTextWithFormulaValue
[/code]

Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") sortByDate The API name of a date or date/time field on the object that's used to sort the dynamic menu items. Signature public Date sortByDate {get; set;}
[code] ise_bots_apex.DynamicMenuItem, sortByDate
[/code]

Property Value Type: [Date](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_date.htm#apex_methods_system_date "Contains methods for the Date primitive data type.") sortByDateValue The DateTime value used at run time to sort the menu items chronologically. Signature public Date sortByDateValue {get; set;}
[code] ise_bots_apex.DynamicMenuItem, sortByDateValue
[/code]

Property Value Type: [Date](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_date.htm#apex_methods_system_date "Contains methods for the Date primitive data type.")
