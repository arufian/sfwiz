# CardPaymentMethodResponse Class

# CardPaymentMethodResponse Class

This class contains details about the card payment method.

## Namespace

[CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm)

- 
**[CardPaymentMethodResponse Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_methods)**

## CardPaymentMethodResponse Methods

The following are methods for `CardPaymentMethodResponse`.

- 
**[setAccountId(accountId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAccountId)**

Sets the Salesforce payments account to which this payment method is linked.

- 
**[setAutoPay(autoPay)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setAutoPay)**

Sets whether a token for recurring payments is being requested or not.

- 
**[setCardBin(cardBin)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardBin)**

Sets the card Bank Identification Number (BIN).

- 
**[setCardCategory(cardCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardCategory)**

Sets the card category.

- 
**[setCardHolderFirstName(cardHolderFirstName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderFirstName)**

Sets the first name of the card holder.

- 
**[setCardHolderLastName(cardHolderLastName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderLastName)**

Sets the last name of the card holder.

- 
**[setCardHolderName(cardHolderName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardHolderName)**

Sets the name of the card holder.

- 
**[setCardLastFour(cardLastFour)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardLastFour)**

Sets the last four digits of the card.

- 
**[setCardType(cardType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardType)**

Specifies the type of the credit card issuer.

- 
**[setCardTypeCategory(cardTypeCategory)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setCardTypeCategory)**

Sets the credit card issuer.

- 
**[setComments(comments)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setComments)**

Sets the notes added by a user for card payment.

- 
**[setDisplayCardNumber(displayCardNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setDisplayCardNumber)**

Sets the display card number.

- 
**[setEmail(email)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setEmail)**

Sets the email address of the card holder.

- 
**[setExpiryMonth(expiryMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryMonth)**

Sets the month of expiry of the card.

- 
**[setExpiryYear(expiryYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setExpiryYear)**

Sets the year of expiry of the card.

- 
**[setNickName(nickName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setNickName)**

Sets the nickname of the card.

- 
**[setStartMonth(startMonth)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartMonth)**

Sets the month the card becomes active.

- 
**[setStartYear(startYear)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CardPaymentMethodResponse.htm#apex_commercepayments_CardPaymentMethodResponse_setStartYear)**

Sets the year the card becomes active.

### setAccountId(accountId)

Sets the Salesforce payments account to which this payment method is linked.

#### Signature

`public void setAccountId(Id accountId)`

#### Parameters

accountId
Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

Salesforce Payments account to which this payment method is linked.

#### Return Value

Type: void

### setAutoPay(autoPay)

Sets whether a token for recurring payments is being requested or not.

#### Signature

`public void setAutoPay(Boolean autoPay)`

#### Parameters

autoPay
Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

Indicates whether a token for recurring payments is being requested (`true`) or not (`false`). The token lets the payment method be used for recurring
            payments.

#### Return Value

Type: void

### setCardBin(cardBin)

Sets the card Bank Identification Number (BIN).

#### Signature

`public void setCardBin(String cardBin)`

#### Parameters

cardBin
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Bank Identification Number (BIN). The BIN is the first 4-6 numbers on a payment card that
            identifies the card issuer.

#### Return Value

Type: void

### setCardCategory(cardCategory)

Sets the card category.

#### Signature

`public void setCardCategory(commercepayments.CardCategory cardCategory)`

#### Parameters

cardCategory
Type: [CommercePayments.CardCategory](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_CardCategory.htm)

Specifies whether it is a credit card or debit card.

#### Return Value

Type: void

### setCardHolderFirstName(cardHolderFirstName)

Sets the first name of the card holder.

#### Signature

`public void setCardHolderFirstName(String cardHolderFirstName)`

#### Parameters

cardHolderFirstName
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

First name of the card holder.

#### Return Value

Type: void

### setCardHolderLastName(cardHolderLastName)

Sets the last name of the card holder.

#### Signature

`public void setCardHolderLastName(String cardHolderLastName)`

#### Parameters

cardHolderLastName
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Last name of the card holder.

#### Return Value

Type: void

### setCardHolderName(cardHolderName)

Sets the name of the card holder.

#### Signature

`public void setCardHolderName(String cardHolderName)`

#### Parameters

cardHolderName
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Card holder name.

#### Return Value

Type: void

### setCardLastFour(cardLastFour)

Sets the last four digits of the card.

#### Signature

`public void setCardLastFour(String cardLastFour)`

#### Parameters

cardLastFour
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Last four digits of the card.

#### Return Value

Type: void

### setCardType(cardType)

Specifies the type of the credit card issuer.

#### Signature

`public void setCardType(String cardType)`

#### Parameters

cardType
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Type of the credit card issuer.

#### Return Value

Type: void

### setCardTypeCategory(cardTypeCategory)

Sets the credit card issuer.

#### Signature

`public void setCardTypeCategory(commercepayments.CardType cardTypeCategory)`

#### Parameters

cardTypeCategory
Type: [CommercePayments.CardType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_commercepayments_CardType.htm)

Credit card issuer.

#### Return Value

Type: void

### setComments(comments)

Sets the notes added by a user for card payment.

#### Signature

`public void setComments(String comments)`

#### Parameters

comments
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Details about a record added by a user, maximum is 1000 characters.

#### Return Value

Type: void

### setDisplayCardNumber(displayCardNumber)

Sets the display card number.

#### Signature

`public void setDisplayCardNumber(String displayCardNumber)`

#### Parameters

displayCardNumber
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Displayed card number.

#### Return Value

Type: void

### setEmail(email)

Sets the email address of the card holder.

#### Signature

`public void setEmail(String email)`

#### Parameters

email
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Email address of the card holder.

#### Return Value

Type: void

### setExpiryMonth(expiryMonth)

Sets the month of expiry of the card.

#### Signature

`public void setExpiryMonth(Integer expiryMonth)`

#### Parameters

expiryMonth
Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

Month of expiry of the card.

#### Return Value

Type: void

### setExpiryYear(expiryYear)

Sets the year of expiry of the card.

#### Signature

`public void setExpiryYear(Integer expiryYear)`

#### Parameters

expiryYear
Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

Year of expiry of the card.

#### Return Value

Type: void

### setNickName(nickName)

Sets the nickname of the card.

#### Signature

`public void setNickName(String nickName)`

#### Parameters

nickName
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Card nickname.

#### Return Value

Type: void

### setStartMonth(startMonth)

Sets the month the card becomes active.

#### Signature

`public void setStartMonth(Integer startMonth)`

#### Parameters

startMonth
Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

Determines from which month the card becomes active.

#### Return Value

Type: void

### setStartYear(startYear)

Sets the year the card becomes active.

#### Signature

`public void setStartYear(Integer startYear)`

#### Parameters

startYear
Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

Determines from which year the card becomes active.

#### Return Value

Type: void