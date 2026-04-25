# InboundEmail.Header Class

InboundEmail.Header Class An InboundEmail object stores RFC 2822 email header information in an InboundEmail.Header object with the following properties. Namespace [Messaging](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Messaging.htm "The Messaging namespace provides classes and methods for Salesforce outbound and inbound email functionality.") InboundEmail.Header Properties The following are properties for InboundEmail.Header.
                  * **[name](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_header.htm#apex_Messaging_InboundEmail_Header_name)**  
The name of the header parameter, such as Date or Message-ID.
                  * **[value](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_header.htm#apex_Messaging_InboundEmail_Header_value)**  
The value of the header.
name The name of the header parameter, such as Date or Message-ID. Signature public String name {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") value The value of the header. Signature public String value {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") See Also
                  * [_Apex Developer Guide_ : Apex Email Service](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_classes_email_inbound_what_is.htm)
                  * [_Apex Developer Guide_ : Using the InboundEmail Object](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_classes_email_inbound_using.htm)
                  * [_Apex Developer Guide_ : Inbound Email](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_classes_email_inbound.htm)
                  * [_Internet Engineering Task Force (IETF) Data Tracker_ : RFC 2822 Section 3.6](https://datatracker.ietf.org/doc/html/rfc2822#section-3.6)
