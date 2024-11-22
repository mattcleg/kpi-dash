import { featureFlags, FeatureFlag } from '../config/featureFlags';

export function useFeatureFlag(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}

