# GatewayErrorResponse Class

CardPaymentMethodResponse Class This class contains details about the card payment method. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.")
            * **[CardPaymentMethodResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_methods)**  

CardPaymentMethodResponse Methods The following are methods for CardPaymentMethodResponse.
            * **[setAccountId(accountId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAccountId)**  
Sets the Salesforce payments account to which this payment method is linked.
            * **[setAutoPay(autoPay)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAutoPay)**  
Sets whether a token for recurring payments is being requested or not.
            * **[setCardBin(cardBin)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardBin)**  
Sets the card Bank Identification Number (BIN).
            * **[setCardCategory(cardCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardCategory)**  
Sets the card category.
            * **[setCardHolderFirstName(cardHolderFirstName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderFirstName)**  
Sets the first name of the card holder.
            * **[setCardHolderLastName(cardHolderLastName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderLastName)**  
Sets the last name of the card holder.
            * **[setCardHolderName(cardHolderName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderName)**  
Sets the name of the card holder.
            * **[setCardLastFour(cardLastFour)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardLastFour)**  
Sets the last four digits of the card.
            * **[setCardType(cardType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardType)**  
Specifies the type of the credit card issuer.
            * **[setCardTypeCategory(cardTypeCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardTypeCategory)**  
Sets the credit card issuer.
            * **[setComments(comments)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setComments)**  
Sets the notes added by a user for card payment.
            * **[setDisplayCardNumber(displayCardNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setDisplayCardNumber)**  
Sets the display card number.
            * **[setEmail(email)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setEmail)**  
Sets the email address of the card holder.
            * **[setExpiryMonth(expiryMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryMonth)**  
Sets the month of expiry of the card.
            * **[setExpiryYear(expiryYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryYear)**  
Sets the year of expiry of the card.
            * **[setNickName(nickName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setNickName)**  
Sets the nickname of the card.
            * **[setStartMonth(startMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartMonth)**  
Sets the month the card becomes active.
            * **[setStartYear(startYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartYear)**  
Sets the year the card becomes active.
setAccountId(accountId) Sets the Salesforce payments account to which this payment method is linked. Signature public void setAccountId(Id accountId) Parameters

accountId
    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
    Salesforce Payments account to which this payment method is linked.
Return Value Type: void setAutoPay(autoPay) Sets whether a token for recurring payments is being requested or not. Signature public void setAutoPay(Boolean autoPay) Parameters

autoPay
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Indicates whether a token for recurring payments is being requested (true) or not (false). The token lets the payment method be used for recurring payments.
Return Value Type: void setCardBin(cardBin) Sets the card Bank Identification Number (BIN). Signature public void setCardBin(String cardBin) Parameters

cardBin
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Bank Identification Number (BIN). The BIN is the first 4-6 numbers on a payment card that identifies the card issuer.
Return Value Type: void setCardCategory(cardCategory) Sets the card category. Signature public void setCardCategory(commercepayments.CardCategory cardCategory) Parameters

cardCategory
    Type: [CommercePayments.CardCategory](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_CardCategory.htm "Defines whether the payment method represents a credit card or a debit card.")
    Specifies whether it is a credit card or debit card.
Return Value Type: void setCardHolderFirstName(cardHolderFirstName) Sets the first name of the card holder. Signature public void setCardHolderFirstName(String cardHolderFirstName) Parameters

cardHolderFirstName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    First name of the card holder.
Return Value Type: void setCardHolderLastName(cardHolderLastName) Sets the last name of the card holder. Signature public void setCardHolderLastName(String cardHolderLastName) Parameters

cardHolderLastName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Last name of the card holder.
Return Value Type: void setCardHolderName(cardHolderName) Sets the name of the card holder. Signature public void setCardHolderName(String cardHolderName) Parameters

cardHolderName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Card holder name.
Return Value Type: void setCardLastFour(cardLastFour) Sets the last four digits of the card. Signature public void setCardLastFour(String cardLastFour) Parameters

cardLastFour
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")CardPaymentMethodResponse Class This class contains details about the card payment method. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.")
            * **[CardPaymentMethodResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_methods)**  

CardPaymentMethodResponse Methods The following are methods for CardPaymentMethodResponse.
            * **[setAccountId(accountId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAccountId)**  
Sets the Salesforce payments account to which this payment method is linked.
            * **[setAutoPay(autoPay)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAutoPay)**  
Sets whether a token for recurring payments is being requested or not.
            * **[setCardBin(cardBin)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardBin)**  
Sets the card Bank Identification Number (BIN).
            * **[setCardCategory(cardCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardCategory)**  
Sets the card category.
            * **[setCardHolderFirstName(cardHolderFirstName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderFirstName)**  
Sets the first name of the card holder.
            * **[setCardHolderLastName(cardHolderLastName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderLastName)**  
Sets the last name of the card holder.
            * **[setCardHolderName(cardHolderName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderName)**  
Sets the name of the card holder.
            * **[setCardLastFour(cardLastFour)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardLastFour)**  
Sets the last four digits of the card.
            * **[setCardType(cardType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardType)**  
Specifies the type of the credit card issuer.
            * **[setCardTypeCategory(cardTypeCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardTypeCategory)**  
Sets the credit card issuer.
            * **[setComments(comments)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setComments)**  
Sets the notes added by a user for card payment.
            * **[setDisplayCardNumber(displayCardNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setDisplayCardNumber)**  
Sets the display card number.
            * **[setEmail(email)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setEmail)**  
Sets the email address of the card holder.
            * **[setExpiryMonth(expiryMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryMonth)**  
Sets the month of expiry of the card.
            * **[setExpiryYear(expiryYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryYear)**  
Sets the year of expiry of the card.
            * **[setNickName(nickName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setNickName)**  
Sets the nickname of the card.
            * **[setStartMonth(startMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartMonth)**  
Sets the month the card becomes active.
            * **[setStartYear(startYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartYear)**  
Sets the year the card becomes active.
setAccountId(accountId) Sets the Salesforce payments account to which this payment method is linked. Signature public void setAccountId(Id accountId) Parameters

accountId
    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
    Salesforce Payments account to which this payment method is linked.
Return Value Type: void setAutoPay(autoPay) Sets whether a token for recurring payments is being requested or not. Signature public void setAutoPay(Boolean autoPay) Parameters

autoPay
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Indicates whether a token for recurring payments is being requested (true) or not (false). The token lets the payment method be used for recurring payments.
Return Value Type: void setCardBin(cardBin) Sets the card Bank Identification Number (BIN). Signature public void setCardBin(String cardBin) Parameters

cardBin
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Bank Identification Number (BIN). The BIN is the first 4-6 numbers on a payment card that identifies the card issuer.
Return Value Type: void setCardCategory(cardCategory) Sets the card category. Signature public void setCardCategory(commercepayments.CardCategory cardCategory) Parameters

cardCategory
    Type: [CommercePayments.CardCategory](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_CardCategory.htm "Defines whether the payment method represents a credit card or a debit card.")
    Specifies whether it is a credit card or debit card.
Return Value Type: void setCardHolderFirstName(cardHolderFirstName) Sets the first name of the card holder. Signature public void setCardHolderFirstName(String cardHolderFirstName) Parameters

cardHolderFirstName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    First name of the card holder.
Return Value Type: void setCardHolderLastName(cardHolderLastName) Sets the last name of the card holder. Signature public void setCardHolderLastName(String cardHolderLastName) Parameters

cardHolderLastName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Last name of the card holder.
Return Value Type: void setCardHolderName(cardHolderName) Sets the name of the card holder. Signature public void setCardHolderName(String cardHolderName) Parameters

cardHolderName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Card holder name.
Return Value Type: void setCardLastFour(cardLastFour) Sets the last four digits of the card. Signature public void setCardLastFour(String cardLastFour) Parameters

cardLastFour
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Last four digits of the card.
Return Value Type: void setCardType(cardType) Specifies the type of the credit card issuer. Signature public void setCardType(String cardType) Parameters

cardType
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Type of the credit card issuer.
Return Value Type: void setCardTypeCategory(cardTypeCategory) Sets the credit card issuer. Signature public void setCardTypeCategory(commercepayments.CardType cardTypeCategory) Parameters

cardTypeCategory
    Type: [CommercePayments.CardType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_CardType.htm "Specifies the credit card issuer.")
    Credit card issuer.
Return Value Type: void setComments(comments) Sets the notes added by a user for card payment. Signature public void setComments(String comments) Parameters

comments
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Details about a record added by a user, maximum is 1000 characters.
Return Value Type: void setDisplayCardNumber(displayCardNumber) Sets the display card number. Signature public void setDisplayCardNumber(String displayCardNumber) Parameters

displayCardNumber
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Displayed card number.
Return Value Type: void setEmail(email) Sets the email address of the card holder. Signature public void setEmail(String email) Parameters

email
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Email address of the card holder.
Return Value Type: void setExpiryMonth(expiryMonth) Sets the month of expiry of the card. Signature public void setExpiryMonth(Integer expiryMonth) Parameters

expiryMonth
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Month of expiry of the card.
Return Value Type: void setExpiryYear(expiryYear) Sets the year of expiry of the card. Signature public void setExpiryYear(Integer expiryYear) Parameters

expiryYear
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Year of expiry of the card.
Return Value Type: void setNickName(nickName) Sets the nickname of the card. Signature public void setNickName(String nickName) Parameters

nickName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Card nickname.
Return Value Type: void setStartMonth(startMonth) Sets the month the card becomes active. Signature public void setStartMonth(Integer startMonth) Parameters

startMonth
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Determines from which month the card becomes active.
Return Value Type: void setStartYear(startYear) Sets the year the card becomes active. Signature public void setStartYear(Integer startYear) Parameters

startYear
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Determines from which year the card becomes active.
Return Value Type: void CaptureResponse Class The payment gateway adapter sends this response for the capture request type. This class extends AbstractResponse and inherits its methods. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage You must specify the CommercePayments namespace when creating an instance of this class. The constructor of this class takes no arguments. For example: CommercePayments.Capture Response ctr = new CommercePayments.CaptureResponse();
            * **[CaptureResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_methods)**  

CaptureResponse Methods The following are methods for CaptureResponse.
            * **[setAmount(amount)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setAmount)**  
Sets the transaction amount.
            * **[setAsync(async)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commercepayments_CaptureResponse_setAsync)**  
Indicates whether the payment gateway adapter used in the payment capture was asynchronous (True) or synchronous (False).
            * **[setGatewayAvsCode(gatewayAvsCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayAvsCode)**  
Sets the payment gateway’s AVS (address verification system) code.
            * **[setGatewayDate(gatewayDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayDate)**  
Sets the payment gateway’s date.
            * **[setGatewayMessage(gatewayMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayMessage)**  
Sets information or messages that the gateway returned.
            * **[setGatewayReferenceDetails(gatewayReferenceDetails)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayReferenceDetails)**  
Sets the payment gateway’s reference details.
            * **[setGatewayReferenceNumber(gatewayReferenceNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayReferenceNumber)**  
Sets the payment gateway’s reference number.
            * **[setGatewayResultCode(gatewayResultCode)CardPaymentMethodResponse Class This class contains details about the card payment method. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.")
              * **[CardPaymentMethodResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_methods)**  

CardPaymentMethodResponse Methods The following are methods for CardPaymentMethodResponse.
              * **[setAccountId(accountId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAccountId)**  
Sets the Salesforce payments account to which this payment method is linked.
              * **[setAutoPay(autoPay)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAutoPay)**  
Sets whether a token for recurring payments is being requested or not.
              * **[setCardBin(cardBin)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardBin)**  
Sets the card Bank Identification Number (BIN).
              * **[setCardCategory(cardCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardCategory)**  
Sets the card category.
              * **[setCardHolderFirstName(cardHolderFirstName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderFirstName)**  
Sets the first name of the card holder.
              * **[setCardHolderLastName(cardHolderLastName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderLastName)**  
Sets the last name of the card holder.
              * **[setCardHolderName(cardHolderName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderName)**  
Sets the name of the card holder.
              * **[setCardLastFour(cardLastFour)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardLastFour)**  
Sets the last four digits of the card.
              * **[setCardType(cardType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardType)**  
Specifies the type of the credit card issuer.
              * **[setCardTypeCategory(cardTypeCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardTypeCategory)**  
Sets the credit card issuer.
              * **[setComments(comments)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setComments)**  
Sets the notes added by a user for card payment.
              * **[setDisplayCardNumber(displayCardNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setDisplayCardNumber)**  
Sets the display card number.
              * **[setEmail(email)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setEmail)**  
Sets the email address of the card holder.
              * **[setExpiryMonth(expiryMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryMonth)**  
Sets the month of expiry of the card.
              * **[setExpiryYear(expiryYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryYear)**  
Sets the year of expiry of the card.
              * **[setNickName(nickName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setNickName)**  
Sets the nickname of the card.
              * **[setStartMonth(startMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartMonth)**  
Sets the month the card becomes active.
              * **[setStartYear(startYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartYear)**  
Sets the year the card becomes active.
setAccountId(accountId) Sets the Salesforce payments account to which this payment method is linked. Signature public void setAccountId(Id accountId) Parameters

accountId
    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")
    Salesforce Payments account to which this payment method is linked.
Return Value Type: void setAutoPay(autoPay) Sets whether a token for recurring payments is being requested or not. Signature public void setAutoPay(Boolean autoPay) Parameters

autoPay
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Indicates whether a token for recurring payments is being requested (true) or not (false). The token lets the payment method be used for recurring payments.
Return Value Type: void setCardBin(cardBin) Sets the card Bank Identification Number (BIN). Signature public void setCardBin(String cardBin) Parameters

cardBin
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Bank Identification Number (BIN). The BIN is the first 4-6 numbers on a payment card that identifies the card issuer.
Return Value Type: void setCardCategory(cardCategory) Sets the card category. Signature public void setCardCategory(commercepayments.CardCategory cardCategory) Parameters

cardCategory
    Type: [CommercePayments.CardCategory](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_CardCategory.htm "Defines whether the payment method represents a credit card or a debit card.")
    Specifies whether it is a credit card or debit card.
Return Value Type: void setCardHolderFirstName(cardHolderFirstName) Sets the first name of the card holder. Signature public void setCardHolderFirstName(String cardHolderFirstName) Parameters

cardHolderFirstName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    First name of the card holder.
Return Value Type: void setCardHolderLastName(cardHolderLastName) Sets the last name of the card holder. Signature public void setCardHolderLastName(String cardHolderLastName) Parameters

cardHolderLastName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Last name of the card holder.
Return Value Type: void setCardHolderName(cardHolderName) Sets the name of the card holder. Signature public void setCardHolderName(String cardHolderName) Parameters

cardHolderName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Card holder name.
Return Value Type: void setCardLastFour(cardLastFour) Sets the last four digits of the card. Signature public void setCardLastFour(String cardLastFour) Parameters

cardLastFour
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Last four digits of the card.
Return Value Type: void setCardType(cardType) Specifies the type of the credit card issuer. Signature public void setCardType(String cardType) Parameters

cardType
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Type of the credit card issuer.
Return Value Type: void setCardTypeCategory(cardTypeCategory) Sets the credit card issuer. Signature public void setCardTypeCategory(commercepayments.CardType cardTypeCategory) Parameters

cardTypeCategory
    Type: [CommercePayments.CardType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_CardType.htm "Specifies the credit card issuer.")
    Credit card issuer.
Return Value Type: void setComments(comments) Sets the notes added by a user for card payment. Signature public void setComments(String comments) Parameters

comments
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Details about a record added by a user, maximum is 1000 characters.
Return Value Type: void setDisplayCardNumber(displayCardNumber) Sets the display card number. Signature public void setDisplayCardNumber(String displayCardNumber) Parameters

displayCardNumber
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Displayed card number.
Return Value Type: void setEmail(email) Sets the email address of the card holder. Signature public void setEmail(String email) Parameters

email
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Email address of the card holder.
Return Value Type: void setExpiryMonth(expiryMonth) Sets the month of expiry of the card. Signature public void setExpiryMonth(Integer expiryMonth) Parameters

expiryMonth
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Month of expiry of the card.
Return Value Type: void setExpiryYear(expiryYear) Sets the year of expiry of the card. Signature public void setExpiryYear(Integer expiryYear) Parameters

expiryYear
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Year of expiry of the card.
Return Value Type: void setNickName(nickName) Sets the nickname of the card. Signature public void setNickName(String nickName) Parameters

nickName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Card nickname.
Return Value Type: void setStartMonth(startMonth) Sets the month the card becomes active. Signature public void setStartMonth(Integer startMonth) Parameters

startMonth
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Determines from which month the card becomes active.
Return Value Type: void setStartYear(startYear) Sets the year the card becomes active. Signature public void setStartYear(Integer startYear) Parameters

startYear
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    Determines from which year the card becomes active.
Return Value Type: void CaptureResponse Class The payment gateway adapter sends this response for the capture request type. This class extends AbstractResponse and inherits its methods. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage You must specify the CommercePayments namespace when creating an instance of this class. The constructor of this class takes no arguments. For example: CommercePayments.Capture Response ctr = new CommercePayments.CaptureResponse();
              * **[CaptureResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_methods)**  

CaptureResponse Methods The following are methods for CaptureResponse.
              * **[setAmount(amount)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setAmount)**  
Sets the transaction amount.
              * **[setAsync(async)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commercepayments_CaptureResponse_setAsync)**  
Indicates whether the payment gateway adapter used in the payment capture was asynchronous (True) or synchronous (False).
              * **[setGatewayAvsCode(gatewayAvsCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayAvsCode)**  
Sets the payment gateway’s AVS (address verification system) code.
              * **[setGatewayDate(gatewayDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayDate)**  
Sets the payment gateway’s date.
              * **[setGatewayMessage(gatewayMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayMessage)**  
Sets information or messages that the gateway returned.
              * **[setGatewayReferenceDetails(gatewayReferenceDetails)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayReferenceDetails)**  
Sets the payment gateway’s reference details.
              * **[setGatewayReferenceNumber(gatewayReferenceNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayReferenceNumber)**  
Sets the payment gateway’s reference number.
              * **[setGatewayResultCode(gatewayResultCode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayResultCode)**  
Sets the payment gateway’s result code.
              * **[setGatewayResultCodeDescription(gatewayResultCodeDescription)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayResultCodeDescription)**  
Sets the payment gateway’s result code description.
              * **[setSalesforceResultCodeInfo(salesforceResultCodeInfo)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setSalesforceResultCodeInfo)**  
Sets Salesforce result code information.
setAmount(amount) Sets the transaction amount. Signature global void setAmount(Double amount) Parameters

amount
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The amount to be debited or captured.
Return Value Type: void setAsync(async) Indicates whether the payment gateway adapter used in the payment capture was asynchronous (True) or synchronous (False). Signature global void setAsync(Boolean async) Parameters

async
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
Return Value Type: void setGatewayAvsCode(gatewayAvsCode) Sets the payment gateway’s AVS (address verification system) code. Signature global void setGatewayAvsCode(String gatewayAvsCode) Parameters

gatewayAvsCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Payment gateways that use an AVS system return this code.
Return Value Type: void setGatewayDate(gatewayDate) Sets the payment gateway’s date. Signature global void setGatewayDate(Datetime gatewayDate) Parameters

gatewayDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    The date that communication happened with the gateway.
Return Value Type: void setGatewayMessage(gatewayMessage) Sets information or messages that the gateway returned. Signature global void setGatewayMessage(String gatewayMessage) Parameters

gatewayMessage
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Information or error messages returned by the gateway.
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
    The gateway result code. You must map this to a Salesforce result code.
Return Value Type: void setGatewayResultCodeDescription(gatewayResultCodeDescription) Sets the payment gateway’s result code description. Signature global void setGatewayResultCodeDescription(String gatewayResultCodeDescription) Parameters

gatewayResultCodeDescription
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Description of the GatewayResultCode. Provides additional context about the result code that the gateway returned.
Return Value Type: void setSalesforceResultCodeInfo(salesforceResultCodeInfo) Sets Salesforce result code information. Signature global void setSalesforceResultCodeInfo(commercepayments.SalesforceResultCodeInfo salesforceResultCodeInfo) Parameters

salesforceResultCodeInfo
     [SalesforceResultCodeInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_SalesforceResultCodeInfo.htm#apex_class_commerce_payments_SalesforceResultCodeInfo "Stores Salesforce result code information from payment gateway adapters.")Type: commercepayments.SalesforceResultCodeInfo
    Description of the Salesforce result code value.
Return Value Type: void GatewayErrorResponse Class Use to respond with an error indication following errors from the PaymentGateway adapter, such as request-forbidden responses, custom validation errors, or expired API tokens. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.") Usage Use GatewayErrorResponse to create an object that stores information about error responses sent by the payment gateway adapter. Example If GatewayResponse receives an exception rather than a valid request, it calls GatewayErrorResponse to create an error object with information about the exception.
[code]global commercepayments.GatewayResponse processRequest(commercepayments.paymentGatewayContext gatewayContext) {
            commercepayments.RequestType requestType = gatewayContext.getPaymentRequestType();
            commercepayments.GatewayResponse response;
            try {
                if (requestType == commercepayments.RequestType.Authorize) {
                    response = createAuthResponse((commercepayments.AuthorizationRequest)gatewayContext.getPaymentRequest());
                } else if (requestType == commercepayments.RequestType.Capture) {
                    response =  createCaptureResponse((commercepayments.CaptureRequest)gatewayContext.getPaymentRequest()) ;
                } else if (requestType == commercepayments.RequestType.ReferencedRefund) {
                    response = createRefundResponse((commercepayments.ReferencedRefundRequest)gatewayContext.getPaymentRequest());
                }
                return response;
            } catch(SalesforceValidationException e) {
                 commercepayments.GatewayErrorResponse error = new commercepayments.GatewayErrorResponse('400', e.getMessage());
                 return error;
            }
        }
[/code]

              * **[GatewayErrorResponse Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_GatewayErrorResponse.htm#apex_commerce_payments_GatewayErrorResponse_constructors)**  

GatewayErrorResponse Constructors The following are constructors for GatewayErrorResponse.
              * **[GatewayErrorResponse(errorCode, errorMessage)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_GatewayErrorResponse.htm#apex_commerce_payments_GatewayErrorResponse_ctor)**  
Constructor to create a GatewayErrorResponse object that accepts errorCode and errorMessage.
GatewayErrorResponse(errorCode, errorMessage) Constructor to create a GatewayErrorResponse object that accepts errorCode and errorMessage. Signature global GatewayErrorResponse(String errorCode, String errorMessage) Parameters

errorCode
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Should match with the HTTP status code to be returned to the user. Here are a few examples. 
              * If the status code is for a bad request, the errorCode should be 400. 
              * If the status code is for a forbidden request, errorCode should be 403.
              * If errorCode isn’t a valid HTTP status code, a 500 internal server error is returned.
Note errorCode must have a value, otherwise the platform throws an error.
errorMessage
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The message response to users following an error.
     Note errorMessage must have a value, otherwise the platform throws an error.
