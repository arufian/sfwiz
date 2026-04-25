# GatewayNotificationResponse Class

GatewayNotificationResponse Class When the payment gateway sends a notification to the payments platform, the platform responds with a GatewayNotificationResponse indicating whether the platform succeeded or failed at receiving the notification. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage You must specify the CommercePayments namespace when creating an instance of this class. The constructor of this class takes no arguments. For example: CommercePayments.GatewayNotificationResponse gnr = new CommercePayments.GatewayNotificationResponse();When an asynchronous payment gateway sends a notification, the gateway requires the platform to acknowledge that it has either succeeded or failed in receiving the notification. Payment gateway adapters use this class to construct the acknowledgment response, which gateways expect for a notification. GatewayNotificationResponse is the return type of the processNotification method. Example
[code] commercepayments.GatewayNotificationResponse gnr = new commercepayments.GatewayNotificationResponse();
    if (saveResult.isSuccess()) {
        system.debug('Notification accepted by platform');
    } else {
        system.debug('Errors in the result '+ Blob.valueOf(saveResult.getErrorMessage()));
    }
    gnr.setStatusCode(200);
    gnr.setResponseBody(Blob.valueOf('[accepted]'));
    return gnr;
[/code]

              * **[GatewayNotificationResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_GatewayNotificationResponse.htm#apex_commercepayments_GatewayNotificationResponse_methods)**  

GatewayNotificationResponse Methods The following are methods for GatewayNotificationResponse.
              * **[setResponseBody(responseBody)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_GatewayNotificationResponse.htm#apex_commercepayments_GatewayNotificationResponse_setResponseBody)**  
Sets the body of the response to the gateway. Some gateways expect the payments platform to acknowledge the notification with a response regardless of whether the notification was accepted.
              * **[setStatusCode(statusCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_GatewayNotificationResponse.htm#apex_commercepayments_GatewayNotificationResponse_setStatusCode)**  
Sets the HTTP status code sent to the gateway as part of the payments platform’s response notification.
setResponseBody(responseBody) Sets the body of the response to the gateway. Some gateways expect the payments platform to acknowledge the notification with a response regardless of whether the notification was accepted. Signature global void setResponseBody(Blob responseBody) Parameters

responseBody
    Type: [Blob](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_blob.htm#apex_methods_system_blob "Contains methods for the Blob primitive data type.")
    Common response values include accepted for successfully receiving the response. For example:
[code]commercepayments.GatewayNotificationResponse gnr = new commercepayments.GatewayNotificationResponse();
    if (saveResult.isSuccess()) {
        system.debug('Notification accepted by platform');
    } else {
        system.debug('Errors in the result '+ Blob.valueOf(saveResult.getErrorMessage()));
    }
    gnr.setStatusCode(200);
    gnr.setResponseBody(Blob.valueOf('[accepted]'));
    return gnr;
[/code]

Return Value Type: void setStatusCode(statusCode) Sets the HTTP status code sent to the gateway as part of the payments platform’s response notification. Signature global void setStatusCode(Integer statusCode) Parameters

statusCode
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    The status code will vary based on the type of payments platform response. Users should configure their GatewayNotificationResponse class to account for all values that their payments platform can possibly return. For example: 
[code]commercepayments.GatewayNotificationResponse gnr = new commercepayments.GatewayNotificationResponse();
    if (saveResult.isSuccess()) {
        system.debug('Notification accepted by platform');
    } else {
        system.debug('Errors in the result '+ Blob.valueOf(saveResult.getErrorMessage()));
    }
    gnr.setStatusCode(200);
    gnr.setResponseBody(Blob.valueOf('[accepted]'));
    return gnr;
[/code]

Return Value Type: void
