# Component Class

Component Class Represents a dynamic Visualforce component in Apex. Namespace [ApexPages](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_ApexPages.htm "The ApexPages namespace provides classes used in Visualforce controllers.") Dynamic Component Properties The following are properties for Component.
                                    * **[childComponents](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_dynamic_components.htm#apex_ApexPages_Component_childComponents)**  
Returns a reference to the child components for the component.
                                    * **[expressions](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_dynamic_components.htm#apex_ApexPages_Component_expressions)**  
Sets the content of an attribute using the expression language notation. The notation for this is expressions.name_of_attribute.
                                    * **[facets](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_dynamic_components.htm#apex_ApexPages_Component_facets)**  
Sets the content of a facet to a dynamic component. The notation is facet.name_of_facet. 
childComponents Returns a reference to the child components for the component. Signature public List <ApexPages.Component> childComponents {get; set;} Property Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<ApexPages.Component> Example
[code] Component.Apex.PageBlock pageBlk = new Component.Apex.PageBlock();
    
    Component.Apex.PageBlockSection pageBlkSection = new Component.Apex.PageBlockSection(title='dummy header');
    
    pageBlk.childComponents.add(pageBlkSection);
    
[/code]

expressions Sets the content of an attribute using the expression language notation. The notation for this is expressions.name_of_attribute. Signature public String expressions {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] Component.Apex.InputField inpFld = new 
    Component.Apex.InputField();
    inpField.expressions.value = '{!Account.Name}';
    inpField.expressions.id = '{!$User.FirstName}';
    
[/code]

facets Sets the content of a facet to a dynamic component. The notation is facet.name_of_facet.  Signature public String facets {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage Note This property is only accessible by components that support facets. Example
[code] Component.Apex.DataTable myDT = new 
    Component.Apex.DataTable();
    Component.Apex.OutputText footer = new 
    Component.Apex.OutputText(value='Footer Copyright');
    myDT.facets.footer = footer;
[/code]
