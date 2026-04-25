# Documentation Typographical Conventions

Message Class Contains validation errors that occur when the user saves the page that uses a standard controller. Namespace [ApexPages](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_ApexPages.htm "The ApexPages namespace provides classes used in Visualforce controllers.") Usage When using a standard controller, all validation errors, both custom and standard, that occur when the user saves the page are automatically added to the page error collections. If an inputField component is bound to the field with an error, the message is added to the component’s error collection. All messages are added to the page’s error collection. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm#validation_rules_and_standard_controllers "HTML \(New Window\)") in the Visualforce Developer's Guide. If your application uses a custom controller or extension, you must use the message class for collecting errors.  Instantiation In a custom controller or controller extension, you can instantiate a Message in one of these ways:
                                    * 
[code]ApexPages.Message myMsg = new ApexPages.Message(ApexPages.severity, summary);
[/code]

where ApexPages.severity is the enum that determines how severe a message is, and summary is the String used to summarize the message. For example:
[code] ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.FATAL, 'my error msg');
[/code]

                                    * 
[code]ApexPages.Message myMsg = new ApexPages.Message(ApexPages.severity, summary, detail);
[/code]

where ApexPages. severity is the enum that determines how severe a message is, summary is the String used to summarize the message, and detail is the String used to provide more detailed information about the error. 
ApexPages.Severity Enum To specify the severity of the message, use the ApexPages.Severity enum values. The following are the valid values: 
                                    * CONFIRM
                                    * ERROR
                                    * FATAL
                                    * INFO
                                    * WARNING
All enums have access to standard methods, such as name and value.
                                    * **[Message Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_constructors)**  

                                    * **[Message Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_methods)**  

Message Constructors The following are constructors for Message.
                                    * **[Message(severity, summary)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_ctor_3)**  
Creates a new instance of the ApexPages.Message class using the specified message severity and summary.
                                    * **[Message(severity, summary, detail)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_ctor_2)**  
Creates a new instance of the ApexPages.Message class using the specified message severity, summary, and message detail.
                                    * **[Message(severity, summary, detail, id)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_ctor)**  
Creates a new instance of the ApexPages.Message class using the specified severity, summary, detail, and component ID.
Message(severity, summary) Creates a new instance of the ApexPages.Message class using the specified message severity and summary. Signature public Message(ApexPages.Severity severity, String summary) Parameters

severity
    Type: ApexPages.Severity
    The severity of a Visualforce message.
summary
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The summary Visualforce message.
Message(severity, summary, detail) Creates a new instance of the ApexPages.Message class using the specified message severity, summary, and message detail. Signature public Message(ApexPages.Severity severity, String summary, String detail) Parameters

severity
    Type: ApexPages.Severity
    The severity of a Visualforce message.
summary
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The summary Visualforce message.
detail
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The detailed Visualforce message.
Message(severity, summary, detail, id) Creates a new instance of the ApexPages.Message class using the specified severity, summary, detail, and component ID. Signature public Message(ApexPages.Severity severity, String summary, String detail, String id) Parameters

severity
    Type: ApexPages.Severity
    The severity of a Visualforce message.
summary
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The summary Visualforce message.
detail
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The detailed Visualforce message.
id
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The ID of the Visualforce component to associate with the message, for example, a form field with an error.
Message Methods The following are methods for Message. All are instance methods.
                                    * **[getComponentLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getComponentLabel)**  
Returns the label of the associated inputField component. If no label is defined, this method returns null.
                                    * **[getDetail()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getDetail)**  
Returns the value of the detail parameter used to create the message. If no detail String was specified, this method returns null.
                                    * **[getSeverity()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getSeverity)**  
Returns the severity enum used to create the message. 
                                    * **[getSummary()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getSummary)**  
Returns the summary String used to create the message.
getComponentLabel() Returns the label of the associated inputField component. If no label is defined, this method returns null. Signature public String getComponentLabel() Return Value Type: # [Message Class Contains validation errors that occur when the user saves the page that uses a standard controller. Namespace [ApexPages](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_ApexPages.htm "The ApexPages namespace provides classes used in Visualforce controllers.") Usage When using a standard controller, all validation errors, both custom and standard, that occur when the user saves the page are automatically added to the page error collections. If an inputField component is bound to the field with an error, the message is added to the component’s error collection. All messages are added to the page’s error collection. For more information, see [Validation Rules and Standard Controllers](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_controller_std.htm#validation_rules_and_standard_controllers "HTML \(New Window\)") in the Visualforce Developer's Guide. If your application uses a custom controller or extension, you must use the message class for collecting errors.  Instantiation In a custom controller or controller extension, you can instantiate a Message in one of these ways:
                                    * 
[code]ApexPages.Message myMsg = new ApexPages.Message(ApexPages.severity, summary);
[/code]

where ApexPages.severity is the enum that determines how severe a message is, and summary is the String used to summarize the message. For example:
[code] ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.FATAL, 'my error msg');
[/code]

                                    * 
