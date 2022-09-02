export const kGamesFeatures = new Map<number, string[]>([
  // Halo Infinite
  [
    21854,
    [
      'kill',
      'game_info',
      'match_info',
      'kill',
      'assist',
      'death',
      'roster'
    ]
  ]
]);

export const kGameClassIds = Array.from(kGamesFeatures.keys());

export const kWindowNames = {
  inGame: 'in_game',
  desktop: 'desktop'
};

export const kHotkeys = {
  toggle: 'sample_app_ts_showhide'
};
