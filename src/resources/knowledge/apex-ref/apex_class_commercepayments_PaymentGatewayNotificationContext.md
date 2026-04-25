# PaymentGatewayNotificationContext Class

PaymentGatewayNotificationContext Class Wraps the information related to a gateway notification. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage This class is used with asynchronous payments. It wraps all of the information related to a notification from the payment gateway. The payments platform provides its context to the payment gateway adapters. The constructor of this class takes no arguments. For example: CommercePayments.PaymentGatewayNotificationContext pgnc = new CommercePayments.PaymentGatewayNotificationContext(); Example
[code] global commercepayments.GatewayNotificationResponse 
    processNotification(commercepayments.PaymentGatewayNotificationContext gatewayNotificationContext) {
    commercepayments.PaymentGatewayNotificationRequest notificationRequest = gatewayNotificationContext.getPaymentGatewayNotificationRequest();
    }
[/code]

              * **[PaymentGatewayNotificationContext Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationContext.htm#apex_commercepayments_PaymentGatewayNotificationContext_methods)**  

PaymentGatewayNotificationContext Methods The following are methods for PaymentGatewayNotificationContext.
              * **[getPaymentGatewayNotificationRequest()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationContext.htm#apex_commercepayments_PaymentGatewayNotificationContext_getPaymentGatewayNotificationRequest)**  
Returns the payment gateway’s notification request.
getPaymentGatewayNotificationRequest() Returns the payment gateway’s notification request. Signature global commercepayments.PaymentGatewayNotificationRequest getPaymentGatewayNotificationRequest() Return Value Type: [PaymentGatewayNotificationRequest](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_PaymentGatewayNotificationRequest.htm#apex_class_commercepayments_PaymentGatewayNotificationRequest "Contains the notification request data from the gateway.")
