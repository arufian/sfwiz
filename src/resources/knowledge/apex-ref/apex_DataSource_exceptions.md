# DataSource Exceptions

DataSource Exceptions The DataSource namespace contains exception classes. All exception classes support built-in methods for returning the error message and exception type. See [Exception Class and Built-In Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods."). The DataSource namespace contains these exceptions. Exception | Description | Methods  
---|---|---  
DataSource.​DataSource​Exception | Throw this exception to indicate that an error occurred while communicating with an external data source. | To get the error message and write it to debug log, use the String getMessage().  
DataSource.OAuthTokenExpiredException | Throw this exception to indicate that an OAuth token has expired. The system then attempts to refresh the token automatically and restart the query, search, or sync operation. | To get the error message and write it to debug log, use the String getMessage().
