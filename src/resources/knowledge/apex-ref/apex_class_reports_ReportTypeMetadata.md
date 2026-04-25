# ReportTypeMetadata Class

# ReportTypeMetadata Class

Contains report type metadata, which gives you information
about the fields that are available in each section of the report
type, plus filter information for those fields.

## Namespace

[Reports](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Reports.htm)

- 
**[ReportTypeMetadata Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportTypeMetadata.htm#apex_Reports_ReportTypeMetadata_methods)**

## ReportTypeMetadata Methods

The following are methods for `ReportTypeMetadata`. All are instance methods.

- 
**[getCategories()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportTypeMetadata.htm#apex_Reports_ReportTypeMetadata_getCategories)**

Returns all fields in the report type. The fields are organized by section.

- 
**[getDivisionInfo()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportTypeMetadata.htm#apex_reports_ReportTypeMetadata_getDivisionInfo)**

Returns the default division and a list of all possible divisions that       can be applied to this type of report.

- 
**[getScopeInfo()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportTypeMetadata.htm#apex_reports_ReportTypeMetadata_getScopeInfo)**

Returns information about the scopes that can be applied to this type       of report.

- 
**[getStandardDateFilterDurationGroups()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportTypeMetadata.htm#apex_reports_ReportTypeMetadata_getStandardDateFilterDurationGroups)**

Returns information about the standard date filter groupings that can       be applied to this type of report. Standard date filter groupings include Calendar Year,       Calendar Quarter, Calendar Month, Calendar Week, Fiscal Year, Fiscal Quarter, Day and a custom       value based on a user-defined date range.

- 
**[getStandardFilterInfos()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportTypeMetadata.htm#apex_reports_ReportTypeMetadata_getStandardFilterInfos)**

Returns information about standard date filters that can be applied to       this type of report.

### getCategories()

Returns all fields in the report type. The fields are organized
by section.

#### Syntax

`public LIST<Reports.ReportTypeColumnCategory> getCategories()`

#### Return Value

Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[Reports.ReportTypeColumnCategory](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_reporttypecolumncategory.htm#apex_class_reports_reporttypecolumncategory)>

### getDivisionInfo()

Returns the default division and a list of all possible divisions that
      can be applied to this type of report.

#### Signature

`public Reports.ReportDivisionInfo getDivisionInfo()`

#### Return Value

Type: [Reports.ReportDivisionInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportDivisionInfo.htm#apex_class_reports_ReportDivisionInfo)

### getScopeInfo()

Returns information about the scopes that can be applied to this type
      of report.

#### Signature

`public Reports.ReportScopeInfo getScopeInfo()`

#### Return Value

Type: [Reports.ReportScopeInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportScopeInfo.htm#apex_class_reports_ReportScopeInfo)

### getStandardDateFilterDurationGroups()

Returns information about the standard date filter groupings that can
      be applied to this type of report. Standard date filter groupings include Calendar Year,
      Calendar Quarter, Calendar Month, Calendar Week, Fiscal Year, Fiscal Quarter, Day and a custom
      value based on a user-defined date range.

#### Signature

`public List<Reports.StandardDateFilterDurationGroup> getStandardDateFilterDurationGroups()`

#### Return Value

Type: List<[Reports.StandardDateFilterDurationGroup](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_StandardDateFilterDurationGroup.htm#apex_class_reports_StandardDateFilterDurationGroup)>

### getStandardFilterInfos()

Returns information about standard date filters that can be applied to
      this type of report.

#### Signature

`public Map<String,Reports.StandardFilterInfo> getStandardFilterInfos()`

#### Return Value

Type: Map<String,[Reports.StandardFilterInfo](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_StandardFilterInfo.htm#apex_class_reports_StandardFilterInfo)>