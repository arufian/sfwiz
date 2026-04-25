# RefundRequest Class

RefundRequest Class Sends data related to a refund to the payment gateway adapter. Namespace CommercePayments Usage The constructor of this class takes no arguments. For example: CommercePayments.RefundRequest rrq = new CommercePayments.RefundRequest(); Example
[code] commercepayments.ReferencedRefundRequest refundRequest = new commercepayments.ReferencedRefundRequest(80, pmt.id);
[/code]

              * **[RefundRequest Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_RefundRequest.htm#apex_commercepayments_RefundRequest_methods)**  

RefundRequest Methods The following are methods for RefundRequest.
              * **[equals(obj)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_RefundRequest.htm#apex_commercepayments_RefundRequest_equals)**  
Maintains the integrity of lists of type RefundRequest by determining the equality of external objects in a list. This method is dynamic and is based on the equals method in Java.
              * **[hashCode()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercepayments_RefundRequest.htm#apex_commercepayments_RefundRequest_hashCode)**  
Maintains the integrity of lists of type RefundRequest by determining the uniqueness of the external object records in a list.
equals(obj) Maintains the integrity of lists of type RefundRequest by determining the equality of external objects in a list. This method is dynamic and is based on the equals method in Java. Signature global Boolean equals(Object obj) Parameters

obj
    Type: Object
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") hashCode() Maintains the integrity of lists of type RefundRequest by determining the uniqueness of the external object records in a list. Signature global Integer hashCode() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
