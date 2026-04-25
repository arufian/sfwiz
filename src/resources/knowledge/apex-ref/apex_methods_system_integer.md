# Integer Class

Integer Class Contains methods for the Integer primitive data type. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage For more information on integers, see [Integer Data Type](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_primitives.htm). Integer Methods The following are methods for Integer.
                              * **[format()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_System_Integer_format)**  
Returns the integer as a string using the locale of the context user.
                              * **[valueOf(stringToInteger)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_System_Integer_valueOf)**  
Returns an Integer that contains the value of the specified String. As in Java, the String is interpreted as representing a signed decimal integer.
                              * **[valueOf(fieldValue)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_System_Integer_valueOf_2)**  
Converts the specified object to an Integer. Use this method to convert a history tracking field value or an object that represents an Integer value.
format() Returns the integer as a string using the locale of the context user. Signature public String format() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] integer myInt = 22;
    system.assertEquals('22', myInt.format());
    
[/code]

valueOf(stringToInteger) Returns an Integer that contains the value of the specified String. As in Java, the String is interpreted as representing a signed decimal integer. Signature public static Integer valueOf(String stringToInteger) Parameters

stringToInteger
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Integer Examples
[code] Integer myInt = Integer.valueOf('123');
[/code]

A TypeException is returned if you attempt to convert a string to an invalid integer.
[code] String n = 'NotAnInteger';
    try {
        Integer myInt = Integer.valueOf(n);
    } catch (TypeException ex) {
        System.debug(LoggingLevel.Error, ex.getMessage());
    }
[/code]

valueOf(fieldValue) Converts the specified object to an Integer. Use this method to convert a history tracking field value or an object that represents an Integer value. Signature public static Integer valueOf(Object fieldValue) Parameters

fieldValue
    Type: Object
Return Value Type: Integer Usage Use this method with the OldValue or NewValue fields of history sObjects, such as AccountHistory, when the field type corresponds to an Integer type, like a number field. Example: Example
[code] List<AccountHistory> ahlist = 
      [SELECT Field,OldValue,NewValue
       FROM AccountHistory];
    for(AccountHistory ah : ahlist) {
      System.debug('Field: ' + ah.Field);
      if (ah.field == 'NumberOfEmployees') {
        Integer oldValue = 
          Integer.valueOf(ah.OldValue);
        Integer newValue = 
          Integer.valueOf(ah.NewValue);
    }
    
[/code]
