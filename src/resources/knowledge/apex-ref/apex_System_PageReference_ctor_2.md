# PageReference(partialURL)

PageReference(partialURL) Creates a new instance of the PageReference class using the specified URL. Signature public PageReference(String partialURL) Parameters

partialURL
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The partial URL of a page hosted on the Lightning Platform or a full external URL. The following are some examples of the partialURL parameter values:
          * /apex/HelloWorld: refers to the Visualforce page located at http://MyDomainName-PackageName.vf.force.com/apex/HelloWorld.
          * /recordID: refers to the detail page of a specified record.
          * http://www.google.com: refers to an external URL.
