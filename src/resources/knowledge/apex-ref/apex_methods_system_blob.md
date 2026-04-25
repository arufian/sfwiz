# Blob Class

Blob Class Contains methods for the Blob primitive data type. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage Salesforce supports Blob manipulation only with Apex class methods that are supplied by Salesforce. For more information on Blobs, see [Primitive Data Types](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_primitives.htm). Blob Methods The following are methods for Blob.
                              * **[size()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_blob.htm#apex_System_Blob_size)**  
Returns the number of bytes in the Blob.
                              * **[toPdf(stringToConvert)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_blob.htm#apex_System_Blob_toPdf)**  
Creates a binary object out of the given string, encoding it as a PDF file. 
                              * **[toString()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_blob.htm#apex_System_Blob_toString)**  
Casts the Blob into a String.
                              * **[valueOf(stringToBlob)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_blob.htm#apex_System_Blob_valueOf)**  
Casts the specified String to a Blob.
size() Returns the number of bytes in the Blob. Signature public Integer size() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") Example
[code] String myString = 'StringToBlob';
    Blob myBlob = Blob.valueof(myString);
    Integer size = myBlob.size();
[/code]

toPdf(stringToConvert) Creates a binary object out of the given string, encoding it as a PDF file.  Signature public static Blob toPdf(String stringToConvert) Parameters

stringToConvert
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Note Referencing a static resource throws an InvalidParameterValue exception. Return Value Type: Blob Usage Blob.toPDF(stringToConvert) doesn't support web fonts, so you can't specify a font for the string. Blob.toPDF(stringToConvert) also doesn't support multibyte characters, such as Japanese and accented international characters. To render multibyte characters in a PDF file, consider adding the string to a Visualforce page, and then rendering the page as a PDF file. See [Render a Visualforce Page as a PDF File](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/pages_output_pdf_renderas.htm "html \(New Window\)"). Example
[code] String pdfContent = 'This is a test string';
    Account a = new account(name = 'test');
    insert a;
    Attachment attachmentPDF = new Attachment();
    attachmentPdf.parentId = a.id;
    attachmentPdf.name = a.name + '.pdf';
    attachmentPdf.body = Blob.toPDF(pdfContent);
    insert attachmentPDF;
[/code]

toString() Casts the Blob into a String. Signature public String toString() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String myString = 'StringToBlob';
    Blob myBlob = Blob.valueof(myString);
    System.assertEquals('StringToBlob', myBlob.toString());
[/code]

valueOf(stringToBlob) Casts the specified String to a Blob. Signature public static Blob valueOf(String stringToBlob) Parameters

stringToBlob
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Blob Example
[code] String myString = 'StringToBlob';
    Blob myBlob = Blob.valueof(myString);
[/code]
