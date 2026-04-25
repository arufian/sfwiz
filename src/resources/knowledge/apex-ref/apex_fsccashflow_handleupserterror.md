# HandleUpsertError

HandleUpsertError Helper method that constructs the error response for upsert of a partyIncome or partyExpense record. Signature call(String action, Map<String, Object> args Return Value Returns a list of errors encountered while upserting the record in the database. Examples Input and output JSON example of the action are as follows.

     Input format: [ { "Name": "PI-0000000003", "UsageType": "CashFlow", "IncomeFrequency": "Monthly", "IncomeType": "Salary", "Id": "2m3SG000007dkxxYAA", "IncomeAmount": 999.99, "PartyId": "001SG000004TCxxYAG", "IncomeStatus": "Active", "StartDate": "2024-01-29T08:00:00.000Z" } ]
[/code]

     Output format: [ { "UpsertError“: "Invalid Id“ } ]
[/code]
