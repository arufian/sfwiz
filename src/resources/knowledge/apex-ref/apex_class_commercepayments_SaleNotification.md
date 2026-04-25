# SaleNotification Class

SaleNotification Class When a payment gateway sends a notification for a sale payment, the payment gateway adapter creates the SaleNotification object to store information about notification. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage SaleNotification is used in asynchronous payment gateway adapters. Specify the CommercePayments namespace when creating an instance of this class. The constructor of this class takes no arguments. For example: commercePayments.SaleNotification saleNotification = new commercepayments.SaleNotification(); Example
[code] global commercepayments.GatewayNotificationResponse processNotification(commercepayments.PaymentGatewayNotificationContext gatewayNotificationContext) {
        commercepayments.PaymentGatewayNotificationRequest gatewayNotificationRequest = gatewayNotificationContext.getPaymentGatewayNotificationRequest();
        Blob request = gatewayNotificationRequest.getRequestBody();
        AdyenNotificationRequest notificationRequest = AdyenNotificationRequest.parse(request.toString().replace('currency', 'currencyCode'));
        List < AdyenNotificationRequest.NotificationItems > notificationItems = notificationRequest.notificationItems;
        AdyenNotificationRequest.NotificationRequestItem notificationRequestItem = notificationItems[0].NotificationRequestItem;
    
        Boolean success = Boolean.valueOf(notificationRequestItem.success);
        String pspReference = notificationRequestItem.pspReference;
        String eventCode = notificationRequestItem.eventCode;
        Double amount = notificationRequestItem.amount.value;
        String reason = notificationRequestItem.reason;
        Datetime eventDate = notificationRequestItem.eventDate;
    
        commercepayments.NotificationStatus notificationStatus = null;
        if (success) {
            notificationStatus = commercepayments.NotificationStatus.Success;
        } else {
            notificationStatus = commercepayments.NotificationStatus.Failed;
        }
    
        commercepayments.BaseNotification notification = null;
        if ('AUTHORISATION'.equals(eventCode) && amount > 0) {
            notification = new commercepayments.SaleNotification();
            notification.setGatewayReferenceNumber(pspReference);
        } else {
            system.debug('handling unknown event : ' + eventCode);
            commercepayments.GatewayNotificationResponse unknownEventResponse = new commercepayments.GatewayNotificationResponse();
            unknownEventResponse.setStatusCode(200);
            unknownEventResponse.setResponseBody(Blob.valueOf('[not allowed]'));
            return unknownEventResponse;
        }
    
        notification.setStatus(notificationStatus);
        notification.setAmount(amount / 100);
        notification.setGatewayResultCodeDescription(reason);
        notification.setGatewayDate(eventDate);
    
        commercepayments.NotificationSaveResult saveResult = commercepayments.NotificationClient.record(notification);
    
        commercepayments.GatewayNotificationResponse gnr = new commercepayments.GatewayNotificationResponse();
        if (saveResult.isSuccess()) {
            gnr.setStatusCode(200);
        } else {
            gnr.setStatusCode(400);
        }
        gnr.setResponseBody(Blob.valueOf(saveResult.toString()));
        return gnr;
    }
[/code]

              * **[SaleNotification Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_methods)**  

SaleNotification Methods The following are methods for SaleNotification.
              * **[setAmount(amount)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setAmount)**  
