# Code Sample for Lyft Software Engineer Apprenticeship

---

##### Base Url: https://lyft-code-sample.herokuapp.com/

---

| Method | Endpoint | Request Body                | Response                             |
| ------ | -------- | --------------------------- | ------------------------------------ |
| POST   | /test    | { string_to_cut: {string} } | { return_string: {modified string} } |

_Note: Request body can only be an object that contains the key `string_to_cut` which has a value of type **string**. Or else it will throw an error_

### Response Object

| KEY           | VALUE TYPE | VALUE DESCRIPTION                                                             |
| ------------- | ---------- | ----------------------------------------------------------------------------- |
| return_string | _string_   | A modified string that extracts every 3rd character from the original string. |

#### Example:

`curl -X POST https://lyft-code-sample.herokuapp.com/test --data '{ "string_to_cut": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}' -H 'Content-Type: application/json'`

`{"return_string": "r s l tm,oeerdii i doim mrndu betormnaq.tn n nmqsor eitnlm binitlu mdcsu.u tirdoirreetnoptvieeiudo gtuaaarEee noaacit nrdtstnuauoiaertoiamdslom"}`
