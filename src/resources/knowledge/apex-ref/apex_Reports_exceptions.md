# Reports Exceptions

Reports Exceptions The Reports namespace contains exception classes. All exception classes support built-in methods for returning the error message and exception type. See [Exception Class and Built-In Exceptions](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm "An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods."). The Reports namespace contains these exceptions: Exception | Description | Methods  
---|---|---  
Reports.FeatureNotSupportedException | Invalid report format |   
Reports.InstanceAccessException | Unable to access report instance |   
Reports.InvalidFilterException | Filter validation error |  List<String> getFilterErrors() returns a list of filter errors  
Reports.InvalidReportMetadataException | Missing metadata for filters |  List<String> getReportMetadataErrors() returns a list of metadata errors  
Reports.InvalidSnapshotDateException | Invalid historical report format |  List<String> getSnapshotDateErrors() returns a list of snapshot date errors  
Reports.MetadataException | No selected report columns |   
Reports.ReportRunException | Error running report |   
Reports.UnsupportedOperationException | Missing permissions for running reports | 