Sets the amount for the sale payment.
              * **[setGatewayAvsCode(gatewayAvsCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setGatewayAvsCode)**  
Sets the AVS (address verification system) result code information that the gateway returned. Maximum length of 64 characters.
              * **[setGatewayDate(gatewayDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setGatewayDate)**  
Sets the date that the sale occurred. Some gateways don’t send this value.
              * **[setGatewayMessage(gatewayMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setGatewayMessage)**  
Sets error messages that the gateway returned for the sale request. Maximum length of 255 characters.
              * **[setGatewayReferenceDetails(gatewayReferenceDetails)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setGatewayReferenceDetails)**  
Sets additional data that you can use for the sale payment. You can use any data that isn’t normalized in financial entities. This field has a maximum length of 1000 characters and can store data as JSON or XML.
              * **[setGatewayReferenceNumber(gatewayReferenceNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setGatewayReferenceNumber)**  
Sets the unique gateway reference number for the transaction that the gateway returned. Maximum length of 255 characters.
              * **[setGatewayResultCode(gatewayResultCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setGatewayResultCode)**  
Sets a gateway-specific result code. The code may be mapped to a Salesforce-specific result code. Maximum length of 64 characters.
              * **[setGatewayResultCodeDescription(gatewayResultCodeDescription)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setGatewayResultCodeDescription)**  
Sets a description of the gateway-specific result code that a payment gateway returned. Maximum length of 1000 characters.
              * **[setId(id)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setId)**  
Sets the ID of a notification sent by the payment gateway.
              * **[setSalesforceResultCodeInfo(salesforceResultCodeInfo)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setSalesforceResultCodeInfo)**  
Sets the Salesforce-specific result code information. Payment gateways have many response codes for payment calls. Salesforce uses the result code information to map payment gateway codes to a predefined set of standard Salesforce result codes.
              * **[setStatus(status)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SaleNotification.htm#apex_commercepayments_SaleNotification_setStatus)**  
Sets the notification status value on the notification object.
setAmount(amount) Sets the amount for the sale payment. Signature public void setAmount(Double amount) Parameters

amount
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
Return Value Type: void setGatewayAvsCode(gatewayAvsCode) Sets the AVS (address verification system) result code information that the gateway returned. Maximum length of 64 characters. Signature public void setGatewayAvsCode(String gatewayAvsCode) Parameters

gatewayAvsCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Used to verify the address mapped to a payment method when the payments platform requests tokenization from the payment gateway.
Return Value Type: void setGatewayDate(gatewayDate) Sets the date that the sale occurred. Some gateways don’t send this value. Signature public void setGatewayDate(Datetime gatewayDate) Parameters

gatewayDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
Return Value Type: void setGatewayMessage(gatewayMessage) Sets error messages that the gateway returned for the sale request. Maximum length of 255 characters. Signature public void setGatewayMessage(String gatewayMessage) Parameters

gatewayMessage
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setGatewayReferenceDetails(gatewayReferenceDetails) Sets additional data that you can use for the sale payment. You can use any data that isn’t normalized in financial entities. This field has a maximum length of 1000 characters and can store data as JSON or XML. Signature public void setGatewayReferenceDetails(String gatewayReferenceDetails) Parameters

gatewayReferenceDetails
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setGatewayReferenceNumber(gatewayReferenceNumber) Sets the unique gateway reference number for the transaction that the gateway returned. Maximum length of 255 characters. Signature public void setGatewayReferenceNumber(String gatewayReferenceNumber) Parameters

gatewayReferenceNumber
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setGatewayResultCode(gatewayResultCode) Sets a gateway-specific result code. The code may be mapped to a Salesforce-specific result code. Maximum length of 64 characters. Signature public void setGatewayResultCode(String gatewayResultCode) Parameters

gatewayResultCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setGatewayResultCodeDescription(gatewayResultCodeDescription) Sets a description of the gateway-specific result code that a payment gateway returned. Maximum length of 1000 characters. Signature public void setGatewayResultCodeDescription(String gatewayResultCodeDescription) Parameters

gatewayResultCodeDescription
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Description of the gateway’s result code. Use this field to learn more about why the gateway returned a certain result code.
Return Value Type: void setId(id) Sets the ID of a notification sent by the payment gateway. Signature public void setId(String id) Parameters

id
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: void setSalesforceResultCodeInfo(salesforceResultCodeInfo) Sets the Salesforce-specific result code information. Payment gateways have many response codes for payment calls. Salesforce uses the result code information to map payment gateway codes to a predefined set of standard Salesforce result codes. Signature public void setSalesforceResultCodeInfo(commercepayments.SalesforceResultCodeInfo salesforceResultCodeInfo) Parameters

salesforceResultCodeInfo
    Type: commercepayments.[SalesforceResultCodeInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_SalesforceResultCode.htm "Defines the gateway call status values in Salesforce based on the call status values that the payment gateway returned.")
Return Value Type: void setStatus(status) Sets the notification status value on the notification object. Signature public void setStatus(commercepayments.NotificationStatus status) Parameters

status
    Type: commercepayments.[NotificationStatus](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_NotificationStatus.htm "Shows whether the payments platform successfully received the notification from the gateway.")
Return Value Type: void
