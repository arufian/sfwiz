# Time Class

Time Class Contains methods for the Time primitive data type. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage For more information on time, see [Time Data Type](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_primitives.htm). Time Methods The following are methods for Time.
                                * **[addHours(additionalHours)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_addHours)**  
Adds the specified number of hours to a Time.
                                * **[addMilliseconds(additionalMilliseconds)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_addMilliseconds)**  
Adds the specified number of milliseconds to a Time.
                                * **[addMinutes(additionalMinutes)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_addMinutes)**  
Adds the specified number of minutes to a Time.
                                * **[addSeconds(additionalSeconds)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_addSeconds)**  
Adds the specified number of seconds to a Time.
                                * **[hour()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_hour)**  
Returns the hour component of a Time.
                                * **[millisecond()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_millisecond)**  
Returns the millisecond component of a Time.
                                * **[minute()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_minute)**  
Returns the minute component of a Time.
                                * **[newInstance(hour, minutes, seconds, milliseconds)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_newInstance)**  
Constructs a Time from Integer representations of the specified hour, minutes, seconds, and milliseconds. (UTC is assumed.)
                                * **[second()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_time.htm#apex_System_Time_second)**  
Returns the second component of a Time.
addHours(additionalHours) Adds the specified number of hours to a Time. Signature public Time addHours(Integer additionalHours) Parameters

additionalHours
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
Return Value Type: Time Example
[code] Time myTime = Time.newInstance(1, 2, 3, 4);
    Time expected = Time.newInstance(4, 2, 3, 4);
    System.assertEquals(expected, myTime.addHours(3));
    
[/code]

addMilliseconds(additionalMilliseconds) Adds the specified number of milliseconds to a Time. Signature public Time addMilliseconds(Integer additionalMilliseconds) Parameters

additionalMilliseconds
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
Return Value Type: Time Example
[code] Time myTime = Time.newInstance(1, 2, 3, 0);
    Time expected = Time.newInstance(1, 2, 4, 400);
    System.assertEquals(expected, myTime.addMilliseconds(1400));
[/code]

addMinutes(additionalMinutes) Adds the specified number of minutes to a Time. Signature public Time addMinutes(Integer additionalMinutes) Parameters

additionalMinutes
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
Return Value Type: Time Example
[code] Time myTime = Time.newInstance(18, 30, 2, 20);
    Integer myMinutes = myTime.minute();
    myMinutes = myMinutes + 5;
    System.assertEquals(myMinutes, 35);
[/code]

addSeconds(additionalSeconds) Adds the specified number of seconds to a Time. Signature public Time addSeconds(Integer additionalSeconds) Parameters

additionalSeconds
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
Return Value Type: Time Example
[code] Time myTime = Time.newInstance(1, 2, 55, 0);
    Time expected = Time.newInstance(1, 3, 5, 0);
    System.assertEquals(expected, myTime.addSeconds(10));
[/code]

hour() Returns the hour component of a Time. Signature public Integer hour() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") Example
[code] Time myTime = Time.newInstance(18, 30, 2, 20);
    myTime = myTime.addHours(2);
    Integer myHour = myTime.hour();
    System.assertEquals(myHour, 20);
[/code]

millisecond() Returns the millisecond component of a Time. Signature public Integer millisecond() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") Example
[code] Time myTime = Time.newInstance(3, 14, 15, 926);
    System.assertEquals(926, myTime.millisecond());
[/code]

minute() Returns the minute component of a Time. Signature public Integer minute() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") Example
[code] Time myTime = Time.newInstance(3, 14, 15, 926);
    System.assertEquals(14, myTime.minute());
[/code]

newInstance(hour, minutes, seconds, milliseconds) Constructs a Time from Integer representations of the specified hour, minutes, seconds, and milliseconds. (UTC is assumed.) Signature public static Time newInstance(Integer hour, Integer minutes, Integer seconds, Integer milliseconds) Parameters

hour
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
minutes
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
seconds
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
milliseconds
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
Return Value Type: Time Example The following example creates a time of 18:30:2:20 (UTC).
[code] Time myTime = 
    Time.newInstance(18, 30, 2, 20);
[/code]

second() Returns the second component of a Time. Signature public Integer second() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") Example
[code] Time myTime = Time.newInstance(3, 14, 15, 926);
    System.assertEquals(15, myTime.second());
[/code]
