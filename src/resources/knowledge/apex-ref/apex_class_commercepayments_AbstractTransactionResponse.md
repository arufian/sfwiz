# AbstractTransactionResponse Class

# AbstractTransactionResponse Class

Abstract class for storing normalized information sent from payment
      gateways about a payment transaction. Holds  the common response fields sent from payment
      gateways for authorization, sale, capture, and refund transactions.

    
## Namespace

      
      [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm)

    

    
## Usage

Specify the `CommercePayments` namespace when creating an instance of this class. The
        constructor of this class takes no arguments. For example:

`CommercePayments.AbstractTransactionResponse atr = new
        CommercePayments.AbstractTransactionResponse();`

  

- 
**[AbstractTransactionResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_methods)**

## AbstractTransactionResponse Methods

The following are methods for `AbstractTransactionResponse`.

- 
**[setAmount(amount)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setAmount)**

Sets the transaction amount. Must be a non-negative     value.

- 
**[setGatewayAvsCode(gatewayAvsCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setGatewayAvsCode)**

Sets the AVS (address verification system) result code that the       gateway returned. Maximum length of 64 characters.

- 
**[setGatewayDate(gatewayDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setGatewayDate)**

Sets the date that the notification occurred. Some gateways don’t send       this value.

- 
**[setGatewayMessage(gatewayMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setGatewayMessage)**

Sets error messages that the gateway returned for the notification request. Maximum     length of 255 characters.

- 
**[setGatewayReferenceDetails(gatewayReferenceDetails)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setGatewayReferenceDetails)**

Sets the payment gateway’s reference details.

- 
**[setGatewayReferenceNumber(gatewayReferenceNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setGatewayReferenceNumber)**

Sets the payment gateway’s reference number.

- 
**[setGatewayResultCode(gatewayResultCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setGatewayResultCode)**

Sets a gateway-specific result code. You can map the result code to a       Salesforce-specific result code. Maximum length of 64 characters.

- 
**[setGatewayResultCodeDescription(gatewayResultCodeDescription)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setGatewayResultCodeDescription)**

Sets a description of the gateway-specific result code that a payment       gateway returned. Maximum length of 1000 characters.

- 
**[setSalesforceResultCodeInfo(salesforceResultCodeInfo)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractTransactionResponse.htm#apex_commercepayments_AbstractTransactionResponse_setSalesforceResultCodeInfo)**

Sets the Salesforce-specific result code information.

### setAmount(amount)

Sets the transaction amount. Must be a non-negative
    value.

#### Signature

      
      `global void setAmount(Double amount)`

      
    

#### Parameters

amount
Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double)

The amount of the transaction.

#### Return Value

Type: void

### setGatewayAvsCode(gatewayAvsCode)

Sets the AVS (address verification system) result code that the
      gateway returned. Maximum length of 64 characters.

#### Signature

      
      `global void setGatewayAvsCode(String
          gatewayAvsCode)`

      
    

#### Parameters

gatewayAvsCode
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          Used to verify the address mapped to a payment method when the payments platform
            requests tokenization from the payment gateway.

#### Return Value

Type: void

### setGatewayDate(gatewayDate)

Sets the date that the notification occurred. Some gateways don’t send
      this value.

#### Signature

      
      `global void setGatewayDate(Datetime
        gatewayDate)`

      
    

#### Parameters

gatewayDate
Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

The date that the transaction occurred.

#### Return Value

Type: void

### setGatewayMessage(gatewayMessage)

  
Sets error messages that the gateway returned for the notification request. Maximum
    length of 255 characters.

#### Signature

`global void setGatewayMessage(String gatewayMessage)`

#### Parameters

gatewayMessage
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          The message that the gateway returned with the transaction request. Contains
            additional information about the transaction. 

#### Return Value

Type: void

### setGatewayReferenceDetails(gatewayReferenceDetails)

Sets the payment gateway’s reference details.

#### Signature

      
      `global void setGatewayReferenceDetails(String
          gatewayReferenceDetails)`

      
    

#### Parameters

gatewayReferenceDetails
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          Provides information about the gateway communication.

#### Return Value

Type: void

### setGatewayReferenceNumber(gatewayReferenceNumber)

  
Sets the payment gateway’s reference number.

#### Signature

      
      `global void setGatewayReferenceNumber(String
          gatewayReferenceNumber)`

      
    

#### Parameters

gatewayReferenceNumber
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          Unique transaction ID created by the payment gateway.

#### Return Value

Type: void

### setGatewayResultCode(gatewayResultCode)

Sets a gateway-specific result code. You can map the result code to a
      Salesforce-specific result code. Maximum length of 64 characters.

#### Signature

      
      `global void setGatewayResultCode(String
          gatewayResultCode)`

      
    

#### Parameters

gatewayResultCode
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          Gateway-specific result code. Must be mapped to a Salesforce-specific result
            code.

#### Return Value

Type: void

### setGatewayResultCodeDescription(gatewayResultCodeDescription)

Sets a description of the gateway-specific result code that a payment
      gateway returned. Maximum length of 1000 characters.

#### Signature

`global void setGatewayResultCodeDescription(String
          gatewayResultCodeDescription)`

#### Parameters

gatewayResultCodeDescription
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          Provides additional information about the result code and why the gateway returned the
            specific code. Descriptions  vary between different gateways.

#### Return Value

Type: void

### setSalesforceResultCodeInfo(salesforceResultCodeInfo)

Sets the Salesforce-specific result code information.

#### Signature

      
      `global void
          setSalesforceResultCodeInfo(commercepayments.SalesforceResultCodeInfo
          salesforceResultCodeInfo)`

      
    

#### Parameters

salesforceResultCodeInfo
Type: [commercepayments.SalesforceResultCodeInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SalesforceResultCodeInfo.htm#apex_class_commerce_payments_SalesforceResultCodeInfo)

Payment gateways have many response codes for payment calls. Salesforce uses the result code
            information to map payment gateway codes to a predefined set of standard Salesforce
            result codes.

#### Return Value

Type: void