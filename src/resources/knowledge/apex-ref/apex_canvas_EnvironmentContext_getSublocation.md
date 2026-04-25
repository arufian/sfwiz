# getSublocation()

getSublocation() Retrieves the display sublocation where the canvas app is being called from. Signature public String getSublocation() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The return value can be one of the following strings:
          * S1MobileCardFullview—The canvas app was called from a mobile card.
          * S1MobileCardPreview—The canvas app was called from a mobile card preview. The user must click the preview to open the app.
          * S1RecordHomePreview—The canvas app was called from a record detail page preview. The user must click the preview to open the app.
          * S1RecordHomeFullview—The canvas app was called from a page layout.
Usage Use this method to obtain the display sublocation for the canvas app. Use only if the primary display location can be displayed on mobile devices.
