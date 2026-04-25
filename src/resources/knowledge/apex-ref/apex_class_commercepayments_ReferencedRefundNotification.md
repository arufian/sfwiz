# ReferencedRefundNotification Class

ReferencedRefundNotification Class When a payment gateway sends a notification for a refund transaction, the payment gateway adapter creates the ReferencedRefundNotification object to store information about notification. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage This class is used with asynchronous payments. When a payment gateway sends a notification for a refund transcation, the gateway adapter creates an object of type ReferencedRefundNotification to populate the respective values.The constructor of this class takes no arguments. For example: CommercePayments.ReferencedRefundNotification rrn = new CommercePayments.ReferencedRefundNotification(); Example
[code] commercepayments.NotificationStatus notificationStatus = null;
            if (success) {
                notificationStatus = commercepayments.NotificationStatus.Success;
            } else {
                notificationStatus = commercepayments.NotificationStatus.Failed;
            }
            commercepayments.BaseNotification notification = null;
            if ('CAPTURE'.equals(eventCode)) {
                notification = new commercepayments.CaptureNotification();
            } else if ('REFUND'.equals(eventCode)) {
                notification = new commercepayments.ReferencedRefundNotification();
            }
[/code]

              * **[ReferencedRefundNotification Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_methods)**  

ReferencedRefundNotification Methods The following are methods for ReferencedRefundNotification.
              * **[setAmount(amount)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setAmount)**  
Sets the transaction amount. Can be positive, negative, or zero.
              * **[setGatewayDate(gatewayDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setGatewayDate)**  
Sets the date that communication for the refund notification occurred with the payment gateway.
              * **[setGatewayMessage(gatewayMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setGatewayMessage)**  
Sets information or messages that the gateway returned.
              * **[setGatewayReferenceDetails(gatewayReferenceDetails)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setGatewayReferenceDetails)**  
Sets the payment gateway’s reference details.
              * **[setGatewayReferenceNumber(gatewayReferenceNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setGatewayReferenceNumber)**  
Sets the payment gateway’s reference number.
              * **[setGatewayResultCode(gatewayResultCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setGatewayResultCode)**  
Sets the payment gateway’s result code.
              * **[setGatewayResultCodeDescription(gatewayResultCodeDescription)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setGatewayResultCodeDescription)**  
Sets the payment gateway’s result code description.
              * **[setId(id)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setId)**  
Sets the ID of a notification sent by the payment gateway.
              * **[setSalesforceResultCodeInfo(salesforceResultCodeInfo)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setSalesforceResultCodeInfo)**  
Sets Salesforce result code information.
              * **[setStatus(status)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_ReferencedRefundNotification.htm#apex_commercepayments_ReferencedRefundNotification_setStatus)**  
Sets the notification status value on the notification object.
setAmount(amount) Sets the transaction amount. Can be positive, negative, or zero. Signature global void setAmount(Double amount) Parameters

amount
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The amount to be debited or captured.
Return Value Type: void setGatewayDate(gatewayDate) Sets the date that communication for the refund notification occurred with the payment gateway. Signature global void setGatewayDate(Datetime gatewayDate) Parameters

gatewayDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    The date that communication happened with the gateway.
Return Value Type: void setGatewayMessage(gatewayMessage) Sets information or messages that the gateway returned. Signature global void setGatewayMessage(String gatewayMessage) Parameters

gatewayMessage
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setGatewayReferenceDetails(gatewayReferenceDetails) Sets the payment gateway’s reference details. Signature global void setGatewayReferenceDetails(String gatewayReferenceDetails) Parameters

gatewayReferenceDetails
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Provides information about the gateway communication.
Return Value Type: void setGatewayReferenceNumber(gatewayReferenceNumber) Sets the payment gateway’s reference number. Signature global void setGatewayReferenceNumber(String gatewayReferenceNumber) Parameters

gatewayReferenceNumber
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Unique transaction ID created by the payment gateway.
Return Value Type: void setGatewayResultCode(gatewayResultCode) Sets the payment gateway’s result code. Signature global void setGatewayResultCode(String gatewayResultCode) Parameters

gatewayResultCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The gateway result code. You must map this to a Salesforce-specific result code.
Return Value Type: void setGatewayResultCodeDescription(gatewayResultCodeDescription) Sets the payment gateway’s result code description. Signature global void setGatewayResultCodeDescription(String gatewayResultCodeDescription) Parameters

gatewayResultCodeDescription
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Description of the gateway result code. Provides additional context about the result code .
Return Value Type: void setId(id) Sets the ID of a notification sent by the payment gateway. Signature global void setId(String id) Parameters

id
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setSalesforceResultCodeInfo(salesforceResultCodeInfo) Sets Salesforce result code information. Signature global void setSalesforceResultCodeInfo(commercepayments.SalesforceResultCodeInfo salesforceResultCodeInfo) Parameters

salesforceResultCodeInfo
    Type: [SalesforceResultCodeInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SalesforceResultCodeInfo.htm#apex_class_commerce_payments_SalesforceResultCodeInfo "Stores Salesforce result code information from payment gateway adapters.")
    Description of the Salesforce result code value.
Return Value Type: void setStatus(status) Sets the notification status value on the notification object. Signature global void setStatus(commercepayments.NotificationStatus status) Parameters

status
    Type: [NotificationStatus](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_NotificationStatus.htm "Shows whether the payments platform successfully received the notification from the gateway.")
    Indicates whether the payments platform successfully received the notification from the payment gateway.
Return Value Type: void
