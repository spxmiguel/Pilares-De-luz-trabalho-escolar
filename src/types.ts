export interface SimulationSettings {
  temperature: number; // -30 to 0 °C
  windSpeed: number; // 0 to 10 m/s
  lightColor: string; // Hex color
  crystalDensity: number; // 20 to 150 crystals
  crystalType: 'hexagonal' | 'plate' | 'column';
  sourceIntensity: number; // 10 to 100
  showRays: boolean;
  timeOfDay: 'day' | 'night';
}

export interface ExploraCard {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}
