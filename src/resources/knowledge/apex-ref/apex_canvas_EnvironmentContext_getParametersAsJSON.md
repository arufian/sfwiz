# getParametersAsJSON()

getParametersAsJSON() Retrieves the current custom parameters for the canvas app. Parameters are returned as a JSON string. Signature public String getParametersAsJSON() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage Use this method to get the current custom parameters for the canvas app. The parameters are returned in a JSON string that can be de-serialized by using the [System.JSON.deserializeUntyped(jsonString)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Json.htm#apex_System_Json_deserializeUntyped "Deserializes the specified JSON string into collections of primitive data types.") method. Custom parameters can be modified by using the [Canvas.EnvironmentContext.setParametersAsJSON(jsonString)](atlas.en-us.258.0.apexref.meta/apexref/apex_canvas_EnvironmentContext_setParametersAsJSON.htm "Sets the custom parameters for the canvas app.") string. Example This example gets the current custom parameters, de-serializes them into a map, and prints the results to the debug log.
[code] Canvas.EnvironmentContext env = renderContext.getEnvironmentContext();
    
    // Get current custom params
    Map<String, Object> currentParams = 
        (Map<String, Object>) JSON.deserializeUntyped(env.getParametersAsJSON());
    System.debug('Environment Context custom paramters: ' + currentParams);
[/code]
