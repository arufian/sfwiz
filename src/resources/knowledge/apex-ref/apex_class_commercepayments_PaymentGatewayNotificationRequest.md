# PaymentGatewayNotificationRequest Class

PaymentGatewayNotificationRequest Class Contains the notification request data from the gateway. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage When the payment gateway sends a notification for a payment request, the payments platform sends the notification request to the gateway adapter. If the notification payload contains an eventCode of CAPTURE, the adapter constructs a CaptureNotification. If the notification payload contains an eventCode of REFUND, the adapter constructs a ReferencedRefundNotification. If the notification payload contains eventCode of AUTHORISATION, the adapter constructs a GatewayNotificationResponse. You can obtain a notification request from [PaymentGatewayNotificationContext](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationContext.htm#apex_class_commercepayments_PaymentGatewayNotificationContext "Wraps the information related to a gateway notification.") by invoking its getPaymentGatewayNotificationRequest method. Example
[code] global commercepayments.GatewayNotificationResponse 
        processNotification(commercepayments.PaymentGatewayNotificationContext gatewayNotificationContext) {
            commercepayments.PaymentGatewayNotificationRequest notificationRequest = gatewayNotificationContext.getPaymentGatewayNotificationRequest();
    }
[/code]

              * **[PaymentGatewayNotificationRequest Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationRequest.htm#apex_commercepayments_PaymentGatewayNotificationRequest_properties)**  

              * **[PaymentGatewayNotificationRequest Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationRequest.htm#apex_commercepayments_PaymentGatewayNotificationRequest_methods)**  

PaymentGatewayNotificationRequest Properties The following are properties for PaymentGatewayNotificationRequest.
              * **[requestBody](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationRequest.htm#apex_commercepayments_PaymentGatewayNotificationRequest_requestBody)**  
Body of the notification request sent by the payment gateway.
requestBody Body of the notification request sent by the payment gateway. Signature global Blob requestBody {get; set;} Property Value Type: [Blob](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_blob.htm#apex_methods_system_blob "Contains methods for the Blob primitive data type.") PaymentGatewayNotificationRequest Methods The following are methods for PaymentGatewayNotificationRequest.
              * **[getHeaders()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationRequest.htm#apex_commercepayments_PaymentGatewayNotificationRequest_getHeaders)**  
Gets HTTP headers from the notification request sent by the payment gateway.
              * **[getRequestBody()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationRequest.htm#apex_commercepayments_PaymentGatewayNotificationRequest_getRequestBody)**  
Stores the notification request body information from the payment gateway’s notification request.
getHeaders() Gets HTTP headers from the notification request sent by the payment gateway. Signature global Map<String,String> getHeaders() Return Value Type: Map<String,String> getRequestBody() Stores the notification request body information from the payment gateway’s notification request. Signature global Blob getRequestBody() Return Value Type: [Blob](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_blob.htm#apex_methods_system_blob "Contains methods for the Blob primitive data type.")