[code]ApexPages.Message myMsg = new ApexPages.Message(ApexPages.severity, summary, detail);
[/code]

where ApexPages. severity is the enum that determines how severe a message is, summary is the String used to summarize the message, and detail is the String used to provide more detailed information about the error. 
ApexPages.Severity Enum To specify the severity of the message, use the ApexPages.Severity enum values. The following are the valid values: 
                                    * CONFIRM
                                    * ERROR
                                    * FATAL
                                    * INFO
                                    * WARNING
All enums have access to standard methods, such as name and value.
                                    * **[Message Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_constructors)**  

                                    * **[Message Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_methods)**  

Message Constructors The following are constructors for Message.
                                    * **[Message(severity, summary)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_ctor_3)**  
Creates a new instance of the ApexPages.Message class using the specified message severity and summary.
                                    * **[Message(severity, summary, detail)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_ctor_2)**  
Creates a new instance of the ApexPages.Message class using the specified message severity, summary, and message detail.
                                    * **[Message(severity, summary, detail, id)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_ctor)**  
Creates a new instance of the ApexPages.Message class using the specified severity, summary, detail, and component ID.
Message(severity, summary) Creates a new instance of the ApexPages.Message class using the specified message severity and summary. Signature public Message(ApexPages.Severity severity, String summary) Parameters

severity
    Type: ApexPages.Severity
    The severity of a Visualforce message.
summary
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The summary Visualforce message.
Message(severity, summary, detail) Creates a new instance of the ApexPages.Message class using the specified message severity, summary, and message detail. Signature public Message(ApexPages.Severity severity, String summary, String detail) Parameters

severity
    Type: ApexPages.Severity
    The severity of a Visualforce message.
summary
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The summary Visualforce message.
detail
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The detailed Visualforce message.
Message(severity, summary, detail, id) Creates a new instance of the ApexPages.Message class using the specified severity, summary, detail, and component ID. Signature public Message(ApexPages.Severity severity, String summary, String detail, String id) Parameters

severity
    Type: ApexPages.Severity
    The severity of a Visualforce message.
summary
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The summary Visualforce message.
detail
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The detailed Visualforce message.
id
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The ID of the Visualforce component to associate with the message, for example, a form field with an error.
Message Methods The following are methods for Message. All are instance methods.
                                    * **[getComponentLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getComponentLabel)**  
Returns the label of the associated inputField component. If no label is defined, this method returns null.
                                    * **[getDetail()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getDetail)**  
Returns the value of the detail parameter used to create the message. If no detail String was specified, this method returns null.
                                    * **[getSeverity()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getSeverity)**  
Returns the severity enum used to create the message. 
                                    * **[getSummary()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_message.htm#apex_ApexPages_Message_getSummary)**  
Returns the summary String used to create the message.
getComponentLabel() Returns the label of the associated inputField component. If no label is defined, this method returns null. Signature public String getComponentLabel() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getDetail() Returns the value of the detail parameter used to create the message. If no detail String was specified, this method returns null. Signature public String getDetail() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSeverity() Returns the severity enum used to create the message.  Signature public ApexPages.Severity getSeverity() Return Value Type: ApexPages.Severity getSummary() Returns the summary String used to create the message. Signature public String getSummary() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Documentation Typographical Conventions Apex and Visualforce documentation uses these typographical conventions. Convention | Description   
---|---  
Courier font | In descriptions of syntax, a monospace font indicates items that you should type as shown, except for brackets. For example: 
[code]Public class HelloWorld 
    
[/code]  
  
Italics | In descriptions of syntax, italics represent variables. You supply the actual value. In the following example, three values must be supplied: datatype variable_name [ = value];If the syntax is bold and italic, the text represents a code element that needs a value supplied by you, such as a class name or variable value:
[code]public static class YourClassHere { ... }
    
[/code]  
  
**Bold Courier font** | In code samples and syntax descriptions, a bold courier font emphasizes a portion of the code or syntax.  
< > | In descriptions of syntax, less-than and greater-than symbols (< >) are typed exactly as shown. 
[code]<apex:pageBlockTable value="{!account.Contacts}" var="contact">
       <apex:column value="{!contact.Name}"/>
       <apex:column value="{!contact.MailingCity}"/>
       <apex:column value="{!contact.Phone}"/>
    </apex:pageBlockTable>
[/code]  
  
{ } | In descriptions of syntax, braces ({ }) are typed exactly as shown. 
[code]<apex:page>
        Hello {!$User.FirstName}!
    </apex:page>
[/code]  
  
[ ] | In descriptions of syntax, anything included in brackets is optional. In the following example, specifying  value is optional:
[code]data_type variable_name [ = value];
    
[/code]  
  
| | In descriptions of syntax, the pipe sign means “or”. You can do one of the following (not all). In the following example, you can create a new unpopulated set in one of two ways, or you can populate the set: 
[code]Set<data_type> set_name 
       [= new Set<data_type>();] |
       [= new Set<data_type{value [, value2. . .] };] |
       ;
[/code]
