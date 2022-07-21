# leaflet-challengeUnit 15 Homework: Visualizing Data with Leaflet

Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!
The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.



Create the Earthquake Visualization

Your first task is to visualize an earthquake dataset. Complete the following steps:


Get your dataset. To do so, follow these steps:

The USGS provides earthquake data in a number of different formats, updated every five minutes. Visit the USGS GeoJSON Feed page and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link:



When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:




Import and visualize the data by doing the following:


Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.


Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.


Hint: The depth of the earth can be found as the third coordinate for each earthquake.




Include popups that provide additional information about the earthquake when its associated marker is clicked.


Create a legend that will provide context for your map data.


Below is the map I created.

![image](https://user-images.githubusercontent.com/99552079/180305699-ee93418c-2009-47d5-af2f-b4d7277a1df1.png)








