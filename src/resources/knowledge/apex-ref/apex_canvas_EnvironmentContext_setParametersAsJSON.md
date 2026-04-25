# setParametersAsJSON(jsonString)

setParametersAsJSON(jsonString) Sets the custom parameters for the canvas app. Signature public void setParametersAsJSON(String jsonString) Parameters

jsonString
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The custom parameters that you need to set, serialized into a JSON format string.
Return Value Type: Void Usage Use this method to set the current custom parameters for the canvas app. The parameters must be provided in a JSON string. You can use the [System.JSON.serialize(objectToSerialize)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Json.htm#apex_System_Json_serialize "Serializes Apex objects into JSON content.") method to serialize a map into a JSON string. Setting the custom parameters will overwrite the custom parameters that are set for the current request. If you need to modify the current custom parameters, first get the current set of custom parameters by using [getParametersAsJSON()](atlas.en-us.258.0.apexref.meta/apexref/apex_canvas_EnvironmentContext_getParametersAsJSON.htm "Retrieves the current custom parameters for the canvas app. Parameters are returned as a JSON string."), modify the retrieved parameter set as needed, and then use this modified set in your call to setParametersAsJSON(). If the provided JSON string exceeds 32KB, a System.CanvasException will be thrown. Example This example gets the current custom parameters, adds a new newCustomParam parameter with a value of ‘TESTVALUE’, and sets the current custom parameters.
[code] Canvas.EnvironmentContext env = renderContext.getEnvironmentContext();
    
    // Get current custom params
    Map<String, Object> previousParams = 
        (Map<String, Object>) JSON.deserializeUntyped(env.getParametersAsJSON());
    
    // Add a new custom param
    previousParams.put('newCustomParam','TESTVALUE');
    
    // Now replace the parameters with the current parameters plus our new custom param
    env.setParametersAsJSON(JSON.serialize(previousParams));
    
[/code]
