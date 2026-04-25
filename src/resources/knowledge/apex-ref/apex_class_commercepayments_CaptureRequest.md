# CaptureRequest Class

CaptureRequest Class Represents a capture request. This class extends the BaseRequest class and inherits all its methods. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage The CaptureRequest class’s buildCaptureRequest method creates a CaptureRequest object to store payment information, such as value and currency, as JSON strings. Example Builds a CaptureRequest object for a multicurrency org.
[code]private String buildCaptureRequest(commercepayments.CaptureRequest captureRequest) {
            Boolean IS_MULTICURRENCY_ORG = UserInfo.isMultiCurrencyOrganization();
            QueryUtils qBuilderForAuth = new QueryUtils(PaymentAuthorization.SObjectType);
            // Add required fields
            qBuilderForAuth.getSelectClause().addField('GatewayRefNumber', false);
            if (IS_MULTICURRENCY_ORG) {
                // addField also takes a boolean to enable translation (uses label instead of actual value)
                qBuilderForAuth.getSelectClause().addField('CurrencyIsoCode', false);
            }
[/code]

            * **[CaptureRequest Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureRequest.htm#apex_commerce_payments_CaptureRequest_constructors)**  

            * **[CaptureRequest Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureRequest.htm#apex_commerce_payments_CaptureRequest_properties)**  

CaptureRequest Constructors The following are constructors for CaptureRequest.
            * **[CaptureRequest(amount, authorizationId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureRequest.htm#apex_commerce_payments_CaptureRequest_ctor)**  
This constructor is intended for test usage and throws an exception if used outside of the Apex test context.
CaptureRequest(amount, authorizationId) This constructor is intended for test usage and throws an exception if used outside of the Apex test context. Parameters

amount
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The amount to be debited or captured.
authorizationId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Represents a payment authorization record.
CaptureRequest Properties The following are properties for CaptureRequest.
            * **[accountId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureRequest.htm#apex_commerce_payments_CaptureRequest_accountId)**  
Account ID value. References an account record.
            * **[amount](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureRequest.htm#apex_commerce_payments_CaptureRequest_amount)**  
Amount of currency that needs to be captured.
            * **[paymentAuthorizationId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureRequest.htm#apex_commerce_payments_CaptureRequest_paymentAuthorizationId)**  
ID value that references a PaymentAuthorization.
accountId Account ID value. References an account record. Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") amount Amount of currency that needs to be captured. Property Value Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.") paymentAuthorizationId ID value that references a PaymentAuthorization. Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
