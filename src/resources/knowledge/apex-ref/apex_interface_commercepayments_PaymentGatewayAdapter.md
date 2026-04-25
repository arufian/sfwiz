# PaymentGatewayAdapter Interface

PaymentGatewayAdapter Interface PaymentGatewayAdapters can implement this interface in order to process requests. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.")
                            * **[PaymentGatewayAdapter Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_commercepayments_PaymentGatewayAdapter.htm#apex_commerce_payments_PaymentGatewayAdapter_methods)**  

PaymentGatewayAdapter Methods The following are methods for PaymentGatewayAdapter.
                            * **[processRequest(var1)](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_commercepayments_PaymentGatewayAdapter.htm#apex_commercepayments_PaymentGatewayAdapter_processRequest)**  
The entry point for processing payment requests. Returns the response from the payment gateway.
processRequest(var1) The entry point for processing payment requests. Returns the response from the payment gateway. Signature global commercepayments.GatewayResponse processRequest(commercepayments.PaymentGatewayContext var1) Parameters

var1
    Type: [commercepayments.PaymentGatewayContext](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayContext.htm#apex_class_commerce_payments_PaymentGatewayContext)
    You can retrieve the request type and the request from the Context object.
Return Value Type: commercepayments.GatewayResponse The response from the payment gateway.
