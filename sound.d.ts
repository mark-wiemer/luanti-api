export type LtSimpleSoundSpec = string;

export interface LtSoundDefs {
  [key: string]: LtSimpleSoundSpec;
  /**tools only*/
  breaks: LtSimpleSoundSpec;
  place: LtSimpleSoundSpec;

  footstep: LtSimpleSoundSpec;
  dig: LtSimpleSoundSpec;
  dug: LtSimpleSoundSpec;
  place_failed: LtSimpleSoundSpec;
}
