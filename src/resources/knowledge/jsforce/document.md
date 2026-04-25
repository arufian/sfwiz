# JSforce Document (v3)

Source: https://jsforce.github.io/document/

Toggle navigation [JSforce](/ "Top")

×

#### Connect to Salesforce

Connecting to:

Production (login.salesforce.com) Sandbox (test.salesforce.com)

Cancel Connect

## Document

JSforce library document with brief usage examples of each API.

**NOTE:** These docs are for jsforce v3. [Looking for v1 docs?](/document-v1/)

## Connection

### Username and Password Login

When you have a Salesforce org username and password (and maybe security token, if required), you can use `Connection.login(username, password)` to establish a connection to the org.

By default, it uses the SOAP API login endpoint (so, no OAuth2 client information is required).

```
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com'
});

const userInfo = await conn.login(username, password)

// logged in user property
console.log("User ID: " + userInfo.id);
console.log("Org ID: " + userInfo.organizationId);
```

### Username and Password Login (OAuth2 Resource Owner Password Credential)

When OAuth2 client information is given, `Connection.login(username, password + security_token)` uses OAuth2 Resource Owner Password Credential flow to login to Salesforce.

```
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  oauth2 : {
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com',
    clientId : '<your Salesforce OAuth2 client ID is here>',
    clientSecret : '<your Salesforce OAuth2 client secret is here>',
    redirectUri : '<callback URI is here>'
  }
});

const userInfo = await conn.login(username, password)

// logged in user property
console.log("User ID: " + userInfo.id);
console.log("Org ID: " + userInfo.organizationId);
```

> \[!WARNING\] If you create your org in Summer ’23 or later, the OAuth 2.0 username-password flow is blocked by default as described in this [article](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_username-password_flow_blocked_by_default.htm&release=244&type=5). The username-password flow presents security risks. We recommend using the OAuth 2.0 client credentials flow instead.

### Session ID

If you have a Salesforce session ID and its server URL information use it to authenticate.

```
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  instanceUrl : '<your Salesforce server URL (e.g. https://na1.salesforce.com) is here>',
  serverUrl : '<your Salesforce server URL (e.g. https://na1.salesforce.com) is here>',
  sessionId : '<your Salesforce session ID is here>'
});
```

### Access Token

After the login API call or OAuth2 authorization, you can get the Salesforce access token and its instance URL. Next time you can use them to establish a connection.

```
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  instanceUrl : '<your Salesforce server URL (e.g. https://na1.salesforce.com) is here>',
  accessToken : '<your Salesforce OAuth2 access token is here>'
});
```

### Access Token with Refresh Token

If a refresh token is provided in the constructor, the connection will automatically refresh the access token when it has expired.

**NOTE**: Refresh token is only available for OAuth2 authorization code flow.

```
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  oauth2 : {
    clientId : '<your Salesforce OAuth2 client ID is here>',
    clientSecret : '<your Salesforce OAuth2 client secret is here>',
    redirectUri : '<your Salesforce OAuth2 redirect URI is here>'
  },
  instanceUrl : '<your Salesforce server URL (e.g. https://na1.salesforce.com) is here>',
  accessToken : '<your Salesforce OAuth2 access token is here>',
  refreshToken : '<your Salesforce OAuth2 refresh token is here>'
});
conn.on("refresh", (accessToken, res) => {
  // Refresh event will be fired when renewed access token
  // to store it in your storage for next request
});

// Alternatively, you can manually request an updated access token by passing the refresh token to the `oauth2.refreshToken` method.
const res = await conn.oauth2.refreshToken(refreshToken)
console.log(res.access_token)
```

**NOTE**: You don't need to listen to the `refresh` event and grab the new access token manually, this is done automatically (see the `Session refresh handler` section).

### Session refresh handler

You can define a function that refreshes an expired access token:

```
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  loginUrl : '<your Salesforce server URL (e.g. https://na1.salesforce.com) is here>',
  instanceUrl : '<your Salesforce server URL (e.g. https://na1.salesforce.com) is here>',
  refreshFn: async(conn, callback) => {
    try {
      // re-auth to get a new access token
      await conn.login(username, password);
      if (!conn.accessToken) {
        throw new Error('Access token not found after login');
      }

      console.log("Token refreshed")

      // 1st arg can be an `Error` or null if successful
      // 2nd arg should be the valid access token
      callback(null, conn.accessToken);
    } catch (err) {
      if (err instanceof Error) {
        callback(err);
      } else {
        throw err;
      }
    }
  }
});
```

The refresh function will be executed whenever the API returns a `401`, the new access token passed in the callback will be set in the `Connection` instance and the request will be re-issued.

`Connection.login` sets the same `refreshFn` function above in the example.

You can use this feature to handle session refresh in different OAuth methods like JWT or Client Credentials.

### Logout

Call `Connection.logout()` to logout from the server and invalidate current session. It is valid for both SOAP API based sessions and OAuth2 based sessions.

```
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  sessionId : '<session id to logout>',
  serverUrl : '<your Salesforce Server url to logout>'
});

await conn.logout()
```

## OAuth2

(Following examples are assuming running on express.js framework.)

### Authorization Request

First, you should redirect user to the Salesforce auth page to get authorized. You can get the Salesforce auth URL by calling `OAuth2.getAuthorizationUrl(options)`.

```
import { OAuth2 } from 'jsforce';

//
// OAuth2 client information can be shared with multiple connections.
//
const oauth2 = new OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com',
  clientId : '<your Salesforce OAuth2 client ID is here>',
  clientSecret : '<your Salesforce OAuth2 client secret is here>',
  redirectUri : '<callback URI is here>'
});
//
// Get authorization url and redirect to it.
//
app.get('/oauth2/auth', function(req, res) {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'api id web' }));
});
```

### Access Token Request

After the acceptance of authorization request, your app is called back from Salesforce with the authorization code in the `code` URL parameter. Pass the code to `Connection.authorize(code)` to get an access token.

For the refresh token to be returned from Salesforce, make sure that the following Scope is included in the Connected App `Perform requests at any time (refresh_token, offline_access)` and `refresh_token` is included in the call to `getAuthorizationUrl()`.

```
//
// Pass received authorization code and get access token
//
import { Connection } from 'jsforce';

app.get('/oauth2/callback', function(req, res) {
  const conn = new Connection({ oauth2 : oauth2 });
  const code = req.param('code');

  const userInfo = await conn.authorize(code)

  // Now you can get the access token, refresh token, and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.refreshToken);
  console.log(conn.instanceUrl);
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
  res.send('success'); // or your desired response
});
```

### JWT Bearer Flow (OAuth 2.0 JWT Bearer Flow)

If you have a Connected App you can use the JWT Bearer Flow to authenticate to the org. Pass the bearer token and grant type to `Connection.authorize({ bearerToken, grant_type })` and get the access token.

