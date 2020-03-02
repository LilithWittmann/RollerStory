import gql from "graphql-tag";

export const MAP_OVERVIEW = gql`
  {
    latestMap {
      geojson
    }
  }
`;

export const COMPARE_SERVICES = gql`
  {
    dayStats {
      averagePrice
      averageDuration
      averageDistance
      countTrips
      countScooters
      serviceProvider {
        name
        primaryColor
        textColor
      }
    }
  }
`;

export const SUBURB_STATS = gql`
  {
    suburbStats {
      suburbsWithScooterCount
      suburbsWithoutScooterCount
      suburbsWithScooterPopulation
      suburbsWithoutScooterPopulation
      suburbsWithScooterAverageIncome
      suburbsWithoutScooterAverageIncome
    }
  }
`;

export const TRIP_TYPE_STATS = gql`
  {
    tripTypes {
      name
      count
      countNearbyStation
    }
  }
`;

export const EXPLORATION_TRIP_TYPE = gql`
  mutation(
    $dayTimeFrame: DayTimeFrame!
    $timeFrame: TimeFrame!
    $tripType: TripType!
    $endedAtStation: Boolean
    $startedAtStation: Boolean
  ) {
    exploreTripTypeStats(
      dayTimeFrame: $dayTimeFrame
      timeFrame: $timeFrame
      tripType: $tripType
      endedAtStation: $endedAtStation
      startedAtStation: $startedAtStation
    ) {
      success
      result {
        name
        countNearbyStation
        count
      }
    }
  }
`;

export const EXPLORATION_WEEKDAY_HOUR = gql`
  mutation(
    $dayTimeFrame: DayTimeFrame!
    $timeFrame: TimeFrame!
    $tripType: TripType!
    $endedAtStation: Boolean
    $startedAtStation: Boolean
  ) {
    exploreTripsOverWeek(
      dayTimeFrame: $dayTimeFrame
      timeFrame: $timeFrame
      tripType: $tripType
      endedAtStation: $endedAtStation
      startedAtStation: $startedAtStation
    ) {
      success
      result {
        count
        hour
        weekday
      }
    }
  }
`;

export const TRIPS_VISUALIZATON = gql`
  {
    tripsVisualization {
      color
      path {
        l
        t
      }
    }
  }
`;
