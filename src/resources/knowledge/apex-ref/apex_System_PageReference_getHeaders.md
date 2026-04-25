# getHeaders()

getHeaders() Returns a map of the request headers, where the key string contains the name of the header, and the value string contains the value of the header. Signature public Map<String, String> getHeaders() Return Value Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#apex_methods_system_map "Contains methods for the Map collection type.")<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type."), [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")> Usage This map can be modified and remains in scope for the PageReference object. For instance, you could do:
[code] PageReference.getHeaders().put('Date', '9/9/99');
[/code]

For a description of request headers, see [Request Headers](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm#RequestHeadersSection).
