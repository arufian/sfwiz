# CustomMetadataTypeInfo Class

](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CaptureResponse.htm#apex_commerce_payments_CaptureResponse_setGatewayResultCode)CustomMetadataTypeInfo Class Access information about custom metadata. The PaymentGatewayAdapter can send CustomMetadataTypeInfo to transaction requests through the response object’s SalesforceResultCodeInfo. Namespace [CommercePayments](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_commercepayments.htm "Use the CommercePayments namespace to provide a safe and customizable platform for managing customer payments and refunds.")
              * **[CustomMetadataTypeInfo Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CustomMetadataTypeInfo.htm#apex_commerce_payments_CustomMetadataTypeInfo_constructors)**  

              * **[CustomMetadataTypeInfo Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CustomMetadataTypeInfo.htm#apex_commerce_payments_CustomMetadataTypeInfo_methods)**  

CustomMetadataTypeInfo Constructors The following are constructors for CustomMetadataTypeInfo.
              * **[CustomMetadataTypeInfo(cmtRecordId, cmtSfResultCodeFieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_CustomMetadataTypeInfo.htm#apex_commerce_payments_CustomMetadataTypeInfo_ctor)**  
Constructor for providing custom metadata type information.
CustomMetadataTypeInfo(cmtRecordId, cmtSfResultCodeFieldName) Constructor for providing custom metadata type information. Signature global CustomMetadataTypeInfo(String cmtRecordId, String cmtSfResultCodeFieldName) Parameters

cmtRecordId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    ID of the matchedcustom metadata type record
cmtSfResultCodeFieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Field that contains the Salesforce result code values. Belongs to the custom metadata type.
CustomMetadataTypeInfo Methods The following are methods for CustomMetadataTypeInfo.
