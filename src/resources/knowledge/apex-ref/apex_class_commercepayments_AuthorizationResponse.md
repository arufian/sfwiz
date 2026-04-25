# AuthorizationResponse Class

AuthorizationResponse Class Response sent by the payment gateway adapter for an authorization service. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage The constructor of this class takes no arguments. For example: CommercePayments.AuthorizationResponse authr = new CommercePayments.AuthorizationResponse();Contains information about the payment gateway’s response following an authorization transaction. The gateway adapter uses the payment gateway’s response to populate the AuthorizationResponse fields. The payments platform uses the information from this class to construct the authorization gateway response shown to the user. Example
[code] private commercepayments.GatewayResponse createAuthResponse(HttpResponse response, Double amount) {
            Map<String, Object> mapOfResponseValues = (Map
                                <String, Object>) JSON.deserializeUntyped(response.getBody());
    
            commercepayments.AuthorizationResponse authResponse = new commercepayments.AuthorizationResponse();
    
            String resultCode = (String)mapOfResponseValues.get('resultCode');
    
            if(resultCode != null){
                system.debug('Response - success');
                if(resultCode.equals('Authorised')){
                    system.debug('status - authorised');
                    authResponse.setGatewayAuthCode((String)mapOfResponseValues.get('authCode'));
                    authResponse.setSalesforceResultCodeInfo(new commercepayments.SalesforceResultCodeInfo(commercepayments.SalesforceResultCode.Success));
                } else {
                    //Sample returns 200 with refused status in some cases
                    system.debug('status - refused');
                    authResponse.setGatewayResultCodeDescription((String)mapOfResponseValues.get('refusalReason'));
                    authResponse.setSalesforceResultCodeInfo(new commercepayments.SalesforceResultCodeInfo(commercepayments.SalesforceResultCode.Decline));
                }
                authResponse.setGatewayReferenceNumber((String)mapOfResponseValues.get('pspReference'));
                authResponse.setAmount(amount);
                authResponse.setGatewayDate(system.now());
                return authResponse;
            } else {
                system.debug('Response - failed');
                system.debug('Validation error');
                String statusCode = (String)mapOfResponseValues.get('errorType');
                String message = (String)mapOfResponseValues.get('message');
                commercepayments.GatewayErrorResponse error = new commercepayments.GatewayErrorResponse(statusCode, message);
                return error;
            }
        }
[/code]

            * **[AuthorizationResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_methods)**  

AuthorizationResponse Methods The following are methods for AuthorizationResponse.
            * **[setAmount(amount)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setAmount)**  
