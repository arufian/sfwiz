# setCookies(cookies)

setCookies(cookies) Creates a list of cookie objects. Used in conjunction with the Cookie class. Signature public Void setCookies(Cookie[] cookies) Parameters

cookies
    Type: [System.Cookie](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_sites_cookie.htm#apex_classes_sites_cookie "The Cookie class lets you access cookies for your Salesforce site using Apex.")[]
Return Value Type: Void Usage Important
          * Cookie names and values set in Apex are URL encoded, that is, characters such as @ are replaced with a percent sign and their hexadecimal representation. 
          * The setCookies method adds the prefix “apex__” to the cookie names. 
          * Setting a cookie's value to null sends a cookie with an empty string value instead of setting an expired attribute.
          * After you create a cookie, the properties of the cookie can't be changed.
          * Be careful when storing sensitive information in cookies. Pages are cached regardless of a cookie value. If you use a cookie value to generate dynamic content, you should disable page caching. For more information, see [Configure Site Caching](https://help.salesforce.com/articleView?id=sf.sites_caching.htm&language=en_US) in Salesforce Help.
