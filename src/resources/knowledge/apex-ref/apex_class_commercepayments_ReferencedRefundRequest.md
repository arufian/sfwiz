# ReferencedRefundRequest

ReferencedRefundRequest Access information about the referenced refund requests. Extends the RefundRequest class. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Example
[code] global commercepayments.GatewayResponse processRequest(commercepayments.PaymentGatewayContext gatewayContext) {
        commercepayments.RequestType requestType = gatewayContext.getPaymentRequestType();
        if (requestType == commercepayments.RequestType.ReferencedRefund) {
            commercepayments.*ReferencedRefundRequest* refundRequest = (commercepayments.*ReferencedRefundRequest*) gatewayContext.getPaymentRequest();
        }
    }
[/code]

              * **[ReferencedRefundRequest Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundRequest.htm#apex_commerce_payments_ReferencedRefundRequest_constructors)**  

              * **[ReferencedRefundRequest Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundRequest.htm#apex_commerce_payments_ReferencedRefundRequest_properties)**  

              * **[ReferencedRefundRequest Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundRequest.htm#apex_commerce_payments_ReferencedRefundRequest_methods)**  

ReferencedRefundRequest Constructors The following are constructors for ReferencedRefundRequest.
              * **[ReferencedRefundRequest(amount, paymentId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundRequest.htm#apex_commerce_payments_ReferencedRefundRequest_ctor)**  
This constructor is intended for test usage and throws an exception if used outside of the Apex test context.
ReferencedRefundRequest(amount, paymentId) This constructor is intended for test usage and throws an exception if used outside of the Apex test context. Parameters

amount
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The amount to be debited or captured.
paymentId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The payment record.
ReferencedRefundRequest Properties The following are properties for ReferencedRefundRequest.
              * **[PaymentId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundRequest.htm#apex_commerce_payments_ReferencedRefundRequest_PaymentId)**  
References a payment object.
              * **[accountId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundRequest.htm#apex_commerce_payments_ReferencedRefundRequest_accountId)**  
References an account.
              * **[amount](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundRequest.htm#apex_commerce_payments_ReferencedRefundRequest_amount)**  
References an amount.
PaymentId References a payment object. Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") accountId References an account. Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") amount References an amount. Property Value Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.") ReferencedRefundRequest Methods The following are methods for ReferencedRefundRequest.
