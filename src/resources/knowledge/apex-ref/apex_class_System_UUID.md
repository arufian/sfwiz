# UUID Class

UUID Class Contains methods to randomly generate a version 4 universally unique identifier (UUID), compare UUIDs, and convert UUID instance to a string. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage The UUID is generated using a cryptographically strong pseudo-random number generator and is represented as 32 hexadecimal values.
            * **[UUID Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_UUID.htm#apex_System_UUID_methods)**  

UUID Methods The following are methods for UUID.
            * **[equals(obj)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_UUID.htm#apex_System_UUID_equals)**  
Compares a UUID instance with the specified object and returns true if both are equal. Otherwise, returns false.
            * **[fromString(str)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_UUID.htm#apex_System_UUID_fromString)**  
Converts a 32 character hexadecimal string representation of a UUID to a UUID instance.
            * **[hashCode()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_UUID.htm#apex_System_UUID_hashCode)**  
Returns the hashcode corresponding to the UUID instance.
            * **[randomUUID()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_UUID.htm#apex_System_UUID_randomUUID)**  
A static method that randomly generates a version 4 UUID.
            * **[toString()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_UUID.htm#apex_System_UUID_toString)**  
Returns the string representation of the UUID instance.
equals(obj) Compares a UUID instance with the specified object and returns true if both are equal. Otherwise, returns false. Signature public Boolean equals(Object obj) Parameters

obj
    Type: Object
    The UUID object to be compared.
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Example // UUIDs are equal when all the characters in the UUID are the same String uuidStr = '707b2538-98bb-41e7-95e3-1d77bf42b102'; UUID fromStr = UUID.fromString(uuidStr); UUID fromStr2 = UUID.fromString(uuidStr); Assert.isTrue(fromStr.equals(fromStr2)); // A UUID is never equal to a String or any non-UUID object Assert.isFalse(fromStr.equals(uuidStr)); 
[/code]

fromString(str) Converts a 32 character hexadecimal string representation of a UUID to a UUID instance. Signature public static System.UUID fromString(String str) Parameters

str
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: System.UUID Example String uuidStr = '707b2538-98bb-41e7-95e3-1d77bf42b102'; UUID fromStr = UUID.fromString(uuidStr); UUID.fromString(null); // Throws NullPointerException UUID.fromString(‘not a uuid’); // Throws IllegalArgumentException 
[/code]

hashCode() Returns the hashcode corresponding to the UUID instance. Signature public Integer hashCode() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") randomUUID() A static method that randomly generates a version 4 UUID. Signature public static System.UUID randomUUID() Return Value Type: System.UUID A 32 hexadecimal value of the UUID generated. Example UUID randomUUID = UUID.randomUUID(); system.debug(randomUUID); // Prints the UUID string that was randomly generated 
[/code]

toString() Returns the string representation of the UUID instance. Signature public String toString() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
