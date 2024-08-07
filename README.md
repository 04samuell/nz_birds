# Samuel Lee - NZ Birds Website
> Student ID: 1874730
> COSC203 Assignment 1

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

- If any field is left blank, the values are treated as 0 for the min field and <code>Number.MAX_VALUE</code> for the max field.

- Any error parsing the input values is reported to the user (e.g if they input non-numeric characters)
