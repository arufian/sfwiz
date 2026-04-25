# AsyncInfo Class

AsyncInfo Class Provides methods to get the current stack depth, maximum stack depth, and the minimum queueable delay for Queueable transactions, and to determine if maximum stack depth is set. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.")
            * **[AsyncInfo Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncInfo.htm#apex_System_AsyncInfo_methods)**  

AsyncInfo Methods The following are methods for AsyncInfo.
            * **[getCurrentQueueableStackDepth()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncInfo.htm#apex_System_AsyncInfo_getCurrentQueueableStackDepth)**  
Get the current queueable stack depth for queueable transactions.
            * **[getMaximumQueueableStackDepth()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncInfo.htm#apex_System_AsyncInfo_getMaximumQueueableStackDepth)**  
Get the maximum queueable stack depth for queueable transactions.
            * **[getMinimumQueueableDelayInMinutes()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncInfo.htm#apex_System_AsyncInfo_getMinimumQueueableDelayInMinutes)**  
Get the minimum queueable delay for queueable transactions (in minutes).
            * **[hasMaxStackDepth()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncInfo.htm#apex_System_AsyncInfo_hasMaxStackDepth)**  
Determine if maximum stack depth is set for your queueable requests.
getCurrentQueueableStackDepth() Get the current queueable stack depth for queueable transactions. Signature public static Integer getCurrentQueueableStackDepth() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") getMaximumQueueableStackDepth() Get the maximum queueable stack depth for queueable transactions. Signature public static Integer getMaximumQueueableStackDepth() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") getMinimumQueueableDelayInMinutes() Get the minimum queueable delay for queueable transactions (in minutes). Signature public static Integer getMinimumQueueableDelayInMinutes() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") Returns null if no delay is defined. hasMaxStackDepth() Determine if maximum stack depth is set for your queueable requests. Signature public static Boolean hasMaxStackDepth() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
