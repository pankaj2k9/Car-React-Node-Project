export const regionOptions = [
  "Visibility",
  "Section Type",
  "Headline",
  "Description",
  "Photo URL",
  "Video Embed",
  "BG Type",
  "BG URL",
  "CTA URL",
  "Tagline",
  "SVG Map",
  "City, State",
  "Lat. Start",
  "Lon. Start",
  "Lat. End",
  "Lon. End",
  "Temp. (°F)",
  "Weather",
  "Miles Traveled"
];

export const regions = [
  "California",
  "Northwest",
  "Midwest",
  "Gulf States",
  "East Coast"
];

export const host = (process.env.NODE_ENV == 'development') ? '' : 'https://alchemy.staging.wdb.st';
