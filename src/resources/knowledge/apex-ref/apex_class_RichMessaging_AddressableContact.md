# AddressableContact Class

AddressableContact Class Represents an addressable contact. Namespace [RichMessaging](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_RichMessaging.htm "Provides objects and methods for handling content in enhanced Messaging channels.")
            * **[AddressableContact Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_constructors)**  

            * **[AddressableContact Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_properties)**  

AddressableContact Constructors The following are constructors for AddressableContact.
            * **[AddressableContact(givenName, phoneticGivenName, familyName, phoneticFamilyName, emailAddress, phoneNumber, postalAddress)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_ctor)**  
Creates a new instance of the RichMessaging.AddressableContact class.
AddressableContact(givenName, phoneticGivenName, familyName, phoneticFamilyName, emailAddress, phoneNumber, postalAddress) Creates a new instance of the RichMessaging.AddressableContact class. Signature public AddressableContact(String givenName, String phoneticGivenName, String familyName, String phoneticFamilyName, String emailAddress, String phoneNumber, RichMessaging.PostalAddress postalAddress) Parameters

givenName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The contact’s first name.
phoneticGivenName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The phonetic spelling of the contact’s first name.
familyName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The contact’s surname.
phoneticFamilyName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The phonetic spelling of the contact’s surname.
emailAddress
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The contact’s email address.
phoneNumber
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The contact’s phone number.
postalAddress
    Type: [RichMessaging.PostalAddress](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_PostalAddress.htm#apex_class_RichMessaging_PostalAddress "Represents the postal address.")
    The contact’s postal address.
AddressableContact Properties The following are properties for AddressableContact.
            * **[emailAddress](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_emailAddress)**  
The contact’s email address.
            * **[familyName](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_familyName)**  
The contact’s surname.
            * **[givenName](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_givenName)**  
The contact’s first name.
            * **[phoneNumber](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_phoneNumber)**  
The contact’s phone number.
            * **[phoneticFamilyName](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_phoneticFamilyName)**  
The phonetic spelling of the contact’s surname.
            * **[phoneticGivenName](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_phoneticGivenName)**  
The phonetic spelling of the contact’s first name.
            * **[postalAddress](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_AddressableContact.htm#apex_RichMessaging_AddressableContact_postalAddress)**  
The contact’s postal address.
emailAddress The contact’s email address. Signature public String emailAddress {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") familyName The contact’s surname. Signature public String familyName {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") givenName The contact’s first name. Signature public String givenName {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") phoneNumber The contact’s phone number. Signature public String phoneNumber {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") phoneticFamilyName The phonetic spelling of the contact’s surname. Signature public String phoneticFamilyName {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") phoneticGivenName The phonetic spelling of the contact’s first name. Signature public String phoneticGivenName {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") postalAddress The contact’s postal address. Signature public RichMessaging.PostalAddress postalAddress {get; set;} Property Value Type: [RichMessaging.PostalAddress](atlas.en-us.258.0.apexref.meta/apexref/apex_class_RichMessaging_PostalAddress.htm#apex_class_RichMessaging_PostalAddress "Represents the postal address.")
