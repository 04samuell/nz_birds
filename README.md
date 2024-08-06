# Samuel Lee - NZ Birds Website
> Student ID: 1874730
> COSC203 Assignment 1

## Website Link

[NZ Birds Website Link](https://leesa178.cspages.otago.ac.nz/cosc203/)

## Known Issues

Detail about known issues...
When sorting and a value for male and female is given, the larger of the two is used

## Extra Features

Sort results by weight/ length.

The sorting works as follows:

    - When I load the data in I add an additional JSON property max weight and max height

    - This property deals with the case where male and female data is given e.g weight: male 50g female 35g

    - All weight values are given in grams and all length values are given in cm
    
    - When the data is queried, the resulting array of birds objects is sorted based on the inputed sorting condition
