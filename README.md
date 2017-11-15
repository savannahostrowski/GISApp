# Geographic Information Systems Capstone

## Background
The objectives of this study were to quantify the impacts on the social, economic, and environmental pillars of sustainable development (as defind by the United Nations) within the Tri-City area between 1996 and 2011, weigh each of the pillars to determine patterned areas of sustainable development using a two-tiered weighted approach, determine the impact of students on the three pillars of sustainable development based on spatial pattern and distribution, and identify the future impacts and discuss implications for city planners within the Tri-City area.

This project consulted Canadian census data from 1996, 2001, 2006 and 2011 at the dissemination area or census tract level. The environmental pillar was dropped from the study as it was found to be hard to quantify. As supported by literature, the social pillar was comprised of age skew, immigration, and education level data, and the economic pillar was comrised of homeownership, unemployment, part-time vs. full-time employment, and average income data. These pillars were then combined into a two-tiered weighted analysis.

To generate visualizations of the spatial impact of post-secondary students, buffer and hotspot analyses were also executed.  Buffers were calculated at the 1,2 and 5 km distance for each year around the schools (centroids), then the average rank was calculated for each buffer ring. Hotspot analysis allowed for the use of z-scores and p-values to determine statistical significance and spatial clustering, and the generated hotspots and coldspots were compared both temporally and spatially.

The visualization specifically illustrates the hotspots for 1996 and 2011 as ranked by low to high student impact. 

Findings include: highest student impact found around university campuses in Waterloo rather than in Kitchener and Cambridge (increasingly so), student impacts around Conestoga College in Kitchener are not really visible, and that students are willing to live farther and farther away from the schools and so we see a growth in the hotspot overtime.

Limitations - the Canadian census changed in 2011 as the federal government made the voluntary rather than mandatory thus the data quality could be more questionable, no environmental pillar so not a true representation of sustainable development impact

## Application Details
Built with a love of spatial data in 2015 using JavaScript, SASS, HTML5, LeafletJS (supported by Mapbox)
