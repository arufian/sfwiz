# FunctionCallback Interface

FunctionCallback Interface Represents the callback Salesforce calls when an asynchronous, queued Function invocation has completed. Namespace [functions](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_functions.htm "The Functions namespace provides classes and methods used to invoke and manage Salesforce Functions.") Usage When invoking Functions asynchronously via Function.invoke(payload, callback), you provide your own class that implements FunctionCallback.
                              * **[FunctionCallback Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_functions_FunctionCallback.htm#apex_functions_FunctionCallback_methods)**  

                              * **[FunctionCallback Example Implementation](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_functions_FunctionCallback.htm#apex_interface_functions_FunctionCallback_Example)**  

FunctionCallback Methods The following are methods for FunctionCallback.
                              * **[handleResponse(var1)](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_functions_FunctionCallback.htm#apex_functions_FunctionCallback_handleResponse)**  
Called when an asynchronous Function invocation has completed.
handleResponse(var1) Called when an asynchronous Function invocation has completed. Signature public void handleResponse(functions.FunctionInvocation var1) Parameters

var1
    Type: [functions.FunctionInvocation](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_functions_FunctionInvocation.htm#apex_interface_functions_FunctionInvocation "Use FunctionInvocation to get the status and results of a synchronous or asynchronous Function invocation.")
    The result parameter contains JSON response information and error information.
Return Value Type: void FunctionCallback Example Implementation This is an example implementation of the functions.FunctionCallback interface.
[code] public class MyCallback
      implements functions.FunctionCallback {
        public void handleResponse(functions.FunctionInvocation result) {
          // Handle result of function invocation
          String jsonResponse = result.getResponse();
          System.debug('Got response ' + jsonResponse);
          JSONParser parser = JSON.createParser(jsonResponse);
          // Process JSON using your own data class...
        }
    }
[/code]

The following example uses this implementation when invoking a Function asynchronously:
[code] myFunction.invoke('{ "accountName" : "Acct", "contactName" : "MyContact", "opportunityName" : "Oppty" }', new MyCallback());
[/code]
