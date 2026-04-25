# CanvasLifecycleHandler Interface

CanvasLifecycleHandler Interface Implement this interface to control context information and add custom behavior during the application render phase. Namespace [Canvas](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Canvas.htm "The Canvas namespace provides an interface and classes for canvas apps in Salesforce.") Usage Use this interface to specify what canvas context information is provided to your app by implementing the excludeContextTypes() method. Use this interface to call custom code when the app is rendered by implementing the onRender() method. If you provide an implementation of this interface, you must implement excludeContextTypes() and onRender(). Example Implementation The following example shows a simple implementation of CanvasLifecycleHandler that specifies that organization context information will be excluded and prints a debug message when the app is rendered.
[code]public class MyCanvasListener 
    implements Canvas.CanvasLifecycleHandler{
        public Set<Canvas.ContextTypeEnum> excludeContextTypes(){
            Set<Canvas.ContextTypeEnum> excluded = new Set<Canvas.ContextTypeEnum>();
            excluded.add(Canvas.ContextTypeEnum.ORGANIZATION);
            return excluded;
        }
        
        public void onRender(Canvas.RenderContext renderContext){
            System.debug('Canvas lifecycle called.');
        }
    }
[/code]

                            * **[CanvasLifecycleHandler Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_canvas_CanvasLifecycleHandler_methods.htm)**  

See Also
                            * [_Canvas Developer Guide_ : Customizing Your App Lifecycle](https://developer.salesforce.com/docs/atlas.en-us.258.0.platform_connect.meta/platform_connect/canvas_customizing_app_lifecycle.htm "Canvas Developer Guide: Customizing Your App
       Lifecycle - HTML \(New Window\)")
