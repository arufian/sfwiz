# InboundEmail.TextAttachment Class

# InboundEmail.TextAttachment Class

An InboundEmail object stores text attachments in an InboundEmail.TextAttachment
object.

## Namespace

[Messaging](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Messaging.htm)

## Usage

   The text attachments can be any of the following:

   
    - Attachments with a Multipurpose Internet Mail Extension (MIME) type of `text`

    - Attachments with a MIME type of `application/octet-stream` and a file name that ends with either a
      .vcf or .vcs extension. These are saved as `text/x-vcard` and `text/calendar` MIME types, respectively.

   

- 
**[InboundEmail.TextAttachment Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_InboundEmail_TextAttachment_constructors)**

- 
**[InboundEmail.TextAttachment Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_InboundEmail_TextAttachment_Properties)**

## InboundEmail.TextAttachment Constructors

The following are constructors for `InboundEmail.TextAttachment`.

- 
**[InboundEmail.TextAttachment()](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_InboundEmail_TextAttachment_ctor)**

Creates a new instance of the `Messaging.InboundEmail.TextAttachment` class.

### InboundEmail.TextAttachment()

Creates a new instance of the `Messaging.InboundEmail.TextAttachment` class.

#### Signature

`public InboundEmail.TextAttachment()`

## InboundEmail.TextAttachment Properties

The following are properties for `InboundEmail.TextAttachment`.

- 
**[body](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_TextAttachment_body)**

The body of the attachment.

- 
**[bodyIsTruncated](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_TextAttachment_bodyIsTruncated)**

Indicates whether the attachment body text is truncated (`true`) or not (`false`.)

- 
**[charset](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_TextAttachment_charset)**

The original character set of the body field. The body is re-encoded as UTF-8 as input   to the Apex method.

- 
**[fileName](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_TextAttachment_fileName)**

The name of the attached file.

- 
**[headers](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_InboundEmail_TextAttachment_headers)**

Any header values associated with the attachment. Examples of header names include       `Content-Type`, `Content-Transfer-Encoding`, and `Content-ID`.

- 
**[mimeTypeSubType](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_TextAttachment_mimeTypeSubType)**

The primary and sub MIME-type.

### body

The body of the attachment.

#### Signature

`public String body {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### bodyIsTruncated

Indicates whether the attachment body text is truncated
(`true`) or not (`false`.)

#### Signature

`public Boolean bodyIsTruncated {get; set;}`

#### Property Value

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

 ### charset

 
 
 
The original character set of the body field. The body is re-encoded as UTF-8 as input
  to the Apex method.

  
#### Signature

   
   `public String charset {get; set;}`

   
  

  
#### Property Value

   
   Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

  

 

### fileName

The name of the attached file.

#### Signature

`public String fileName {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

  ### headers

  
  
  
Any header values associated with the attachment. Examples of header names include
      `Content-Type`, `Content-Transfer-Encoding`, and `Content-ID`.

    
#### Signature

      
      `public List<Messaging.InboundEmail.Header> headers {get;
          set;}`

      
    

    
#### Property Value

      
      Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[Messaging.InboundEmail.Header](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_header.htm#apex_classes_email_inbound_header)>

    

  

### mimeTypeSubType

The primary and sub MIME-type.

#### Signature

`public String mimeTypeSubType {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)