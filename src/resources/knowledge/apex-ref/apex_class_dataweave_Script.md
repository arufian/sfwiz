# Script Class

Script Class Contains the createScript() method to load DataWeave scripts and the execute() method to obtain script output in a DataWeave.Result object. Namespace [DataWeave](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_dataweave.htm "The DataWeave namespace provides classes and methods to support the invocation of DataWeave scripts from Apex.") This example runs a DataWeave script from Apex and retrieves the resulting script output. First deploy the script to the org as ContactsToJson.dwl. %dw 2.0 input records application/java output application/json \--- { users: records map(record) -> { firstName: record.FirstName, lastName: record.LastName } 
[/code]

Then, execute the script from Apex. List<Contact> data = [SELECT FirstName, LastName FROM Contact WHERE LastName LIMIT 5]; Map<String, Object> args = new Map<String, Object>{ 'records' => data }; DataWeave.Script script = DataWeave.Script.createScript('ContactsToJson'); DataWeave.Result result = script.execute(args); string jsonOutput = result.getValueAsString();
[/code]

              * **[Script Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_dataweave_Script.htm#apex_dataweave_Script_methods)**  

Script Methods The following are methods for Script.
              * **[createScript(scriptName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_dataweave_Script.htm#apex_dataweave_Script_createScript)**  
Loads a DataWeave 2.0 script from the .dwl metadata file that is deployed in an org. The script can then be run using the Script.execute method.
              * **[createScript(namespace, scriptName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_dataweave_Script.htm#apex_dataweave_Script_createScript_2)**  
Loads a DataWeave 2.0 script from a specified namespace. The script can then be run using the Script.execute method.
              * **[execute(parameters)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_dataweave_Script.htm#apex_dataweave_Script_execute)**  
Executes the DataWeave script that is loaded using the createScript() method and returns the script output.
              * **[toString()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_dataweave_Script.htm#apex_dataweave_Script_toString)**  
Returns the name of the script.
createScript(scriptName) Loads a DataWeave 2.0 script from the .dwl metadata file that is deployed in an org. The script can then be run using the Script.execute method. Signature public static createScript(String scriptName) Parameters

scriptName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The name of the deployed metadata .dwl script (not including the file extension).
Return Value Type: DataWeave.Script DataWeave script that is used as a parameter in the Script.execute() method. createScript(namespace, scriptName) Loads a DataWeave 2.0 script from a specified namespace. The script can then be run using the Script.execute method. Signature public static dataweave.Script createScript(String namespace, String scriptName) Parameters

namespace
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The namespace name for the deployed script. If the namespace name is null, the caller namespace is used. If the namespace name is empty, the org namespace is used. 
scriptName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The name of the deployed metadata .dwl script (not including the file extension).
Return Value Type: DataWeave.Script DataWeave script that is used as a parameter in the Script.execute() method. execute(parameters) Executes the DataWeave script that is loaded using the createScript() method and returns the script output. Signature public execute(Map<String,Object> parameters) Parameters

parameters
    Type: Map<String,Object>
    Input to the DataWeave script. The keys correspond to the input directive names defined in the DataWeave header.
    See [Input Directive](https://docs.mulesoft.com/dataweave/1.2/dataweave-language-introduction#input-directive) and [DataWeave Header](https://docs.mulesoft.com/dataweave/1.2/dataweave-language-introduction#dataweave-header).
Return Value Type: [DataWeave.Result](atlas.en-us.258.0.apexref.meta/apexref/apex_class_dataweave_Result.htm#apex_class_dataweave_Result "Contains methods to retrieve data that was transformed using Script class methods.") The DataWeave.Result object contains the script output. toString() Returns the name of the script. Signature public String toString() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
