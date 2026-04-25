# Visibility Enum

Visibility Enum Use the Cache.Visibility enumeration in the Cache.Session or Cache.Org methods to indicate whether a cached value is visible only in the value’s namespace or in all namespaces. Enum Values The following are the values of the Cache.Visibility enum. Value | Description  
---|---  
ALL | The cached value is available to Apex code executing from any namespace. This is the default state.  
NAMESPACE |  The cached value is available to Apex code executing from the same namespace. If a key has the Visibility.NAMESPACE attribute, a get method initiated from a different namespace returns null.
