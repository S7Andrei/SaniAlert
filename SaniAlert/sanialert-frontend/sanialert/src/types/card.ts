export type ParameterQuality = 'GOOD' | 'REGULAR' | 'CRITICAL';

export const ParameterQuality = {
  GOOD: 'GOOD' as ParameterQuality,
  REGULAR: 'REGULAR' as ParameterQuality,
  CRITICAL: 'CRITICAL' as ParameterQuality
} as const;

export type WaterQualityStatus = 'GOOD' | 'REGULAR' | 'CRITICAL';

export const WaterQualityStatus = {
  GOOD: 'GOOD' as WaterQualityStatus,
  REGULAR: 'REGULAR' as WaterQualityStatus,
  CRITICAL: 'CRITICAL' as WaterQualityStatus
} as const;

export interface CardCreateDTO {
  technicalResponsible: string;
  date: string;
  ph: number;
  turbidity: number;
  dissolvedOxygen: number;
  heavyMetalsPresent: boolean;
  heavyMetalsLevel?: number;
  residuesDetected: boolean;
  residuesDescription?: string;
}

export interface CardDTO {
  id: string;
  technicalResponsible: string;
  date: string;
  ph: number;
  phQuality: ParameterQuality;
  turbidity: number;
  turbidityQuality: ParameterQuality;
  dissolvedOxygen: number;
  dissolvedOxygenQuality: ParameterQuality;
  heavyMetalsPresent: boolean;
  heavyMetalsLevel?: number;
  heavyMetalsQuality: ParameterQuality;
  residuesDetected: boolean;
  residuesDescription?: string;
  description?: string;
  residuesQuality: ParameterQuality;
  status: WaterQualityStatus;
}

export const WaterQualityStatusDescription = {
  [WaterQualityStatus.GOOD]: 'Boa',
  [WaterQualityStatus.REGULAR]: 'Regular',
  [WaterQualityStatus.CRITICAL]: 'Crítica'
};

export const ParameterQualityDescription = {
  [ParameterQuality.GOOD]: 'Bom',
  [ParameterQuality.REGULAR]: 'Regular',
  [ParameterQuality.CRITICAL]: 'Crítico'
};
