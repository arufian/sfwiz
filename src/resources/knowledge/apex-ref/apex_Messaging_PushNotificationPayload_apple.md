# apple(alert, sound, badgeCount, userData)

# apple(alert, sound, badgeCount, userData)

Helper method that creates a valid Apple
payload from the specified arguments.

## Signature

`public static Map<String,Object> apple(String alert, String
     sound, Integer badgeCount, Map<String,Object> userData)`

## Parameters

alert

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Notification message to be sent to the mobile client.

sound

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Name of a sound file to be played as an alert.
This sound file should be in the mobile application bundle.

badgeCount

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

Number to display as the badge of the application
icon.

userData

Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#apex_methods_system_map)<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string), Object>

Map of key-value pairs that contains any additional
data used to provide context for the notification. For example, it
can contain IDs of the records that caused the notification to be
sent. The mobile client app can use these IDs to display these records.

## Return Value

Type:[Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#apex_methods_system_map)<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string), Object>

Returns a formatted payload that includes all of the specified
arguments.

## Usage

To generate a valid payload,
you must provide a value for at least one of the following parameters: alert, sound, badgeCount.

## Example

See the [Push Notification
Example](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_push_notification.htm#push_notification_example_code).