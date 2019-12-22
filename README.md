# Genbank Database Parser

## Purpose
This app serves to interact with the GenBank database, by allowing the user to fetch a specific sequence record from a given Database and Identifier in their system.
The user can then enter a Regex string to return:
  1) A list of matches, with the start and end indices of each within the record
  2) A count of how often each match appears in the record

## Getting Started
1. Clone this repo
2. Run `npm install`
3. Run `npm start`

## Component Map
```
App
|_UserInputs
| |_UserInputRow[]
|
|_Results
  |_Matches
  | |_MatchRowHeader
  | |_MatchRow[]
  |
  |_MatchCounts
    |_MatchCountRowHeader
    |_MatchCountRow[]
```

## Design Decisions
### Visual
I chose to just have 3 panels via flexbox. I knew ahead of time the list of data would be thin (only 2-3 columns) and tall (potentially tens of thousands of results), so I chose to lay the 3 panels out vertically.
Otherwise, a fairly minimal design.
### State
All state controlled by the top-level App. Lower components are kept as dumb as possible to maximize reusability.
### Caching
I implemented a very simple cache which simply stores previous requests in a hash map.
### Regex Matching
I opted to trust javascript's native regex matching as is.
### Error Handling
I feel there are mainly 5 things which could go wrong, all of which are handled:
1) User parameter missing
2) Database not found in NCBI system
3) ID not found in database
4) Regex not valid
5) Unexpected error on NCBI side

If any other error happens, we simply define it as an unexpected error.

## Future Iterations
* Pagination: Given that we can potentially find thousands to millions of occurrences, results could be paginated to only show ~50 at a time. This would greatly increase performance and avoid out-of-memory issues we can currently see with larger records.
* Results area could show details on what the latest search was
* Sorting results
* Searching results

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
