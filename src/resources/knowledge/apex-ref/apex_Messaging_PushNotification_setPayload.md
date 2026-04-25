# setPayload(payload)

setPayload(payload) Sets the payload of the push notification message. Signature public void setPayload(Map<String,Object> payload) Parameters

payload
    Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#apex_methods_system_map "Contains methods for the Map collection type.")<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type."), Object>
     The payload, expressed as a map of key-value pairs. Payload parameters can be different for each mobile OS vendor. For more information on Apple’s payload parameters, search for “Apple Push Notification Service” at [https://developer.apple.com/library/mac/documentation/](https://developer.apple.com/library/mac/documentation "HTML \(New Window\)"). To create the payload for an Apple device, see the [PushNotificationPayload Class](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_push_notification_payload.htm "Contains methods to create the notification message payload for an Apple device.").
Example See the [Push Notification Example](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_push_notification.htm#push_notification_example_code).
