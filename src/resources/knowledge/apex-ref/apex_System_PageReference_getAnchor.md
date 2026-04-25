# getAnchor()

getAnchor() Returns the name of the anchor referenced in the page’s URL. That is, the part of the URL after the hashtag (#).  Signature public String getAnchor() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Note Instances of PageReference returned by ApexPages.currentPage() have a null anchor attribute, because URL fragments are not sent to the Salesforce server during a request.
