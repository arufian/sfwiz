# excludeContextTypes()

excludeContextTypes() Lets the implementation exclude parts of the CanvasRequest context, if the application does not need it. Signature public Set<Canvas.ContextTypeEnum> excludeContextTypes() Return Value Type: SET<[Canvas.ContextTypeEnum](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_canvas_ContextTypeEnum.htm "Describes context data that can be excluded from canvas app context data. You specify which context types to exclude in the excludeContextTypes\(\) method in your CanvasLifecycleHandler implementation.")> This method must return null or a set of zero or more ContextTypeEnum values. Returning null enables all attributes by default. ContextTypeEnum values that can be set are:
          * Canvas.ContextTypeEnum.ORGANIZATION
          * Canvas.ContextTypeEnum.RECORD_DETAIL
          * Canvas.ContextTypeEnum.USER
See [ContextTypeEnum](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_canvas_ContextTypeEnum.htm "Describes context data that can be excluded from canvas app context data. You specify which context types to exclude in the excludeContextTypes\(\) method in your CanvasLifecycleHandler implementation.") for more details on these values. Usage Implement this method to specify which attributes to disable in the context of the canvas app. A disabled attribute will set the associated canvas context information to null. Disabling attributes can help improve performance by reducing the size of the signed request and canvas context. Also, disabled attributes do not need to be retrieved by Salesforce, which further improves performance. See the [Canvas Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.platform_connect.meta/platform_connect/ "HTML \(New Window\)") for more information on context information in the Context object that’s provided in the CanvasRequest. Example This example implementation specifies that the organization information will be disabled in the canvas context.
[code] public Set<Canvas.ContextTypeEnum> excludeContextTypes() {
        Set<Canvas.ContextTypeEnum> excluded = new Set<Canvas.ContextTypeEnum>();
        excluded.add(Canvas.ContextTypeEnum.ORGANIZATION);
        return excluded;
    }
    
[/code]

See Also
          * [_Canvas Developer Guide_ : Filtering CanvasRequest Context Data](https://developer.salesforce.com/docs/atlas.en-us.258.0.platform_connect.meta/platform_connect/canvas_filtering_context_data.htm "Canvas Developer Guide: Filtering CanvasRequest Context
       Data - HTML \(New Window\)")
