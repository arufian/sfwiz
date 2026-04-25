# XmlStreamWriter Class

# XmlStreamWriter Class

    
    
    
The `XmlStreamWriter` class provides methods
        for writing XML data.

        
## Namespace

            
            [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm)

        

        
## Usage

            
            You can use the `XmlStreamWriter` class to
                programmatically construct an XML document, then use HTTP classes to send the
                document to an external server.

            The `XmlStreamWriter` class is similar to the
                XMLStreamWriter utility class from StAX (Streaming API for XML). StAX is an API to
                read and write XML documents, originating from the Java programming language
                community.

            

#### Note

The `XmlStreamWriter` class in Apex is
                based on its counterpart in Java. See [Java XMLStreamWriter
                        class](http://docs.oracle.com/javase/6/docs/api/javax/xml/stream/XMLStreamWriter.html).

        

    

- 
**[XmlStreamWriter Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_constructors)**

- 
**[XmlStreamWriter Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_methods)**

#### See Also

- [Http Class](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_restful_http_http.htm#apex_classes_restful_http_http)

- [HttpRequest Class](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_restful_http_httprequest.htm#apex_classes_restful_http_httprequest)

- [HttpResponse Class](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_restful_http_httpresponse.htm#apex_classes_restful_http_httpresponse)

## XmlStreamWriter Constructors

The following are constructors for `XmlStreamWriter`.

- 
**[XmlStreamWriter()](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_ctor)**

Creates a new instance of the `XmlStreamWriter` class.

### XmlStreamWriter()

Creates a new instance of the `XmlStreamWriter` class.

#### Signature

`public XmlStreamWriter()`

## XmlStreamWriter Methods

The following are methods for `XmlStreamWriter`. All are instance methods.

- 
**[close()](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_close)**

Closes this instance of an XmlStreamWriter and free any resources associated with it.

- 
**[getXmlString()](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_getXmlString)**

Returns the XML written by the XmlStreamWriter instance.

- 
**[setDefaultNamespace(uri)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_setDefaultNamespace)**

Binds the specified URI to the default namespace. This URI is bound in the scope of the current START_ELEMENT – END_ELEMENT pair.

- 
**[writeAttribute(prefix, namespaceUri, localName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeAttribute)**

Writes an attribute to the output stream.

- 
**[writeCData(data)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeCData)**

Writes the specified CData to the output stream.

- 
**[writeCharacters(text)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeCharacters)**

Writes the specified text to the output stream.

- 
**[writeComment(comment)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeComment)**

Writes the specified comment to the output stream.

- 
**[writeDefaultNamespace(namespaceUri)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeDefaultNamespace)**

Writes the specified namespace to the output stream.

- 
**[writeEmptyElement(prefix, localName, namespaceUri)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeEmptyElement)**

Writes an empty element tag to the output stream.

- 
**[writeEndDocument()](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeEndDocument)**

Closes any start tags and writes corresponding end tags to the output stream.

- 
**[writeEndElement()](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeEndElement)**

Writes an end tag to the output stream, relying on the internal state of the writer to determine the prefix and local name.

- 
**[writeNamespace(prefix, namespaceUri)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeNamespace)**

Writes the specified namespace to the output stream.

- 
**[writeProcessingInstruction(target, data)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeProcessingInstruction)**

Writes the specified processing instruction.

- 
**[writeStartDocument(encoding, version)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeStartDocument)**

Writes the XML Declaration using the specified XML encoding and version.

- 
**[writeStartElement(prefix, localName, namespaceUri)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_xml_XmlStream_writer.htm#apex_System_XmlStreamWriter_writeStartElement)**

Writes the start tag specified by localName to the output stream.

### close()

Closes this instance of an XmlStreamWriter and free any
resources associated with it.

#### Signature

`public Void close()`

#### Return Value

Type: Void

### getXmlString()

Returns the XML written by the XmlStreamWriter instance.

#### Signature

`public String getXmlString()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### setDefaultNamespace(uri)

Binds the specified URI to the default namespace. This
URI is bound in the scope of the current START_ELEMENT – END_ELEMENT
pair.

#### Signature

`public Void setDefaultNamespace(String uri)`

#### Parameters

uri

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeAttribute(prefix, namespaceUri, localName, value)

Writes an attribute to the output stream.

#### Signature

`public Void writeAttribute(String prefix, String namespaceUri,
     String localName, String value)`

#### Parameters

prefix

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

namespaceUri

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

localName

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Specifies the name of the attribute.

value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeCData(data)

Writes the specified CData to the output stream.

#### Signature

`public Void writeCData(String data)`

#### Parameters

data

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeCharacters(text)

Writes the specified text to the output stream.

#### Signature

`public Void writeCharacters(String text)`

#### Parameters

text

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeComment(comment)

Writes the specified comment to the output stream.

#### Signature

`public Void writeComment(String comment)`

#### Parameters

comment

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeDefaultNamespace(namespaceUri)

Writes the specified namespace to the output stream.

#### Signature

`public Void writeDefaultNamespace(String
    namespaceUri)`

#### Parameters

namespaceUri

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeEmptyElement(prefix, localName, namespaceUri)

Writes an empty element tag to the output stream.

#### Signature

`public Void writeEmptyElement(String prefix, String localName,
     String namespaceUri)`

#### Parameters

prefix

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

localName

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Specifies the name of the tag to be written.

namespaceUri

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeEndDocument()

Closes any start tags and writes corresponding end tags
to the output stream.

#### Signature

`public Void writeEndDocument()`

#### Return Value

Type: Void

### writeEndElement()

Writes an end tag to the output stream, relying on the
internal state of the writer to determine the prefix and local name.

#### Signature

`public Void writeEndElement()`

#### Return Value

Type: Void

### writeNamespace(prefix, namespaceUri)

Writes the specified namespace to the output stream.

#### Signature

`public Void writeNamespace(String prefix, String
     namespaceUri)`

#### Parameters

prefix

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

namespaceUri

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeProcessingInstruction(target, data)

Writes the specified processing instruction.

#### Signature

`public Void writeProcessingInstruction(String
target, String data)`

#### Parameters

target

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

data

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeStartDocument(encoding, version)

Writes the XML Declaration using the specified XML encoding
and version.

#### Signature

`public Void writeStartDocument(String encoding,
String version)`

#### Parameters

encoding

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

version

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

### writeStartElement(prefix, localName, namespaceUri)

Writes the start tag specified by localName to the output stream.

#### Signature

`public Void writeStartElement(String prefix, String localName,
     String namespaceUri)`

#### Parameters

prefix

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

localName

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

namespaceUri

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void