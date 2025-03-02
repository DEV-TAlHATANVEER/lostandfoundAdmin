import React from "react";
import { useSelector } from "react-redux";
import { SalesMapWrap } from "./SalesMap.styles";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import geoJson from "../../../data/world-50m.v1.json";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";

// Mapping of color names to their respective hex codes
const COLOR_MAP = {
  red: "#ef4444",
  violet: "#a700ff",
  dodgerBlue: "#0095ff",
  emerald: "#00e096",
  yellow: "#ffcf00",
};

const getFillColor = (fillCode) => COLOR_MAP[fillCode] || "#ececec";

// Function to find color by countryId

const SalesMap = () => {
  const LOCATION_DATA = useSelector((state) => state.auth.locationData);
  // Access LOCATION_DATA from Redux store
  const findByCountryId = (country) => {
  
    console.log(country);
    
    if (!Array.isArray(LOCATION_DATA)) {
      console.error("Invalid LOCATION_DATA: Expected an array");
      return "#ececec"; // Default color
    }
  
    const matchedCountry = LOCATION_DATA.find((value) => value.countryId === country);
    console.log(matchedCountry);
    
    return matchedCountry ? getFillColor(matchedCountry.fillColor) : "#ececec";
  };
  


  // Check if LOCATION_DATA is loaded and non-empty
  const isDataLoaded = Array.isArray(LOCATION_DATA) && LOCATION_DATA.length > 0;
  
  if (!isDataLoaded) {
    return (
      <SalesMapWrap>
        <div className="block-head">
          <BlockTitle className="block-title">
            <h3>Items (L&F) by Country</h3>
          </BlockTitle>
        </div>
        <BlockContentWrap className="map-chart">
          <p>Loading map data or no data available...</p>
        </BlockContentWrap>
      </SalesMapWrap>
    );
  }

  return (
    <SalesMapWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Items (L&F) by Country</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="map-chart">
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{
            rotate: [0, 0, 0],
            scale: 200,
          }}
        >
         
          <Geographies geography={geoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Excluding Antarctica
                if (geo.code !== "010") {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={findByCountryId(geo.id)}
                    />
                  );
                }
                return null;
              })
            }
          </Geographies>
        </ComposableMap>
      </BlockContentWrap>
    </SalesMapWrap>
  );
};

export default SalesMap;
