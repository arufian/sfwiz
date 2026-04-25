# BusinessHours Class

BusinessHours Class Use the BusinessHours methods to set the business hours at which your customer support team operates. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") BusinessHours Methods The following are methods for BusinessHours. All methods are static.
                  * **[add(businessHoursId, startDate, intervalMilliseconds)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_add)**  
Adds an interval of time from a start Datetime traversing business hours only. Returns the result Datetime in the local time zone.
                  * **[addGmt(businessHoursId, startDate, intervalMilliseconds)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_addGmt)**  
Adds an interval of milliseconds from a start Datetime traversing business hours only. Returns the result Datetime in GMT.
                  * **[diff(businessHoursId, startDate, endDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_diff)**  
Returns the difference in milliseconds between a start and end Datetime based on a specific set of business hours.
                  * **[isWithin(businessHoursId, targetDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_isWithin)**  
Returns true if the specified target date occurs within business hours. Holidays are included in the calculation.
                  * **[nextStartDate(businessHoursId, targetDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_nextStartDate)**  
Starting from the specified target date, returns the next date when business hours are open. If the specified target date falls within business hours, this target date is returned.
add(businessHoursId, startDate, intervalMilliseconds) Adds an interval of time from a start Datetime traversing business hours only. Returns the result Datetime in the local time zone. Signature public static Datetime add(String businessHoursId, Datetime startDate, Long intervalMilliseconds) Parameters

businessHoursId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
startDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
intervalMilliseconds
    Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.")
    Interval value should be provided in milliseconds, however time precision smaller than one minute is ignored.
Return Value Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.") addGmt(businessHoursId, startDate, intervalMilliseconds) Adds an interval of milliseconds from a start Datetime traversing business hours only. Returns the result Datetime in GMT. Signature public static Datetime addGmt(String businessHoursId, Datetime startDate, Long intervalMilliseconds) Parameters

businessHoursId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
startDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
intervalMilliseconds
    Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.")
Return Value Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.") diff(businessHoursId, startDate, endDate) Returns the difference in milliseconds between a start and end Datetime based on a specific set of business hours. Signature public static Long diff(String businessHoursId, Datetime startDate, Datetime endDate) Parameters

businessHoursId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
startDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
endDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
Return Value Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.") isWithin(businessHoursId, targetDate) Returns true if the specified target date occurs within business hours. Holidays are included in the calculation. Signature public static Boolean isWithin(String businessHoursId, Datetime targetDate) Parameters

businessHoursId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The business hours ID.
targetDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    The date to verify.
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Example The following example finds whether a given time is within the default business hours.
[code] // Get the default business hours
    BusinessHours bh = [SELECT Id FROM BusinessHours WHERE IsDefault=true];
    
    // Create Datetime on May 28, 2013 at 1:06:08 AM in the local timezone.
    Datetime targetTime = Datetime.newInstance(2013, 5, 28, 1, 6, 8);
    
    // Find whether the time is within the default business hours
    Boolean isWithin= BusinessHours.isWithin(bh.id, targetTime);
[/code]

nextStartDate(businessHoursId, targetDate) Starting from the specified target date, returns the next date when business hours are open. If the specified target date falls within business hours, this target date is returned. Signature public static Datetime nextStartDate(String businessHoursId, Datetime targetDate) Parameters

businessHoursId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The business hours ID.
targetDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    The date used as a start date to obtain the next date.
Return Value Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.") Example The following example finds the next date starting from the target date when business hours reopens. If the target date is within the given business hours, the target date is returned. The returned time is in the local time zone.
[code] // Get the default business hours
    BusinessHours bh = [SELECT Id FROM BusinessHours WHERE IsDefault=true];
    
    // Create Datetime on May 28, 2013 at 1:06:08 AM in the local timezone.
    BusinessHours Class
    
    
    
    
    Use the BusinessHours methods to set the business hours at which your customer support
    team operates.
    
    
    Namespace
    [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.")
    
    
    
    
    
    
    
    BusinessHours Methods
    
    
    
    
    The following are methods for BusinessHours. All methods are static.
    
    
    
    
    
    
    
                                        * 
                        **[add(businessHoursId, startDate, intervalMilliseconds)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_add)**  
                        
                        Adds an interval of time from a start Datetime traversing business hours only. Returns the result Datetime in the local time zone.
    
    
                                        * 
                        **[addGmt(businessHoursId, startDate, intervalMilliseconds)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_addGmt)**  
                        
                        Adds an interval of milliseconds from a start Datetime traversing business hours only. Returns the result Datetime in GMT.
    
    
                                        * 
                        **[diff(businessHoursId, startDate, endDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_diff)**  
                        
                        Returns the difference in milliseconds between a start and end Datetime based on a     specific set of business hours.
    
    
                                        * 
                        **[isWithin(businessHoursId, targetDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_isWithin)**  
                        
                        Returns true if the specified target date occurs within business hours. Holidays are included in the calculation.
    
    
                                        * 
                        **[nextStartDate(businessHoursId, targetDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_businesshours.htm#apex_System_BusinessHours_nextStartDate)**  
                        
                        Starting from the specified target date, returns the next date when business hours are open. If the specified target date falls within business hours, this target date is returned.
    
    
    
    
    
    add(businessHoursId, startDate, intervalMilliseconds)
    
    
    
    
    Adds an interval of time from a start Datetime traversing
    business hours only. Returns the result Datetime in the local time
    zone.
    
    
    Signature
    public static Datetime add(String businessHoursId, Datetime
         startDate, Long intervalMilliseconds)
    
    
    
    Parameters
    
    
    
    
    businessHoursId
    
    
        Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    
    
    
    
    
    startDate
    
    
        Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    
    
    
    
    
    intervalMilliseconds
    
    
        Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.")
    
    
    
        Interval value should be provided in milliseconds, however time
    precision smaller than one minute is ignored.
    
    
    
    
    
    
    
    Return Value
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    
    
    
    
    
    
    
    addGmt(businessHoursId, startDate, intervalMilliseconds)
    
    
    
    
    Adds an interval of milliseconds from a start Datetime
    traversing business hours only. Returns the result Datetime in GMT.
    
    
    Signature
    public static Datetime addGmt(String businessHoursId, Datetime
         startDate, Long intervalMilliseconds)
    
    
    
    Parameters
    
    
    
    
    businessHoursId
    
    
        Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    
    
    
    
    
    startDate
    
    
        Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    
    
    
    
    
    intervalMilliseconds
    
    
        Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.")
    
    
    
    
    
    
    
    
    Return Value
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    
    
    
    
    
    
    
    diff(businessHoursId, startDate, endDate)
    
    
    
    
    Returns the difference in milliseconds between a start and end Datetime based on a
        specific set of business hours.
    
    
    Signature
    public static Long diff(String businessHoursId,
    Datetime startDate, Datetime endDate)
    
    
    
    Parameters
    
    
    
    
    businessHoursId
    
    
        Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    
    
    
    
    
    startDate
    
    
        Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    
    
    
    
    
    endDate
    
    
        Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    
    
    
    
    
    
    
    
    Return Value
    Type: [Long](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_long.htm#apex_methods_system_long "Contains methods for the Long primitive data type.")
    
    
    
    
    
    
    
    isWithin(businessHoursId, targetDate)
    
    
    
    
    Returns true if
    the specified target date occurs within business hours. Holidays are
    included in the calculation.
    
    
    Signature
    public static Boolean isWithin(String businessHoursId,
    Datetime targetDate)
    
    
    
    Parameters
    
    
    
    
    businessHoursId
    
    
        Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    
    
    
        The business hours ID.
    
    
    
    
    targetDate
    
    
        Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    
    
    
        The date to verify.
    
    
    
    
    
    
    
    Return Value
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    
    
    
    Example
    The following example finds whether
    a given time is within the default business hours.
    
[code]// Get the default business hours
    BusinessHours bh = [SELECT Id FROM BusinessHours WHERE IsDefault=true];
    
    // Create Datetime on May 28, 2013 at 1:06:08 AM in the local timezone.
    Datetime targetTime = Datetime.newInstance(2013, 5, 28, 1, 6, 8);
    
    // Find whether the time is within the default business hours
    Boolean isWithin= BusinessHours.isWithin(bh.id, targetTime);
[/code]

nextStartDate(businessHoursId, targetDate) Starting from the specified target date, returns the next date when business hours are open. If the specified target date falls within business hours, this target date is returned. Signature public static Datetime nextStartDate(String businessHoursId, Datetime targetDate) Parameters

businessHoursId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The business hours ID.
targetDate
    Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.")
    The date used as a start date to obtain the next date.
Return Value Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime "Contains methods for the Datetime primitive data type.") Example The following example finds the next date starting from the target date when business hours reopens. If the target date is within the given business hours, the target date is returned. The returned time is in the local time zone.
[code] // Get the default business hours
    BusinessHours bh = [SELECT Id FROM BusinessHours WHERE IsDefault=true];
    
    // Create Datetime on May 28, 2013 at 1:06:08 AM in the local timezone.
    Datetime targetTime = Datetime.newInstance(2013, 5, 28, 1, 6, 8);
    // Starting from the targetTime, find the next date when business hours reopens. Return the target time.
    
    // if it is within the business hours. The returned time will be in the local time zone
    Datetime nextStart = BusinessHours.nextStartDate(bh.id, targetTime);
[/code]

InboundEmail.TextAttachment Class An InboundEmail object stores text attachments in an InboundEmail.TextAttachment object. Namespace [Messaging](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Messaging.htm "The Messaging namespace provides classes and methods for Salesforce outbound and inbound email functionality.") Usage The text attachments can be any of the following:
                  * Attachments with a Multipurpose Internet Mail Extension (MIME) type of text
                  * Attachments with a MIME type of application/octet-stream and a file name that ends with either a .vcf or .vcs extension. These are saved as text/x-vcard and text/calendar MIME types, respectively.
                  * **[InboundEmail.TextAttachment Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_InboundEmail_TextAttachment_constructors)**  

                  * **[InboundEmail.TextAttachment Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_InboundEmail_TextAttachment_Properties)**  

InboundEmail.TextAttachment Constructors The following are constructors for InboundEmail.TextAttachment.
                  * **[InboundEmail.TextAttachment()](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_InboundEmail_TextAttachment_ctor)**  
Creates a new instance of the Messaging.InboundEmail.TextAttachment class.
InboundEmail.TextAttachment() Creates a new instance of the Messaging.InboundEmail.TextAttachment class. Signature public InboundEmail.TextAttachment() InboundEmail.TextAttachment Properties The following are properties for InboundEmail.TextAttachment.
                  * **[body](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_TextAttachment_body)**  
The body of the attachment.
                  * **[bodyIsTruncated](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_email_inbound_text.htm#apex_Messaging_TextAttachment_bodyIsTruncated)** Datetime targetTime = Datetime.newInstance(2013, 5, 28, 1, 6, 8); // Starting from the targetTime, find the next date when business hours reopens. Return the target time. // if it is within the business hours. The returned time will be in the local time zone Datetime nextStart = BusinessHours.nextStartDate(bh.id, targetTime);
[/code]
