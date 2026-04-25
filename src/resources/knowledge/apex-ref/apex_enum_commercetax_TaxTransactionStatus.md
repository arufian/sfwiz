# TaxTransactionStatus Enum

TaxTransactionStatus Enum Shows whether the tax transaction has been committed or uncommitted. Usage Used by the [CalculateTaxResponse](atlas.en-us.258.0.apexref.meta/apexref/apex_class_commercetax_CalculateTaxResponse.htm#apex_class_commercetax_CalculateTaxResponse "Sets the values of the tax transaction following a response from the external tax engine. Extends the AbstractTransactionResponse class and is the top-level response class.") class method. Enum Values The commercetax.TaxTransactionStatus enum includes these values. Value | Description  
---|---  
Committed | Tax has been calculated and committed.  
Uncommitted | Tax has been calculated but hasn't been committed.
