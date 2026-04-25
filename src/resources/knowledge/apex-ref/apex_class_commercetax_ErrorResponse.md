# ErrorResponse Class

ErrorResponse Class Use to respond with an error after receiving errors from the PaymentGatewayAdapter methods of the [CommercePayments](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "HTML \(New Window\)") namespace, such as request-forbidden responses, custom validation errors, or expired API tokens. Namespace [CommerceTax](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercetax.htm "Manage the communication between Salesforce and an external tax engine.") Example This example snippet of a mock tax adapter shows a hypothetical scenario to demo an error response. The adapter receives request information from TaxEngineContext and stores it in an instance of CalculateTaxRequest. If the request's documentCode property is null or indicates an error, the adapter returns an error response with information about the error.
[code] global virtual class MockAdapter implements commercetax.TaxEngineAdapter {
     
         global commercetax.TaxEngineResponse processRequest(commercetax.TaxEngineContext taxEngineContext) {
             commercetax.RequestType requestType = taxEngineContext.getRequestType();
             commercetax.CalculateTaxRequest request = (commercetax.CalculateTaxRequest)taxEngineContext.getRequest();
    
    if(request.documentCode == null) {
                 return new commercetax.ErrorResponse(commercetax.resultcode.TaxEngineError, '404', 'documentCode  is mandatory');
             }
             if(request.documentCode == 'TaxEngineError') {
                 return new commercetax.ErrorResponse(commercetax.resultcode.TaxEngineError, '504', 'documentCode  - not supported');
             }
             if(request.documentCode == 'simulateValidationFailureInAdapter') {
                 return new commercetax.ErrorResponse(commercetax.resultcode.TaxEngineError, '400', 'validations for documentCode failed in adapter');
             }
             if(request.documentCode == 'simulateMalformedErrorInAdapter') {
                         return new commercetax.ErrorResponse(commercetax.resultcode.TaxEngineError, null, 'malformed adapter error response');
             }
             if(request.documentCode == 'simulateTaxEngineProcessFailure') {
                 return new commercetax.ErrorResponse(commercetax.resultcode.TaxEngineError, '500', 'Tax Engine couldnt process your request');
             }
     
[/code]

              * **[ErrorResponse Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercetax_ErrorResponse.htm#apex_commercetax_ErrorResponse_constructors)**  
Learn more about the available constructors with the ErrorResponse class.
ErrorResponse Constructors Learn more about the available constructors with the ErrorResponse class. The ErrorResponse class includes these constructors.
              * **[ErrorResponse(resultCode, errorCode, errorMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercetax_ErrorResponse.htm#apex_commercetax_ErrorResponse_ctor)**  
Constructor to initialize an ErrorResponse object from the result code, error code, and error message sent from the tax engine.
ErrorResponse(resultCode, errorCode, errorMessage) Constructor to initialize an ErrorResponse object from the result code, error code, and error message sent from the tax engine. Signature global ErrorResponse(commercetax.ResultCode resultCode, String errorCode, String errorMessage) Parameters

resultCode
    Type: [ResultCode](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercetax_ResultCode.htm "Code that represents the results of a tax request made to the tax engine.")
    Code for the type of result sent by the tax engine.
errorCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Code for the type of error sent by the tax engine.
    Codes must match the HTTP status codes to be returned to the user. Here are a few examples:
              * If the status code is for a bad request, set errorCode to 400.
              * If the status code is for a forbidden request, set errorCode to 403.
              * If errorCode isn't a valid HTTP status code, a 500 internal server error is returned.
errorMessage
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The error message sent by the tax engine.
