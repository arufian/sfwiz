# DomainParser Class

Assert Class Contains methods to assert various conditions with test methods, such as whether two values are the same, a condition is true, or a variable is null.  Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Assert Methods The following are methods for Assert.
            * **[areEqual(expected, actual, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areEqual)**  
Asserts that the first two arguments are the same. 
            * **[areEqual(expected, actual)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areEqual_2)**  
Asserts that the two arguments are the same. 
            * **[areNotEqual(notExpected, actual, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areNotEqual)**  
Asserts that the first two arguments aren’t the same. 
            * **[areNotEqual(notExpected, actual)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areNotEqual_2)**  
Asserts that the two arguments aren’t the same. 
            * **[fail(msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_fail)**  
Immediately return a fatal error that causes code execution to halt.
            * **[fail()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_fail_2)**  
Immediately return a fatal error that causes code execution to halt.
            * **[isFalse(condition, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isFalse)**  
Asserts that the specified condition is false. 
            * **[isFalse(condition)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isFalse_2)**  
Asserts that the specified condition is false. 
            * **[isInstanceOfType(instance, expectedType, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isInstanceOfType)**  
Asserts that the instance is of the specified type. 
            * **[isInstanceOfType(instance, expectedType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isInstanceOfType_2)**  
Asserts that the instance is of the specified type. 
            * **[isNotInstanceOfType(instance, notExpectedType, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotInstanceOfType)**  
Asserts that the instance isn’t of the specified type. 
            * **[isNotInstanceOfType(instance, notExpectedType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotInstanceOfType_2)**  
Asserts that the instance isn’t of the specified type. 
            * **[isNotNull(value, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotNull)**  
Asserts that the value isn’t null. 
            * **[isNotNull(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotNull_2)**  
Asserts that the value isn’t null. 
            * **[isNull(value, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNull)**  
Asserts that the value is null. 
            * **[isNull(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNull_2)**  
Asserts that the value is null. 
            * **[isTrue(condition, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isTrue)**  
Asserts that the specified condition is true. 
            * **[isTrue(condition)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isTrue_2)**  
Asserts that the specified condition is true. 
areEqual(expected, actual, msg) Asserts that the first two arguments are the same.  Signature public static void areEqual(Object expected, Object actual, String msg) Parameters

expected
    Type: Object
    Expected value.
actual
    Type: Object
    Actual value.
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the first two arguments aren't the same, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String sub = 'abcde'.substring(2); Assert.areEqual('cde', sub, 'Expected characters after first two'); // Succeeds
[/code]

areEqual(expected, actual) Asserts that the two arguments are the same.  Signature public static void areEqual(Object expected, Object actual) Parameters

expected
    Type: Object
    Expected value.
actual
    Type: Object
    Actual value.
Return Value Type: void Usage If the two arguments aren't the same, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String sub = 'abcde'.substring(2); Assert.areEqual('cde', sub); // Succeeds
[/code]

areNotEqual(notExpected, actual, msg) Asserts that the first two arguments aren’t the same.  Signature public static void areNotEqual(Object notExpected, Object actual, String msg) Parameters

notExpected
    Type: Object
    Value that’s not expected.
actual
    Type: Object
    Actual value.
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the first two arguments are the same, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String sub = 'abcde'.substring(2); Assert.areNotEqual('xyz', sub, 'Characters not expected after first two'); // Succeeds
[/code]

areNotEqual(notExpected, actual) Asserts that the two arguments aren’t the same.  Signature public static void areNotEqual(Object notExpected, Object actual) Parameters

notExpected
    Type: Object
    Value that’s not expected.
actual
    Type: Object
    Actual value.
Return Value Type: void Usage If the two arguments are the same, a fatal error is returned that causes code execution to halt.Assert Class Contains methods to assert various conditions with test methods, such as whether two values are the same, a condition is true, or a variable is null.  Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Assert Methods The following are methods for Assert.
            * **[areEqual(expected, actual, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areEqual)**  
Asserts that the first two arguments are the same. 
            * **[areEqual(expected, actual)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areEqual_2)**  
Asserts that the two arguments are the same. 
            * **[areNotEqual(notExpected, actual, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areNotEqual)**  
Asserts that the first two arguments aren’t the same. 
            * **[areNotEqual(notExpected, actual)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_areNotEqual_2)**  
Asserts that the two arguments aren’t the same. 
            * **[fail(msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_fail)**  
Immediately return a fatal error that causes code execution to halt.
            * **[fail()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_fail_2)**  
Immediately return a fatal error that causes code execution to halt.
            * **[isFalse(condition, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isFalse)**  
Asserts that the specified condition is false. 
            * **[isFalse(condition)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isFalse_2)**  
Asserts that the specified condition is false. 
            * **[isInstanceOfType(instance, expectedType, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isInstanceOfType)**  
Asserts that the instance is of the specified type. 
            * **[isInstanceOfType(instance, expectedType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isInstanceOfType_2)**  
Asserts that the instance is of the specified type. 
            * **[isNotInstanceOfType(instance, notExpectedType, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotInstanceOfType)**  
Asserts that the instance isn’t of the specified type. 
            * **[isNotInstanceOfType(instance, notExpectedType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotInstanceOfType_2)**  
Asserts that the instance isn’t of the specified type. 
            * **[isNotNull(value, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotNull)**  
Asserts that the value isn’t null. 
            * **[isNotNull(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNotNull_2)**  
Asserts that the value isn’t null. 
            * **[isNull(value, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNull)**  
Asserts that the value is null. 
            * **[isNull(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isNull_2)**  
Asserts that the value is null. 
            * **[isTrue(condition, msg)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isTrue)**  
Asserts that the specified condition is true. 
            * **[isTrue(condition)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Assert.htm#apex_System_Assert_isTrue_2)**  
Asserts that the specified condition is true. 
areEqual(expected, actual, msg) Asserts that the first two arguments are the same.  Signature public static void areEqual(Object expected, Object actual, String msg) Parameters

expected
    Type: Object
    Expected value.
actual
    Type: Object
    Actual value.
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the first two arguments aren't the same, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String sub = 'abcde'.substring(2); Assert.areEqual('cde', sub, 'Expected characters after first two'); // Succeeds
[/code]

areEqual(expected, actual) Asserts that the two arguments are the same.  Signature public static void areEqual(Object expected, Object actual) Parameters

expected
    Type: Object
    Expected value.
actual
    Type: Object
    Actual value.
Return Value Type: void Usage If the two arguments aren't the same, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String sub = 'abcde'.substring(2); Assert.areEqual('cde', sub); // Succeeds
[/code]

areNotEqual(notExpected, actual, msg) Asserts that the first two arguments aren’t the same.  Signature public static void areNotEqual(Object notExpected, Object actual, String msg) Parameters

notExpected
    Type: Object
    Value that’s not expected.
actual
    Type: Object
    Actual value.
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the first two arguments are the same, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String sub = 'abcde'.substring(2); Assert.areNotEqual('xyz', sub, 'Characters not expected after first two'); // Succeeds
[/code]

areNotEqual(notExpected, actual) Asserts that the two arguments aren’t the same.  Signature public static void areNotEqual(Object notExpected, Object actual) Parameters

notExpected
    Type: Object
    Value that’s not expected.
actual
    Type: Object
    Actual value.
Return Value Type: void Usage If the two arguments are the same, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String sub = 'abcde'.substring(2); Assert.areNotEqual('xyz', sub); // Succeeds
[/code]

fail(msg) Immediately return a fatal error that causes code execution to halt. Signature public static void fail(String msg) Parameters

msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage Commonly used in a try/catch block test case where an exception is expected to be thrown. You can’t, however, catch the assertion failure in the try/catch block even though it’s logged as an exception. Example // test case where exception is expected try { SomeClass.methodUnderTest(); Assert.fail('DmlException Expected'); } catch (DmlException ex) { // Add assertions here about the expected exception }
[/code]

fail() Immediately return a fatal error that causes code execution to halt. Signature public static void fail() Return Value Type: void Usage Commonly used in a try/catch block test case where an exception is expected to be thrown. You can’t, however, catch the assertion failure in the try/catch block even though it’s logged as an exception. Example // test case where exception is expected try { SomeClass.methodUnderTest(); Assert.fail(); } catch (DmlException ex) { // Add assertions here about the expected exception }
[/code]

isFalse(condition, msg) Asserts that the specified condition is false.  Signature public static void isFalse(Boolean condition, String msg) Parameters

condition
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Condition you’re checking to determine if it’s false. 
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the condition is true, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Boolean containsCode = 'Salesforce'.contains('code'); Assert.isFalse(containsCode, 'No code'); // Assertion succeeds
[/code]

isFalse(condition) Asserts that the specified condition is false.  Signature public static void isFalse(Boolean condition) Parameters

condition
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Condition you’re checking to determine if it’s false. 
Return Value Type: void Usage If the condition is true, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Boolean containsCode = 'Salesforce'.contains('code'); Assert.isFalse(containsCode); // Assertion succeeds
[/code]

isInstanceOfType(instance, expectedType, msg) Asserts that the instance is of the specified type.  Signature public static void isInstanceOfType(Object instance, System.Type expectedType, String msg) Parameters

instance
    Type: Object
    Instance whose type you're checking.
expectedType
    Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#topic-title)
    Expected type. 
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the instance isn't of the specified type, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Account o = new Account(); Assert.isInstanceOfType(o, Account.class); // Succeeds
[/code]

isInstanceOfType(instance, expectedType) Asserts that the instance is of the specified type.  Signature public static void isInstanceOfType(Object instance, System.Type expectedType) Parameters

instance
    Type: Object
    Instance whose type you're checking.
expectedType
    Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#topic-title)
    Expected type. 
Return Value Type: void Usage If the instance isn't of the specified type, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Account o = new Account(); Assert.isInstanceOfType(o, Account.class); // Succeeds
[/code]

Account o = new Account(); Assert.isInstanceOfType(o, Account.class, 'Expected type.'); // Succeeds
[/code]

isNotInstanceOfType(instance, notExpectedType, msg) Asserts that the instance isn’t of the specified type.  Signature public static void isNotInstanceOfType(Object instance, System.Type notExpectedType, String msg) Parameters

instance
    Type: Object
    Instance whose type you're checking.
notExpectedType
    Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#topic-title)
    Type that's not expected. 
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the instance is of the specified type, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Contact con = new Contact(); Assert.isNotInstanceOfType(con, Account.class, 'Not expected type'); // Succeeds
[/code]

isNotInstanceOfType(instance, notExpectedType) Asserts that the instance isn’t of the specified type.  Signature public static void isNotInstanceOfType(Object instance, System.Type notExpectedType) Parameters

instance
    Type: Object
    Instance whose type you're checking.
notExpectedType
    Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#topic-title)
    Type that's not expected. 
Return Value Type: void Usage If the instance is of the specified type, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Contact con = new Contact(); Assert.isNotInstanceOfType(con, Account.class); // Succeeds
[/code]

isNotNull(value, msg) Asserts that the value isn’t null.  Signature public static void isNotNull(Object value, String msg) Parameters

value
    Type: Object
    Value you’re checking to determine if it’s not null. 
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the value is null, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String myString = 'value'; Assert.isNotNull(myString, 'myString should not be null'); // Succeeds
[/code]

isNotNull(value) Asserts that the value isn’t null.  Signature public static void isNotNull(Object value) Parameters

value
    Type: Object
    Value you’re checking to determine if it’s not null. 
Return Value Type: void Usage If the value is null, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example String myString = 'value'; Assert.isNotNull(myString); // Succeeds
[/code]

isNull(value, msg) Asserts that the value is null.  Signature public static void isNull(Object value, String msg) Parameters

value
    Type: Object
    Value you’re checking to determine if it’s null. 
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the value isn't null, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example
[code] String myString = null; 
    Assert.isNull(myString, 'String should be null'); // Succeeds
[/code]

isNull(value) Asserts that the value is null.  Signature public static void isNull(Object value) Parameters

value
    Type: Object
    Value you’re checking to determine if it’s null. 
Return Value Type: void Usage If the value isn't null, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example
[code] String myString = null; 
    Assert.isNull(myString); // Succeeds
[/code]

isTrue(condition, msg) Asserts that the specified condition is true.  Signature public static void isTrue(Boolean condition, String msg) Parameters

condition
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Condition you’re checking to determine if it’s true. 
msg
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    (Optional) Custom message returned as part of the error message.
Return Value Type: void Usage If the specified condition is false, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Boolean containsForce = 'Salesforce'.contains('force'); Assert.isTrue(containsForce, 'Contains force'); // Assertion succeeds
[/code]

isTrue(condition) Asserts that the specified condition is true.  Signature public static void isTrue(Boolean condition) Parameters

condition
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    Condition you’re checking to determine if it’s true. 
Return Value Type: void Usage If the specified condition is false, a fatal error is returned that causes code execution to halt. You can’t catch an assertion failure using a try/catch block even though it’s logged as an exception. Example Boolean containsForce = 'Salesforce'.contains('force'); Assert.isTrue(containsForce); // Assertion succeeds
[/code]

DomainParser Class Use the DomainParser class to parse a domain that Salesforce hosts for the org and extract information about the domain.  Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Examples This example code parses the org’s Lightning domain and gets the My Domain name and domain type from the System.Domain object. System.Domain d = DomainParser.parse('mycompany.lightning.force.com'); String myDomainName = d.getMyDomainName(); System.DomainType domainType = d.getDomainType();
[/code]

This example code parses a known Visualforce URL to get the domain type, the org’s My Domain name, and the package name.//Parse a known URL System.Domain domain = DomainParser.parse('https://mycompany--abcpackage.vf.force.com'); //Get the domain type System.DomainType domainType = domain.getDomainType(); // Returns VISUALFORCE_DOMAIN //Get the org’s My Domain name String myDomainName = domain.getMyDomainName(); // Returns mycompany //Get the package name String packageName = domain.getPackageName(); // Returns abcpackage
[/code]

            * **[DomainParser Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainParser.htm#apex_System_DomainParser_methods)**  

DomainParser Methods The following are methods for DomainParser.
            * **[parse(hostname)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainParser.htm#apex_System_DomainParser_parse)**  
Parses a passed hostname of a domain that Salesforce hosts for the org, and returns the System.Domain.
            * **[parse(url)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainParser.htm#apex_System_DomainParser_parse_2)**  
Parses a passed uniform resource locator (URL) of a domain that Salesforce hosts for the org, and returns the System.Domain.
parse(hostname) Parses a passed hostname of a domain that Salesforce hosts for the org, and returns the [System.Domain](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Domain.htm#apex_class_System_Domain "Represents an existing domain hosted by Salesforce that serves the org or its content. Contains methods to obtain information about these domains, such as the domain type, My Domain name, and sandbox name."). Signature public static System.Domain parse(String hostname) Parameters

hostname
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The label that identifies a Salesforce host, including all subdomains but without the protocol, path, or any parameters. For example, mycompany.my.site.com or mycompany--sandbox1.sandbox.my.salesforceforce.com.If the hostname format is invalid, it isn’t a Salesforce hosted domain, or it isn’t owned by this org, this method throws an InvalidParameterValueException.
Return Value Type: [System.Domain](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Domain.htm#apex_class_System_Domain "Represents an existing domain hosted by Salesforce that serves the org or its content. Contains methods to obtain information about these domains, such as the domain type, My Domain name, and sandbox name.") parse(url) Parses a passed uniform resource locator (URL) of a domain that Salesforce hosts for the org, and returns the [System.Domain](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Domain.htm#apex_class_System_Domain "Represents an existing domain hosted by Salesforce that serves the org or its content. Contains methods to obtain information about these domains, such as the domain type, My Domain name, and sandbox name."). Signature public static System.Domain parse(System.Url url) Parameters

url
    Type: [System.Url](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_methods_system_url "Represents a uniform resource locator \(URL\) and provides access to parts of the URL. Enables access to the base URL used to access your Salesforce org.")
    A uniform resource locator (URL) for a Salesforce org, including all subdomains and the protocol. For example, https://mycompany--sandbox1.sandbox.my.salesforceforce.com.The URL can also include paths and parameters. For example, https://mycompany.my.site.com/en/us/help or https://mycompany.file.force.com/servlet/servlet.FileDownload?file=015300000000xvU.
    If the URL format is invalid, it isn’t a Salesforce hosted domain, or it isn’t owned by this org, this method throws an InvalidParameterValueException.
Return Value Type: [System.Domain](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Domain.htm#apex_class_System_Domain "Represents an existing domain hosted by Salesforce that serves the org or its content. Contains methods to obtain information about these domains, such as the domain type, My Domain name, and sandbox name.")
