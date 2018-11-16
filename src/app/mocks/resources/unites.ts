export const UNIT = {
    en_US: {
        duration: "milliseconds",
        distance: "miles",
        elevation: "ft",
        height: "inches",
        weight: "lb",
        body_measurements: "inches",
        liquids: "fl oz",
        blood_glucose: "mg/dL"
    },
    en_GB: {
        duration: "milliseconds",
        distance: "km",
        elevation: "m",
        height: "cm",
        weight: "stone",
        body_measurements: "cm",
        liquids: "ml",
        blood_glucose: "mmol/l"
    },
    default: {
        duration: "milliseconds",
        distance: "km",
        elevation: "m",
        height: "cm",
        weight: "kg",
        body_measurements: "cm",
        liquids: "ml",
        blood_glucose: "mmol/l"
    },
}

export const CHALLENGES = {
    value: [
      10, 20, 50, 100, 200, 500, 1000, 5000, 10000, 20000, 50000
    ],
    units: {
      step: 'Steps',
      floor: 'Floors',
      distance: 'Km',
    }
  };
