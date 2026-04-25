# ExternalServiceTest Class

ExternalServiceTest Class Provides methods to test an external service's asynchronous callouts, enables sending a mock request, asserts the expected request payload, then triggers the mocked external service’s asynchronous callback response. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage See [Create Unit Testing for Asynchronous Callouts](https://help.salesforce.com/s/articleView?id=sf.external_services_aysnc_ops_testing.htm&language=en_US) in the "Extend Salesforce with Clicks, Not Code" Help Guide. 
            * **[ExternalServiceTest Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_ExternalServiceTest.htm#apex_System_ExternalServiceTest_methods)**  
An instance of the ExternalServiceTest method is used when the test class triggers a mocked external service’s callback response. You can access ExternalServiceTest through Test.getExternalService()
ExternalServiceTest Methods An instance of the ExternalServiceTest method is used when the test class triggers a mocked external service’s callback response. You can access ExternalServiceTest through Test.getExternalService() The following are methods for ExternalServiceTest.
            * **[sendCallback(request)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_ExternalServiceTest.htm#apex_System_ExternalServiceTest_sendCallback)**  
Sends the HTTP request back as an external service asynchronous response.
sendCallback(request) Sends the HTTP request back as an external service asynchronous response. Signature public System.HttpResponse sendCallback(System.HttpRequest request)
[code] System.ExternalServiceTest, sendCallback, [System.HttpRequest], System.HttpResponse
[/code]

Parameters

request
    Type: [System.HttpRequest](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_restful_http_httprequest.htm#topic-title)
Return Value Type: [System.HttpResponse](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_restful_http_httpresponse.htm#topic-title)
