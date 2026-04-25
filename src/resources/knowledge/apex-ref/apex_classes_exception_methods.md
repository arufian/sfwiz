# Exception Class and Built-In Exceptions

# Exception Class and Built-In Exceptions

An exception denotes an error that disrupts the normal flow of code execution. You
        can use Apex built-in exceptions or create custom exceptions. All exceptions have common
        methods.

        All exceptions support built-in methods for returning the error message and exception
            type. In addition to the standard `exception`
            class, there are several different types of exceptions:

        The following are exceptions in the `System`
            namespace.

        

                
                
                | **
                    
                        Exception** 

                        | **Description** 

                     |

                

                
                    
                        | `AssertException` 

                        | A System.assert failure that halts code execution. Optionally
                            contains the custom message specified in the last (`msg`) argument to the `assert()` method. 

                     |

                    
                        | `AuraException` 

                        | Legacy Aura-related exception. Use System.AuraHandledException
                            instead. 

                     |

                    
                        | `AuraHandledException` 

                        | Returns a custom error message to a JavaScript controller. See [Returning
                                Errors from an Apex Server-Side Controller](https://developer.salesforce.com/docs/atlas.en-us.258.0.lightning.meta/lightning/controllers_server_apex_custom_errors.htm). 

                     |

                    
                        | `AsyncException` 

                        | Any problem with an asynchronous operation, such as failing to
                            enqueue an asynchronous call.  

                     |

                    
                        | `BigObjectException` 

                        | Any problem with big object records, such as connection timeouts
                            during attempts to access or insert big object records. 

                     |

                    
                        | `CalloutException` 

                        | Any problem with a Web service operation, such as failing to make a
                            callout to an external system. 

                     |

                    
                        | `DataWeaveScriptException` 

                        | Any run-time script errors that occur
                                within DataWeave in Apex. 

                     |

                    
                        | `DmlException` 

                        | Any problem with a DML statement, such as
                                an `insert` statement missing
                                a required field on a record. 

                     |

                    
                        | `DuplicateMessageException` 

                        | Attempt to enqueue job with
                                duplicate queueable signature 

                     |

                    
                        | `EmailException` 

                        | Any problem with email, such as failure to deliver. For more
                            information, see [Outbound Email](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_forcecom_email_outbound.htm). 

                     |

                    
                        | `ExternalObjectException` 

                        | Any problem with external object records, such as connection timeouts
                            during attempts to access the data that’s stored on external
                            systems. 

                     |

                    
                        | `FatalCursorException` 

                        | Any problem with Apex cursors in a transaction. 

                     |

                    
                        | `FinalException` 

                        | Any attempt to mutate a read-only collection or record such as an
                            sObject in an after-update trigger, or a final variable. This exception
                            causes execution to halt. 

                     |

                    
                        | `FlowException` 

                        | Any problem with starting flow interviews from Apex. For example, if
                            an active version of the flow can’t be found or it can’t be started from
                            Apex. 

                     |

                    
                        | `HandledException` 

                        | A generic handled exception. 

                     |

                    
                        | `IllegalArgumentException` 

                        | An illegal argument was provided to a method call. For example, a
                            method that requires a non-null argument throws this exception if a null
                            value is passed into the method. 

                     |

                    
                        | `InvalidHeaderException` 

                        | An illegal header argument was provided to an Apex REST call. For
                            example, a call to the `RestResponse.addHeader(name, value)` method throws this
                            exception if the header name is `cookie`. 

                     |

                    
                        | `InvalidParameterValueException` 

                        | This exception is used with both Visualforce pages and Salesforce
                            Functions. 
                                
                                    Visualforce

                                    The exception is thrown when an invalid parameter is
                                        supplied for a method, or any problem is encountered with a
                                        URL used with Visualforce pages. For more information on
                                        Visualforce, see the [Visualforce
                                                Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/). 

                                
                                
                                    Salesforce Functions

                                    The exception is thrown when the `functionName` parameter to `Function.get()` doesn’t have
                                        the correct `project name.function
                                            name` format. For more information on Salesforce
                                        functions, see [`Function.get()`](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_class_functions_Function.htm).

                                
                            
 

                     |

                    
                        | `LimitException` 

                        | A governor limit has been exceeded. This exception can’t be
                            caught. 

                     |

                    
                        | `JSONException` 

                        | Any problem with JSON serialization and deserialization operations.
                            For more information, see the methods of [`System.JSON`](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Json.htm#apex_class_System_Json), [`System.JSONParser`](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_JsonParser.htm#apex_class_System_JsonParser), and
                                [`System.JSONGenerator`](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_JsonGenerator.htm#apex_class_System_JsonGenerator). 

                     |

                    
                        | `ListException` 

                        | Any problem with a list, such as
                                attempting to access an index that is out of bounds. 

                     |

                    
                        | `MathException` 

                        | Any problem with a mathematical operation, such as dividing by
                            zero. 

                     |

                    
                        | `NoAccessException` 

                        | Any problem with unauthorized access, such as trying to access an
                            sObject that the current user doesn’t have access to. This exception is
                            used with Visualforce pages. For more information on Visualforce, see
                            the [Visualforce Developer's
                                    Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/). 

                     |

                    
                        | `NoDataFoundException` 

                        | This exception is used with both Visualforce pages and Salesforce
                            Functions. 
                                
                                    Visualforce

                                    The exception is thrown with data that doesn't exist, such
                                        as trying to access an sObject that has been deleted. For
                                        more information on Visualforce, see the [Visualforce
                                                Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/). 

                                
                                
                                    Salesforce Functions

                                    The exception is thrown when the project or function name
                                        provided in the `functionName` parameter to the `Function.get()` method can't
                                        be found. For more information on Salesforce functions, see
                                            [`Function.get()`](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_class_functions_Function.htm).

                                
                            
 

                     |

                    
                        | `NoSuchElementException` 

                        | This exception is thrown if you try to access items that are outside
                            the bounds of a list. This exception is used by the [Iterator](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_classes_iterable.htm)
                            `next` method. For example, if
                                `iterator.hasNext() == false`
                            and you call `iterator.next()`,
                            this exception is thrown. This exception is also used by the Apex Flex
                            Queue methods and is thrown if you attempt to access a job at an invalid
                            position in the flex queue. 

                     |

                    
                        | `NullPointerException` 

                        | Any problem with dereferencing null, such as in the following
                            code:
```
String s;
s.toLowerCase(); // Since s is null, this call causes
                 // a NullPointerException
```

 

                     |

                    
                        | `QueryException` 

                        | Any problem with SOQL queries, such as
                                assigning a query that returns no records or more than one record to
                                a singleton sObject variable. 

                     |

                    
                        | `RequiredFeatureMissing` 

                        | A Chatter feature is required for code that
                                has been deployed to an organization that doesn’t have Chatter
                                enabled. 

                     |

                    
                        | `SearchException` 

                        | Any problem with SOSL queries executed with SOAP API `search()` call, for example, when
                            the `searchString` parameter
                            contains fewer than two characters. For more information, see the
                                    [SOAP API Developer
                                    Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.api.meta/api/). 

                     |

                    
                        | `SecurityException` 

                        | Any problem with static methods in the Crypto utility class. For more
                            information, see [Crypto Class](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_restful_crypto.htm#apex_classes_restful_crypto). 

                     |

                    
                        | `SerializationException` 

                        | Any problem with the serialization of data. This exception is used
                            with Visualforce pages. For more information on Visualforce, see the
                                    [Visualforce Developer's
                                    Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/). 

                     |

                    
                        | `SObjectException` 

                        | Any problem with sObject records, such
                                as attempting to change a field in an `update` statement that can only
                                be changed during `insert`. 

                     |

                    
                        | `StringException` 

                        | Any problem with Strings, such as a String that is exceeding your
                            heap size. 

                     |

                    
                        | `TransientCursorException` 

                        | A transient problem with an Apex cursor transaction. The failed transaction can be retried. 

                     |

                    
                        | `TypeException` 

                        | Any problem with type conversions, such as attempting to convert the
                            String 'a' to an Integer using the `valueOf` method. 

                     |

                    
                        | `UnexpectedException` 

                        | A non-recoverable internal error within Salesforce has occurred. This
                            exception causes execution to halt. If necessary, contact Salesforce
                            Customer Support for more information. 

                     |

                    
                        | `VisualforceException` 

                        | Any problem with a Visualforce page. For more information on
                            Visualforce, see the [Visualforce Developer's
                                    Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/). 

                     |

                    
                        | `XmlException` 

                        | Any problem with the XmlStream classes, such as failing to read or
                            write XML. 

                     |

                

            

        The following is an example using the DmlException exception:

        
```
Account[] accts = new Account[]{new Account(billingcity = 'San Jose')};
try {
    insert accts;
} catch (System.DmlException e) {
    for (Integer i = 0; i < e.getNumDml(); i++) {
        // Process exception here
        System.debug(e.getDmlMessage(i)); 
    }
}
```

        For exceptions in other namespaces, see:
                - [Cache
                    Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_cache_exceptions.htm)

                - [Canvas
                    Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_exceptions_canvas.htm)

                - [Compression
                        Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_exceptions_compression.htm)

                - [`ConnectApi` Exceptions](atlas.en-us.258.0.apexref.meta/apexref/connectAPI_exceptions.htm)

                - [DataSource
                        Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_DataSource_exceptions.htm)

                - [Reports
                    Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_Reports_exceptions.htm)

                - [Site Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_Site_exceptions.htm)

            

        
## Common Exception
                    Methods

Exception
                methods are all called by and operate on an instance of an exception. This table
                describes all instance exception methods. All types of exceptions have these methods
                in common.

                    
                    
                    
                    
                    | **
                        
                            Name** 

                            | **Arguments** 

                            | **Return Type** 

                            | **Description** 

                         |

                    

                    
                        
                            | `getCause` 

                            |  

                            | Exception 

                            | Returns the cause of the exception as an
                                    exception object. 

                         |

                        
                            | `getLineNumber` 

                            |  

                            | Integer 

                            | Returns the line number from where the
                                    exception was thrown. 

                         |

                        
                            | `getMessage` 

                            |  

                            | String 

                            | Returns the error message that displays
                                    for the user. 

                         |

                        
                            | `getStackTraceString` 

                            |  

                            | String 

                            | 
Returns the stack trace of a
                                    thrown exception as a string.
                             

                         |

                        
                            | `getTypeName` 

                            |  

                            | String 

                            | Returns the type of exception, such as
                                    DmlException, ListException, MathException, and so
                                on. 

                         |

                        
                            | `initCause` 

                            | Exception cause
 

                            | Void 

                            | Sets the cause for this exception, if one
                                    hasn’t already been set. 

                         |

                        
                            | `setMessage` 

                            | String s
 

                            | Void 

                            | Sets the error message that displays for
                                    the user. 

                         |

                    

                

        
## DMLException and EmailException
                    Methods

In addition to
                the common exception methods, DMLException and EmailException have these
                methods:

                    
                    
                    
                    
                    | **
                        
                            Name** 

                            | **Arguments** 

                            | **Return Type** 

                            | **Description** 

                         |

                    

                    
                        
                            | `getDmlFieldNames` 

                            | Integer i
 

                            | String [] 

                            | Returns the names of the field or fields that caused the error
                                described by the ith failed row.
                             

                         |

                        
                            | `getDmlFields` 

                            | Integer i
 

                            | Schema.sObjectField [] 

                            | Returns the field token or tokens for the field or fields that
                                caused the error described by the ith
                                failed row. For more information on field tokens, see [Dynamic Apex](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic.htm). 

                         |

                        
                            | `getDmlId` 

                            | Integer i
 

                            | String 

                            | Returns the ID of the failed record that caused the error
                                described by the ith failed
                                row. 

                         |

                        
                            | `getDmlIndex` 

                            | Integer i
 

                            | Integer 

                            | Returns the original row position of the
                                    ith failed row.  

                         |

                        
                            | `getDmlMessage` 

                            | Integer i
 

                            | String  

                            | Returns the user message for the
                                    ith failed row.  

                         |

                        
                            | `getDmlStatusCode` 

                            | Integer i
 

                            | String 

                            | Deprecated. Use getDmlType instead. Returns the Apex failure code
                                for the ith failed row.  

                         |

                        
                            | `getDmlType` 

                            | Integer i
 

                            | [System.StatusCode](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_enums.htm) 

                            | Returns the value of the System.StatusCode enum. For
                                    example:
```
try {
  insert new Account();
}   catch (System.DmlException ex) {
      System.assertEquals(
         StatusCode.REQUIRED_FIELD_MISSING,
         ex.getDmlType(0));
}
```

For more information about System.StatusCode,
                                    see [Enums](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_enums.htm).

 

                         |

                        
                            | `getNumDml` 

                            |  

                            | Integer 

                            | Returns the number of failed rows for DML exceptions. 

                         |

                    

                

        
## QueryException Method

            
            In addition to the common exception methods, QueryException has this method.

            

                    
                    
                    
                    
                    | **
                        
                            Name** 

                            | **Arguments** 

                            | **Return Type** 

                            | **Description** 

                         |

                    

                    
                        
                            | `getInaccessibleFields` 

                            |  

                            | 
[Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#apex_methods_system_map)<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string),[Set<](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_set.htm#apex_methods_system_set)[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)>> 

                            | Returns a map in which each key is an `sObjectType` and its corresponding value is the set of
                                inaccessible field names in fully qualified format
                                (Namespace__FieldName__c). Use this method to determine the cause
                                    of the `QueryException`. The
                                    returned map contains data only if the method that threw the
                                        `QueryException` is running
                                    in user mode (as opposed to the default system mode). 

In
                                    this code sample, it's assumed that the user doesn’t have field
                                    level security access to the `Contact.Email` and `Account.Website` fields.
                                

```
try {
    List<Account> accounts = [SELECT Website, (SELECT Email FROM Contacts) FROM Account WITH USER_MODE];
} catch (QueryException qe) {
    // Handle inaccessible fields
    Map<String, Set<String>> inaccessible = qe.getInaccessibleFields();
    Set<String> accountFields = inaccessible.get('Account');    
    Set<String> contactFields = inaccessible.get('Contact');
}
```

 

                         |