Sets the amount of the authorization. Must be a non-zero value.
            * **[setAuthorizationExpirationDate(authExpDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setAuthorizationExpirationDate)**  
Sets the expiration date of the authorization request.
            * **[setGatewayAuthCode(gatewayAuthCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayAuthCode)**  
Sets the authorization code that the gateway returned. Maximum length of 64 characters.
            * **[setGatewayAvsCode(gatewayAvsCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayAvsCode)**  
Sets the AVS (address verification system) result code information that the gateway returned. Maximum length of 64 characters.
            * **[setGatewayDate(gatewayDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayDate)**  
Sets the date that the authorization occurred. Some gateways don’t send this value.
            * **[setGatewayMessage(gatewayMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayMessage)**  
Sets error messages that the gateway returned for the authorization request. Maximum length of 255 characters.
            * **[setGatewayReferenceDetails(gatewayReferenceDetails)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayReferenceDetails)**  
Stores data that you can use for subsequent authorizations. You can use any data that isn’t normalized in financial entities. This field has a maximum length of 1000 characters and can store data as JSON or XML. 
            * **[setGatewayReferenceNumber(gatewayReferenceNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayReferenceNumber)**  
Sets the unique gateway reference number for the transaction that the gateway returned. Maximum length of 255 characters.
            * **[setGatewayResultCode(gatewayResultCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayResultCode)**  
Sets a gateway-specific result code. The code can be mapped to a Salesforce-specific result code. Maximum length of 64 characters.
            * **[setGatewayResultCodeDescription(gatewayResultCodeDescription)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setGatewayResultCodeDescription)**  
Sets a description of the gateway-specific result code that a payment gateway returned. Maximum length of 1000 characters.
            * **[setPaymentMethodTokenizationResponse(paymentMethodTokenizationResponse)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setPaymentMethodTokenizationResponse)**  
Sets information from the gateway about the tokenized payment method.
            * **[setSalesforceResultCodeInfo(salesforceResultCodeInfo)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AuthorizationResponse.htm#apex_commercepayments_AuthorizationResponse_setSalesforceResultCodeInfo)**  
Sets the Salesforce-specific result code information. Payment gateways have many response codes for payment calls. Salesforce uses the result code information to map payment gateway codes to a predefined set of standard Salesforce result codes.
setAmount(amount) Sets the amount of the authorization. Must be a non-zero value. Signature global void setAmount(Double amount) Parameters

amount
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
Return Value Type: void setAuthorizationExpirationDate(authExpDate) Sets the expiration date of the authorization request. Signature global void setAuthorizationExpirationDate(Datetime authExpDate) Parameters

authExpDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
Return Value Type: void setGatewayAuthCode(gatewayAuthCode) Sets the authorization code that the gateway returned. Maximum length of 64 characters. Signature global void setGatewayAuthCode(String gatewayAuthCode) Parameters

gatewayAuthCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The authorization code returned by the gateway.
Return Value Type: void setGatewayAvsCode(gatewayAvsCode) Sets the AVS (address verification system) result code information that the gateway returned. Maximum length of 64 characters. Signature global void setGatewayAvsCode(String gatewayAvsCode) Parameters

gatewayAvsCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Used to verify the address mapped to a payment method when the payments platform requests tokenization from the payment gateway.
Return Value Type: void setGatewayDate(gatewayDate) Sets the date that the authorization occurred. Some gateways don’t send this value. Signature global void setGatewayDate(Datetime gatewayDate) Parameters

gatewayDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
Return Value Type: void setGatewayMessage(gatewayMessage) Sets error messages that the gateway returned for the authorization request. Maximum length of 255 characters. Signature global void setGatewayMessage(String gatewayMessage) Parameters

gatewayMessage
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setGatewayReferenceDetails(gatewayReferenceDetails) Stores data that you can use for subsequent authorizations. You can use any data that isn’t normalized in financial entities. This field has a maximum length of 1000 characters and can store data as JSON or XML.  Signature global void setGatewayReferenceDetails(String gatewayReferenceDetails) Parameters

gatewayReferenceDetails
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setGatewayReferenceNumber(gatewayReferenceNumber) Sets the unique gateway reference number for the transaction that the gateway returned. Maximum length of 255 characters. Signature global void setGatewayReferenceNumber(String gatewayReferenceNumber) Parameters

gatewayReferenceNumber
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Unique authorization ID created by the payment gateway.
Return Value Type: void setGatewayResultCode(gatewayResultCode) Sets a gateway-specific result code. The code can be mapped to a Salesforce-specific result code. Maximum length of 64 characters. Signature global void setGatewayResultCode(String gatewayResultCode) Parameters

gatewayResultCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Gateway-specific result code. Must be used to map a Salesforce-specific result code.
Return Value Type: void setGatewayResultCodeDescription(gatewayResultCodeDescription) Sets a description of the gateway-specific result code that a payment gateway returned. Maximum length of 1000 characters. Signature global void setGatewayResultCodeDescription(String gatewayResultCodeDescription) Parameters

gatewayResultCodeDescription
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Description of the gateway’s result code. Use this field to learn more about why the gateway returned a certain result code.
Return Value Type: void setPaymentMethodTokenizationResponse(paymentMethodTokenizationResponse) Sets information from the gateway about the tokenized payment method. Signature global void setPaymentMethodTokenizationResponse(commercepayments.PaymentMethodTokenizationResponse paymentMethodTokenizationResponse) Parameters

paymentMethodTokenizationResponse
    [PaymentMethodTokenizationResponse](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentMethodTokenizationResponse.htm#apex_class_commercepayments_PaymentMethodTokenizationResponse "Gateway response sent by payment gateway adapters for the payment method tokenization request. The response includes the payment method’s token ID value.")
    Gateway response sent by payment gateway adapters for the payment method tokenization request.
Return Value Type: void setSalesforceResultCodeInfo(salesforceResultCodeInfo) Sets the Salesforce-specific result code information. Payment gateways have many response codes for payment calls. Salesforce uses the result code information to map payment gateway codes to a predefined set of standard Salesforce result codes. Signature global void setSalesforceResultCodeInfo(commercepayments.SalesforceResultCodeInfo salesforceResultCodeInfo) Parameters

salesforceResultCodeInfo
    Type: [SalesforceResultCodeInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SalesforceResultCodeInfo.htm#apex_class_commerce_payments_SalesforceResultCodeInfo "Stores Salesforce result code information from payment gateway adapters.")
    Description of the Salesforce result code value.
Return Value Type: void
