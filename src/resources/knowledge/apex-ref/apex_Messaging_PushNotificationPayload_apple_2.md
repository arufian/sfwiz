# apple(alertBody, actionLocKey, locKey, locArgs, launchImage, sound, badgeCount, userData)

# apple(alertBody, actionLocKey, locKey, locArgs, launchImage, sound, badgeCount, userData)

Helper method that creates a valid Apple
payload from the specified arguments.

## Signature

`public static Map<String,Object> apple(String alertBody, String
     actionLocKey, String locKey, String[] locArgs, String launchImage, String sound, Integer
     badgeCount, Map<String,Object> userData)`

## Parameters

alertBody

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Text of the alert message.

actionLocKey

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

If a value is specified for the actionLocKey argument, an alert with two buttons is displayed. The value is a
key to get a localized string in a Localizable.strings file to use for the right button’s title.

locKey

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Key to an alert-message string in a Localizable.strings file for the current localization.

locArgs

Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)>

Variable string values to appear in place of the format specifiers
in locKey.

launchImage

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

File name of an image file in the application bundle.

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

Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#apex_methods_system_map)<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string), Object>

Returns a formatted payload that includes all of the specified
arguments.

## Usage

To generate a valid payload,
you must provide a value for at least one of the following parameters: alert, sound, badgeCount.