For more information about the setup, see: [https://help.salesforce.com/s/articleView?id=sf.remoteaccess\_oauth\_jwt\_flow.htm&type=5](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_jwt_flow.htm&type=5)

```
import { Connection } from 'jsforce';
import * as jwt from 'jsonwebtoken'

const conn = new Connection()

const claim = {
  iss: ISSUER,
  aud: AUDIENCE,
  sub: 'user01@mydomain.example.org',
  exp: Math.floor(Date.now() / 1000) + 3 * 60
};
const bearerToken = jwt.sign(claim, cert, { algorithm: 'RS256'});
const userInfo = await conn.authorize({
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  assertion: bearerToken
});

// Now you can get the access token and instance URL information.
// Save them to establish a connection next time.
console.log(conn.accessToken);
console.log(conn.instanceUrl);

// logged in user property
console.log("User ID: " + userInfo.id);
console.log("Org ID: " + userInfo.organizationId);
```

### Client Credentials Flow (OAuth 2.0 Client Credentials Flow)

Similar to the JWT example, just pass the client id and secret from your connected app and use the `client_credentials` grant type.

For more information about the setup, see: [https://help.salesforce.com/s/articleView?id=sf.remoteaccess\_oauth\_client\_credentials\_flow.htm&type=5](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_client_credentials_flow.htm&type=5)

```
import { Connection } from 'jsforce';

const conn = new jsforce.Connection({
  instanceUrl: '<org instance URL>',
  oauth2: { 
    clientId : '<your Salesforce OAuth2 client ID is here>',
    clientSecret : '<your Salesforce OAuth2 client secret is here>',
    loginUrl
  },
});

const userInfo = await conn.authorize({ grant_type: "client_credentials" })
```

## Query

### Using SOQL

By using `Connection.query(soql)`, you can achieve very basic SOQL query to fetch Salesforce records.

```
/* @interactive */
const res = await conn.query('SELECT Id, Name FROM Account');
console.log(`total: ${res.totalSize}`)
console.log(`fetched: ${res.records.length}`)
```

#### Event-Driven Style

When a query is executed, it emits a "record" event for each fetched record. By listening the event you can collect fetched records.

If you want to fetch records exceeding the limit number of returning records per one query, you can use `autoFetch` option in `Query.execute(options)` (or its synonym `Query.exec(options)`, `Query.run(options)`) method. It is recommended to use `maxFetch` option also, if you have no idea how large the query result will become.

When query is completed, `end` event will be fired. The `error` event occurs something wrong when doing query.

```
/* @interactive */
const records = [];
const query = conn.query("SELECT Id, Name FROM Account")
  .on("record", (record) => {
    records.push(record);
  })
  .on("end", () => {
    console.log("total in database : " + query.totalSize);
    console.log("total fetched : " + query.totalFetched);
  })
  .on("error", (err) => {
    console.error(err);
  })
  .run({ autoFetch : true, maxFetch : 4000 }); // synonym of Query.execute();
```

**NOTE**: When `maxFetch` option is not set, the default value (10,000) is applied. If you really want to fetch more records than the default value, you should explicitly set the maxFetch value in your query.

**NOTE**: In ver. 1.2 or earlier, the callback style (or promise style) query invokation with `autoFetch` option only returns records in first fetch. From 1.3, it returns all records retrieved up to `maxFetch` value.

### Using Query Method-Chain

#### Basic Method Chaining

By using `SObject.find(conditions, fields)`, you can do query in JSON-based condition expression (like MongoDB). By chaining other query construction methods, you can create a query programatically.

```
/* @interactive */
//
// Following query is equivalent to this SOQL
//
// "SELECT Id, Name, CreatedDate FROM Contact
//  WHERE LastName LIKE 'A%' AND CreatedDate >= YESTERDAY AND Account.Name = 'Sony, Inc.'
//  ORDER BY CreatedDate DESC, Name ASC
//  LIMIT 5 OFFSET 10"
//
const contacts = await conn.sobject("Contact")
  .find(
    // conditions in JSON object
    { LastName : { $like : 'A%' },
      CreatedDate: { $gte : jsforce.Date.YESTERDAY },
      'Account.Name' : 'Sony, Inc.' },
    // fields in JSON object
    { Id: 1,
      Name: 1,
      CreatedDate: 1 }
  )
  .sort({ CreatedDate: -1, Name : 1 })
  .limit(5)
  .skip(10)
  .execute((err, records) => {
    if (err) { return console.error(err); }
    console.log("fetched : " + records.length);
  });

console.log(contacts)
```

Another representation of the query above.

```
/* @interactive */
const contacts = await conn.sobject("Contact")
  .find({
    LastName : { $like : 'A%' },
    CreatedDate: { $gte : jsforce.Date.YESTERDAY },
    'Account.Name' : 'Sony, Inc.'
  },
    'Id, Name, CreatedDate' // fields can be string of comma-separated field names
                            // or array of field names (e.g. [ 'Id', 'Name', 'CreatedDate' ])
  )
  .sort('-CreatedDate Name') // if "-" is prefixed to field name, considered as descending.
  .limit(5)
  .skip(10)
  .execute((err, records) => {
    if (err) { return console.error(err); }
    console.log("record length = " + records.length);
    for (const i=0; i < records.length; i++) {
      const record = records[i];
      console.log(`Name: ${record.Name}`);
      console.log(`Created Date: ${record.CreatedDate}`);
    }
  });

console.log(contacts)
```

#### Wildcard Fields

When the `fields` argument is omitted in `SObject.find(conditions, fields)` call, it will implicitly describe the current SObject fields before the query (lookup cached result first, if available) and then fetch all fields defined in the SObject.

**NOTE**: In the version less than 0.6, it fetches only `Id` field if `fields` argument is omitted.

```
/* @interactive */
await conn.sobject("Contact")
  .find({ CreatedDate: jsforce.Date.TODAY }) // "fields" argument is omitted
  .execute((err, records) => {
    if (err) { return console.error(err); }
    console.log(records);
  });
```

The above query is equivalent to:

```
/* @interactive */
await conn.sobject("Contact")
  .find({ CreatedDate: jsforce.Date.TODAY }, '*') // fields in asterisk, means wildcard.
  .execute((err, records) => {
    if (err) { return console.error(err); }
    console.log(records);
  });
```

Queries can also be represented in more SQL-like verbs - `SObject.select(fields)`, `Query.where(conditions)`, `Query.orderby(sort, dir)`, and `Query.offset(num)`.

```
/* @interactive */
await conn.sobject("Contact")
  .select('*, Account.*') // asterisk means all fields in specified level are targeted.
  .where("CreatedDate = TODAY") // conditions in raw SOQL where clause.
  .limit(10)
  .offset(20) // synonym of "skip"
  .execute((err, records) => {
    for (const i=0; i<records.length; i++) {
      const record = records[i];
      console.log(`First Name: ${record.FirstName}`);
      console.log(`Last Name: ${record.LastName}`);
      // fields in Account relationship are fetched
      console.log(`Account Name: ${record.Account.Name}`); 
    }
  });
```

You can also include child relationship records into query result by calling `Query.include(childRelName)`. After calling `Query.include(childRelName)`, it enters into the context of child query. In child query context, query construction call is applied to the child query. Use `SubQuery.end()` to recover from the child context.

```
/* @interactive */
//
// Following query is equivalent to this SOQL
//
// "SELECT Id, FirstName, LastName, ..., 
//         Account.Id, Acount.Name, ...,
//         (SELECT Id, Subject, … FROM Cases
//          WHERE Status = 'New' AND OwnerId = :conn.userInfo.id
//          ORDER BY CreatedDate DESC)
//  FROM Contact
//  WHERE CreatedDate = TODAY
//  LIMIT 10 OFFSET 20"
//
await conn.sobject("Contact")
  .select('*, Account.*')
  .include("Cases") // include child relationship records in query result. 
     // after include() call, entering into the context of child query.
     .select("*")
     .where({
        Status: 'New',
        OwnerId : conn.userInfo.id,
     })
     .orderby("CreatedDate", "DESC")
     .end() // be sure to call end() to exit child query context
  .where("CreatedDate = TODAY")
  .limit(10)
  .offset(20)
  .execute((err, records) => {
    if (err) { return console.error(err); }
    console.log(`records length = ${records.length}`);
    for (const i=0; i < records.length; i++) {
      const record = records[i];
      console.log(`First Name: ${record.FirstName}`);
      console.log(`Last Name: ${record.LastName}`);
      // fields in Account relationship are fetched
      console.log(`Account Name: ${record.Account.Name}`); 
      // 
      if (record.Cases) {
        console.log(`Cases total: ${record.Cases.totalSize}`);
        console.log(`Cases fetched: ${record.Cases.records.length}`);
      }
    }
  });
```

#### Conditionals

You can define multiple `AND`/`OR` conditional expressions by passing them in an array:

```
// The following code gets translated to this soql query:
// SELECT Name FROM Contact WHERE LastName LIKE 'A%' OR LastName LIKE 'B%'
// 
const contacts = await conn.sobject("Contact")
  .find({
    $or: [{ LastName: { $like : 'A%' }}, { LastName: { $like : 'B%'} }]
  }, ['Name'])

console.log(contacts);
```

#### Dates

`jsforce.Sfdate` provides some utilities to help working dates in SOQL: [https://jsforce.github.io/jsforce/classes/date.SfDate.html](https://jsforce.github.io/jsforce/classes/date.SfDate.html)

Literals like `YESTERDAY`, `TODAY`, `TOMORROW`:

```
// SELECT Name FROM Account WHERE PersonBirthDate = TODAY
//
const accounts = await conn.sobject("Account")
  .find({
    PersonBirthDate: jsforce.SfDate.TODAY
  }, ['Name']);

console.log(accounts);
```

Dynamic N days/weeks/month/quarter functions:

```
// SELECT Name FROM Account WHERE PersonBirthDate = LAST_N_WEEKS:5
//
const accounts = await conn.sobject("Account")
  .find({
    PersonBirthDate: jsforce.SfDate.LAST_N_WEEKS(5)
  }, ['Name']);

console.log(accounts);
```

Even parse a JS `Date` object:

```
// SELECT Name FROM Account WHERE PersonBirthDate = 2024-06-27
//
const accounts = await conn.sobject("Account")
  .find({
    PersonBirthDate: jsforce.SfDate.toDateLiteral(new Date())
  }, ['Name']);

console.log(accounts);
```

## Search

`Connection.search` allows you to search records with SOSL in multiple objects.

```
/* @interactive */
const res = await conn.search("FIND {Un*} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)");
console.log(res.searchRecords)
);
```

## CRUD

JSforce supports basic "CRUD" operation for records in Salesforce. It also supports multiple record manipulation in one API call.

### Retrieve

`SObject.retrieve(id)` fetches a record or records specified by id(s) in first argument.

```
/* @interactive */
// Single record retrieval
const account = await conn.sobject('Account').retrieve('0010500000fxR4EAAU')
console.log(`Name: ${account.Name}`)
```

```
/* @interactive */
// Multiple record retrieval
const accounts = await conn.sobject('Account').retrieve([
  '0010500000fxR4EAAU',
  '0010500000fxR3nAAE',
])

for (const acc of accounts) {
  console.log(`Name: ${acc.Name}`)
}
```

### Create

`SObject.create(record)` (or its synonym `SObject.insert(record)`) creates a record or records given in first argument.

```
/* @interactive */
// Single record creation
const ret = await conn.sobject("Account").create({ Name : 'My Account #1' });
console.log(`Created record id : ${ret.id}`);
```

```
/* @interactive */
// Multiple records creation
const rets = await conn.sobject("Account").create([
  { Name : 'My Account #2' },
  { Name : 'My Account #3' },
]);

for (const ret of rets) {
  console.log(`Created record id : ${ret.id}`);
}
```

### Update

`SObject.update(record)` updates a record or records given in first argument.

```
/* @interactive */
// Single record update
const ret = await conn.sobject("Account").update({
  Id: '0010500000fxbcuAAA',
  Name : 'Updated Account #1'
})

if (ret.success) {
  console.log(`Updated Successfully : ${ret.id}`);
}
```

```
/* @interactive */
// Multiple records update
const rets = await conn.sobject("Account").update([
  { Id: '0010500000fxbcuAAA', Name : 'Updated Account #1' },
  { Id: '0010500000fxbcvAAA', Name : 'Updated Account #2' },
])

for (const ret of rets) {
  if (ret.success) {
    console.log(`Updated Successfully : ${ret.id}`);
  }
}
```

### Delete

`SObject.destroy(id)` (or its synonym `SObject.del(id)`, `SObject.delete(id)`) deletes a record or records given in first argument.

```
/* @interactive */
// Single record deletion
const ret = await conn.sobject("Account").delete('0010500000fxbcuAAA')

if (ret.success) {
  console.log(`Deleted Successfully : ${ret.id}`);
}
```

If you are deleting multiple records in one call, you can pass an option in second argument, which includes `allOrNone` flag. When the `allOrNone` is set to true (default: `false`), the call will raise error when any of the record fails to be deleted and all modifications are rolled back.

```
/* @interactive */
// Multiple records deletion
const rets = await conn.sobject("Account").delete([
  '0010500000fxR1EAAU',
  '0010500000fxR1FAAU'
])

for (const ret of rets) {
  if (ret.success) {
    console.log(`Deleted Successfully : ${ret.id}`);
  }
}
```

### Upsert

`SObject.upsert(record, extIdField)` will upsert a record or records given in first argument. External ID field name must be specified in second argument.

```
/* @interactive */
// Single record upsert
const ret = await conn.sobject("UpsertTable__c").upsert({ 
  Name : 'Record #1',
  ExtId__c : 'ID-0000001'
}, 'ExtId__c');

if (ret.success) {
  console.log(`Upserted Successfully : ${ret.id}`);
}
```

Unlike other CRUD calls, upsert with `allOrNone` option will not revert successfull upserts in case one or more fails.

```
/* @interactive */
// Multiple record upsert
const rets = await conn.sobject("UpsertTable__c").upsert([
 { Name : 'Record #1', ExtId__c : 'ID-0000001' },
 { Name : 'Record #2', ExtId__c : 'ID-0000002' }
],
'ExtId__c',
{ allOrNone: true });

for (const ret of rets) {
  if (ret.success) {
    console.log("Upserted Successfully");
  }
};
```

### Operation for Multiple Records

From ver 1.9, CRUD operation for multiple records uses [SObject Collection API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm) introduced in API 42.0.

If you are using JSforce versions prior to 1.8 or Salesforce API versions prior to 41.0, it will fall back to parallel execution of CRUD REST API call for each records, that is, it consumes one API request per record. Be careful for the API quota consumption.

### Operation Options

#### All or None Option

If you are creating multiple records in one call, you can pass an option in second argument, which includes `allOrNone` flag. When the `allOrNone` is set to true, the call will raise error when any of the record includes failure, and all modifications are rolled back (Default is false).

```
/* @interactive */
// Multiple records update with allOrNone option set to true
const rets = await conn.sobject("account").update([
  { Id: '0010500000fxR1IAAU', name : 'updated account #1' },
  { Id: '0010500001fxR1IAAU', name : 'updated account #1' },
])

for (const ret of rets) {
  if (ret.errors.length > 0) {
    console.error(ret.errors) // record update error(s)
  }
  if (ret.success) {
    console.log(`updated successfully : ${ret.id}`);
  } 
}
```

The `allOrNone` option is passed as a parameter to the SObject Collection API. If the API is not available (e.g. using API versions prior to 42.0), it raises an error but not treating the roll back of successful modifications.

#### Recursive Option

There is a limit of the SObject collection API - up to 200 records can be processed in one-time call. So if you want to process more than 200 records you may divide the request to process them.

The multi-record CRUD has the feature to automatically divide the input and recursively call SObject Collection API until the given records are all processed. In order to enable this you have to pass the option `allowRecursive` to the CRUD calls.

```
/* @interactive */
// Create 1000 accounts, more than SObject Collection limit (200)
const accounts = [];
for (let i=0; i<1000; i++) {
  accounts.push({ Name: 'Account #' + (i+1) });
}
// Internally dividing records in chunks,
// and recursively sending requests to SObject Collection API
const rets = await conn.sobject('Account')
  .create(
    accounts,
    { allowRecursive: true }
  );
console.log('processed: ' + rets.length);
```

### HTTP headers

You can pass a `headers` object containing REST API headers on any CRUD operation:

```
const rets = await conn.sobject('Account')
  .create(
    accounts,
    {
      allowRecursive: true,
      headers: {
        'Sforce-Duplicate-Rule-Header': 'allowSave=true'
      }
    }
  );
```

For more info about supported headers, see: [https://developer.salesforce.com/docs/atlas.en-us.api\_rest.meta/api\_rest/headers.htm](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/headers.htm)

### Update / Delete Queried Records

If you want to update/delete records in Salesforce that match a specific condition in bulk, `Query.update(mapping)` / `Query.destroy()` allows to use the Bulk/Bulk V2 API.

```
/* @interactive */
// DELETE FROM Account WHERE CreatedDate = TODAY

// will use Bulk (V1) API if query returns more than the default bulk threshold (200)
const rets = await conn.sobject('Account')
  .find({ CreatedDate : jsforce.Date.TODAY })
  .destroy();

console.log(rets)
```

```
/* @interactive */
const rets = await conn.sobject('Account')
  .find({ CreatedDate : jsforce.Date.TODAY })
  .destroy({
    allowBulk: true, // disable Bulk API, use SObject REST API
    bulkThreshold: 100, // record threshold
    bulkApiVersion: 2 // use Bulk V2 API (default: 1)
    });

console.log(rets)
```

```
/* @interactive */
// UPDATE Opportunity
// SET CloseDate = '2013-08-31'
// WHERE Account.Name = 'Salesforce.com'
const rets = await conn.sobject('Opportunity')
    .find({ 'Account.Name' : 'Salesforce.com' })
    .update({ CloseDate: '2013-08-31' });
console.log(rets);
```

In `Query.update(mapping)`, you can include simple templating notation in mapping record.

```
/* @interactive */
//
// UPDATE Task
// SET Description = CONCATENATE(Subject || ' ' || Status)
// WHERE ActivityDate = TODAY
//
const rets = await conn.sobject('Task')
  .find({ ActivityDate : jsforce.Date.TODAY })
  .update({ Description: '${Subject}  ${Status}' });
console.log(rets)
```

To achieve further complex mapping, `Query.update(mapping)` accepts a mapping function as an argument.

```
/* @interactive */
const rets = await conn.sobject('Task')
  .find({ ActivityDate : jsforce.Date.TODAY })
  .update((rec) => {
    return {
      Description: rec.Subject + ' ' + rec.Status
    }
  });
console.log(rets);
```

If you are creating a query object from SOQL by using `Connection.query(soql)`, the bulk delete/update operation cannot be achieved because no sobject type information is available initially. You can avoid this by passing the `sobjectType` argument to `Query.destroy(sobjectType)` or `Query.update(mapping, sobjectType)`.

```
/* @interactive */
const rets = await conn.query("SELECT Id FROM Account WHERE CreatedDate = TODAY").destroy('Account');
console.log(rets);
```

```
/* @interactive */
const rets = await conn.query("SELECT Id FROM Task WHERE ActivityDate = TODAY").update({ Description: '${Subject}  ${Status}' }, 'Task');
console.log(rets);
```

NOTE: You should be careful when using this feature not to break/lose existing data in Salesforce. Careful testing is recommended before applying the code to your production environment.

## Describe

Metadata description API for Salesforce object.

### Describe SObject

You can use `SObject.describe()` to fetch SObject metadata,

```
/* @interactive */
const meta = await conn.sobject('Account').describe()
console.log(`Label : ${meta.label}`);
console.log(`Num of Fields : ${meta.fields.length}`);
```

or can use `Connection.describe(sobjectType)` (or its synonym `Connection.describeSObject(sobjectType)`) alternatively.

```
/* @interactive */
const meta = await conn.describe('Account')
console.log(`Label : ${meta.label}`);
console.log(`Num of Fields : ${meta.fields.length}`);
```

### Describe Global

`SObject.describeGlobal()` returns all SObject information registered in Salesforce (without detail information like fields, childRelationships).

```
/* @interactive */
const res = await conn.describeGlobal()
console.log(`Num of SObjects : ${res.sobjects.length}`);
```

### Cached Call

Each description API has "cached" version with suffix of `$` (coming from similar pronounce "cash"), which keeps the API call result for later use.

```
/* @interactive */
// First lookup local cache, and then call remote API if cache doesn't exist.
const meta = await conn.sobject('Account').describe$()
console.log(`Label : ${meta.label}`);
console.log(`Num of Fields : ${meta.fields.length}`);
```

Cache clearance should be done explicitly by developers.

```
// Delete cache of global sobject description
conn.describeGlobal$.clear();
```

```
// Delete all API caches in connection.
conn.cache.clear();
```

## Identity

`Connection.identity()` is available to get current API session user identity information.

```
/* @interactive */
const res = await conn.identity()
console.log(`user ID: ${res.user_id}`);
console.log(`organization ID: ${res.organization_id}`);
console.log(`username: ${res.username}`);
console.log(`display name: ${res.display_name}`);
```

## History

### Recently Accessed Records

`SObject.recent()` returns recently accessed records in the SObject.

```
/* @interactive */
const res = await conn.sobject('Account').recent()
console.log(res)
```

`Connection.recent()` returns records in all object types which were recently accessed.

```
/* @interactive */
const res = await conn.recent()
console.log(res)
```

### Recently Updated Records

`SObject.updated(startDate, endDate)` returns record IDs which are recently updated.

```
/* @interactive */
const res = await conn.sobject('Account').updated('2014-02-01', '2014-02-15');
console.log(`Latest date covered: ${res.latestDateCovered}`);
console.log(`Updated records : ${res.ids.length}`);
```

### Recently Deleted Records

`SObject.deleted(startDate, endDate)` returns record IDs which were recently deleted.

```
/* @interactive */
const res = await conn.sobject('Account').deleted('2014-02-01', '2014-02-15');
console.log(`Ealiest date available: ${res.earliestDateAvailable}`);
console.log(`Latest date covered: ${res.latestDateCovered}`);
console.log(`Deleted records : ${res.deletedRecords.length}`);
```

## API Limit and Usage

`Connection.limitInfo` stores the latest API usage information.

```
/* @interactive */
console.log(`API Limit: ${conn.limitInfo.apiUsage.limit}`);
console.log(`API Used: ${conn.limitInfo.apiUsage.used}`);
```

Note that the limit information is available only after at least _one_ REST API call, as it is included in response headers of API requests.

## Analytics API

By using Analytics API, you can get the output result from a report registered in Salesforce.

### Get Recently Used Reports

`Analytics.reports()` lists recently accessed reports.

```
/* @interactive */
// get recent reports
const res = await conn.analytics.reports()

for (const report of res) {
  console.log(report.id)
  console.log(report.name)
}
```

### Describe Report Metadata

`Analytics.report(reportId)` gives a reference to the report object specified in `reportId`. By calling `Analytics-Report.describe()`, you can get the report metadata defined in Salesforce without executing the report.

You should check [Analytics REST API Guide](http://www.salesforce.com/us/developer/docs/api_analytics/index.htm) to understand the structure of returned report metadata.

```
/* @interactive */
const meta = await conn.analytics.report('00O05000000jmaWEAQ').describe()

console.log(meta.reportMetadata);
console.log(meta.reportTypeMetadata);
console.log(meta.reportExtendedMetadata);
```

### Execute Report

#### Execute Synchronously

By calling `Analytics-Report.execute(options)`, the report is exected in Salesforce, and returns executed result synchronously. Please refer to Analytics API document about the format of retruning result.

```
/* @interactive */
// get report reference
const report = conn.analytics.report('00O05000000jmaWEAQ')

// execute report
const result = await report.execute()
console.log(result.reportMetadata);
console.log(result.factMap);
console.log(result.factMap["T!T"]);
console.log(result.factMap["T!T"].aggregates);
```

#### Include Detail Rows in Execution

You can set `details` to true in `options` to make it return the execution result with detail rows.

```
/* @interactive */
// execute report synchronously with details option,
// to get detail rows in execution result.
const report = conn.analytics.report('00O05000000jmaWEAQ')
const result = await report.execute({ details: true })
console.log(result.reportMetadata);
console.log(result.factMap);
console.log(result.factMap["T!T"]);
console.log(result.factMap["T!T"].aggregates);
console.log(result.factMap["T!T"].rows); // <= detail rows in array
```

#### Override Report Metadata in Execution

You can override report behavior by putting `metadata` object in `options`. For example, following code shows how to update filtering conditions of a report on demand.

```
/* @interactive */
// overriding report metadata
const metadata = { 
  reportMetadata : {
    reportFilters : [{
      column: 'COMPANY',
      operator: 'contains',
      value: ',Inc.'
    }]
  }
};
// execute report synchronously with overridden filters.
const reportId = '00O10000000pUw2EAE';
const report = conn.analytics.report(reportId);
const result = await report.execute({ metadata : metadata });
console.log(result.reportMetadata);
console.log(result.reportMetadata.reportFilters.length); // <= 1
console.log(result.reportMetadata.reportFilters[0].column); // <= 'COMPANY' 
console.log(result.reportMetadata.reportFilters[0].operator); // <= 'contains' 
console.log(result.reportMetadata.reportFilters[0].value); // <= ',Inc.'
```

#### Execute Asynchronously

`Analytics-Report.executeAsync(options)` executes the report asynchronously in Salesforce, registering an instance to the report to lookup the executed result in future.

```
/* @interactive */
const instanceId;

// execute report asynchronously
const reportId = '00O10000000pUw2EAE';
const report = conn.analytics.report(reportId);

const instance = await report.executeAsync({ details: true })
console.log(instance.id); // <= registered report instance id
instanceId = instance.id;
```

Afterward use `Analytics-Report.instance(instanceId)` and call `Analytics-ReportInstance.retrieve()` to get the executed result.

```
/* @interactive */
// retrieve asynchronously executed result afterward.
const result = await report.instance(instanceId).retrieve()
console.log(result.reportMetadata);
console.log(result.factMap);
console.log(result.factMap["T!T"]);
console.log(result.factMap["T!T"].aggregates);
console.log(result.factMap["T!T"].rows);
```

## Apex REST

If you have a static Apex class in Salesforce and are exposing it using "Apex REST" feature, you can call it by using `Apex.get(path)`, `Apex.post(path, body)`, `Apex.put(path, body)`, `Apex.patch(path, body)`, and `Apex.del(path, body)` (or its synonym `Apex.delete(path, body)`) through the `apex` API object.

```
/* @interactive */
// body payload structure is depending to the Apex REST method interface.
const body = { title: 'hello', num : 1 };
const res = await conn.apex.post("/MyTestApexRest/", body);
console.log("response: ", res);
```

## Bulk API

JSforce package also supports Bulk API. It is not only mapping each Bulk API endpoint in low level, but also introducing utility interface in bulk load operations.

### Load From Records

First, assume that you have record set in array object to insert into Salesforce.

```
//
// Records to insert in bulk.
//
const accounts = [
{ Name : 'Account #1', ... },
{ Name : 'Account #2', ... },
{ Name : 'Account #3', ... },
...
];
```

You could use `SObject.create(record)`, but it consumes API quota per record, so it's not practical for large set of records. We can use the Bulk API to load them.

Similar to the Bulk API, first create a bulk job by calling `Bulk.createJob(sobjectType, operation)` through `bulk` API object in connection object.

Next, create a new batch in the job, by calling `job.createBatch()` through the job object created previously.

```
const job = conn.bulk.createJob("Account", "insert");
const batch = job.createBatch();
```

Then bulk load the records by calling `batch.execute(input)` of created batch object, passing the records in `input` argument.

When the batch is queued in Salesforce, it is notified by emitting the `queue` event, and you can get job ID and batch ID.

```
batch.execute(accounts);
batch.on("queue", (batchInfo) => { // fired when batch request is queued in server.
  console.log('batchInfo:', batchInfo);
  batchId = batchInfo.id;
  jobId = batchInfo.jobId;
  // ...
});
```

After the batch is queued and job / batch ID is created, wait the batch completion by polling.

When the batch process in Salesforce has been completed, it is notified by `response` event with batch result information.

```
const job = conn.bulk.job(jobId);
const batch = job.batch(batchId);
batch.poll(1000 /* interval(ms) */, 20000 /* timeout(ms) */); // start polling
batch.on("response", (rets) => { // fired when batch is finished and result retrieved
  for (let i=0; i < rets.length; i++) {
    if (rets[i].success) {
      console.log(`#${i + 1} loaded successfully, id = ${rets[i].id}`);
    } else {
      console.log(`#${i + 1} error occurred, message = ${rets[i].errors.join(', ')}`);
    }
  }
  // ...
});
```

Below is an example of the full bulk loading flow from scratch.

```
/* @interactive */
// Provide records
const accounts = [
  { Name : 'Account #4' },
  { Name : 'Account #6' },
  { Name : 'Account #7' },
];
// Create job and batch
const job = conn.bulk.createJob("Account", "insert");
const batch = job.createBatch();
// start job
batch.execute(accounts);
// listen for events
batch.on("error", function(batchInfo) { // fired when batch request is queued in server.
  console.log('Error, batchInfo:', batchInfo);
});
batch.on("queue", function(batchInfo) { // fired when batch request is queued in server.
  console.log('queue, batchInfo:', batchInfo);
  batch.poll(1000 /* interval(ms) */, 20000 /* timeout(ms) */); // start polling - Do not poll until the batch has started
});
batch.on("response", (rets) => { // fired when batch finished and result retrieved
  for (let i=0; i < rets.length; i++) {
    if (rets[i].success) {
      console.log(`#${i + 1} loaded successfully, id = ${rets[i].id}`);
    } else {
      console.log(`#${i + 1} error occurred, message = ${rets[i].errors.join(', ')}`);
    }
  }
  // ...
});
```

Alternatively, you can use `Bulk.load(sobjectType, operation, input)` interface to achieve the above process in one method call.

NOTE: In some cases for large data sets, a polling timeout can occur. When loading large data sets, consider changing `Bulk.pollTimeout` and `Bulk.pollInterval` property value, or using the one of the calls above with the built in `batch.poll()` or polling manually.

```
conn.bulk.pollTimeout = 25000; // Bulk timeout can be specified globally on the connection object
const rets = await conn.bulk.load("Account", "insert", accounts);
for (let i=0; i < rets.length; i++) {
  if (rets[i].success) {
    console.log(`#${i + 1} loaded successfully, id = ${rets[i].id}`);
  } else {
    console.log(`#${i + 1} error occurred, message = ${rets[i].errors.join(', ')}`);
  }
}
```

Following are same calls but in different interfaces:

```
const res = await conn.sobject("Account").insertBulk(accounts);
console.log(res)
```

```
const res = await conn.sobject("Account").bulkload("insert", accounts)
console.log(res)
```

To check the status of a batch job without using the built in polling methods, you can use `Bulk.check()`.

```
const results = await conn.bulk.job(jobId).batch(batchId).check()
console.log('results', results);
```

### Load From CSV File

It also supports bulk loading from CSV file. Just use CSV file input stream as `input` argument in `Bulk.load(sobjectType, operation, input)`, instead of passing records in array.

```
//
// Create readable stream for CSV file to upload
//
const csvFileIn = require('fs').createReadStream("path/to/Account.csv");
//
// Call Bulk.load(sobjectType, operation, input) - use CSV file stream as "input" argument
//
const rets = await conn.bulk.load("Account", "insert", csvFileIn);
for (let i=0; i < rets.length; i++) {
  if (rets[i].success) {
    console.log(`#${i + 1} loaded successfully, id = ${rets[i].id}`);
  } else {
    console.log(`#${i + 1} error occurred, message = ${rets[i].errors.join(', ')}`);
  }
}
```

Alternatively, if you have a CSV string instead of an actual file, but would still like to use the CSV data type, here is an example for node.js.

```
const s = new stream.Readable();
s.push(fileStr);
s.push(null);

const job = conn.bulk.createJob(sobject, operation, options);
const batch = job.createBatch();
batch
.execute(s)
.on("queue", (batchInfo) => {
  console.log('Apex job queued');
  // Since we useed .execute(), we need to poll until completion using batch.poll() or manually using batch.check()
  // See the previous examples for reference
})
.on("error", (err) => {
  console.log('Apex job error');
});
```

`Bulk-Batch.stream()` returns a Node.js standard writable stream which accepts batch input. You can pipe input stream to it afterward.

```
const batch = await conn.bulk.load("Account", "insert");
batch.on("response", (rets) => { // fired when batch finished and result retrieved
  for (const i=0; i < rets.length; i++) {
    if (rets[i].success) {
      console.log(`#${i + 1} loaded successfully, id = ${rets[i].id}`);
    } else {
      console.log(`#${i + 1} error occurred, message = ${rets[i].errors.join(', ')}`);
    }
  }
);
//
// When input stream becomes available, pipe it to batch stream.
//
csvFileIn.pipe(batch.stream());
```

### Query-and-Update/Destroy using Bulk API

When performing [update/delete queried records](#update-delete-queried-records), JSforce hybridly uses [CRUD Operation for Multiple-Records](#operation-for-multiple-records) and Bulk API.

It uses SObject Collection API for small amount of records, and when the queried result exceeds an threshold, switches to Bulk API. These behavior can be modified by passing options like `allowBulk` or `bulkThreshold`.

```
/* @interactive */
const rets = await conn.sobject('Account')
  .find({ CreatedDate: jsforce.Date.TODAY })
  .destroy({
    allowBulk: true, // allow using bulk API
    bulkThreshold: 200, // when the num of queried records exceeds this threshold, switch to Bulk API
  });

for (const ret of rets) {
  console.log(`id: ${ret.id}, success: ${ret.success}`);
}
```

### Bulk Query

From ver. 1.3, additional functionality was added to the bulk query API. It fetches records in bulk in record stream, or CSV stream which can be piped out to a CSV file.

```
/* @interactive */
const recordStream = await conn.bulk2.query('SELECT Id, Name, NumberOfEmployees FROM Account')

recordStream.on('record', (data) => {
  console.log(record.Id);
});

recordStream.on('error', (err) => {
  throw err;
});
```

```
const fs = require('fs');

const recordStream = await conn.bulk.query('SELECT Id, Name, NumberOfEmployees FROM Account')
recordStream.stream().pipe(fs.createWriteStream('./accounts.csv'));
```

If you already know the job id and batch id for the bulk query, you can get the batch result ids by calling `Batch.retrieve()`. Retrieval for each result is done by `Batch.result(resultId)`

```
const fs = require('fs');
const batch = conn.bulk.job(jobId).batch(batchId);
batch.retrieve((err, results) => {
  if (err) { return console.error(err); }
  for (let i=0; i < results.length; i++) {
    var resultId = result[i].id;
    batch.result(resultId).stream().pipe(fs.createWriteStream('./result'+i+'.csv'));
  }
});
```

## Bulk V2 API

The `bulk2` module provides some helpers to work with data using the Bulk V2 API.

### Upload records

First, assume we have an array of records to insert into Salesforce.

```
//
// Records to insert in bulk.
//
const accounts = [
  { Name : 'Account #1' },
  { Name : 'Account #2' },
  { Name : 'Account #3' },
];
```

Now let's create an object represeting a Bulk V2 ingest job by calling the `BulkV2.createJob()` method on the `connection.bulk2` object, then call `job.open()` to start the job in your org:

```
const job = conn.bulk2.createJob({
  operation: "insert",
  object: "Account",
})

// the `open` event will be emitted when the job is created.
job.on('open', (job) => {
  console.log(`Job ${job.id} succesfully created.`)
})

await job.open()
```

Now upload the records for the job and then close it so the data starts being processed.

```
// it accepts CSV as a string, an array of records or a Node.js readable stream.
await job.uploadData(accounts)

// uploading data from a CSV as a readable stream:

// const csvStream = fs.createReadStream(
//   path.join('Account_bulk2_test.csv'),
// );
// await job.uploadData(csvStream)

await job.close()
```

**NOTE**: Bulk V2 jobs expect the data to be uploaded all at once, if you call `job.uploadData()` more than once it will fail.

Once the job is closed you can start polling for its status until it finished successfully:

```
// by default will poll every 1s and timeout after 30s.
await job.poll()

// you can specify different values (in miliseconds):
// const pollInterval = 30000 
// const pollTimeout = 300000
//
// poll for the job status every 30s and timeout after 5min
// await job.poll(pollInterval, pollTimeout)
```

You can also listen to the `inProgress` event to get updates on each poll:

```
job.on('inProgress', (jobInfo: JobInfoV2) => {
  console.log(jobInfo.numberRecordsProcessed) // Number of records already processed
  console.log(jobInfo.numberRecordsFailed)    // Number of records that failed to be processed
});

await job.poll()
```

Once the job finishes successfully you can get all the records:

```
const res = await job.getAllResults()

 for (const rec of res.successfulResults) {
   console.log(`id = ${rec.sf__Id}, loaded successfully`)
 }
 for (const rec of res.failedResults) {
   console.log(`id = ${rec.sf__Id}, failed to load due to: ${rec.sf__Error}`)
 }
 for (const rec of res.unprocessedRecords) {
   if (typeof rec === 'string') {
     console.log(`Bad record: ${rec}`)
   } else {
     console.log(`unprocessed record: ${rec}`)
   }
 }
```

Alternatively, you can use the `BulkV2.loadAndWaitForResults` method which takes your data and handles job creation/polling/getting results for you:

```
const {
  successfulResults,
  failedResults,
  unprocessedRecords,
} = await conn.bulk2.loadAndWaitForResults({
  object: 'Account',
  operation: 'insert',
  input: records,
  pollTimeout: 60000,
  pollInterval: 5000
});
```

### Bulk V2 Query

The `bulk2.query` method takes a SOQL query and returns a record stream you can use to collect the emitted records. A streaming API allows to work with tons of records without running into memory limits.

```
const recordStream = await conn.bulk2.query('SELECT Name from Account')

recordStream.on('record', (data) => {
  console.log(record.Id);
});

recordStream.on('error', (err) => {
  throw err;
});

// Or if you need an array of all the records:
const records = await (await bulk2.query('SELECT Name from Account')).toArray()
```

```
// stream records to a csv file 
const fs = require('node:fs');

const recordStream = await conn.bulk2.query('SELECT Name from Account')
recordStream.stream().pipe(fs.createWriteStream('./accounts.csv'));
```

### Query-and-Update/Destroy using Bulk V2 API

When performing [update/delete queried records](#update-delete-queried-records), JSforce hybridly uses [CRUD Operation for Multiple-Records](#operation-for-multiple-records) and Bulk API.

It uses SObject Collection API for small amount of records, and when the queried result exceeds an threshold, switches to Bulk API. This can be modified by passing options like `allowBulk`, `bulkThreshold` and `bulkApiVersion`.

```
/* @interactive */
const rets = conn.sobject('Account')
  .find({ CreatedDate: jsforce.Date.TODAY })
  .destroy({
    allowBulk: true, // allow using bulk API
    bulkThreshold: 200, // when the num of queried records exceeds this threshold, switch to Bulk API
    bulkApiVersion: 2 // use Bulk V2 API (default: 1)
  });

for (const ret of rets) {
  console.log('id: ' + ret.id + ', success: ' + ret.success);
}
```

## Chatter API

Chatter API resources can be accessed via `Chatter#resource(path)`. The path for the resource can be a relative path from `/services/data/vX.X/chatter/`, `/services/data/`, or site-root relative path, otherwise absolute URI.

Please check official [Chatter REST API Guide](http://www.salesforce.com/us/developer/docs/chatterapi/) to understand resource paths for chatter objects.

### Get Resource Information

If you want to retrieve the information for specified resource, `Chatter-Resource#retrieve()` will get information of the resource.

```
/* @interactive */
const res = await conn.chatter.resource('/users/me')
console.log(`username: ${res.username}`);
console.log(`email: ${res.email}`);
console.log(`small photo url: ${res.photo.smallPhotoUrl}`);
```

### Get Collection Resource Information

You can pass query parameters to collection resource, to filter result or specify offset/limit for result. All acceptable query parameters are written in Chatter REST API manual.

```
/* @interactive */
const result = await conn.chatter.resource('/users', { q: 'Suzuki' }).retrieve();

console.log("current page URL: " + result.currentPageUrl);
console.log("next page URL: " + result.nextPageUrl);
console.log("users count: " + result.users.length);

for (let i=0; i<result.users.length; i++) {
  const user = users[i];
  console.log('User ID: '+ user.id);
  console.log('User URL: '+ user.url);
  console.log('Username: '+ user.username);
}
```

### Post a Feed Item

To post a feed item or a comment, use `Chatter-Resource#create(data)` for collection resource.

```
/* @interactive */
const result = await conn.chatter.resource('/feed-elements').create({
  body: {
    messageSegments: [{
      type: 'Text',
      text: 'This is new post'
    }]
  },
  feedElementType : 'FeedItem',
  subjectId: 'me'
})
console.log(`Id: ${result.id}`);
console.log(`URL: ${result.url}`);
console.log(`Body: ${result.body.messageSegments[0].text}`);
console.log(`Comments URL: ${result.capabilities.comments.page.currentPageUrl}`);
```

### Post a Comment

You can add a comment by posting message to feed item's comments URL:

```
/* @interactive */
const commentsUrl = '/feed-elements/0D55000001j5qn8CAA/capabilities/comments/items';
const result = await conn.chatter.resource(commentsUrl).create({
  body: {
    messageSegments: [{
      type: 'Text',
      text: 'This is new comment #1'
    }]
  }
});
console.log(`Id: ${result.id}`);
console.log(`URL: ${result.url}`);
console.log(`Body: ${result.body.messageSegments[0].text}`);
```

### Add Like

You can add likes to feed items/comments by posting empty string to like URL:

```
/* @interactive */
const itemLikesUrl = '/feed-elements/0D55000001j5r2rCAA/capabilities/chatter-likes/items';
const result = await conn.chatter.resource(itemLikesUrl).create("");

console.log(`URL: ${result.url}`);
console.log(`Liked Item ID:${result.likedItem.id}`);
```

### Batch Operation

Using `Chatter#batch(requests)`, you can execute multiple Chatter resource requests in one API call. Requests should be CRUD operations for Chatter API resource.

```
/* @interactive */

const res = await conn.chatter.batch([
  conn.chatter.resource('/feed-elements').create({
    body: {
      messageSegments: [{
        type: 'Text',
        text: 'This is a post text'
      }]
    },
    feedElementType: 'FeedItem',
    subjectId: 'me'
  }),
  conn.chatter.resource('/feed-elements').create({
    body: {
      messageSegments: [{
        type: 'Text',
        text: 'This is another post text, following to previous.'
      }]
    },
    feedElementType: 'FeedItem',
    subjectId: 'me'
  }),
  conn.chatter.resource('/feeds/news/me/feed-elements', { pageSize: 2, sort: "CreatedDateDesc" }),
])
console.log(`Error? ${res.hasErrors}`);
const results = res.results;
console.log(`batch request executed: ${results.length}`);
console.log(`request #1 - status code: ${results[0].statusCode}`);
console.log(`request #1 - result URL: ${results[0].result.url}`);
console.log(`request #2 - status code: ${results[1].statusCode}`);
console.log(`request #2 - result URL: ${results[1].result.url}`);
console.log(`request #3 - status code: ${results[2].statusCode}`);
console.log(`request #3 - current Page URL: ${results[2].result.currentPageUrl}`);
```

## Metadata API

### Describe Metadata

`Metadata.describe(version)` lists all metadata in an org.

```
/* @interactive */
const metadata = await conn.metadata.describe('60.0')
console.log(`organizationNamespace: ${metadata.organizationNamespace}`);
console.log(`partialSaveAllowed: ${metadata.partialSaveAllowed}`);
console.log(`testRequired: ${metadata.testRequired}`);
console.log(`metadataObjects count: ${metadata.metadataObjects.length}`);
```

### List Metadata

`Metadata.list(types, version)` lists summary information for all metadata types.

```
/* @interactive */
const types = [{type: 'CustomObject', folder: null}];
const metadata = await conn.metadata.list(types, '60.0');
const meta = metadata[0]

console.log(`metadata count: ${metadata.length}`);
console.log(`createdById: ${meta.createdById}`);
console.log(`createdByName: ${meta.createdByName}`);
console.log(`createdDate: ${meta.createdDate}`);
console.log(`fileName: ${meta.fileName}`);
console.log(`fullName: ${meta.fullName}`);
console.log(`id: ${meta.id}`);
console.log(`lastModifiedById: ${meta.lastModifiedById}`);
console.log(`lastModifiedByName: ${meta.lastModifiedByName}`);
console.log(`lastModifiedDate: ${meta.lastModifiedDate}`);
console.log(`manageableState: ${meta.manageableState}`);
console.log(`namespacePrefix: ${meta.namespacePrefix}`);
console.log(`type: ${meta.type}`);
```

### Read Metadata

`Metadata.read(type, fullNames)` retrieves metadata information of a specific types.

```
/* @interactive */
const fullNames = [ 'Account', 'Contact' ];
const metadata = await conn.metadata.read('CustomObject', fullNames);
for (const meta of metadata) {
  console.log(`Full Name: ${meta.fullName}`);
  console.log(`Fields count: ${meta.fields.length}`);
  console.log(`Sharing Model: ${meta.sharingModel}`);
}
```

### Create Metadata

To create new metadata objects, use `Metadata.create(type, metadata)`. Metadata format for each metadata types are written in the Salesforce Metadata API document.

```
/* @interactive */
// creating metadata in array
const metadata = [{
  fullName: 'TestObject1__c',
  label: 'Test Object 1',
  pluralLabel: 'Test Object 1',
  nameField: {
    type: 'Text',
    label: 'Test Object Name'
  },
  deploymentStatus: 'Deployed',
  sharingModel: 'ReadWrite'
}, {
  fullName: 'TestObject2__c',
  label: 'Test Object 2',
  pluralLabel: 'Test Object 2',
  nameField: {
    type: 'AutoNumber',
    label: 'Test Object #'
  },
  deploymentStatus: 'InDevelopment',
  sharingModel: 'Private'
}];
const results = await conn.metadata.create('CustomObject', metadata);
for (const res of results) {
  console.log(`success ? : ${res.success}`);
  console.log(`fullName : ${res.fullName}`);
}
```

And then you can check creation statuses by `Metadata.checkStatus(asyncResultIds)`, and wait their completion by calling `Metadata-AsyncResultLocator.complete()` for returned object.

```
const results = await conn.metadata.checkStatus(asyncResultIds).complete()

for (const i=0; i < results.length; i++) {
  const result = results[i];
  console.log('id: ' + result.id);
  console.log('done ? : ' + result.done);
  console.log('state : ' + result.state);
}
```

### Update Metadata

`Metadata.update(type, updateMetadata)` can be used for updating existing metadata objects.

```
/* @interactive */
const metadata = [{
  fullName: 'TestObject1__c.AutoNumberField__c',
  label: 'Auto Number #2',
  length: 50
}]
const results = await conn.metadata.update('CustomField', metadata);

for (let i=0; i < results.length; i++) {
  const result = results[i];
  console.log('success ? : ' + result.success);
  console.log('fullName : ' + result.fullName);
}
```

### Upsert Metadata

`Metadata.upsert(type, metadata)` is used for upserting metadata - insert new metadata when it is not available, otherwise update it.

```
/* @interactive */
const metadata = [{
  fullName: 'TestObject2__c',
  label: 'Upserted Object 2',
  pluralLabel: 'Upserted Object 2',
  nameField: {
    type: 'Text',
    label: 'Test Object Name'
  },
  deploymentStatus: 'Deployed',
  sharingModel: 'ReadWrite'
}, {
  fullName: 'TestObject__c',
  label: 'Upserted Object 3',
  pluralLabel: 'Upserted Object 3',
  nameField: {
    type: 'Text',
    label: 'Test Object Name'
  },
  deploymentStatus: 'Deployed',
  sharingModel: 'ReadWrite'
}];
const results = await conn.metadata.upsert('CustomObject', metadata);
for (let i=0; i < results.length; i++) {
  const result = results[i];
  console.log('success ? : ' + result.success);
  console.log('created ? : ' + result.created);
  console.log('fullName : ' + result.fullName);
}
```

### Rename Metadata

`Metadata.rename(type, oldFullName, newFullName)` is used for renaming metadata.

```
/* @interactive */
const result = await conn.metadata.rename('CustomObject', 'TestObject3__c', 'UpdatedTestObject3__c');
for (let i=0; i < results.length; i++) {
  const result = results[i];
  console.log('success ? : ' + result.success);
  console.log('fullName : ' + result.fullName);
}
```

### Delete Metadata

`Metadata.delete(type, metadata)` can be used for deleting existing metadata objects.

```
/* @interactive */
const fullNames = ['TestObject1__c', 'TestObject2__c'];
const results = await conn.metadata.delete('CustomObject', fullNames);

for (let i=0; i < results.length; i++) {
  const result = results[i];
  console.log('success ? : ' + result.success);
  console.log('fullName : ' + result.fullName);
}
```

### Retrieve / Deploy Metadata (File-based)

You can retrieve metadata information which is currently registered in Salesforce by calling the `Metadata.retrieve(options)` method.

The structure of hash object argument `options` is same to the message object defined in Salesforce Metadata API.

```
const fs = require('fs');
conn.metadata.retrieve({ packageNames: [ 'My Test Package' ] })
  .stream().pipe(fs.createWriteStream("./path/to/MyPackage.zip"));
```

If you have metadata definition files in your file system, create zip file from them and call `Metadata.deploy(zipIn, options)` to deploy all of them.

```
const fs = require('fs');
const zipStream = fs.createReadStream("./path/to/MyPackage.zip");
const result = await conn.metadata.deploy(zipStream, { runTests: [ 'MyApexTriggerTest' ] }).complete();
console.log('done ? :' + result.done);
console.log('success ? : ' + result.true);
console.log('state : ' + result.state);
console.log('component errors: ' + result.numberComponentErrors);
console.log('components deployed: ' + result.numberComponentsDeployed);
console.log('tests completed: ' + result.numberTestsCompleted);
```

## Streaming API

You can subscribe topic and receive message from Salesforce Streaming API, by using `Streaming.Topic(topicName)` and `Streaming-Topic.subscribe(listener)`.

Before the subscription, you should insert appropriate PushTopic record (in this example, "InvoiceStatementUpdates") as written in [Streaming API guide](http://www.salesforce.com/us/developer/docs/api_streaming/).

```
conn.streaming.topic("InvoiceStatementUpdates").subscribe(function(message) {
  console.log('Event Type : ' + message.event.type);
  console.log('Event Created : ' + message.event.createdDate);
  console.log('Object Id : ' + message.sobject.Id);
});
```

## Tooling API

Tooling API is used to build custom development tools for Salesforce platform, for example building custom Apex Code / Visualforce page editor.

It has almost same interface as the REST API, so CRUD operations, query, and describe can be done also for these developer objects.

### CRUD to Tooling Objects

You can create/retrieve/update/delete records in tooling objects (e.g. ApexCode, ApexPage).

To get reference of tooling object, use `Tooling.sobject(sobjectType)`.

```
/* @interactive */
const apexBody = [
  "public class TestApex {",
  "  public string sayHello() {",
  "    return 'Hello';",
  "  }",
  "}"
].join('\n');
const res = await conn.tooling.sobject('ApexClass').create({
  body: apexBody
});
console.log(res);
```

### Query Tooling Objects

Querying records in tooling objects is also supported. Use `Tooling.query(soql)` or `SObject.find(filters, fields)`.

```
/* @interactive */
const records = await conn.tooling.sobject('ApexTrigger')
  .find({ TableEnumOrId: "Lead" })
  .execute()
console.log(`fetched : ${records.length}`);
for (const record in records) {
  console.log(`Id: ${record.Id}`);
  console.log(`Name: ${record.Name}`);
}
```

### Describe Tooling Objects

Describing all tooling objects in the organization is done by calling `Tooling.describeGlobal()`.

```
/* @interactive */
const res = await conn.tooling.describeGlobal()
console.log(`Num of tooling objects : ${res.sobjects.length}`);
```

Describing each object detail is done by calling `SObject.describe()` to the tooling object reference, or just calling `Tooling.describeSObject(sobjectType)`.

```
/* @interactive */
const res = await conn.tooling.sobject('ApexPage').describe()
console.log(`Label : ${res.label}`);
console.log(`Num of Fields : ${res.fields.length}`);
```

### Execute Anonymous Apex

You can use Tooling API to execute anonymous Apex Code, by passing apex code string text to `Tooling.executeAnonymous`.

```
/* @interactive */
// execute anonymous Apex Code
const apexBody = "System.debug('Hello, World');";
const res = await conn.tooling.executeAnonymous(apexBody);
console.log(`compiled?: ${res.compiled}`); // compiled successfully
console.log(`executed?: ${res.success}`); // executed successfully
})()
```

## Request

Make REST api calls to APIs that are not explicitly supported by JSForce.

### Setting the URL

The Endpoint URL can be in one of the following formats:

*   Absolute URL: `https://na1.salesforce.com/services/data/v32.0/sobjects/Account/describe`.
*   Relative path from root: `/services/data/v32.0/sobjects/Account/describe`.
*   Relative path from version root: `/sobjects/Account/describe`.
    *   This is only supported if you have explicitly set a default version.

### Making Requests

You can use `Connection.request()` to make api requests.

For GET requests, you can pass in a string URL.

```
/* @interactive */
const res = await conn.request('/services/data/v47.0/ui-api/object-info');
console.log(res)
```

If you prefer to use callbacks instead of promises, pass a callback as the second parameter.

```
const res = await conn.request('/services/data/v47.0/ui-api/object-info');
console.log(res)
```

For other HTTP methods, you can pass an object to the request method. Ensure that you serialize the body of the request.

```
/* @interactive */
// Bulk API 2.0 - Query
const requestBody = {
  operation: 'query',
  query: 'SELECT Id, Name FROM Account LIMIT 1000',
};

const res = await conn
  .request({
    method: 'POST',
    url: '/services/data/v47.0/jobs/query',
    body: JSON.stringify(requestBody),
    headers: {
      'content-type': 'application/json',
    },
  });
console.log(res)
```

#### Request Helper Methods

In addition to `Connection.request()`, JSForce provides the following helper methods that can also be used:

*   `Connection.requestGet()`
*   `Connection.requestPatch()`
*   `Connection.requestPost()`
*   `Connection.requestPut()`
*   `Connection.requestDelete()`

For `requestPatch`, `requestPost` and `requestPut`, these will be serialized automatically and the `content-type` will be set to `application/json`.

```
/* @interactive */
const requestBody = {
  operation: 'query',
  query: 'SELECT Id, Name FROM Account LIMIT 1000',
};

const res = await conn.requestPost('/services/data/v47.0/jobs/query', requestBody);
console.log(res);
```

#### Request HTTP Options

All request methods allow setting HTTP options to be passed to the HTTP request.

Name

Type

Description

responseType

string

overrides the content-type from the response to change how the response is parsed. Valid values are `text/xml`, `application/xml`, `application/json`, `text/csv`. If you do not want JSForce to auto-parse the response, set this to any other value, e.x. `text`.

noContentResponse

any

Alternative response when no content returned in response (= HTTP 204)

transport

Transport

Transport for http api - you should not need to set this option.

If you would like to opt-out of parsing, you can set the `responseType` to text. This is useful if you want the raw response from Salesforce instead of having the results automatically parsed.

```
// Get raw CSV data instead of allowing JSForce to parse the CSV to JSON
const res = await conn.requestGet('/services/data/v47.0/jobs/query/7502J00000LYZC4QAP/results', { responseType: 'text' });
console.log(res);
```

## CORS

If you're getting CORS-related errors when using jsforce in the browser it might be that the API being used doesn't support CORS, see: [https://help.salesforce.com/s/articleView?id=sf.extend\_code\_cors.htm&type=5](https://help.salesforce.com/s/articleView?id=sf.extend_code_cors.htm&type=5)

For those cases you'll need to use the `jsforce-ajax-proxy` proxy server, check the README for setup instructions: [https://github.com/jsforce/jsforce-ajax-proxy/](https://github.com/jsforce/jsforce-ajax-proxy/)

## Advanced Topics

### Record Stream Pipeline

Record stream is a stream system which regards records in its stream, similar to Node.js's standard readable/writable streams.

Query object - usually returned by `Connection.query(soql)` / `SObject.find(conditions, fields)` methods - is considered as `InputRecordStream` which emits event `record` when received record from server.

Batch object - usually returned by `Bulk-Job.createBatch()` / `Bulk.load(sobjectType, operation, input)` / `SObject.bulkload(operation, input)` methods - is considered as `OutputRecordStream` and have `send()` and `end()` method to accept incoming record.

You can use `InputRecordStream.pipe(outputRecordStream)` to pipe record stream.

RecordStream can be converted to usual Node.js's stream object by calling `RecordStream.stream()` method.

By default (and only currently) records are serialized to CSV string.

#### Piping Query Record Stream to Batch Record Stream

The idea of record stream pipeline is the base of bulk operation for queried record. For example, the same process of `Query.destroy()` can be expressed as following:

```
//
// This is much more complex version of Query.destroy().
//
const Account = conn.sobject('Account');
Account.find({ CreatedDate: jsforce.Date.TODAY })
  .pipe(Account.deleteBulk())
  .on('response', (rets) => {
    console.log(rets)
  })
  .on('error', (err) => {
    console.error(err)
  });
```

And `Query.update(mapping)` can be expressed as following:

```
//
// This is much more complex version of Query.update().
//
const Opp = conn.sobject('Opportunity');
Opp.find(
    { "Account.Id" : "0010500000gYx35AAC" },
    { Id: 1, Name: 1, "Account.Name": 1 }
  )
  .pipe(jsforce.RecordStream.map((r) => {
    return { Id: r.Id, Name: `${r.Account.Name} - ${r.Name}` };
  }))
  .pipe(Opp.updateBulk())
  .on('response', (rets) => {
    console.log(rets)
  })
  .on('error', (err) => {
    console.error(err)
  });
```

Following is an example using `Query.stream()` (inherited `RecordStream.stream()`) to convert a record stream to a Node.js stream, in order to export all queried records to CSV file.

```
const csvFileOut = require('fs').createWriteStream('path/to/Account.csv');
conn.query("SELECT Id, Name, Type, BillingState, BillingCity, BillingStreet FROM Account")
    .stream() // Convert to Node.js's usual readable stream.
    .pipe(csvFileOut);
```

#### Record Stream Filtering / Mapping

You can also filter / map queried records to output record stream. Static functions like `InputRecordStream.map(mappingFn)` and `InputRecordStream.filter(filterFn)` create a record stream which accepts records from upstream and pass to downstream, applying given filtering / mapping function.

```
//
// Write down Contact records to CSV, with header name converted.
//
conn.sobject('Contact')
    .find({}, { Id: 1, Name: 1 })
    .map((r) => {
      return { ID: r.Id, FULL_NAME: r.Name };
    })
    .stream().pipe(fs.createWriteStream("Contact.csv"));
//
// Write down Lead records to CSV file,
// eliminating duplicated entry with same email address.
//
const emails = {};
conn.sobject('Lead')
    .find({}, { Id: 1, Name: 1, Company: 1, Email: 1 })
    .filter((r) => {
      const dup = emails[r.Email];
      if (!dup) { emails[r.Email] = true; }
      return !dup;
    })
    .stream().pipe(fs.createWriteStream("Lead.csv"));
```

Here is much lower level code to achieve the same result using `InputRecordStream.pipe()`.

```
//
// Write down Contact records to CSV, with header name converted.
//
conn.sobject('Contact')
    .find({}, { Id: 1, Name: 1 })
    .pipe(jsforce.RecordStream.map((r) => {
      return { ID: r.Id, FULL_NAME: r.Name };
    }))
    .stream().pipe(fs.createWriteStream("Contact.csv"));
//
// Write down Lead records to CSV file,
// eliminating duplicated entry with same email address.
//
const emails = {};
conn.sobject('Lead')
    .find({}, { Id: 1, Name: 1, Company: 1, Email: 1 })
    .pipe(jsforce.RecordStream.filter((r) => {
      const dup = emails[r.Email];
      if (!dup) { emails[r.Email] = true; }
      return !dup;
    }))
    .stream().pipe(fs.createWriteStream("Lead.csv"));
```

#### Example: Data Migration

By using record stream pipeline, you can achieve data migration in a simple code.

```
//
// Connection for org which migrating data from
//
const conn1 = new jsforce.Connection({
  // ...
});
//
// Connection for org which migrating data to
//
const conn2 = new jsforce.Connection({
  // ...
});
//
// Get query record stream from Connetin #1
// and pipe it to batch record stream from connection #2
//
const query = await conn1.query("SELECT Id, Name, Type, BillingState, BillingCity, BillingStreet FROM Account");
const job = conn2.bulk.createJob("Account", "insert");
const batch = job.createBatch();
query.pipe(batch);
batch.on('queue', () => {
  jobId = job.id;
  batchId = batch.id;
  //...
})
```
