# ReportDivisionInfo Class

# ReportDivisionInfo Class

Contains information about the divisions that can be used to filter a
      report.

## Namespace

      Available only if your organization uses divisions to segment data and you have the
        “Affected by Divisions” permission. If you do not have the “Affected by Divisions”
        permission, your reports include records in all divisions.

[Reports](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Reports.htm)

## Usage

      Use to filter records in the report based on a division, like West Coast and East
        Coast.

## ReportDivisionInfo Methods

The following are methods for `ReportDivisionInfo`.

### getDefaultValue()

Returns the default division for the report.

#### Signature

`public String getDefaultValue()`

#### Return Value

      
      Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

    

### getValues()

Returns a list of all possible divisions for the
        report.

#### Signature

`public List<Reports.FilterValue> getValues()`

#### Return Value

Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[Reports.FilterValue](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_filtervalue.htm#apex_class_reports_filtervalue)>