export interface Season {
  year: number;
}

export interface League {
  league: {
    id: number;
    name: string;
  };
  country: {
    name: string;
    flag: string;
  };
  seasons: Season[];
}

export interface Player {
  player: {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };
  }[];
}