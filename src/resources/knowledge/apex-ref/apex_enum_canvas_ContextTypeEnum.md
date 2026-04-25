# ContextTypeEnum Enum

ContextTypeEnum Enum Describes context data that can be excluded from canvas app context data. You specify which context types to exclude in the excludeContextTypes() method in your CanvasLifecycleHandler implementation. Namespace [Canvas](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Canvas.htm "The Canvas namespace provides an interface and classes for canvas apps in Salesforce.") Enum Values Value | Description  
---|---  
ORGANIZATION | Exclude context information about the organization in which the canvas app is running.  
RECORD_DETAIL | Exclude context information about the object record on which the canvas app appears.  
USER | Exclude context information about the current user.
