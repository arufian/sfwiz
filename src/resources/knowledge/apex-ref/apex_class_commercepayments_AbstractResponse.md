# AbstractResponse Class

# AbstractResponse Class

Contains the normalized response fields from payment gateways that are
      common to all the other gateway responses.

    
## Namespace

      
      [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm)

    

    
## Usage

You must specify the `CommercePayments` namespace when creating an instance of this class. The
        constructor of this class takes no arguments. For example:

`CommercePayments.AbstractResponse abr = new
        CommercePayments.AbstractResponse();`This class can’t be instantiated on its own.
        This class implements the GatewayResponse class. Other GatewayResponse classes extend this
        class to inherit common properties.

  

- 
**[AbstractResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractResponse.htm#apex_commerce_payments_AbstractResponse_methods)**

## AbstractResponse Methods

    
      The following are methods for `AbstractResponse`.

    

  

- 
**[setGatewayAvsCode(gatewayAvsCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractResponse.htm#apex_commerce_payments_AbstractResponse_setGatewayAvsCode)**

Sets the AVS (address verification system) result code information       that the gateway returned. Maximum length of 64 characters.

- 
**[setGatewayDate(gatewayDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractResponse.htm#apex_commerce_payments_AbstractResponse_setGatewayDate)**

Sets the date that the transaction occurred. Some gateways don’t send       this value.

- 
**[setGatewayMessage(gatewayMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractResponse.htm#apex_commerce_payments_AbstractResponse_setGatewayMessage)**

Sets error messages that the gateway returned for the payment request.       Maximum length of 255 characters.

- 
**[setGatewayResultCode(gatewayResultCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractResponse.htm#apex_commerce_payments_AbstractResponse_setGatewayResultCode)**

Sets a gateway-specific result code. The code may be mapped to a       Salesforce-specific result code. Maximum length of 64 characters.

- 
**[setGatewayResultCodeDescription(gatewayResultCodeDescription)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractResponse.htm#apex_commerce_payments_AbstractResponse_setGatewayResultCodeDescription)**

Sets a description of the gateway-specific result code that a payment       gateway returned. Maximum length of 1000 characters.

- 
**[setSalesforceResultCodeInfo(salesforceResultCodeInfo)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_AbstractResponse.htm#apex_commerce_payments_AbstractResponse_setSalesforceResultCodeInfo)**

Sets the Salesforce-specific result code information. Payment gateways       have many response codes for payment calls. Salesforce uses the result code information to map       payment gateway codes to a predefined set of standard Salesforce result     codes.

### setGatewayAvsCode(gatewayAvsCode)

Sets the AVS (address verification system) result code information
      that the gateway returned. Maximum length of 64 characters.

#### Signature

`global void setGatewayAvsCode(String gatewayAvsCode)`

#### Parameters

          gatewayAvsCode

          Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          Code sent by gateways that use an address verification
            system.

        

#### Return Value

Type: void

### setGatewayDate(gatewayDate)

Sets the date that the transaction occurred. Some gateways don’t send
      this value.

#### Signature

`global void setGatewayDate(Datetime gatewayDate)`

#### Parameters

gatewayDate
Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

Date and time of the gateway communication.

#### Return Value

Type: void

### setGatewayMessage(gatewayMessage)

Sets error messages that the gateway returned for the payment request.
      Maximum length of 255 characters.

#### Signature

`global void setGatewayMessage(String gatewayMessage)`

#### Parameters

gatewayMessage
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Information on error messages sent from the gateway.

#### Return Value

Type: void

### setGatewayResultCode(gatewayResultCode)

Sets a gateway-specific result code. The code may be mapped to a
      Salesforce-specific result code. Maximum length of 64 characters.

#### Signature

`global void setGatewayResultCode(String
          gatewayResultCode)`

#### Parameters

gatewayResultCode
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Gateway-specific result code.
            Must
            be used to map a Salesforce-specific result code.

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

Description of the gateway’s result code. Use this field to learn more about why the gateway
            returned a certain result code.

#### Return Value

Type: void

### setSalesforceResultCodeInfo(salesforceResultCodeInfo)

Sets the Salesforce-specific result code information. Payment gateways
      have many response codes for payment calls. Salesforce uses the result code information to map
      payment gateway codes to a predefined set of standard Salesforce result
    codes.

#### Signature

`global void
          setSalesforceResultCodeInfo(commercepayments.SalesforceResultCodeInfo
          salesforceResultCodeInfo)`

#### Parameters

salesforceResultCodeInfo
Type: [commercepayments.SalesforceResultCodeInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SalesforceResultCodeInfo.htm#apex_class_commerce_payments_SalesforceResultCodeInfo)

Description of the Salesforce result code value.

#### Return Value

Type: void