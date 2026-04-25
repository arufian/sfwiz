# Action Class

Action Class You can use ApexPages.Action to create an action method that you can use in a Visualforce custom controller or controller extension. Namespace [ApexPages](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_ApexPages.htm "The ApexPages namespace provides classes used in Visualforce controllers.") Usage For example, you could create a saveOver method on a controller extension that performs a custom save. Instantiation The following code snippet illustrates how to instantiate a new ApexPages.Action object that uses the save action:
[code]ApexPages.Action saveAction = new ApexPages.Action('{!save}');
[/code]

                                    * **[Action Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_action.htm#apex_ApexPages_Action_constructors)**  

                                    * **[Action Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_action.htm#apex_ApexPages_Action_methods)**  

Action Constructors The following are constructors for Action.
                                    * **[Action(action)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_action.htm#apex_ApexPages_Action_ctor)**  
Creates a new instance of the ApexPages.Action class using the specified action.
Action(action) Creates a new instance of the ApexPages.Action class using the specified action. Signature public Action(String action) Parameters

action
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The action.
Action Methods The following are methods for Action. All are instance methods.
                                    * **[getExpression()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_action.htm#apex_ApexPages_Action_getExpression)**  
Returns the expression that is evaluated when the action is invoked.
                                    * **[invoke()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_action.htm#apex_ApexPages_Action_invoke)**  
Invokes the action.
getExpression() Returns the expression that is evaluated when the action is invoked. Signature public String getExpression() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") invoke() Invokes the action. Signature public System.PageReference invoke() Return Value Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm "A PageReference is a reference to an instantiation of a page. Among other attributes, PageReferences consist of a URL and a set of query parameter names and values.")
