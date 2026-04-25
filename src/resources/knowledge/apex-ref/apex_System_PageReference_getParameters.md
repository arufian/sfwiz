# getParameters()

getParameters() Returns a map of the query string parameters for the PageReference; both POST and GET parameters are included. The key string contains the name of the parameter, while the value string contains the value of the parameter. Signature public Map<String, String> getParameters() Return Value Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#apex_methods_system_map "Contains methods for the Map collection type.")<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type."), [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")> Usage This map can be modified and remains in scope for the PageReference object. For instance, you could do:
[code] PageReference.getParameters().put('id', myID);
[/code]

Parameter keys are case-insensitive. For example:
[code] System.assert(
        ApexPages.currentPage().getParameters().get('myParamName') ==
        ApexPages.currentPage().getParameters().get('myparamname'));
[/code]
