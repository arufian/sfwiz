# InboundEnvelope Class

InboundEnvelope Class The InboundEnvelope object stores the envelope information associated with the inbound email, and has the following fields. Namespace [Messaging](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Messaging.htm "The Messaging namespace provides classes and methods for Salesforce outbound and inbound email functionality.") InboundEnvelope Properties The following are properties for InboundEnvelope.
                  * **[fromAddress](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_envelope.htm#apex_Messaging_InboundEnvelope_fromAddress)**  
The name that appears in the From field of the envelope, if any.
                  * **[toAddress](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_envelope.htm#apex_Messaging_InboundEnvelope_toAddress)**  
The name that appears in the To field of the envelope, if any.
fromAddress The name that appears in the From field of the envelope, if any. Signature public String fromAddress {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") toAddress The name that appears in the To field of the envelope, if any. Signature public String toAddress {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
