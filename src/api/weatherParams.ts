export const WEATHER_PARAMS = {
  REQUIRED: {
    LATITUDE: "latitude",
    LONGITUDE: "longitude",
  },
  OPTIONAL: {
    HOURLY: "hourly",
    DAILY: "daily",
    CURRENT: "current",
    TIMEZONE: "timezone",
    TEMPERATURE_UNIT: "temperature_unit",
    WIND_SPEED_UNIT: "wind_speed_unit",
    PRECIPITATION_UNIT: "precipitation_unit",
    FORECAST_DAYS: "forecast_days",
    TIMEFORMAT: "timeformat",
    START_DATE: "start_date",
    END_DATE: "end_date",
  },
  DAILY_VARIABLES: [
    "temperature_2m_max",
    "temperature_2m_min",
    "apparent_temperature_max",
    "apparent_temperature_min",
    "precipitation_sum",
    "precipitation_hours",
    "precipitation_probability_max",
    "precipitation_probability_min",
    "precipitation_probability_mean",
    "weather_code",
    "sunrise",
    "sunset",
    "sunshine_duration",
    "daylight_duration",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
    "wind_direction_10m_dominant",
    "shortwave_radiation_sum",
  ],
  HOURLY_VARIABLES: [
    "temperature_2m",
    "relative_humidity_2m",
    "dew_point_2m",
    "apparent_temperature",
    "precipitation",
    "weather_code",
    "cloud_cover",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
    "soil_temperature_0cm",
    "soil_moisture_0_1cm",
    "shortwave_radiation",
    "direct_radiation",
    "diffuse_radiation",
    "vapor_pressure_deficit",
    "precipitation_probability",
    "rain",
    "snowfall",
    "snow_depth",
    "freezing_level_height",
    "visibility",
  ],
  DEFAULTS: {
    TEMPERATURE_UNIT: "celsius",
    WIND_SPEED_UNIT: "kmh",
    PRECIPITATION_UNIT: "mm",
    TIMEFORMAT: "iso8601",
    TIMEZONE: "GMT",
    FORECAST_DAYS: 7,
  },

  DEFAULT_HOURLY: [
    "temperature_2m",
    "precipitation",
    "weather_code",
    "wind_speed_10m",
  ],
  DEFAULT_DAILY: [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "weather_code",
  ],
} as const;
