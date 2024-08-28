# Samuel Lee - NZ Birds Website

## Website Link

[NZ Birds Website Link](https://leesa178.cspages.otago.ac.nz/cosc203/)

## Extra Features

To each bird object I added some extra data:

- Min/Max Weight
- Min/Max Height
- Average Weight
- Average Height

All weight values are in grams for weight and centimetres for height.

This allowed for the following features:

### 1. Sorting

The data can be sorted by both weight ot height in both ascending and descending. 

### 2. Advanced filtering

By inputting a min and max weight/height value you can filter the results accordingly.
The bird is displayed if **either** the min or max value is within the bounds of the filter radius.  

Edge Cases:

- If min value > max value then the values are swapped.

- If any field is left blank, then either 0 (min field) or <code>Number.MAX_VALUE</code> (max field) are substituted in accordingly.

- The bird is included in search results if the inputted range intersects at all with the range of the birds value. For example, consider a bird with weight between 300g - 700g: 
    - A search between 400g and 500g will return true 
    - A search between 200g and 400g will also return true 
    - But a search between 0g and 200g will return false. 

- Any error parsing the input values is reported to the user (e.g if they input non-numeric characters)
